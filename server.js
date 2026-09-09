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
    if (req.method === 'POST' && url.pathname === '/api/v1/ai/chat') {
      let raw = ''; for await (const chunk of req) raw += chunk; const { prompt = '' } = JSON.parse(raw || '{}');
      const q = prompt.toLowerCase(); const s = db.summary;
      let answer = `Avgust 2026 bo‘yicha daromad ${s.income.value}, xarajat ${s.expense.value} va sof foyda ${s.netProfit.value}. Sof marja taxminan 46.2% ni tashkil qiladi.`;
      if (q.includes('qarz') || q.includes('debitor')) answer = 'Debitorlik bo‘yicha asosiy e’tibor Fresh Retail hisobiga qaratilishi kerak: 6 720 000 UZS qoldiq va 14 kunlik muddat ko‘rsatilgan. Sotuv menejeriga eslatma va to‘lov rejasini yaratish tavsiya etiladi.';
      else if (q.includes('cash') || q.includes('pul') || q.includes('gap')) answer = 'To‘lov kalendarida sentyabr uchun kutilayotgan kirim 184M, chiqim 226M UZS. Farq 42M UZS: yirik to‘lovlarni tasdiqlashdan oldin Green Market va boshqa debitorlar bilan undirish rejasini tekshiring.';
      else if (q.includes('ishlab') || q.includes('samarador')) answer = `Ishlab chiqarish liniyalari bajarilishi: Tozalash 82%, Butilkalash 68%, Qadoqlash 79%. Eng katta og‘ish 2-liniyada; servis va smena rejasini tekshirish foydali.`;
      else if (q.includes('xarajat') || q.includes('daromad') || q.includes('foyda')) answer = `Avgust oyida ${s.income.value} daromadga nisbatan ${s.expense.value} xarajat qayd etilgan. Sof foyda ${s.netProfit.value}; oldingi davrga nisbatan o‘sish ${s.netProfit.change}. Xarajatlar ichida ishlab chiqarish va energiya ulushini alohida ko‘rib chiqing.`;
      else if (q.includes('byudjet') || q.includes('reja')) answer = 'Byudjet bo‘yicha ishlab chiqarish xarajatlari rejasi 245M UZS, marketing va sotuv rejasi 58M UZS. Reja/fakt nazoratida marketing bajarilishi 91% darajada.';
      return send(res, 200, { answer, source: 'Biolife moliyaviy ma’lumotlar bazasi · Avgust 2026' });
    }
    const match = url.pathname.match(/^\/api\/v1\/modules\/([a-z]+)$/);
    if (match && db.modules[match[1]]) {
      const module = db.modules[match[1]];
      const section = Math.max(0, Number(url.searchParams.get('section') || 0));
      const rows = module.sectionRows?.[section] || module.rows || [];
      const numeric = rows.map(row => Number(String(row[3] || '').replace(/[^0-9.-]/g, ''))).filter(Number.isFinite);
      const statuses = rows.reduce((acc, row) => { acc[row[4] || 'Noma’lum'] = (acc[row[4] || 'Noma’lum'] || 0) + 1; return acc; }, {});
      return send(res, 200, { module: match[1], ...module, activeSection: section, rows, analytics: { total: rows.length, numericTotal: numeric.reduce((a,b) => a+b, 0), average: numeric.length ? Math.round(numeric.reduce((a,b) => a+b, 0) / numeric.length) : 0, statuses } });
    }
    const recordMatch = url.pathname.match(/^\/api\/v1\/modules\/([a-z]+)\/records(?:\/([^/]+))?$/);
    if (recordMatch && db.modules[recordMatch[1]]) {
      const module = db.modules[recordMatch[1]];
      const section = Math.max(0, Number(url.searchParams.get('section') || 0));
      module.sectionRows ||= module.children.map(() => []);
      module.sectionRows[section] ||= [];
      if (req.method === 'POST') {
        let raw = ''; for await (const chunk of req) raw += chunk; const input = JSON.parse(raw || '{}');
        const row = Array.isArray(input.row) ? input.row : [input.code, input.name, input.meta, input.value, input.status || 'Qoralama'];
        if (!row[0] || !row[1]) return send(res, 422, { code: 'VALIDATION_ERROR', message: 'Kod va nom majburiy.' });
        if (module.sectionRows[section].some(existing => String(existing[0]) === String(row[0]))) return send(res, 409, { code: 'DUPLICATE_CODE', message: 'Bu kod shu bo‘limda allaqachon mavjud.' });
        module.sectionRows[section].unshift(row); await writeFile(dbPath, JSON.stringify(db, null, 2)); return send(res, 201, { row });
      }
      if (req.method === 'PUT' && recordMatch[2]) {
        let raw = ''; for await (const chunk of req) raw += chunk; const input = JSON.parse(raw || '{}');
        const index = module.sectionRows[section].findIndex(row => String(row[0]) === decodeURIComponent(recordMatch[2]));
        if (index < 0) return send(res, 404, { code: 'NOT_FOUND', message: 'Yozuv topilmadi.' });
        const row = Array.isArray(input.row) ? input.row : module.sectionRows[section][index];
        module.sectionRows[section][index] = row; await writeFile(dbPath, JSON.stringify(db, null, 2)); return send(res, 200, { row });
      }
      if (req.method === 'DELETE' && recordMatch[2]) {
        const before = module.sectionRows[section].length;
        module.sectionRows[section] = module.sectionRows[section].filter(row => String(row[0]) !== decodeURIComponent(recordMatch[2]));
        if (module.sectionRows[section].length === before) return send(res, 404, { code: 'NOT_FOUND', message: 'Yozuv topilmadi.' });
        await writeFile(dbPath, JSON.stringify(db, null, 2)); return send(res, 200, { deleted: true });
      }
    }
    if (req.method === 'POST' && url.pathname === '/api/v1/operations') {
      let raw = ''; for await (const chunk of req) raw += chunk; const input = JSON.parse(raw || '{}');
      if (!input.name || !input.amount) return send(res, 422, { code: 'VALIDATION_ERROR', message: 'Nomi va summa majburiy.' });
      db.operations.unshift({ date: new Date().toLocaleDateString('uz-UZ'), code: `NEW-${Date.now().toString().slice(-4)}`, name: input.name, type: input.type || 'Operatsiya', amount: input.amount, status: 'Qoralama' });
      await writeFile(dbPath, JSON.stringify(db, null, 2)); return send(res, 201, db.operations[0]);
    }
    return send(res, 404, { code: 'NOT_FOUND', message: 'Endpoint topilmadi.' });
  } catch (error) { return send(res, 500, { code: 'SERVER_ERROR', message: 'JSON DB o‘qilmadi.' }); }
});
const port = Number(process.env.BIOLIFE_PORT || 8787);
server.listen(port, '127.0.0.1', () => console.log(`BIOLIFE API: http://127.0.0.1:${port}`));
