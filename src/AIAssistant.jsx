import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Bot,
  Copy,
  Lightbulb,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import "./ai-assistant.css";
import { apiFetch } from "./api.js";

const livePrompts = (agent, dashboard) => {
  const hour = new Date().getHours(),
    period = dashboard?.meta?.period || "joriy davr",
    scope = agent?.module ? agent.name : "barcha bo‘limlar";
  const moment =
    hour < 12
      ? "Bugungi ustuvor vazifalarni rejalashtir"
      : hour < 18
        ? "Hozirgi jarayon va risklarni tekshir"
        : "Bugungi natija va og‘ishlarni yakunla";
  return [
    moment,
    `${scope} bo‘yicha ${period} KPI xulosasini ber`,
    `${scope}dagi xavfli statuslarni top`,
    `${scope} uchun keyingi 3 ta kichik vazifani tuz`,
  ];
};

const initialMessages = (historyKey) => {
  const fallback = [
    {
      role: "assistant",
      text: "Agentni tanlang va ma\u2019lumotlar bo\u2018yicha savol bering.",
    },
  ];
  try {
    const saved = JSON.parse(localStorage.getItem(historyKey));
    if (!Array.isArray(saved)) return fallback;
    const valid = saved.filter(
      (item) =>
        item &&
        (item.role === "assistant" || item.role === "user") &&
        typeof item.text === "string",
    );
    return valid.length ? valid : fallback;
  } catch {
    return fallback;
  }
};

export default function AIAssistant({ dashboard, roleKey }) {
  const [catalog, setCatalog] = useState({ personal: null, departments: [] }),
    [agentId, setAgentId] = useState(""),
    [catalogError, setCatalogError] = useState("");
  const historyKey = `biolife-ai-history-${roleKey}`;
  const [messages, setMessages] = useState(() => initialMessages(historyKey));
  const [prompt, setPrompt] = useState(""),
    [sending, setSending] = useState(false);
  const abortRef = useRef(null),
    endRef = useRef(null);
  const agents = [
      catalog?.personal,
      ...(Array.isArray(catalog?.departments) ? catalog.departments : []),
    ].filter(Boolean),
    agent = agents.find((x) => x.id === agentId) || agents[0],
    prompts = livePrompts(agent, dashboard);
  useEffect(() => {
    try {
      localStorage.setItem(historyKey, JSON.stringify(messages.slice(-80)));
    } catch {}
  }, [messages, historyKey]);
  useEffect(() => {
    apiFetch("/ai/agents")
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body.message || "Agentlar olinmadi.");
        return body;
      })
      .then((x) => {
        const next = {
          personal: x?.personal || null,
          departments: Array.isArray(x?.departments) ? x.departments : [],
        };
        setCatalog(next);
        setCatalogError("");
        setAgentId(
          localStorage.getItem(`biolife-ai-agent-${roleKey}`) ||
            next.personal?.id ||
            next.departments[0]?.id ||
            "",
        );
      })
      .catch((error) => setCatalogError(error.message));
  }, [roleKey]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(
    () => endRef.current?.scrollIntoView({ block: "nearest" }),
    [messages, sending],
  );
  const send = async (value) => {
    const text = (value ?? prompt).trim();
    if (!text || sending || !agent) return;
    const history = messages.filter((m) => !m.error).slice(-6);
    setPrompt("");
    setSending(true);
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "assistant", text: "", agent: agent.name },
    ]);
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 40000);
    const update = (event) =>
      setMessages((m) =>
        m.map((item, i) =>
          i === m.length - 1
            ? {
                ...item,
                text: event.text ? item.text + event.text : item.text,
                source: event.source || item.source,
                agent: event.agent?.name || item.agent,
                subagents: event.subagents || item.subagents,
                proposal: event.proposal || item.proposal,
                ...(event.error ? { error: event.error } : {}),
              }
            : item,
        ),
      );
    try {
      const r = await apiFetch("/ai/chat", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          stream: true,
          history,
          agentId: agent.id,
        }),
      });
      if (!r.ok) {
        const body = await r.json();
        throw new Error(body.message || "Javob olinmadi.");
      }
      const reader = r.body.getReader(),
        decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let at;
        while ((at = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, at);
          buffer = buffer.slice(at + 1);
          if (line.trim()) update(JSON.parse(line));
        }
      }
    } catch (e) {
      update({
        error: e.name === "AbortError" ? "So‘rov to‘xtatildi." : e.message,
      });
    } finally {
      clearTimeout(timer);
      setSending(false);
      abortRef.current = null;
    }
  };
  const confirm = async (index, proposal) => {
    setMessages((m) =>
      m.map((x, i) =>
        i === index ? { ...x, actionState: "Amal bajarilmoqda…" } : x,
      ),
    );
    try {
      const r = await apiFetch("/ai/actions/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: proposal.token }),
      });
      const body = await r.json();
      if (!r.ok) throw new Error(body.message || "Amal bajarilmadi.");
      setMessages((m) =>
        m.map((x, i) =>
          i === index
            ? {
                ...x,
                proposal: null,
                actionState: "Amal bazaga muvaffaqiyatli yozildi.",
              }
            : x,
        ),
      );
    } catch (e) {
      setMessages((m) =>
        m.map((x, i) => (i === index ? { ...x, actionState: e.message } : x)),
      );
    }
  };
  return (
    <div className="ai-page">
      <div className="ai-heading">
        <div>
          <span className="eyebrow">AI AGENTLAR MARKAZI</span>
          <h1>
            Bo‘lim agentlari <Sparkles size={25} />
          </h1>
          <p>Har bir so‘rov kichik mutaxassis vazifalariga yo‘naltiriladi.</p>
        </div>
        <button
          className="outline"
          disabled={sending}
          onClick={() => {
            setMessages([]);
            localStorage.removeItem(historyKey);
          }}
        >
          <Trash2 size={15} /> Suhbatni tozalash
        </button>
      </div>
      <div className="ai-layout">
        <aside className="ai-context">
          {catalogError && <div className="form-error">{catalogError}</div>}
          <label className="agent-select">
            Faol agent
            <select
              value={agent?.id || ""}
              onChange={(e) => {
                setAgentId(e.target.value);
                localStorage.setItem(
                  `biolife-ai-agent-${roleKey}`,
                  e.target.value,
                );
              }}
            >
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          {agent && (
            <>
              <div className="assistant-card">
                <div className="bot-orb">
                  <Bot size={25} />
                </div>
                <div>
                  <strong>{agent.name}</strong>
                  <span>{agent.description}</span>
                </div>
                <i />
              </div>
              <div className="context-block">
                <span className="eyebrow">SUBAGENTLAR</span>
                {(Array.isArray(agent.subagents) ? agent.subagents : []).map(
                  (s) => (
                    <div key={s.id}>
                      <small>{s.name}</small>
                      <strong>{s.task}</strong>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
          <div className="prompt-list">
            <span className="eyebrow">TEZKOR SAVOLLAR</span>
            {prompts.map((p) => (
              <button key={p} onClick={() => send(p)}>
                {p}
              </button>
            ))}
          </div>
          <div className="ai-disclaimer">
            <Lightbulb size={16} />
            <span>
              Agent tahlil qiladi; moliyaviy amal faqat foydalanuvchi tasdig‘i
              bilan bajariladi.
            </span>
          </div>
        </aside>
        <section className="chat-panel">
          <div className="chat-top">
            <div>
              <strong>Suhbat</strong>
              <span>{agent?.name || "Agent yuklanmoqda"}</span>
            </div>
            <span className="online">
              {sending ? "Javob kelmoqda…" : "Tayyor"}
            </span>
          </div>
          <div className="messages">
            {messages.map((m, i) => (
              <div className={"message-row " + m.role} key={i}>
                <div className="message-avatar">
                  {m.role === "assistant" ? (
                    <Bot size={16} />
                  ) : (
                    <UserRound size={16} />
                  )}
                </div>
                <div className="message">
                  <div className="message-label">
                    {m.role === "assistant" ? m.agent || "AI AGENT" : "SIZ"}
                  </div>
                  <p>{m.text}</p>
                  {m.proposal && (
                    <div className="agent-action">
                      <strong>{m.proposal.summary}</strong>
                      <small>
                        {m.proposal.action.toUpperCase()} · {m.proposal.module}{" "}
                        · bo‘lim {m.proposal.section + 1}
                      </small>
                      {m.proposal.row && (
                        <small>{m.proposal.row.join(" · ")}</small>
                      )}
                      <button
                        className="primary"
                        onClick={() => confirm(i, m.proposal)}
                      >
                        Tasdiqlash va bazaga yozish
                      </button>
                    </div>
                  )}
                  {m.actionState && <small>{m.actionState}</small>}
                  {m.subagents?.length > 0 && (
                    <small>
                      Vazifa: {m.subagents.map((x) => x.name).join(", ")}
                    </small>
                  )}
                  {m.error && (
                    <p role="alert" className="form-error">
                      {m.error}
                    </p>
                  )}
                  {m.source && <small>Manba: {m.source}</small>}
                  {m.role === "assistant" && m.text && (
                    <button
                      className="copy-btn"
                      onClick={() => navigator.clipboard?.writeText(m.text)}
                    >
                      <Copy size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div ref={endRef} />
          <div className="prompt-area">
            <div className="prompt-box">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Agentga vazifa yozing..."
                rows="1"
              />
              <button
                className="send-btn"
                aria-label="Yuborish"
                onClick={() => send()}
                disabled={!prompt.trim() || sending || !agent}
              >
                <ArrowUp size={18} />
              </button>
            </div>
            {sending && (
              <button
                className="outline"
                onClick={() => abortRef.current?.abort()}
              >
                To‘xtatish
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
