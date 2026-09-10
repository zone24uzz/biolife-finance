# Render deploy

Loyiha `render.yaml` Blueprint orqali bitta Node web service va PostgreSQL baza sifatida deploy qilinadi. React buildni shu service tarqatadi, API esa shu domenning `/api/v1` yo‘lida ishlaydi.

## Deploy

1. Render Dashboard ichida **New → Blueprint** ni tanlang.
2. GitHub’dagi `zone24uzz/biolife-finance` reposini ulang.
3. Blueprint yaratishda so‘ralgan maxfiy qiymatlarni kiriting:
   - `TELEGRAM_BOT_TOKEN`
   - `GEMINI_API_KEY`
4. Deploy tugagach `/api/v1/health` javobi `{"ok":true,"source":"json-db"}` yoki `source: "postgres"` ekanini tekshiring. Blueprint bazasi to‘g‘ri ulanganida `postgres` chiqadi.
5. Web service logida `Telegram webhook sozlandi.` yozuvi chiqadi. Bot komandasi va BIOLIFE Web App tugmasi Render domeniga avtomatik o‘tadi.

`BIOLIFE_BOOTSTRAP_PASSWORD` Render tomonidan avtomatik yaratiladi. Uni Render service ichidagi **Environment** bo‘limidan ko‘rib, foydalanuvchilarga xavfsiz tarzda bering. Production’da lokal `biolife-demo` parolidan foydalanmang.
