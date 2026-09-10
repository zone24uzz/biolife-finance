import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { can, ensureSecurity, telegramUser } from "./auth.js";

const api = (token, method) => `https://api.telegram.org/bot${token}/${method}`;
const activeTelegramRequests = new Map();

export function cancelTelegramRequest(chatId) {
  const controller = activeTelegramRequests.get(String(chatId));
  if (!controller) return false;
  controller.abort();
  return true;
}
const publicBaseUrl = () => {
  const explicit =
    process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.RENDER_EXTERNAL_HOSTNAME)
    return `https://${process.env.RENDER_EXTERNAL_HOSTNAME.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  if (process.env.RENDER_SERVICE_NAME)
    return `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`;
  return "";
};
export const BOT_COMMANDS = [
  { command: "start", description: "Botni ishga tushirish" },
  { command: "menu", description: "Asosiy menyuni ko\u2018rsatish" },
  { command: "dashboard", description: "Moliyaviy dashboardni ko\u2018rish" },
  { command: "ai", description: "AI agent bilan ishlash" },
  { command: "webapp", description: "BIOLIFE web ilovasini ochish" },
  { command: "help", description: "Yordam va komandalar" },
  { command: "logout", description: "Telegram akkauntini uzish" },
];
export async function tgCall(method, body) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { ok: false, disabled: true };
  const response = await fetch(api(token, method), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function configureTelegramBot() {
  const commands = await tgCall("setMyCommands", { commands: BOT_COMMANDS });
  if (!commands?.ok)
    throw new Error(
      commands?.description || "Telegram komandalari o\u2018rnatilmadi.",
    );
  const miniAppUrl = process.env.MINI_APP_URL || publicBaseUrl();
  if (miniAppUrl) {
    const menuButton = await tgCall("setChatMenuButton", {
      menu_button: {
        type: "web_app",
        text: "BIOLIFE",
        web_app: { url: miniAppUrl },
      },
    });
    if (!menuButton?.ok)
      throw new Error(
        menuButton?.description ||
          "Telegram Web App tugmasi o\u2018rnatilmadi.",
      );
  }
  return BOT_COMMANDS;
}

export async function configureTelegramWebhook() {
  const base = publicBaseUrl();
  if (!base) throw new Error("Telegram uchun public Render URL topilmadi.");
  const result = await tgCall("setWebhook", {
    url: `${base}/api/v1/telegram/webhook`,
    secret_token: process.env.TELEGRAM_WEBHOOK_SECRET || undefined,
    allowed_updates: ["message", "callback_query"],
    drop_pending_updates: false,
  });
  if (!result?.ok)
    throw new Error(result?.description || "Telegram webhook ulanmagan.");
  await configureTelegramBot();
  return result;
}

export function verifyInitData(initData, maxAgeSeconds = 900) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || !initData) return null;
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");
  const dataCheck = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(token).digest();
  const expected = createHmac("sha256", secret).update(dataCheck).digest("hex");
  if (
    !hash ||
    hash.length !== expected.length ||
    !timingSafeEqual(Buffer.from(hash), Buffer.from(expected))
  )
    return null;
  const authDate = Number(params.get("auth_date"));
  if (!authDate || Date.now() / 1000 - authDate > maxAgeSeconds) return null;
  try {
    return JSON.parse(params.get("user") || "null");
  } catch {
    return null;
  }
}

const menu = (user) => ({
  inline_keyboard: user.allowed
    .filter((x) => !["dashboard", "ai", "admin"].includes(x))
    .map((x) => [{ text: x.toUpperCase(), callback_data: `module:${x}` }])
    .concat(
      [
        [
          { text: "📊 Dashboard", callback_data: "dashboard" },
          { text: "🤖 AI agent", callback_data: "ai" },
        ],
        process.env.MINI_APP_URL
          ? [
              {
                text: "📱 Mini App",
                web_app: { url: process.env.MINI_APP_URL },
              },
            ]
          : [],
      ].filter((x) => x.length),
    ),
});
const dashboardText = (db, user) =>
  user.role === "ceo"
    ? `📊 BIOLIFE\nDaromad: ${db.summary?.income?.value || "—"}\nXarajat: ${db.summary?.expense?.value || "—"}\nSof foyda: ${db.summary?.netProfit?.value || "—"}`
    : `📊 ${user.name}\nRuxsat etilgan bo‘limlar: ${user.allowed.filter((x) => db.modules[x]).length}`;

export const formatTelegramText = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>");

const withTyping = async (chatId, task) => {
  const frames = ["Печатает ...", "Печатает ..", "Печатает ."];
  const sent = await tgCall("sendMessage", {
    chat_id: chatId,
    text: frames[0],
    reply_markup: {
      inline_keyboard: [[{ text: "⏹ To‘xtatish", callback_data: "stop_ai" }]],
    },
  }).catch(() => null);
  const messageId = sent?.ok ? sent.result?.message_id : null;
  let frame = 0;
  const timer = messageId
    ? setInterval(() => {
        frame = (frame + 1) % frames.length;
        tgCall("editMessageText", {
          chat_id: chatId,
          message_id: messageId,
          text: frames[frame],
        }).catch(() => {});
      }, 1000)
    : null;
  timer?.unref?.();
  try {
    return await task();
  } finally {
    if (timer) clearInterval(timer);
    if (messageId)
      await tgCall("deleteMessage", {
        chat_id: chatId,
        message_id: messageId,
      }).catch(() => {});
  }
};

export async function handleTelegramUpdate(db, update, askAi, performAction) {
  ensureSecurity(db);
  const message = update.message;
  const callback = update.callback_query;
  const from = message?.from || callback?.from;
  const chatId = message?.chat?.id || callback?.message?.chat?.id;
  if (!from || !chatId) return;
  let user = telegramUser(db, from.id);
  if (!user) {
    if (
      !db.security.linkRequests.some(
        (x) =>
          String(x.telegramId) === String(from.id) && x.status === "pending",
      )
    )
      db.security.linkRequests.push({
        id: createHash("sha256")
          .update(`${from.id}:${Date.now()}`)
          .digest("hex")
          .slice(0, 16),
        telegramId: String(from.id),
        username: from.username || "",
        firstName: from.first_name || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
    await tgCall("sendMessage", {
      chat_id: chatId,
      text: "Akkauntingiz administrator tasdig‘ini kutmoqda.",
    });
    return;
  }
  if (message?.text === "/logout") {
    const link = db.security.telegramAccounts.find(
      (x) => String(x.telegramId) === String(from.id) && x.status === "active",
    );
    if (link) link.status = "revoked";
    await tgCall("sendMessage", {
      chat_id: chatId,
      text: "Telegram akkaunti uzildi. Qayta kirish uchun /start yuboring va admin tasdig‘ini kuting.",
    });
    return;
  }
  const data = callback?.data;
  if (callback)
    await tgCall("answerCallbackQuery", { callback_query_id: callback.id });
  if (data?.startsWith("confirm:") || data?.startsWith("cancel:")) {
    const [action, token] = data.split(":");
    const result = await performAction(db, user, action, token);
    return tgCall("sendMessage", { chat_id: chatId, text: result.message });
  }
  if (data === "dashboard" || message?.text === "/dashboard")
    return tgCall("sendMessage", {
      chat_id: chatId,
      text: dashboardText(db, user),
      reply_markup: menu(user),
    });
  if (data?.startsWith("module:")) {
    const key = data.slice(7);
    if (!can(user, key) || !db.modules[key])
      return tgCall("sendMessage", {
        chat_id: chatId,
        text: "Bu bo‘lim uchun ruxsat yo‘q.",
      });
    const mod = db.modules[key];
    return tgCall("sendMessage", {
      chat_id: chatId,
      text: `${mod.title}\n${mod.children.map((x, i) => `${i + 1}. ${x}: ${(mod.sectionRows?.[i] || []).length} yozuv`).join("\n")}`,
      reply_markup: menu(user),
    });
  }
  if (message?.text === "/start" || message?.text === "/menu")
    return tgCall("sendMessage", {
      chat_id: chatId,
      text: `Assalomu alaykum, ${user.name}.`,
      reply_markup: menu(user),
    });
  if (message?.text === "/webapp")
    return tgCall("sendMessage", {
      chat_id: chatId,
      text: "BIOLIFE web ilovasini oching:",
      reply_markup: menu(user),
    });
  if (message?.text === "/ai")
    return tgCall("sendMessage", {
      chat_id: chatId,
      text: "AI agentga savolingizni oddiy xabar qilib yozing. Masalan: Bugungi moliyaviy holatni tahlil qil.",
      reply_markup: menu(user),
    });
  if (message?.text === "/help" || message?.text?.startsWith("/"))
    return tgCall("sendMessage", {
      chat_id: chatId,
      text: BOT_COMMANDS.map(
        (x) => `/${x.command} \u2014 ${x.description}`,
      ).join("\n"),
      reply_markup: menu(user),
    });
  if (message?.text) {
    const requestKey = String(chatId);
    activeTelegramRequests.get(requestKey)?.abort();
    const controller = new AbortController();
    activeTelegramRequests.set(requestKey, controller);
    let result;
    try {
      result = await withTyping(chatId, () =>
        askAi(db, user, message.text, controller.signal),
      );
    } finally {
      if (activeTelegramRequests.get(requestKey) === controller)
        activeTelegramRequests.delete(requestKey);
    }
    if (controller.signal.aborted) return;
    const reply = {
      chat_id: chatId,
      text: formatTelegramText(
        result.answer || result.message || "Javob olinmadi.",
      ),
      parse_mode: "HTML",
    };
    if (result.proposal)
      reply.reply_markup = {
        inline_keyboard: [
          [
            {
              text: "✅ Tasdiqlash",
              callback_data: `confirm:${result.proposal.token}`,
            },
            {
              text: "❌ Bekor qilish",
              callback_data: `cancel:${result.proposal.token}`,
            },
          ],
        ],
      };
    return tgCall("sendMessage", reply);
  }
}
