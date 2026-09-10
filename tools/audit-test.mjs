import { mkdtemp, copyFile, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import path from "node:path";
import { formatTelegramText } from "../telegram.js";
assert.equal(
  formatTelegramText("**Foyda** va `100`"),
  "<b>Foyda</b> va <code>100</code>",
);
assert.equal(formatTelegramText("<script>"), "&lt;script&gt;");
const dir = await mkdtemp(path.resolve("backups/test-"));
const dbPath = path.join(dir, "data.json");
await copyFile("db/data.json", dbPath);
const child = spawn(process.execPath, ["server.js"], {
  env: { ...process.env, BIOLIFE_PORT: "8799", BIOLIFE_DB_PATH: dbPath },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverErrors = "";
child.stderr.on("data", (chunk) => (serverErrors += chunk));
await new Promise((resolve, reject) => {
  child.stdout.once("data", resolve);
  child.once("error", reject);
  child.once("exit", () => reject(new Error("Test server exited")));
});
const base = "http://127.0.0.1:8799/api/v1";
let token = "";
const call = async (p, method = "GET", body, authenticated = true) => {
  const headers = { "Content-Type": "application/json" };
  if (authenticated && token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(base + p, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json() };
};
try {
  const auth = await call(
    "/auth/login",
    "POST",
    {
      login: "ceo",
      password: process.env.BIOLIFE_BOOTSTRAP_PASSWORD || "biolife-demo",
    },
    false,
  );
  assert.equal(auth.status, 200);
  token = auth.body.token;
  assert.equal((await call("/dashboard", "GET", undefined, false)).status, 401);
  const ceoToken = token,
    salesAuth = await call(
      "/auth/login",
      "POST",
      {
        login: "sales_manager",
        password: process.env.BIOLIFE_BOOTSTRAP_PASSWORD || "biolife-demo",
      },
      false,
    );
  assert.equal(salesAuth.status, 200);
  token = salesAuth.body.token;
  assert.equal((await call("/modules/sales")).status, 200);
  assert.equal((await call("/modules/finance")).status, 403);
  token = ceoToken;
  assert.equal(
    (
      await call(
        "/telegram/webhook",
        "POST",
        {
          update_id: 910001,
          message: {
            message_id: 1,
            from: { id: 777001, first_name: "Test" },
            chat: { id: 777001 },
            text: "/start",
          },
        },
        false,
      )
    ).status,
    200,
  );
  const duplicateUpdate = await call(
    "/telegram/webhook",
    "POST",
    {
      update_id: 910001,
      message: {
        message_id: 1,
        from: { id: 777001, first_name: "Test" },
        chat: { id: 777001 },
        text: "/start",
      },
    },
    false,
  );
  assert.equal(duplicateUpdate.body.duplicate, true);
  const links = await call("/admin/telegram-links");
  const pending = links.body.find((x) => x.telegramId === "777001");
  assert.ok(pending);
  assert.equal(
    (
      await call(`/admin/telegram-links/${pending.id}/approve`, "POST", {
        userId: "sales_manager",
      })
    ).status,
    200,
  );
  assert.equal(
    (await call("/admin/telegram-links")).body.find((x) => x.id === pending.id)
      .userId,
    "sales_manager",
  );
  assert.equal(
    (
      await call(`/admin/telegram-links/${pending.id}/approve`, "POST", {
        userId: "accountant",
      })
    ).status,
    200,
  );
  assert.equal(
    (await call("/admin/telegram-links")).body.find((x) => x.id === pending.id)
      .userId,
    "accountant",
  );
  assert.equal(
    (await call(`/admin/telegram-links/${pending.id}`, "DELETE")).status,
    200,
  );
  let count = 0;
  const db = JSON.parse(await readFile(dbPath));
  for (const [mod, value] of Object.entries(db.modules))
    for (let i = 0; i < value.children.length; i++) {
      const r = await call(`/modules/${mod}?section=${i}`);
      assert.equal(r.status, 200);
      assert.deepEqual(r.body.rows, value.sectionRows[i]);
      count++;
    }
  const agents = await call("/ai/agents");
  assert.equal(agents.status, 200);
  assert.equal(agents.body.departments.length, 7);
  assert.ok(
    agents.body.departments.every(
      (a) => a.rank === 1 && a.subagents.length >= 4,
    ),
  );
  assert.equal(
    (
      await call("/modules/sales/records?section=bad", "POST", {
        row: ["X", "Y", "", "", "Qoralama", "Tavsif"],
      })
    ).status,
    422,
  );
  const row = [
    "TEST-AUDIT",
    "Audit record",
    "Test",
    "1000",
    "Qoralama",
    "CRUD tavsifi",
  ];
  assert.equal(
    (await call("/modules/sales/records?section=1", "POST", { row })).status,
    201,
  );
  assert.equal(
    (await call("/modules/sales/records?section=1", "POST", { row })).status,
    409,
  );
  row[1] = "Updated";
  assert.equal(
    (await call("/modules/sales/records/TEST-AUDIT?section=1", "PUT", { row }))
      .status,
    200,
  );
  assert.equal(
    JSON.parse(await readFile(dbPath)).modules.sales.sectionRows[1][0][1],
    "Updated",
  );
  assert.equal(
    (await call("/modules/sales/records/TEST-AUDIT?section=1", "DELETE"))
      .status,
    200,
  );
  assert.equal(
    (await call("/modules/finance/records/JE-8044?section=2", "DELETE")).status,
    409,
  );
  const concurrent = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      call("/modules/sales/records?section=1", "POST", {
        row: [
          `CONCURRENT-${i}`,
          "Concurrent",
          "",
          "",
          "Qoralama",
          "Parallel yozuv",
        ],
      }),
    ),
  );
  assert.deepEqual(
    concurrent.map((x) => x.status),
    Array(10).fill(201),
    serverErrors || JSON.stringify(concurrent),
  );
  assert.equal(
    JSON.parse(await readFile(dbPath)).modules.sales.sectionRows[1].filter(
      (r) => r[0].startsWith("CONCURRENT-"),
    ).length,
    10,
  );
  assert.equal((await call("/ai/chat", "POST", { prompt: "" })).status, 422);
  assert.equal((await fetch("http://127.0.0.1:8799/")).status, 200);
  console.log(
    JSON.stringify({
      sectionReads: count,
      auth: "PASS",
      rbac: "PASS",
      telegramLink: "PASS",
      telegramIdempotency: "PASS",
      staticMiniApp: "PASS",
      createUpdateDelete: "PASS",
      persistence: "PASS",
      duplicate: "PASS",
      invalidSection: "PASS",
      lockedRecord: "PASS",
      concurrentWrites: 10,
      aiValidation: "PASS",
      isolatedDb: dbPath,
    }),
  );
} finally {
  child.kill();
}
