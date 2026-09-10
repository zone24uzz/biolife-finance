# BIOLIFE Finance

Biolife korxonasi uchun korporativ moliyaviy boshqaruv ilovasining UI-first MVP bazasi.

## Ishga tushirish

```powershell
cd D:\Biolife-Finance
npm install
npm run api
npm run dev -- --host 127.0.0.1 --port 4173
```

Brauzer: `http://127.0.0.1:4173/`

API: `http://127.0.0.1:8787/api/v1/health`

Standart lokal loginlar rol kodlari bilan ochiladi; parol `.env` dagi `BIOLIFE_BOOTSTRAP_PASSWORD` qiymati. Qiymat berilmasa faqat lokal demo uchun `biolife-demo` ishlatiladi.

Telegram AI-agent, Mini App, PostgreSQL va VPS sozlamalari: [`docs/TELEGRAM_AGENT.md`](docs/TELEGRAM_AGENT.md).

Render deploy qo‘llanmasi: [`docs/RENDER_DEPLOY.md`](docs/RENDER_DEPLOY.md). `render.yaml` frontend, API, PostgreSQL va Telegram webhook konfiguratsiyasini tayyorlaydi.

## Hozirgi iteratsiya

- Login ekrani: rol tanlash, parol ko‘rsatish/yashirish, loadingga tayyor oqim.
- RBAC UI: CEO, buxgalter, ombor, ishlab chiqarish, sotuv, xarid va auditor menyulari.
- Referens sidebar: Ishlab chiqarish, Ombor, Sotuv, Xarid, Kassa va bank, Moliya, Byudjet, AI Phase 2.
- Dashboard: 6 KPI, daromad/xarajat grafigi, mahsulot mixi, operatsiyalar, ishlab chiqarish liniyalari.
- Modul sahifalari: filter, qidiruv, eksport tugmasi, jadval, statuslar va pagination skeleti.
- Responsive layout, keyboard focus uchun tabiiy form elementlari, reduced-motion rejimi.

Dashboard va modul ma’lumotlari `db/data.json` dan `server.js` API orqali keladi. Yangi operatsiya modalidan saqlangan ma’lumot markaziy ma’lumotlar bazasi’ga yoziladi va qayta yuklanganda ko‘rinadi. Keyingi iteratsiyada shu kontrakt PostgreSQL/Prisma modeli, Argon2id sessiya auth va real permission enforcement bilan almashtiriladi.

## TZ traceability

| TZ | Qamrov | Holat |
|---|---|---|
| AUTH-01, AUTH-14, AUTH-15 | Login va rolega mos menyu | UI MVP |
| RP-01 | Dashboard KPI, chart, operatsiyalar | UI MVP |
| UI-30/31 | Sidebar, filtrlar, dashboard referens | UI MVP |
| UI-32–38 | Barcha modul route/sahifa skeletlari | UI scaffold |
| API-01–10 | REST, decimal, permission scope | Keyingi bosqich |
| DB-01–11 | PostgreSQL constraint va accounting invariantlar | Keyingi bosqich |

## Muhim prinsiplar

- Pul qiymatlari backendda `NUMERIC(18,2)` yoki minor-unit integer bilan saqlanadi; frontend faqat ko‘rsatish qatlami sifatida ishlaydi.
- AI moliyaviy yozuvni mustaqil post qilmaydi.
- Posted moliyaviy yozuvlar o‘chirilmaydi; tuzatish storno orqali qilinadi.
- Frontenddagi menyu yashirish backend permission tekshiruvining o‘rnini bosmaydi.

