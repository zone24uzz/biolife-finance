import { readFile, writeFile } from 'node:fs/promises';

const dbPath = new URL('../db/data.json', import.meta.url);
const db = JSON.parse(await readFile(dbPath, 'utf8'));

const sub = (id, name, task, keywords) => ({ id, name, task, keywords });
const common = [
  sub('summary', 'Ko‘rsatkichlar tahlilchisi', 'Asosiy ko‘rsatkichlarni qisqa hisoblaydi va izohlaydi.', ['jami','qancha','ko‘rsatkich','natija']),
  sub('risk', 'Risk nazoratchisi', 'Muddat, qarzdorlik va og‘ish risklarini topadi.', ['risk','qarz','kechik','muammo','og‘ish']),
  sub('plan', 'Vazifa rejalashtiruvchi', 'Katta so‘rovni aniq kichik vazifalarga ajratadi.', ['reja','vazifa','qanday','keyingi'])
];
const accountNames = {
  ceo:['CEO strategik agenti','Barcha bo‘limlar bo‘yicha qaror uchun xulosa beradi.'],
  accountant:['Buxgalter agenti','Hisob, hujjat va moliyaviy yozuvlarni tekshiradi.'],
  warehouse_manager:['Ombor mudiri agenti','Qoldiq, kirim-chiqim va inventar nazoratini tahlil qiladi.'],
  production_manager:['Ishlab chiqarish rahbari agenti','Reja, batch, uskuna va tannarxni tahlil qiladi.'],
  sales_manager:['Sotuv rahbari agenti','Mijoz, buyurtma, tushum va debitorlarni tahlil qiladi.'],
  purchase_manager:['Xarid rahbari agenti','Ta’minotchi, buyurtma va kreditorlarni tahlil qiladi.'],
  auditor:['Auditor agenti','Nazorat izi, nomuvofiqlik va risklarni tahlil qiladi.']
};
const departmentNames = {
  production:'Ishlab chiqarish', warehouse:'Ombor', sales:'Sotuv', purchases:'Xarid',
  cash:'Kassa va bank', finance:'Moliya', budget:'Byudjet'
};
db.aiAgents = {
  accounts:Object.fromEntries(Object.entries(accountNames).map(([role,[name,description]])=>[role,{id:`account-${role}`,kind:'account',role,name,description,subagents:common}])),
  departments:Object.fromEntries(Object.entries(departmentNames).map(([module,label])=>[module,{id:`department-${module}`,kind:'department',module,name:`${label} №1 agenti`,rank:1,description:`${label} bo‘limidagi yozuvlar va ko‘rsatkichlarga ixtisoslashgan yetakchi agent.`,trainedOn:['Bo‘lim yozuvlari','Status qoidalari','KPI va analitika','CRUD ish oqimi'],capabilities:['read','analyze','plan','draft-create','draft-update','request-delete'],subagents:[...common,sub('records','Yozuvlar mutaxassisi','Yozuv tafsilotlari, statusi va tavsifini tahlil qiladi.',['yozuv','status','tavsif','description','kod'])]}]))
};

for (const [moduleKey, module] of Object.entries(db.modules)) {
  for (let section = 0; section < (module.sectionRows || []).length; section++) {
    module.sectionRows[section] = module.sectionRows[section].map(row => {
      const next = row.slice(0, 6);
      if (!next[5]) next[5] = `${next[1]} — ${module.children[section]} bo‘limidagi ${next[2] || 'operatsion'} yozuv. Qiymat: ${next[3] || 'ko‘rsatilmagan'}, holat: ${next[4] || 'ko‘rsatilmagan'}.`;
      return next;
    });
  }
  if (Array.isArray(module.rows)) module.rows = module.rows.map(row => row.length >= 6 ? row.slice(0,6) : [...row, `${row[1]} bo‘yicha operatsion yozuv.`]);
}

await writeFile(dbPath, JSON.stringify(db, null, 2) + '\n');
console.log('Agentlar va description maydonlari yaratildi.');
