# Telegram AI-agent va Mini App

## Arxitektura

Web, Telegram bot va Telegram Mini App bir xil `/api/v1` backend, RBAC va ma’lumot omboridan foydalanadi. `DATABASE_URL` berilsa PostgreSQL `biolife_state` jadvali yagona manba bo‘ladi; lokal ishlab chiqishda `db/data.json` fallback sifatida ishlaydi.

AI hech qachon bazaga to‘g‘ridan-to‘g‘ri yozmaydi. U `aiProposals` ichida 5 daqiqalik taklif yaratadi. Web yoki Telegram foydalanuvchisi taklifni tasdiqlagandan keyin backend rolni qayta tekshiradi va amalni audit bilan bajaradi.

## Lokal ishga tushirish

1. `.env.example` asosida `.env` yarating.
2. `BIOLIFE_BOOTSTRAP_PASSWORD` uchun kuchli vaqtinchalik parol belgilang.
3. `npm run api` va `npm run dev -- --host 127.0.0.1 --port 4173` ni ishga tushiring.
4. Boshlang‘ich loginlar rol kodlari: `ceo`, `accountant`, `warehouse_manager`, `production_manager`, `sales_manager`, `purchase_manager`, `auditor`.

## Telegram ulash

1. BotFather orqali bot va Mini App yarating.
2. `TELEGRAM_BOT_TOKEN`, tasodifiy `TELEGRAM_WEBHOOK_SECRET`, `PUBLIC_BASE_URL` va `MINI_APP_URL` ni server muhitiga kiriting.
3. HTTPS reverse proxy ortida ilovani ishga tushiring.
4. `npm run telegram:webhook` orqali webhookni ulang.
5. Xodim botda `/start` yuboradi.
6. CEO webdagi **Telegram ulanishlari** sahifasida so‘rovni mavjud xodim roliga biriktiradi.

## Production

`docker compose up -d --build` PostgreSQL va ilovani ishga tushiradi. TLS sertifikat va domen reverse proxy yoki cloud load balancerda sozlanadi. Birinchi production ishga tushirishdan oldin `.env` ichidagi barcha majburiy qiymatlar to‘ldirilishi kerak.

## Xavfsizlik chegaralari

- API roli request query yoki AI promptdan emas, server sessiyasidan olinadi.
- Telegram Mini App `initData` imzosi va 15 daqiqalik muddati tekshiriladi.
- Webhook secret yoqilgan muhitda noto‘g‘ri webhook so‘rovi rad etiladi.
- Yakunlangan va tasdiqlangan yozuvlar oddiy update/delete orqali o‘zgarmaydi.
- Telegram update IDlari saqlanadi; bir update qayta kelsa amal takrorlanmaydi.
