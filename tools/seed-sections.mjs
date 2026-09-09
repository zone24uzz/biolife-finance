import { readFile, writeFile } from 'node:fs/promises';
const file = new URL('../db/data.json', import.meta.url);
const db = JSON.parse(await readFile(file, 'utf8'));
const section = {
  warehouse: [
    [['RM-042','Preforma PET 5L','Ombor A','8 200 dona','Mavjud'],['RM-043','Mineral reagent','Ombor A','1 240 kg','Mavjud']],
    [['FG-8841','BIOLIFE Suv 5L','Batch FG-8841','8 240 dona','Mavjud'],['FG-8840','BIOLIFE Suv 1.5L','Batch FG-8840','4 240 dona','Rezervda']],
    [['PK-088','Butilka 5L','Qadoq / PET','24 600 dona','Mavjud'],['PK-089','Qopqoq 28mm','Qadoq / PP','48 600 dona','Kam qoldiq']],
    [['FM-011','Filtr membrana 400G','RO-01','24 dona','Mavjud'],['FM-012','UV lampa','UV-02','6 dona','Servis kerak']],
    [['KI-0021','Preforma PET kirimi','31.08.2026','+8 200 dona','Qabul qilindi'],['CH-0198','Ishlab chiqarishga berish','31.08.2026','-6 400 dona','Tasdiqlangan']],
    [['INV-008','Ombor A inventarizatsiyasi','31.08.2026','-240 000 UZS','Yopilgan'],['INV-007','Tayyor mahsulot sanog‘i','30.08.2026','+12 dona','Tasdiqlangan']]
  ],
  sales: [
    [['SO-1048','Green Market LLC','31.08.2026','18 450 000','Tasdiqlangan'],['SO-1047','Mega Trade','30.08.2026','9 280 000','To‘langan']],
    [['CUS-001','Green Market LLC','STIR 309884211','18 450 000 qarz','Faol'],['CUS-002','Mega Trade','STIR 307112908','0 UZS qarz','Faol']],
    [['DLR-014','Mega Trade dileri','Toshkent shahri','Maxsus narx','Faol'],['DLR-009','Baraka Market dileri','Samarqand','Limit 80M','Faol']],
    [['AR-1046','Fresh Retail','Muddati: 14 kun','6 720 000','Qarz mavjud'],['AR-1039','Baraka Market','Muddati: 7 kun','4 100 000','Kechikkan']]
  ],
  purchases: [
    [['SUP-001','Aqua Plast LLC','STIR 305771204','42 000 000 qarz','Faol'],['SUP-002','CleanChem','STIR 309112040','8 420 000 qarz','Faol']],
    [['PO-0208','Aqua Plast LLC','Preforma PET 5L','42 000 000','Qabul qilindi'],['PO-0207','CleanChem','Filtr reagentlari','8 420 000','Kutilmoqda']],
    [['AP-0208','Aqua Plast LLC','Muddati: 15.09.2026','42 000 000','To‘lanmagan'],['AP-0207','CleanChem','Muddati: 12.09.2026','8 420 000','To‘lanmagan']]
  ],
  cash: [
    [['CASH-019','Kassa 01','Boshlang‘ich: 12 400 000','4 250 000','Tasdiqlangan'],['CASH-018','Kassa 01','Chiqim','-1 180 000','Tasdiqlangan']],
    [['BANK-001','Ipak Yo‘li Bank','UZS · 202080001','284 600 000','Faol'],['BANK-002','Kapitalbank','UZS · 202080009','112 400 000','Faol']],
    [['PAY-882','Aqua Plast LLC','31.08.2026','12 000 000','Kutilmoqda'],['PAY-881','Energo Tashkent','28.08.2026','3 850 000','Tasdiqlangan']],
    [['ST-0831','Ipak Yo‘li Bank','31.08.2026','128 ta satr','Import qilindi'],['ST-0830','Kapitalbank','30.08.2026','94 ta satr','Import qilindi']],
    [['REC-441','Green Market → Bank kirimi','18 450 000','Farq: 0','Moslashtirildi'],['REC-440','Aqua Plast → Bank chiqimi','12 000 000','Farq: 0','Moslashtirildi']]
  ],
  finance: [
    [['ACC-01','Buxgalteriya overview','Ochiq davr','6 ta hujjat','Nazoratda'],['ACC-02','Posted hujjatlar','Avgust 2026','128 ta yozuv','Muvozanatli']],
    [['GL-1010','Hisob 1010 · Kassa','Avgust 2026','16 650 000','Muvozanatli'],['GL-5110','Hisob 5110 · Daromad','Avgust 2026','728 400 000','Muvozanatli']],
    [['JE-8044','Sotuv #SO-1048','Daromad / Debitorlik','18 450 000','Posted'],['JE-8043','Xarajat #EX-031','Elektr energiyasi','3 850 000','Posted']],
    [['1010','Kassa','Aktiv','UZS','Faol'],['5110','Sotuv daromadi','Daromad','UZS','Faol']],
    [['PL-08','P&L · Avgust 2026','Daromad − Xarajat','336 700 000','Tasdiqlangan'],['PL-07','P&L · Iyul 2026','Daromad − Xarajat','286 100 000','Yopilgan']],
    [['BS-08','Balans · Avgust 2026','Aktivlar','1 284 600 000','Muvozanatli'],['BS-07','Balans · Iyul 2026','Aktivlar','1 190 400 000','Muvozanatli']]
  ],
  budget: [
    [['BUD-2026-08','Ishlab chiqarish xarajatlari','Avgust 2026','245 000 000','Tasdiqlangan'],['BUD-2026-08','Marketing va sotuv','Avgust 2026','58 000 000','Tasdiqlangan']],
    [['PF-001','Ishlab chiqarish','Reja / Fakt','245M / 232M','94.7%'],['PF-002','Marketing','Reja / Fakt','58M / 52.8M','91.0%']],
    [['LIM-001','Xomashyo xaridi','Avgust 2026','320 000 000','68% ishlatilgan'],['LIM-002','Transport','Avgust 2026','42 000 000','91% ishlatilgan']],
    [['CAL-0831','Kutilayotgan kirim','01–30.09.2026','184 000 000','Rejada'],['CAL-0832','Kutilayotgan chiqim','01–30.09.2026','226 000 000','Cash-gap']],
    [['VER-2026-08-1','Asosiy byudjet','Avgust 2026','528 000 000','Tasdiqlangan'],['VER-2026-09-1','Reforecast','Sentyabr 2026','612 000 000','Qoralama']]
  ],
  ai: [
    [['AI-031','Debitorlik oshishi','Debitorlik','14 kundan oshgan qarzlar','87%'],['AI-030','Marjani oshirish','Suv 1.5L','Narx segmentini qayta ko‘rib chiqish','76%']],
    [['RISK-014','Kechikkan debitorlik','Fresh Retail','6 720 000 UZS / 14 kun','Yuqori'],['RISK-013','Cash-gap xavfi','To‘lov kalendari','18-sentyabr','O‘rta']],
    [['OPP-008','Suv 1.5L marjasi','Narx tahlili','+4.2% potensial','76%'],['OPP-007','Qadoq xarajati','Tannarx','−2.1% tejash','71%']],
    [['FC-2026-09','Sentyabr cashflow','30 kunlik prognoz','Kutilayotgan qoldiq 172M','81%'],['FC-2026-10','Oktabr daromad','60 kunlik prognoz','O‘sish 14.8%','68%']],
    [['AN-044','Energiya xarajati','28.08.2026','O‘rtachadan +18%','Tekshirish kerak'],['AN-043','Suv 5L sotuv hajmi','31.08.2026','Rejadan +12%','Tasdiqlandi']]
  ]
};
for (const [name, rows] of Object.entries(section)) db.modules[name].sectionRows = rows;
await writeFile(file, JSON.stringify(db, null, 2) + '\n');
console.log('Section datasets seeded:', Object.entries(section).map(([k,v]) => `${k}:${v.length}`).join(', '));
