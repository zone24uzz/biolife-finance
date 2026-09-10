import { createHash, randomUUID } from "node:crypto";
import { ROLE_MODULES } from "./auth.js";

const cache = new Map();
export function consumeAction(db, token, user) {
  db.aiProposals ||= [];
  const item = db.aiProposals.find(
    (x) => x.token === token && x.status === "pending",
  );
  if (!item || item.userId !== user.id) return null;
  item.status = "consumed";
  item.consumedAt = new Date().toISOString();
  return item;
}
export function cancelAction(db, token, user) {
  db.aiProposals ||= [];
  const item = db.aiProposals.find(
    (x) => x.token === token && x.status === "pending" && x.userId === user.id,
  );
  if (!item) return null;
  item.status = "cancelled";
  item.cancelledAt = new Date().toISOString();
  return item;
}
function registerAction(db, agent, args, user) {
  const action = ["create", "update", "delete"].includes(args?.action)
    ? args.action
    : null;
  const module = agent.module || args?.module;
  if (!action || !module) return null;
  const proposal = {
    token: randomUUID(),
    action,
    module,
    section: Number(args.section),
    code: String(args.code || args.row?.[0] || ""),
    row: Array.isArray(args.row) ? args.row.map(String).slice(0, 6) : null,
    summary: String(args.summary || "AI taklif qilgan amal"),
  };
  db.aiProposals ||= [];
  db.aiProposals.push({
    ...proposal,
    userId: user.id,
    role: user.role,
    status: "pending",
    createdAt: new Date().toISOString(),
    expiresAt: Date.now() + 5 * 60_000,
  });
  return proposal;
}
export function visibleAgents(db, role) {
  const personal = db.aiAgents?.accounts?.[role];
  const allowed = ROLE_MODULES[role] || [];
  return {
    personal,
    departments: Object.values(db.aiAgents?.departments || {}).filter(
      (x) => !x.module || allowed.includes(x.module),
    ),
  };
}
function resolveAgent(db, input) {
  const all = [
    ...Object.values(db.aiAgents?.accounts || {}),
    ...Object.values(db.aiAgents?.departments || {}),
  ];
  return (
    all.find((a) => a.id === input.agentId) ||
    db.aiAgents?.accounts?.[input.role] ||
    db.aiAgents?.accounts?.ceo
  );
}
function routeSubagents(agent, prompt) {
  const matched = (agent?.subagents || [])
    .filter((s) =>
      (s.keywords || []).some((k) => prompt.toLowerCase().includes(k)),
    )
    .slice(0, 2);
  return matched.length ? matched : (agent?.subagents || []).slice(0, 1);
}
export function selectContext(db, prompt) {
  const routes = {
    sales: /sotuv|mijoz|diler|debitor|qarz/i,
    purchases: /xarid|kreditor|ta.minot|qarz/i,
    production: /ishlab|liniya|suv|tannarx|uskuna/i,
    warehouse: /ombor|qoldiq|material|inventar/i,
    budget: /byudjet|reja|cash|gap|pul|to.lov/i,
    cash: /bank|kassa|pul|cash/i,
    finance: /balans|jurnal|hisob|foyda|daromad|xarajat/i,
  };
  const summaryOnly =
    /foyda|daromad|xarajat/i.test(prompt) &&
    /qancha|qisqa|summa/i.test(prompt) &&
    !/risk|sabab|tahlil/i.test(prompt);
  const modules = summaryOnly
    ? {}
    : Object.fromEntries(
        Object.entries(routes)
          .filter(([, pattern]) => pattern.test(prompt))
          .map(([key]) => [key, db.modules[key]]),
      );
  return {
    period: db.meta.period,
    summary: db.summary,
    productionLines: db.productionLines,
    modules,
  };
}

export async function chat(
  req,
  res,
  db,
  input,
  send,
  persist = async () => {},
  user = { id: "anonymous", role: input.role || "ceo" },
) {
  const prompt = input.prompt;
  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 4000)
    return send(res, 422, { message: "Savol 1–4000 belgidan iborat bo‘lsin." });
  if (!process.env.GEMINI_API_KEY)
    return send(res, 503, { message: "Gemini sozlanmagan." });
  const streaming = input.stream === true;
  const agent = resolveAgent(db, input);
  if (!agent)
    return send(res, 503, { message: "AI agent katalogi sozlanmagan." });
  if (agent.module && !(ROLE_MODULES[user.role] || []).includes(agent.module))
    return send(res, 403, { message: "Bu agent uchun ruxsat yo‘q." });
  const subagents = routeSubagents(agent, prompt);
  const context = selectContext(db, `${agent.module || ""} ${prompt}`);
  if (agent.module)
    context.modules = Object.fromEntries(
      Object.entries(context.modules).filter(([key]) => key === agent.module),
    );
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const history = Array.isArray(input.history)
    ? input.history
        .slice(-6)
        .filter(
          (x) =>
            ["user", "assistant"].includes(x.role) &&
            typeof x.text === "string",
        )
        .map((x) => ({ role: x.role, text: x.text.slice(0, 2000) }))
    : [];
  const key = createHash("sha256")
    .update(
      JSON.stringify({
        model,
        prompt,
        context,
        history,
        agent: agent.id,
        subagents: subagents.map((x) => x.id),
      }),
    )
    .digest("hex");
  const cached = cache.get(key);
  const source = `Gemini · ${model} · ${db.meta.period}`;
  const started = Date.now();
  const emit = (event) => {
    if (!res.destroyed) res.write(JSON.stringify(event) + "\n");
  };
  const start = () => {
    res.writeHead(200, {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    });
    res.flushHeaders();
  };
  const routing = {
    agent: { id: agent.id, name: agent.name },
    subagents: subagents.map(({ id, name, task }) => ({ id, name, task })),
  };
  if (cached && Date.now() - cached.at < 60000) {
    if (streaming) {
      start();
      emit({ text: cached.answer });
      emit({ done: true, source, cached: true, ...routing });
      res.end();
      return;
    }
    return send(res, 200, {
      answer: cached.answer,
      source,
      cached: true,
      ...routing,
    });
  }
  const controller = new AbortController();
  const externalSignal = input.signal;
  const abortFromExternal = () => controller.abort();
  if (externalSignal?.aborted) controller.abort();
  else
    externalSignal?.addEventListener("abort", abortFromExternal, {
      once: true,
    });
  const timer = setTimeout(() => controller.abort(), 35000);
  const close = () => controller.abort();
  res.on("close", close);
  if (streaming) start();
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `Siz ${agent.name}: ${agent.description} Faol mutaxassislar: ${subagents.map((s) => `${s.name} — ${s.task}`).join("; ")}. O‘zbekcha, 120 so‘zgacha aniq javob bering. Faqat kontekstdagi dalillardan foydalaning. Foydalanuvchi yozuv qo‘shish, tahrirlash yoki o‘chirishni aniq so‘rasa propose_record_action funksiyasini chaqiring. Qator 6 maydon: kod, nomi, sana/kategoriya, qiymat, status, tavsif. Yangi yozuv statusi Qoralama bo‘lsin. Bo‘lim agenti faqat ${agent.module || "so‘rovda aniq ko‘rsatilgan bo‘lim"} doirasida amal qiladi.`,
              },
            ],
          },
          contents: [
            {
              parts: [
                {
                  text: JSON.stringify({ context, history, question: prompt }),
                },
              ],
            },
          ],
          tools: [
            {
              functionDeclarations: [
                {
                  name: "propose_record_action",
                  description:
                    "Tasdiqlash uchun yozuv CRUD amalini tayyorlaydi",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      action: {
                        type: "STRING",
                        enum: ["create", "update", "delete"],
                      },
                      module: { type: "STRING" },
                      section: { type: "INTEGER" },
                      code: { type: "STRING" },
                      row: { type: "ARRAY", items: { type: "STRING" } },
                      summary: { type: "STRING" },
                    },
                    required: ["action", "module", "section", "summary"],
                  },
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 512,
            thinkingConfig: { thinkingLevel: "minimal" },
          },
        }),
      },
    );
    if (!response.ok) throw new Error(`UPSTREAM_${response.status}`);
    let pending = "",
      answer = "",
      firstTokenMs = null,
      functionArgs = null;
    const decoder = new TextDecoder();
    for await (const chunk of response.body) {
      pending += decoder.decode(chunk, { stream: true });
      let at;
      while ((at = pending.indexOf("\n")) >= 0) {
        const line = pending.slice(0, at).trim();
        pending = pending.slice(at + 1);
        if (!line.startsWith("data:")) continue;
        const payload = JSON.parse(line.slice(5));
        const parts = payload.candidates?.[0]?.content?.parts || [];
        const call = parts.find(
          (p) => p.functionCall?.name === "propose_record_action",
        );
        if (call) functionArgs = call.functionCall.args;
        const text =
          parts
            .filter((p) => !p.thought)
            .map((p) => p.text || "")
            .join("") || "";
        if (text) {
          firstTokenMs ??= Date.now() - started;
          answer += text;
          if (streaming) emit({ text });
        }
      }
    }
    const proposal = functionArgs
      ? registerAction(db, agent, functionArgs, user)
      : null;
    if (!answer && proposal)
      answer = `${proposal.summary}. Bajarish uchun amalni tasdiqlang.`;
    if (!answer) throw new Error("EMPTY_RESPONSE");
    if (cache.size >= 50) cache.delete(cache.keys().next().value);
    cache.set(key, { answer, at: Date.now() });
    const result = {
      answer,
      source,
      firstTokenMs,
      durationMs: Date.now() - started,
      ...routing,
      proposal,
    };
    db.conversations ||= [];
    db.conversations.push({
      id: randomUUID(),
      userId: user.id,
      channel: input.channel || "web",
      agentId: agent.id,
      prompt: prompt.trim(),
      response: answer,
      proposalToken: proposal?.token || null,
      at: new Date().toISOString(),
    });
    await persist(db);
    if (streaming) {
      emit({ done: true, ...result });
      res.end();
    } else send(res, 200, result);
  } catch (error) {
    const message = controller.signal.aborted
      ? "Gemini 35 soniyada javob bermadi. Qayta urinib ko‘ring."
      : "Gemini javobi olinmadi. Birozdan keyin qayta urinib ko‘ring.";
    if (streaming) {
      emit({ error: message });
      res.end();
    } else send(res, 502, { message });
  } finally {
    clearTimeout(timer);
    externalSignal?.removeEventListener("abort", abortFromExternal);
    res.off("close", close);
  }
}
