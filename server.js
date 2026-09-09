import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(root, 'db', 'data.json');
const send = (res, status, body) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }); res.end(JSON.stringify(body)); };
const readDb = async () => JSON.parse(await readFile(dbPath, 'utf8'));
const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }); return res.end(); }
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/api/v1/health') return send(res, 200, { ok: true, source: 'json-db' });
    const db = await readDb();
    if (url.pathname === '/api/v1/dashboard') return send(res, 200, { meta: db.meta, summary: db.summary, cashflow: db.cashflow, productMix: db.productMix, productionLines: db.productionLines, operations: db.operations });
    const match = url.pathname.match(/^\/api\/v1\/modules\/([a-z]+)$/);
    if (match && db.modules[match[1]]) return send(res, 200, { module: match[1], ...db.modules[match[1]] });
    if (req.method === 'POST' && url.pathname === '/api/v1/operations') {
      let raw = ''; for await (const chunk of req) raw += chunk; const input = JSON.parse(raw || '{}');
      if (!input.name || !input.amount) return send(res, 422, { code: 'VALIDATION_ERROR', message: 'Nomi va summa majburiy.' });
      db.operations.unshift({ date: new Date().toLocaleDateString('uz-UZ'), code: `NEW-${Date.now().toString().slice(-4)}`, name: input.name, type: input.type || 'Operatsiya', amount: input.amount, status: 'Qoralama' });
      await writeFile(dbPath, JSON.stringify(db, null, 2)); return send(res, 201, db.operations[0]);
    }
    return send(res, 404, { code: 'NOT_FOUND', message: 'Endpoint topilmadi.' });
  } catch (error) { return send(res, 500, { code: 'SERVER_ERROR', message: 'JSON DB o‘qilmadi.' }); }
});
server.listen(8787, '127.0.0.1', () => console.log('BIOLIFE API: http://127.0.0.1:8787'));
