**«BIOLIFE»**

Korporativ moliyaviy boshqaruv veb-ilovasi

**TEXNIK TOPSHIRIQ**

*Dasturiy taʼminotni ishlab chiqish uchun*

| **Koʻrsatkich**    | **Qiymat**                                                                       |
|--------------------|----------------------------------------------------------------------------------|
| Hujjat nomi        | «Biolife» korporativ moliyaviy boshqaruv veb-ilovasi. Texnik topshiriq           |
| Hujjat kodi        | BL-FIN-TZ-2026-01                                                                |
| Versiya            | 1.3-DRAFT                                                                              |
| Sana               | 09.09.2026                                                                       |
| Status             | Ishlab chiqishdan oldingi yakuniy draft — Login/RBAC/UI navigatsiya qo‘shilgan                                                                |
| Buyurtmachi        | «Biolife» — ishlab chiqarish va savdo korxonasi                                  |
| Ijrochi            | __________ |
| Hujjat muallifi    | Loyiha boshqaruvchisi / biznes-tahlilchi                                         |
| Maxfiylik darajasi | Ichki foydalanish uchun                                                          |

## Hujjat versiyalari tarixi

| **Versiya** | **Sana**   | **Oʻzgartirish mazmuni**                                                                                                                                                                 | **Muallif**           |
|-------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| 0.1         | 20.08.2026 | Dastlabki qoralama, modullar roʻyxati                                                                                                                                                    | Biznes-tahlilchi      |
| 0.5         | 29.08.2026 | Funksional talablar va maʼlumotlar modeli qoʻshildi                                                                                                                                      | Biznes-tahlilchi      |
| 1.0         | 05.09.2026 | Toʻliq versiya: arxitektura, NFR, bosqichlar, ilovalar                                                                                                                                   | Loyiha boshqaruvchisi |
| 1.1         | 05.09.2026 | Ikki yozuvli buxgalteriya dvigateli (6-boʻlim), invariantlar, QQS hisobi tartibi, kreditlar moduli, majburiy buxgalteriya testlari, AI 2-bosqichga ajratildi, bosqichlar qayta baholandi | Loyiha boshqaruvchisi |
| 1.2         | 09.09.2026 | Barcha 4 qism yagona manbaga konsolidatsiya qilindi; implementatsiya uchun workflow, posting/account-map, API, DB constraintlar, xavfsizlik, integratsiya ishonchliligi, migratsiya, release/rollback va traceability talablari aniqlashtirildi | Loyiha boshqaruvchisi / texnik tahlil |
| 1.3         | 09.09.2026 | Rolga asoslangan login/parol tizimi, sessiya boshqaruvi, rol bo‘yicha start sahifalar, referens dashboard va sidebar navigatsiyasi, barcha ko‘rinadigan modul/sahifa seksiyalari hamda UI acceptance mezonlari qo‘shildi | Loyiha boshqaruvchisi / texnik tahlil |


---

# 1. Umumiy qoidalar

## 1.1. Hujjatning maqsadi

Ushbu texnik topshiriq (keyingi oʻrinlarda — TZ) «Biolife» korxonasi uchun korporativ moliyaviy boshqaruv veb-ilovasini ishlab chiqishga qoʻyiladigan talablarni belgilaydi. Hujjat Buyurtmachi va Ijrochi oʻrtasidagi shartnomaning ajralmas qismi hisoblanadi va ishlab chiqilgan mahsulotni qabul qilishda asosiy mezon boʻlib xizmat qiladi.

TZ quyidagi vazifalarni hal qiladi:

- ishlab chiqiladigan tizimning funksional va nofunksional chegaralarini aniq belgilash;

- Buyurtmachi va Ijrochi oʻrtasida yagona tushunchani shakllantirish;

- mehnat sarfi, muddat va byudjetni asoslangan holda baholash imkonini berish;

- testlash va qabul qilish uchun obyektiv mezonlar toʻplamini taqdim etish.

## 1.2. Loyihaning qisqacha taʼrifi

«Biolife Finance» — ishlab chiqarish va savdo korxonasining pul oqimlari, qarzdorliklari, ombor zaxiralari, mahsulot tannarxi va moliyaviy natijalarini yagona muhitda boshqarishga moʻljallangan veb-ilova. Tizim brauzer orqali ishlaydi, koʻp filialli tuzilmani qoʻllab-quvvatlaydi va Oʻzbekiston Respublikasining soliq hamda elektron hujjat aylanishi talablariga moslashtiriladi.

## 1.3. Atamalar va qisqartmalar

| **Atama**   | **Izoh**                                                                          |
|-------------|-----------------------------------------------------------------------------------|
| TZ          | Texnik topshiriq — ushbu hujjat                                                   |
| MJM (CFO)   | Moliyaviy javobgarlik markazi — xarajat/daromad biriktiriladigan tashkiliy birlik |
| DDS         | Pul mablagʻlari harakati (Cash Flow) hisoboti                                     |
| P&L         | Foyda va zararlar toʻgʻrisidagi hisobot                                           |
| EHF         | Elektron hisobvaraq-faktura                                                       |
| QQS         | Qoʻshilgan qiymat soligʻi                                                         |
| STIR (INN)  | Soliq toʻlovchining identifikatsiya raqami                                        |
| MFO         | Bank muassasasining kodi                                                          |
| IKPU (MXIK) | Tovar va xizmatlarning yagona elektron milliy katalogi kodi                       |
| BOM         | Mahsulot spetsifikatsiyasi (retsept) — xomashyo sarfi normalari                   |
| SKU         | Nomenklatura birligi — alohida hisobga olinadigan tovar pozitsiyasi               |
| Aging       | Qarzdorlikni yuzaga kelgan muddati boʻyicha guruhlash                             |
| RBAC        | Rollarga asoslangan kirish huquqlarini boshqarish                                 |
| RPO / RTO   | Yoʻqotilishi mumkin boʻlgan maʼlumot hajmi / tiklanish vaqti                      |
| SLA         | Xizmat koʻrsatish sifati boʻyicha kelishuv                                        |
| Storno      | Xatolikni tuzatuvchi teskari yozuv                                                |

## 1.4. Meʼyoriy asos

Tizim quyidagi hujjatlar talablarini hisobga olgan holda ishlab chiqiladi:

- Oʻzbekiston Respublikasining Soliq kodeksi (QQS — 12%, foyda soligʻi — 15%, aylanmadan olinadigan soliq — 4%, ijtimoiy soliq — 12% joriy stavkalari 2026-yilda oʻzgarmagan);

- «Buxgalteriya hisobi toʻgʻrisida»gi Qonun va Buxgalteriya hisobining milliy standartlari (BHMS/NAS);

- «Elektron hujjat aylanishi toʻgʻrisida»gi va «Elektron raqamli imzo toʻgʻrisida»gi Qonunlar;

- «Shaxsga doir maʼlumotlar toʻgʻrisida»gi Qonun — xodimlar va kontragentlar maʼlumotlarini qayta ishlash qismida;

- Elektron hisobvaraq-fakturalarni rasmiylashtirish tartibi (Didox.uz / Faktura.uz operatorlari orqali).

> *Soliq stavkalari tizimda qattiq kodlanmaydi — ular maʼlumotnomada saqlanadi va amal qilish sanasi bilan sozlanadi. Bu qonunchilikdagi oʻzgarishlarda dasturni qayta yozmasdan sozlash imkonini beradi.*


---

# 2. Loyiha maqsadi va doirasi

## 2.1. Mavjud holat va hal qilinadigan muammolar

Hozirda moliyaviy hisob asosan Excel jadvallarida va alohida dasturlarda yuritilmoqda. Bu quyidagi muammolarni keltirib chiqaradi:

| **№** | **Muammo**                                              | **Oqibati**                                         |
|-------|---------------------------------------------------------|-----------------------------------------------------|
| 1     | Maʼlumotlar bir nechta faylda tarqoq, yagona manba yoʻq | Hisobotlar bir-biriga mos kelmaydi, qaror kechikadi |
| 2     | Kassa va bank qoldigʻi real vaqtda koʻrinmaydi          | Toʻlov rejalashtirish qiyin, kassa uzilishi xavfi   |
| 3     | Debitorlik qarzdorligi qoʻlda kuzatiladi                | Muddati oʻtgan qarzlar oʻz vaqtida aniqlanmaydi     |
| 4     | Mahsulot tannarxi taxminiy hisoblanadi                  | Marja notoʻgʻri, narx siyosati asossiz              |
| 5     | Ombor qoldigʻi hisob bilan mos kelmaydi                 | Kamomad, yaroqlilik muddati oʻtgan tovar            |
| 6     | Oʻzgartirishlar tarixi saqlanmaydi                      | Masʼuliyatni aniqlash imkonsiz                      |
| 7     | Hisobot tayyorlash 3–5 kun vaqt oladi                   | Boshqaruv qarorlari eskirgan maʼlumotga asoslanadi  |

## 2.2. Loyihaning maqsadlari

- Barcha moliyaviy operatsiyalar uchun yagona, ishonchli maʼlumot manbaini yaratish.

- Pul oqimlari, qarzdorliklar va ombor zaxiralarini real vaqt rejimida koʻrish imkonini berish.

- Mahsulot tannarxini hujjatlar asosida avtomatik hisoblash va haqiqiy marjani koʻrsatish.

- Toʻlov va xarajatlar boʻyicha ichki nazorat hamda tasdiqlash tartibini joriy etish.

- Boshqaruv hisobotlarini tayyorlash vaqtini kunlardan daqiqalarga qisqartirish.

- Har bir operatsiya boʻyicha toʻliq audit izini taʼminlash.

## 2.3. Muvaffaqiyat mezonlari (KPI)

| **Koʻrsatkich**                          | **Hozirgi holat**  | **Maqsad (ishga tushgandan 6 oy keyin)**    |
|------------------------------------------|--------------------|---------------------------------------------|
| Oylik moliyaviy hisobotni yopish muddati | 10–15 kun          | ≤ 3 ish kuni                                |
| Boshqaruv hisobotini olish vaqti         | 3–5 kun            | ≤ 5 daqiqa (real vaqt)                      |
| Muddati oʻtgan debitorlik ulushi         | Nazorat qilinmaydi | Umumiy debitorlikning ≤ 10%                 |
| Ombor inventarizatsiyasidagi ogʻish      | Nazorat qilinmaydi | ≤ 1%                                        |
| Tannarx hisobining aniqligi              | Taxminiy           | Hujjatlar asosida 100%                      |
| Qoʻlda kiritiladigan maʼlumot ulushi     | ≈ 100%             | ≤ 30% (qolgani import/integratsiya)         |
| Faol foydalanuvchilar                    | —                  | Rejalashtirilgan foydalanuvchilarning ≥ 90% |

## 2.4. Loyiha doirasi

### 2.4.1. Doiraga kiradi

- Ikki yozuvli buxgalteriya dvigateli: hisoblar rejasi, jurnal, bosh kitob, moliyaviy davrlar, storno (6-boʻlim).

- Maʼlumotnomalar, kassa va bank, sotuv va debitorlik, xarid va kreditorlik modullari.

- Kreditlar, qarzlar va toʻlov jadvallari; asosiy vositalar va amortizatsiya hisobi.

- Ombor hisobi, tannarx kalkulyatsiyasi va ishlab chiqarish hisobi.

- Xarajatlar, byudjetlashtirish va soddalashtirilgan ish haqi hisobi.

- Boshqaruv hisobotlari, dashboard, bildirishnomalar tizimi.

- Didox (EHF), bank koʻchirmasi, Telegram va SMS integratsiyalari.

- Administrativ panel, rollar, audit log, zaxiralash.

- Mavjud maʼlumotlarni (qoldiqlar, kontragentlar, nomenklatura) koʻchirish.

### 2.4.2. Doiraga kirmaydi (birinchi bosqichda)

- AI moliyaviy tahlilchi, anomaliyalarni aniqlash, risk markazi va prognozlash — talablari 5.13-boʻlimda qayd etilgan, alohida byudjet va kelishuv asosida ikkinchi bosqichda bajariladi.

- Soliq hisobotlarini davlat organlariga bevosita topshirish (tizim maʼlumotni tayyorlaydi, lekin topshirish soliq platformasi orqali amalga oshiriladi).

- Kadrlar hisobining toʻliq funksionali (tabel, taʼtil, kadrlar buyrugʻi).

- Ishlab chiqarish uskunalari bilan bevosita bogʻlanish (SCADA/MES).

- Mijozlar uchun mobil ilova (iOS/Android native).

- Onlayn-savdo (e-commerce) doʻkoni.

> *Doiraga kirmaydigan funksiyalar keyingi bosqichlarda alohida TZ asosida ishlab chiqilishi mumkin. Tizim arxitekturasi ularni qoʻshish imkonini beradigan tarzda loyihalanadi.*


---

# 3. Foydalanuvchi rollari va kirish huquqlari

## 3.1. Rollar roʻyxati

| **Rol**                    | **Asosiy vazifalari**                                            | **Taxminiy soni** |
|----------------------------|------------------------------------------------------------------|-------------------|
| Administrator              | Tizim sozlamalari, foydalanuvchilar, huquqlar, zaxira nusxalar   | 1–2               |
| Direktor / Egasi           | Barcha hisobotlarga koʻrish huquqi, yirik toʻlovlarni tasdiqlash | 1–3               |
| Moliya direktori           | Byudjet, toʻlov kalendari, barcha moliyaviy modullar             | 1                 |
| Bosh buxgalter             | Hujjatlarni tekshirish va yopish, davrni yopish, EHF             | 1–2               |
| Buxgalter / Kassir         | Kassa va bank hujjatlari, toʻlovlar, akt sverka                  | 2–4               |
| Sotuv menejeri             | Sotuv buyurtmalari, mijozlar, oʻz mijozlari boʻyicha qarzdorlik  | 5–15              |
| Taʼminot menejeri          | Xarid buyurtmalari, taʼminotchilar, narx taqqoslash              | 2–4               |
| Ombor mudiri               | Kirim/chiqim, koʻchirish, inventarizatsiya                       | 2–5               |
| Ishlab chiqarish boshligʻi | Ishlab chiqarish buyurtmasi, smena hisoboti, brak                | 1–3               |
| Auditor (faqat koʻrish)    | Barcha maʼlumotlarni koʻrish, oʻzgartirish huquqisiz             | 1–2               |

## 3.2. Rol va huquqlar matritsasi

Belgilar: K — koʻrish, Y — yaratish/tahrirlash, T — tasdiqlash, Y\* — faqat oʻzi yaratgan hujjatlar, «—» — huquq yoʻq.

| **Modul**            | **Admin** | **Direktor** | **Moliya dir.** | **Buxgalter** | **Sotuv** | **Ombor** |
|----------------------|-----------|--------------|-----------------|---------------|-----------|-----------|
| Maʼlumotnomalar      | Y         | K            | Y               | Y             | K         | K         |
| Kassa va bank        | Y         | K, T         | Y, T            | Y             | —         | —         |
| Sotuv va debitorlik  | Y         | K            | K               | Y             | Y\*       | K         |
| Xarid va kreditorlik | Y         | K            | K, T            | Y             | —         | K         |
| Ombor                | Y         | K            | K               | K             | K         | Y         |
| Ishlab chiqarish     | Y         | K            | K               | K             | —         | K         |
| Byudjet              | Y         | K, T         | Y, T            | K             | —         | —         |
| Ish haqi             | Y         | K            | Y               | Y             | —         | —         |
| Hisobotlar           | K         | K            | K               | K             | K\*       | K\*       |
| Administratsiya      | Y         | K            | —               | —             | —         | —         |
| Audit log            | K         | K            | K               | —             | —         | —         |

> *Huquqlar rol darajasidan tashqari filial, ombor va MJM darajasida ham cheklanadi: masalan, «Toshkent» filiali sotuv menejeri boshqa filial mijozlarining qarzdorligini koʻra olmaydi.*


---

# 4. Tizim arxitekturasi va texnologik stek

## 4.1. Umumiy arxitektura

Tizim uch qatlamli, xizmatlarga ajratilgan monolit (modular monolith) koʻrinishida quriladi. Bu yondashuv mikroservislarga xos murakkablikni keltirmasdan, modullarni keyinchalik ajratish imkonini saqlaydi.

| **Qatlam**           | **Tarkibi**                                      | **Vazifasi**                                                  |
|----------------------|--------------------------------------------------|---------------------------------------------------------------|
| Taqdimot (Frontend)  | SPA veb-ilova, brauzerda ishlaydi                | Foydalanuvchi interfeysi, formalar, jadvallar, grafiklar      |
| Amaliy (Backend API) | REST API, biznes-mantiq modullari, avtorizatsiya | Hujjatlarni qayta ishlash, hisob-kitoblar, huquqlar nazorati  |
| Fon vazifalari       | Navbat ishlovchisi (worker)                      | Hisobotlar, import/eksport, integratsiyalar, bildirishnomalar |
| Maʼlumotlar          | Relatsion MB, kesh, fayl saqlagich               | Maʼlumotlarni izchil saqlash, tranzaksiyalar, hujjat skanlari |
| Infratuzilma         | Teskari proksi, konteynerlar, monitoring         | Xavfsiz kirish, joylashtirish, kuzatuv                        |

## 4.2. Tavsiya etilayotgan texnologik stek

Quyidagi stek moliyaviy tizimning aniqlik, ishonchlilik va uzoq muddatli qoʻllab-quvvatlanish talablariga koʻra tanlandi.

| **Komponent**      | **Texnologiya**                            | **Tanlov asosi**                                                 |
|--------------------|--------------------------------------------|------------------------------------------------------------------|
| Frontend           | React 18 + TypeScript, Vite                | Katta jamoa bozori, tipli xavfsizlik, tez qurish                 |
| UI kutubxonasi     | Tailwind CSS + shadcn/ui                   | Yagona dizayn tizimi, tez moslashtirish                          |
| Jadval va formalar | TanStack Table, React Hook Form + Zod      | Yirik jadvallarni virtualizatsiya, ishonchli validatsiya         |
| Serverdagi holat   | TanStack Query                             | Kesh, qayta soʻrov, optimistik yangilanish                       |
| Grafiklar          | Recharts / ECharts                         | Moliyaviy grafiklar uchun yetarli, yengil                        |
| Backend            | Node.js 22 + NestJS (TypeScript)           | Frontend bilan yagona til, modulli tuzilma, DI                   |
| ORM                | Prisma yoki TypeORM                        | Migratsiyalar, tipli soʻrovlar                                   |
| Maʼlumotlar bazasi | PostgreSQL 16                              | ACID tranzaksiyalar, NUMERIC aniqligi, kuchli hisobot soʻrovlari |
| Kesh va navbat     | Redis 7 + BullMQ                           | Fon vazifalari, hisobot navbati, sessiyalar                      |
| Fayl saqlagich     | S3-mos saqlagich (MinIO)                   | Skanlar, eksport fayllari, lokal joylashtirishga mos             |
| Hisobot eksporti   | ExcelJS (XLSX), Puppeteer (PDF)            | Formatlangan Excel va bosmaga tayyor PDF                         |
| Autentifikatsiya   | JWT (access + refresh), Argon2id           | Zamonaviy va xavfsiz standart                                    |
| Konteynerlash      | Docker + Docker Compose                    | Bir xil muhit, oson koʻchirish                                   |
| CI/CD              | GitHub Actions (yoki GitLab CI)            | Avtomatik test va joylashtirish                                  |
| Monitoring         | Sentry, Prometheus + Grafana, pino loglari | Xatolarni tez aniqlash, ishlash nazorati                         |
| Testlash           | Vitest/Jest, Supertest, Playwright         | Birlik, integratsiya va E2E testlari                             |

> *Muhim texnik cheklov: barcha pul qiymatlari maʼlumotlar bazasida NUMERIC(18,2) tipida yoki eng kichik birlik (tiyin) boʻyicha butun son sifatida saqlanadi. Suzuvchi nuqtali (float/double) tiplardan foydalanish qatʼiy taqiqlanadi — bu yaxlitlash xatolariga olib keladi.*

## 4.3. Muhitlar

| **Muhit**   | **Maqsadi**                             | **Maʼlumotlar**                          |
|-------------|-----------------------------------------|------------------------------------------|
| Development | Ishlab chiqish va dasturchi testlari    | Sintetik (generatsiya qilingan)          |
| Staging     | Buyurtmachi tomonidan qabul testi (UAT) | Anonimlashtirilgan real maʼlumot nusxasi |
| Production  | Real ishlash                            | Real maʼlumotlar, kunlik zaxira nusxa    |

Joylashtirish varianti Buyurtmachi bilan kelishiladi: bulutli xosting (Oʻzbekiston hududidagi data-markaz afzal koʻriladi) yoki korxonaning oʻz serverida (on-premise). Tanlangan variantdan qatʼi nazar tizim Docker konteynerlarida yetkaziladi.


---

# 5. Funksional talablar

Talablar prioritetlari MoSCoW usuli boʻyicha belgilangan: M — majburiy (birinchi versiyada boʻlishi shart), K — kerakli (birinchi versiyada rejalashtirilgan), I — istalgan (imkoniyat boʻlsa).

## 5.1. Maʼlumotnomalar moduli

| **Kod** | **Talab tavsifi**                                                                                                                                          | **Prioritet** |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| MD-01   | Tashkiliy tuzilma: yuridik shaxslar, filiallar, boʻlimlar va moliyaviy javobgarlik markazlari (MJM) daraxtsimon koʻrinishda                                | M             |
| MD-02   | Kontragentlar: nomi, turi (mijoz/taʼminotchi/ikkalasi), STIR, MFO va hisob raqami, yuridik va faktik manzil, aloqa shaxslari, telefon, e-pochta            | M             |
| MD-03   | Kontragent kartochkasida: kredit limiti, kechiktirilgan toʻlov muddati (kun), narx turi, masʼul menejer                                                    | M             |
| MD-04   | Nomenklatura: SKU, nomi, turi (xomashyo/yarim tayyor/tayyor mahsulot/tovar/xizmat), oʻlchov birligi, IKPU kodi, QQS stavkasi, kategoriya, shtrix-kod, rasm | M             |
| MD-05   | Oʻlchov birliklari va ular oʻrtasidagi konvertatsiya koeffitsientlari (masalan: quti = 12 dona)                                                            | M             |
| MD-06   | Omborlar va saqlash joylari (zona/tokcha darajasigacha — opsion)                                                                                           | M             |
| MD-07   | Kassalar va bank hisoblari: nomi, valyutasi, boshlangʻich qoldigʻi, masʼul shaxs, faol/nofaol holati                                                       | M             |
| MD-08   | Pul mablagʻlari harakati moddalari (DDS moddalari) — daraxtsimon, operatsion/investitsion/moliyaviy faoliyatga ajratilgan                                  | M             |
| MD-09   | Xarajat moddalari: doimiy/oʻzgaruvchan belgisi va tannarxga taqsimlash bazasi (hajm, ish haqi, mashina-soat)                                               | M             |
| MD-10   | Valyutalar va kurslar; Markaziy bank kurslarini kunlik avtomatik yuklab olish va tarixni saqlash                                                           | M             |
| MD-11   | Shartnomalar reyestri: raqami, sanasi, amal qilish muddati, summasi, skan nusxasi, hujjatlar bilan bogʻlanish                                              | K             |
| MD-12   | Narx turlari va narxlar tarixi (ulgurji, chakana, diler, aksiya)                                                                                           | K             |
| MD-13   | Xodimlar maʼlumotnomasi: F.I.Sh., lavozimi, boʻlimi, ish haqi turi, tizim foydalanuvchisi bilan bogʻlanish                                                 | K             |
| MD-14   | Har bir maʼlumotnoma uchun qidiruv, filtr, Excel’ga eksport va Excel’dan import                                                                            | M             |
| MD-15   | Hujjatlarda ishlatilgan maʼlumotnoma yozuvini oʻchirish taqiqlanadi; faqat arxivga koʻchirish mumkin                                                       | M             |

## 5.2. Kassa va bank moduli (pul oqimlari)

| **Kod** | **Talab tavsifi**                                                                                                                              | **Prioritet** |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| CF-01   | Pul kirimi hujjati: sana, kassa/bank hisobi, kontragent, DDS moddasi, summa, valyuta, asos hujjat, izoh                                        | M             |
| CF-02   | Pul chiqimi hujjati — kirim bilan bir xil rekvizitlar va tasdiqlash marshruti                                                                  | M             |
| CF-03   | Hisoblar oʻrtasida ichki oʻtkazma (kassa ↔ bank, filial ↔ filial), «yoʻldagi pul» oraliq holati bilan                                          | M             |
| CF-04   | Valyuta konvertatsiyasi: kurs, konvertatsiya summasi va kurs farqini avtomatik hisoblash                                                       | M             |
| CF-05   | Bank koʻchirmasini import: 1C-format (.txt), Excel va CSV; kontragentni STIR/hisob raqami boʻyicha avtomatik aniqlash                          | M             |
| CF-06   | Import qilingan operatsiyalarni mavjud hujjatlar bilan avtomatik solishtirish (reconciliation); mos kelmaganlarni alohida roʻyxatda koʻrsatish | M             |
| CF-07   | Kassa kitobi: kunlik boshlangʻich qoldiq, kirim, chiqim, yakuniy qoldiq; bosmaga chiqarish                                                     | M             |
| CF-08   | Barcha hisoblar boʻyicha jami qoldiqni real vaqtda koʻrsatuvchi panel                                                                          | M             |
| CF-09   | Toʻlov soʻrovi (zayavka) va koʻp bosqichli tasdiqlash marshruti; marshrut summa chegarasiga bogʻliq sozlanadi                                  | M             |
| CF-10   | Toʻlov kalendari: rejalashtirilgan kirim va chiqimlar 30/60/90 kunga, kutilayotgan qoldiq prognozi va kassa uzilishi ogohlantirishi            | M             |
| CF-11   | Kassa boʻyicha manfiy qoldiqqa yoʻl qoʻymaslik (sozlanadigan qatʼiy taqiq yoki ogohlantirish)                                                  | M             |
| CF-12   | Kassa limiti va limitdan ortiqcha summani bankka topshirish nazorati                                                                           | K             |
| CF-13   | Kirim/chiqim orderini va toʻlov topshiriqnomasini bosma shaklda chiqarish                                                                      | K             |
| CF-14   | Hisobdor shaxslar (podotchyot) bilan hisob-kitob: avans berish, avans hisoboti, qoldiq                                                         | K             |
| CF-15   | Takrorlanuvchi toʻlovlar shabloni (ijara, kommunal, obuna)                                                                                     | I             |

## 5.3. Sotuv va debitorlik qarzdorligi

| **Kod** | **Talab tavsifi**                                                                                                | **Prioritet** |
|---------|------------------------------------------------------------------------------------------------------------------|---------------|
| SL-01   | Sotuv buyurtmasi: mijoz, pozitsiyalar, miqdor, narx, chegirma, QQS, yetkazib berish sanasi, status               | M             |
| SL-02   | Realizatsiya (yuk xati) hujjati; tasdiqlanganda ombordan avtomatik chiqim va tannarxni qayd etish                | M             |
| SL-03   | Narxni narx turi boʻyicha avtomatik qoʻyish; qoʻlda oʻzgartirishda huquq va chegirma chegarasi nazorati          | M             |
| SL-04   | QQS ni pozitsiya darajasida hisoblash (12% va imtiyozli/nol stavkalarni qoʻllab-quvvatlash)                      | M             |
| SL-05   | Mijozdan toʻlovni qabul qilish va uni hujjatlarga taqsimlash (FIFO avtomatik yoki qoʻlda tanlash)                | M             |
| SL-06   | Debitorlik qarzdorligi reyestri: mijoz, hujjat, summa, toʻlov muddati, kechikish kunlari                         | M             |
| SL-07   | Qarzdorlikni muddat boʻyicha guruhlash (0–30 / 31–60 / 61–90 / 90+ kun)                                          | M             |
| SL-08   | Kredit limiti nazorati: limit yoki kechikish aniqlanganda yangi yuk berishni bloklash yoki tasdiqlashga yuborish | M             |
| SL-09   | Solishtirish dalolatnomasini (akt sverka) tanlangan davr uchun avtomatik shakllantirish, PDF va Excel eksporti   | M             |
| SL-10   | Tovarni qaytarish hujjati; omborga kirim va qarzdorlikni tuzatish                                                | M             |
| SL-11   | Sotuvdan tushum va marjani hujjat darajasida koʻrsatish (sotuv summasi − tannarx)                                | M             |
| SL-12   | Menejerlar boʻyicha sotuv rejasi va uning bajarilishi                                                            | K             |
| SL-13   | Qarzdorlik boʻyicha mijozga avtomatik eslatma (SMS/Telegram/e-pochta)                                            | K             |
| SL-14   | Yetkazib berish marshruti va ekspeditor boʻyicha hisob                                                           | I             |

## 5.4. Xarid va kreditorlik qarzdorligi

| **Kod** | **Talab tavsifi**                                                                                              | **Prioritet** |
|---------|----------------------------------------------------------------------------------------------------------------|---------------|
| PU-01   | Xarid buyurtmasi: taʼminotchi, pozitsiyalar, kelishilgan narx, yetkazib berish muddati, status                 | M             |
| PU-02   | Tovar kirimi hujjati; buyurtma bilan avtomatik solishtirish (miqdor va narx ogʻishini koʻrsatish)              | M             |
| PU-03   | Qoʻshimcha xarajatlarni (transport, bojxona, yuklash) kirim tannarxiga summa yoki ogʻirlik boʻyicha taqsimlash | M             |
| PU-04   | Taʼminotchiga toʻlov va avans; avansni keyingi kirimlar bilan hisobga olish                                    | M             |
| PU-05   | Kreditorlik qarzdorligi reyestri va toʻlov muddati boʻyicha guruhlash                                          | M             |
| PU-06   | Taʼminotchidan kelgan elektron hisobvaraq-fakturani qabul qilish va kirim hujjati bilan solishtirish           | K             |
| PU-07   | Xarid ehtiyojini minimal qoldiq va ochiq buyurtmalar asosida avtomatik shakllantirish                          | K             |
| PU-08   | Taʼminotchilar boʻyicha narx tarixi va taqqoslash (bir tovar — bir necha taʼminotchi)                          | K             |
| PU-09   | Taʼminotchi ishonchliligi reytingi: yetkazib berish kechikishi, sifat daʼvolari                                | I             |

## 5.5. Ombor hisobi va tannarx

| **Kod** | **Talab tavsifi**                                                                                                                     | **Prioritet** |
|---------|---------------------------------------------------------------------------------------------------------------------------------------|---------------|
| WH-01   | Ombor qoldiqlarini real vaqtda koʻrsatish: ombor, nomenklatura, partiya, miqdor, summa kesimida                                       | M             |
| WH-02   | Omborlar oʻrtasida koʻchirish hujjati; qabul qilinmaguncha «yoʻlda» holatida hisobga olish                                            | M             |
| WH-03   | Hisobdan chiqarish (spisanie) hujjati sababni majburiy koʻrsatgan holda                                                               | M             |
| WH-04   | Inventarizatsiya: hisob qoldigʻi va fakt qoldigʻini solishtirish, kamomad va ortiqchani avtomatik shakllantirish                      | M             |
| WH-05   | Tannarxni hisoblash usuli — oʻrtacha tortilgan qiymat (weighted average), sozlamada FIFO’ga oʻtish imkoni bilan                       | M             |
| WH-06   | Partiya hisobi: partiya raqami, ishlab chiqarilgan sana, yaroqlilik muddati                                                           | M             |
| WH-07   | Yaroqlilik muddati boʻyicha nazorat: muddati tugayotgan partiyalar roʻyxati va ogohlantirish; FEFO tamoyili boʻyicha chiqim tavsiyasi | M             |
| WH-08   | Minimal va maksimal qoldiq (min/max) belgilash hamda buzilganda bildirishnoma                                                         | M             |
| WH-09   | Nomenklatura boʻyicha harakat kartochkasi (kirim, chiqim, qoldiq) va hujjatgacha drill-down                                           | M             |
| WH-10   | Shtrix-kod skaneri bilan ishlash (kirim, chiqim, inventarizatsiya)                                                                    | K             |
| WH-11   | Zaxiraga olish (rezerv): sotuv buyurtmasi ostidagi tovarni bandlash                                                                   | K             |
| WH-12   | Saqlash joyi (zona/tokcha) darajasida adresli hisob                                                                                   | I             |

## 5.6. Ishlab chiqarish va kalkulyatsiya

| **Kod** | **Talab tavsifi**                                                                                                                               | **Prioritet** |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| PR-01   | Mahsulot spetsifikatsiyasi (BOM/retsept): tayyor mahsulot → xomashyo va materiallar normalari, chiqim koeffitsienti, texnologik yoʻqotish foizi | M             |
| PR-02   | Spetsifikatsiya versiyalari va amal qilish sanasi (retsept oʻzgarganda tarix saqlanadi)                                                         | M             |
| PR-03   | Ishlab chiqarish buyurtmasi: mahsulot, rejalashtirilgan miqdor, muddat, ombor, javobgar                                                         | M             |
| PR-04   | Smena (ishlab chiqarish) hisoboti: haqiqiy chiqarilgan miqdor va haqiqiy sarflangan xomashyo                                                    | M             |
| PR-05   | Norma va fakt sarfini solishtirish, ogʻishni miqdor va summada koʻrsatish                                                                       | M             |
| PR-06   | Ishlab chiqarish tannarxini hisoblash: xomashyo + bevosita ish haqi + energiya + amortizatsiya + taqsimlanadigan ustama xarajatlar              | M             |
| PR-07   | Yaroqsiz mahsulot (brak) va qaytariladigan chiqindilar hisobi                                                                                   | M             |
| PR-08   | Bir buyurtmadan bir nechta mahsulot chiqqanda tannarxni taqsimlash (qoʻshma mahsulotlar)                                                        | K             |
| PR-09   | Reja-fakt tahlili: rejalashtirilgan va haqiqiy tannarx, chiqim, muddat                                                                          | K             |
| PR-10   | Ishlab chiqarish quvvati va yuklamasini rejalashtirish                                                                                          | I             |

## 5.7. Xarajatlar va byudjetlashtirish

| **Kod** | **Talab tavsifi**                                                                          | **Prioritet** |
|---------|--------------------------------------------------------------------------------------------|---------------|
| BG-01   | Xarajatlarni modda, MJM, filial va davr kesimida hisobga olish                             | M             |
| BG-02   | Yillik va choraklik byudjetni moddalar boʻyicha kiritish; oʻtgan davr faktidan nusxa olish | M             |
| BG-03   | Reja–fakt–ogʻish hisoboti (summa va foizda), ogʻishni izohlash maydoni                     | M             |
| BG-04   | Byudjetdan oshib ketishda ogohlantirish yoki toʻlovni bloklash (modda boʻyicha sozlanadi)  | M             |
| BG-05   | Xarajat soʻrovi va tasdiqlash marshruti, byudjet qoldigʻini soʻrov ichida koʻrsatish       | K             |
| BG-06   | Byudjetning bir necha versiyasi (asosiy, optimistik, pessimistik)                          | I             |

## 5.8. Ish haqi (soddalashtirilgan hisob)

| **Kod** | **Talab tavsifi**                                                                               | **Prioritet** |
|---------|-------------------------------------------------------------------------------------------------|---------------|
| HR-01   | Xodimlar boʻyicha ish haqi turi: oklad, ishbay (chiqarilgan mahsulot boʻyicha), foiz (sotuvdan) | M             |
| HR-02   | Ish haqini hisoblash: hisoblangan summa, bonus, avans, ushlanmalar, qoʻlga tegadigan summa      | M             |
| HR-03   | Toʻlov vedomosti va uning kassa/bank chiqim hujjatlari bilan bogʻlanishi                        | M             |
| HR-04   | Ishlab chiqarish xodimlarining ish haqini mahsulot tannarxiga taqsimlash                        | K             |
| HR-05   | Xodim boʻyicha hisob-kitob tarixi va shaxsiy hisob varaqasi                                     | K             |
| HR-06   | Soliq va ijtimoiy toʻlovlarni sozlanadigan stavkalar boʻyicha hisoblash                         | K             |

## 5.9. Hisobotlar va boshqaruv paneli

| **Kod** | **Talab tavsifi**                                                                                                                           | **Prioritet** |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| RP-01   | Boshqaruv dashboardi: pul qoldigʻi, kunlik/oylik tushum, xarajat, marja, debitorlik va kreditorlik, ombor qiymati, top-10 mijoz va mahsulot | M             |
| RP-02   | Pul mablagʻlari harakati (DDS/Cash Flow) hisoboti — bevosita usulda, moddalar va hisoblar kesimida                                          | M             |
| RP-03   | Foyda va zararlar (P&L) hisoboti: davr, filial, mahsulot guruhi, mijoz segmenti kesimida                                                    | M             |
| RP-04   | Balans (aktivlar = majburiyatlar + kapital tengligi bilan)                                                                                  | M             |
| RP-04a  | Bosh kitob (General Ledger): sana, jurnal raqami, hisob, debet, kredit, izoh, asos, filial, foydalanuvchi                                   | M             |
| RP-04b  | Aylanma-qoldiq vedomosti (Trial Balance): boshlangʻich qoldiq, debet aylanma, kredit aylanma, yakuniy qoldiq                                | M             |
| RP-05   | Marjinallik tahlili: mahsulot, mijoz, menejer va filial boʻyicha                                                                            | M             |
| RP-06   | Debitorlik va kreditorlik qarzdorligi hisoboti muddat boʻyicha guruhlangan holda                                                            | M             |
| RP-07   | Ombor hisobotlari: qoldiqlar, aylanma tezligi, harakatsiz tovarlar, yaroqlilik muddati                                                      | M             |
| RP-08   | Tannarx tarkibi hisoboti: har bir mahsulot boʻyicha elementlar kesimida                                                                     | M             |
| RP-09   | ABC/XYZ tahlil (mahsulot va mijozlar boʻyicha)                                                                                              | K             |
| RP-10   | Reja–fakt hisoboti (byudjet, sotuv, ishlab chiqarish)                                                                                       | K             |
| RP-11   | Barcha hisobotlarda: ixtiyoriy davr, koʻp shartli filtr, guruhlash, ustunlarni sozlash va tartiblash                                        | M             |
| RP-12   | Drill-down: hisobot yigʻma raqamidan boshlangʻich hujjatgacha oʻtish                                                                        | M             |
| RP-13   | Excel (formatlangan XLSX) va PDF eksporti; bosma shakl kolontitullari bilan                                                                 | M             |
| RP-14   | Foydalanuvchi tomonidan saqlangan hisobot koʻrinishlari (filtr va ustunlar toʻplami)                                                        | K             |
| RP-15   | Rejalashtirilgan hisobotlarni belgilangan vaqtda e-pochta yoki Telegram orqali avtomatik yuborish                                           | K             |
| RP-16   | Davrlarni taqqoslash (joriy davr va oʻtgan yilning shu davri) hamda dinamika grafigi                                                        | K             |

## 5.10. Bildirishnomalar tizimi

| **Kod** | **Talab tavsifi**                                                                                    | **Prioritet** |
|---------|------------------------------------------------------------------------------------------------------|---------------|
| NT-01   | Toʻlov muddati yaqinlashgani (3 kun oldin) va muddati oʻtgani haqida bildirishnoma                   | M             |
| NT-02   | Kassa yoki bank qoldigʻi belgilangan chegaradan pastga tushganda ogohlantirish                       | M             |
| NT-03   | Tasdiqlash kutayotgan hujjatlar haqida masʼul shaxsga bildirishnoma                                  | M             |
| NT-04   | Ombor qoldigʻi minimal darajadan pastga tushganda bildirishnoma                                      | M             |
| NT-05   | Yaroqlilik muddati tugashiga sozlangan kun qolganda ogohlantirish                                    | M             |
| NT-06   | Kanallar: tizim ichidagi bildirishnoma markazi, e-pochta, Telegram bot; SMS — kritik hodisalar uchun | M             |
| NT-07   | Har bir foydalanuvchi oʻz bildirishnoma turlarini va kanallarini sozlashi                            | K             |

## 5.11. Administratsiya, xavfsizlik va audit

| **Kod** | **Talab tavsifi**                                                                                       | **Prioritet** |
|---------|---------------------------------------------------------------------------------------------------------|---------------|
| AD-01   | Foydalanuvchilarni yaratish, bloklash, parolni tiklash; rollar va huquqlarni sozlash (RBAC)             | M             |
| AD-02   | Huquqlarni filial, ombor va MJM darajasida cheklash                                                     | M             |
| AD-03   | Audit log: kim, qachon, qaysi obyektni oʻzgartirdi; oʻzgarishdan oldingi va keyingi qiymatlar saqlanadi | M             |
| AD-04   | Yopilgan davrni bloklash: yopilgan sanaga qadar hujjat kiritish va tahrirlash faqat maxsus huquq bilan  | M             |
| AD-05   | Hujjatlarni jismonan oʻchirish taqiqlanadi; bekor qilish yoki storno yozuvi orqali tuzatiladi           | M             |
| AD-06   | Ikki bosqichli autentifikatsiya (2FA) — kamida moliyaviy rollar uchun                                   | M             |
| AD-07   | Sessiyani avtomatik yakunlash (faoliyatsiz 30 daqiqadan soʻng) va faol sessiyalarni koʻrish             | M             |
| AD-08   | Maʼlumotlar bazasining avtomatik zaxira nusxasi va tiklash tartibi                                      | M             |
| AD-09   | Tizim sozlamalari: valyuta, soliq stavkalari, hujjat raqamlash shablonlari, ish kunlari kalendari       | M             |
| AD-10   | IP-manzil boʻyicha kirishni cheklash                                                                    | I             |

## 5.12. Kreditlar, qarzlar va lizing

| **Kod** | **Talab tavsifi**                                                                                                 | **Prioritet** |
|---------|-------------------------------------------------------------------------------------------------------------------|---------------|
| LN-01   | Kredit shartnomasi kartochkasi: bank/qarz beruvchi, asosiy qarz summasi, valyuta, foiz stavkasi, muddat, taʼminot | M             |
| LN-02   | Toʻlov jadvali (annuitet yoki differensial) — avtomatik shakllantiriladi va shartnomaga biriktiriladi             | M             |
| LN-03   | Har bir toʻlovni asosiy qarz va foizga ajratib hisobga olish; qoldiq asosiy qarzni kuzatish                       | M             |
| LN-04   | Navbatdagi toʻlov sanasi boʻyicha ogohlantirish va toʻlov kalendariga avtomatik tushishi                          | M             |
| LN-05   | Valyutali kreditlar boʻyicha kurs farqini davr oxirida qayta baholash                                             | M             |
| LN-06   | Kredit yuki koʻrsatkichlari: umumiy qarz, oylik toʻlov, foiz xarajati                                             | K             |
| LN-07   | Lizing shartnomalari va berilgan qarzlar (tizim ikki tomonlama qoʻllab-quvvatlaydi)                               | K             |

## 5.13. AI moliyaviy tahlilchi (ikkinchi bosqich)

> *Ushbu modul asosiy doiraga va 12-boʻlimdagi muddatlarga KIRMAYDI. U alohida byudjet va alohida kelishuv asosida, tizim sanoat ekspluatatsiyasiga oʻtgandan soʻng ishlab chiqiladi. Bu yerda uning talablari oldindan qayd etilgan, chunki arxitektura uni keyinchalik qoʻshish imkonini beradigan tarzda loyihalanishi kerak.*

| **Kod** | **Talab tavsifi**                                                                                                                                                   | **Prioritet** |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| AI-01   | AI faqat tahlil qatlami: buxgalteriya yozuvlarini yaratmaydi, hujjat tasdiqlamaydi, qoldiqni oʻzgartirmaydi                                                         | I             |
| AI-02   | AI maʼlumotlar bazasiga bevosita kira olmaydi — faqat cheklangan va audit qilinadigan funksiyalar toʻplami orqali (masalan: davr xulosasi, P&L, qarzdorlik tahlili) | I             |
| AI-03   | Har bir AI funksiyasi soʻrovchi foydalanuvchining huquqlari doirasida ishlaydi — AI foydalanuvchi koʻra olmaydigan maʼlumotni koʻrsata olmaydi                      | I             |
| AI-04   | Shaxsga doir maʼlumotlar (xodim va kontragent ismlari, aloqa maʼlumotlari, bank rekvizitlari, STIR) tashqi AI provayderiga yuborilmaydi                             | I             |
| AI-05   | Har bir AI xulosasi toifalarga ajratiladi: DALIL (raqam va uning manbasi) / HISOB-KITOB / TAXMIN / TAVSIYA. Taxminni dalil sifatida koʻrsatish taqiqlanadi          | I             |
| AI-06   | Ishonch darajasi soʻz bilan beriladi (past/oʻrta/yuqori) va dalil bilan asoslanadi; «100% kafolatlangan» kabi iboralar taqiqlanadi                                  | I             |
| AI-07   | Anomaliyalarni aniqlash: takroriy hujjat, gʻayrioddiy xarajat, marja keskin oʻzgarishi, boʻlingan toʻlovlar, taʼminotchi narxidagi sakrash                          | I             |
| AI-08   | Har bir ogohlantirish tarkibi: muammo, dalil, taʼsiri, ishonch darajasi, mumkin boʻlgan sabab, tavsiya etilgan harakat                                              | I             |
| AI-09   | Risk markazi: darajalar (kritik/yuqori/oʻrta/past) va turlar (kassa uzilishi, qarz yuki, marja pasayishi, debitorlik, byudjet, ombor)                               | I             |
| AI-10   | Prognoz (7/30/60/90 kun) — faraz va noaniqlik chegarasi bilan birga; maʼlumot yetishmasa, buni ochiq aytish, raqam oʻylab topmaslik                                 | I             |
| AI-11   | AI ishlamay qolsa, moliyaviy tizim toʻliq ishlashda davom etadi; holat panelida AI alohida koʻrsatiladi                                                             | I             |
| AI-12   | AI taklif qilgan har qanday harakat (masalan, bank operatsiyasini moslashtirish) faqat vakolatli xodim tasdigʻidan keyin kuchga kiradi va audit logga yoziladi      | I             |


---

# 6. Buxgalteriya dvigateli va hisob yaxlitligi

Ushbu boʻlim tizimning yadrosini belgilaydi. Har qanday moliyaviy modul (kassa, sotuv, ombor, ishlab chiqarish) oʻz natijasini shu dvigatel orqali qayd etadi. Dvigatel birinchi navbatda ishlab chiqiladi va uning invariantlari testdan oʻtmaguncha keyingi modullarga oʻtilmaydi.

## 6.1. Ikki qatlam: operatsion va buxgalteriya

Tizim operatsion hujjat (hisob-faktura, kirim orderi, smena hisoboti) va buxgalteriya yozuvi (jurnal yozuvi → jurnal satrlari → bosh kitob) ni qatʼiy ajratadi. Operatsion hujjat buxgalteriya oqibatini faqat nazorat qilinadigan xizmat (posting service) orqali hosil qiladi.

> *Interfeys kodi, sahifa yoki boshqa modul jurnal satrini bevosita yarata olmaydi. Buxgalteriya moduli — yagona yozuv nuqtasi. Bu qoida buzilsa, hisobning yaxlitligini keyinchalik tiklab boʻlmaydi.*

| **Kod** | **Talab tavsifi**                                                                                                                                         | **Prioritet** |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| AC-01   | Hisoblar rejasi — daraxtsimon, sozlanadigan; hisob kodlari biznes-mantiqda qattiq kodlanmaydi, nomlangan moslik jadvali (account map) orqali ishlatiladi  | M             |
| AC-02   | Jurnal yozuvi va jurnal satrlari; har bir satr: hisob, debet, kredit, filial, MJM, valyuta, izoh, asos hujjat                                             | M             |
| AC-03   | Bosh kitob (General Ledger) va aylanma-qoldiq vedomosti (Trial Balance) faqat jurnal yozuvlaridan hosil qilinadi — parallel, mustaqil qoldiq yuritilmaydi | M             |
| AC-04   | Har bir hujjat turi uchun bitta aniq belgilangan yozuv qoidasi (posting rule); qoidasiz hujjat turi tizimga kiritilmaydi                                  | M             |
| AC-05   | Asosiy vositalar va amortizatsiya hisobi — P&L da EBITDA hisoblanishi uchun majburiy                                                                      | M             |
| AC-06   | Storno (teskari yozuv) mexanizmi: asl yozuv oʻzgartirilmaydi, tarixda qoladi                                                                              | M             |
| AC-07   | Moliyaviy davrlarni yopish va yil yakunida natijani taqsimlanmagan foydaga koʻchirish                                                                     | M             |
| AC-08   | Valyutali qoldiqlarni davr oxirida qayta baholash; realizatsiya qilingan va qilinmagan kurs farqi alohida hisoblarda                                      | M             |

## 6.2. Majburiy invariantlar

Quyidagi tengliklar har qanday vaqtda bajarilishi shart. Ular dastur darajasida, maʼlumotlar bazasi cheklovlari darajasida va avtomatik testlarda tekshiriladi.

| **№** | **Invariant**                                               | **Qamrovi**                 |
|-------|-------------------------------------------------------------|-----------------------------|
| I-1   | Debet yigʻindisi = Kredit yigʻindisi                        | Har bir jurnal yozuvi       |
| I-2   | Aktivlar = Majburiyatlar + Kapital                          | Balans, istalgan sanaga     |
| I-3   | Boshlangʻich qoldiq + kirim − chiqim = yakuniy qoldiq       | Har bir hisob, har bir davr |
| I-4   | Hujjat summasi = satrlar summasi                            | Har bir hujjat              |
| I-5   | Hujjat summasi = toʻlangan + qaytarilgan + qoldiq qarz      | Debitorlik va kreditorlik   |
| I-6   | Ombor miqdori: boshl. + kirim − chiqim ± tuzatish = yakuniy | Har bir nomenklatura/ombor  |
| I-7   | Ombor SUMMASI: boshl. + kirim − chiqim ± tuzatish = yakuniy | Har bir nomenklatura/ombor  |
| I-8   | Ombor summasi = tegishli buxgalteriya hisobi qoldigʻi       | Sverka, oy yakunida         |

> *I-7 va I-8 alohida taʼkidlanadi: koʻpchilik tizimlarda ombor miqdori toʻgʻri, lekin summasi asta-sekin ogʻib ketadi va buni oy yakunida sezish qiyin. Miqdor va summa invariantlari birga tekshirilishi shart.*

Nolga boʻlish barcha joyda xavfsiz ishlanadi: byudjet nolga teng boʻlganda ogʻish foizi «hisoblab boʻlmaydi» qiymatini qaytaradi, cheksizlik yoki nol emas.

## 6.3. Hujjat holatlari va oʻzgarmaslik

| **Holat**       | **Maʼnosi**                          | **Qoldiqqa taʼsiri**          | **Tahrirlash**      |
|-----------------|--------------------------------------|-------------------------------|---------------------|
| QORALAMA        | Kiritilmoqda                         | Yoʻq                          | Ha                  |
| TASDIQLASHDA    | Marshrutda koʻrib chiqilmoqda        | Yoʻq (rezerv boʻlishi mumkin) | Yoʻq                |
| TASDIQLANGAN    | Tasdiqlangan, hali qayd etilmagan    | Yoʻq                          | Yoʻq                |
| QAYD ETILGAN    | Buxgalteriyaga oʻtkazilgan (posted)  | Ha                            | YOʻQ — faqat storno |
| STORNO QILINGAN | Teskari yozuv bilan bekor qilingan   | Yoʻq (teskari yozuv bilan)    | Yoʻq                |
| BEKOR QILINGAN  | Qayd etilishdan oldin bekor qilingan | Yoʻq                          | Yoʻq                |

Xato qayd etilgan hujjatni tuzatish yoʻli faqat bitta: QAYD ETILGAN → STORNO → yangi toʻgʻri hujjat. Asl hujjat va uning tarixi hech qachon oʻchirilmaydi va oʻzgartirilmaydi.

Hisob-fakturaning koʻrinadigan holatlari (berilgan, qisman toʻlangan, toʻlangan, muddati oʻtgan) alohida holatlar mashinasi emas — ular qayd etilish holati va toʻlov taqsimotidan HISOBLAB CHIQARILADI. Ikkita mustaqil holat maydonini yuritish taqiqlanadi.

## 6.4. Moliyaviy davrlar

Davr holatlari: OCHIQ → YOPILMOQDA → YOPILGAN. Yopilgan davrga hujjat qayd etishga urinish tushunarli xatolik bilan rad etiladi. Davrni qayta ochish alohida huquq talab qiladi va audit logga yoziladi. Yil yakunida natija hisoblari taqsimlanmagan foydaga koʻchiriladi.

## 6.5. Atomiklik, takrorlanishdan himoya va konkurentlik

| **Kod** | **Talab tavsifi**                                                                                                                                                                                   | **Prioritet** |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| AC-09   | Har bir moliyaviy operatsiya bitta maʼlumotlar bazasi tranzaksiyasida bajariladi: hujjat + jurnal yozuvi + satrlar + qoldiqlar + audit yozuvi. Biror qadam bajarilmasa — hammasi orqaga qaytariladi | M             |
| AC-10   | «Toʻlov mavjud, lekin hisob-faktura qoldigʻi oʻzgarmagan» holati tizimda yuzaga kela olmaydi                                                                                                        | M             |
| AC-11   | Idempotentlik: har bir moliyaviy soʻrov takrorlanishdan himoyalanadi (idempotency key). «Toʻlash» tugmasi ikki marta bosilsa, bitta toʻlov yaratiladi                                               | M             |
| AC-12   | Bir vaqtda bajarilayotgan operatsiyalar himoyasi: qoldiq satrlarini bloklash, hujjatlarda versiya nazorati; eskirgan maʼlumot bilan saqlashga urinish rad etiladi                                   | M             |
| AC-13   | Hujjat raqami maʼlumotlar bazasi ketma-ketligidan olinadi; dastur darajasida «eng katta raqam + 1» usuli taqiqlanadi                                                                                | M             |
| AC-14   | Takroriy hujjatni aniqlash: taʼminotchi + hujjat raqami + sanasi + summa boʻyicha unikal cheklov; qayd etishdan oldin ogohlantirish                                                                 | M             |

## 6.6. QQS ni hisoblash tartibi

Har bir hujjatda narx QQS ichida yoki QQS dan tashqari ekani ochiq belgilanadi va saqlanadi — bu qiymat taxmin qilinmaydi.

| **Holat**        | **Hisoblash**                                   | **Namuna (100 000 000 soʻm, 12%)**                  |
|------------------|-------------------------------------------------|-----------------------------------------------------|
| QQS dan tashqari | sof = kiritilgan; QQS = sof × 0,12              | sof 100 000 000 + QQS 12 000 000 = 112 000 000      |
| QQS ichida       | sof = kiritilgan ÷ 1,12; QQS = kiritilgan − sof | sof 89 285 714,29 + QQS 10 714 285,71 = 100 000 000 |

> *Yaxlitlash har bir satr boʻyicha bir marta bajariladi, soʻngra satrlar qoʻshiladi. Hujjat jamisini alohida yaxlitlash taqiqlanadi — aks holda satrlar yigʻindisi jami bilan mos kelmay qoladi.*


---

# 7. Maʼlumotlar modeli

## 7.1. Asosiy obyektlar

| **Obyekt**             | **Asosiy maydonlar**                                                                  | **Bogʻlanishlar**                |
|------------------------|---------------------------------------------------------------------------------------|----------------------------------|
| organization           | id, nomi, STIR, turi (yuridik shaxs/filial), ota-obyekt                               | branch, document                 |
| counterparty           | id, nomi, turi, STIR, MFO, hisob raqami, kredit limiti, toʻlov muddati                | contract, document               |
| item                   | id, SKU, nomi, turi, oʻlchov birligi, IKPU, QQS stavkasi, kategoriya                  | stock, doc_line, bom             |
| warehouse              | id, nomi, filial, masʼul shaxs                                                        | stock, doc_line                  |
| account                | id, nomi, turi (kassa/bank), valyuta, boshlangʻich qoldiq                             | cash_entry                       |
| cashflow_item          | id, nomi, faoliyat turi, ota-modda                                                    | cash_entry                       |
| document               | id, turi, raqami, sanasi, kontragent, filial, status, jami summa, QQS, muallif        | doc_line, cash_entry, stock_move |
| doc_line               | id, hujjat, nomenklatura, miqdor, narx, chegirma, QQS, summa, tannarx                 | item, document                   |
| cash_entry             | id, sana, hisob, kontragent, DDS moddasi, summa, valyuta, kurs, hujjat                | account, document                |
| chart_of_accounts      | id, kodi, nomi, turi (aktiv/passiv/kapital/daromad/xarajat), ota-hisob, valyuta       | journal_line                     |
| journal_entry          | id, raqami, sanasi, davri, asos hujjat, holati, muallif, tasdiqlovchi                 | journal_line, document           |
| journal_line           | id, jurnal yozuvi, hisob, debet, kredit, filial, MJM, valyuta, kurs, izoh             | chart_of_accounts                |
| financial_period       | id, yil, oy/chorak, holati (ochiq/yopilmoqda/yopilgan), yopgan shaxs, sana            | journal_entry                    |
| loan                   | id, qarz beruvchi, asosiy summa, valyuta, foiz stavkasi, muddat, qoldiq, holati       | loan_schedule                    |
| loan_schedule          | id, kredit, toʻlov sanasi, asosiy qarz qismi, foiz qismi, holati                      | loan, document                   |
| fixed_asset            | id, nomi, kirim sanasi, boshlangʻich qiymati, foydali muddati, amortizatsiya usuli    | journal_entry                    |
| idempotency_key        | kalit, foydalanuvchi, endpoint, soʻrov xeshi, natija id, amal qilish muddati          | document                         |
| stock_move             | id, sana, ombor, nomenklatura, partiya, miqdor (+/−), tannarx, hujjat                 | item, warehouse, batch           |
| batch                  | id, nomenklatura, partiya raqami, ishlab chiqarilgan sana, yaroqlilik muddati         | stock_move                       |
| bom                    | id, mahsulot, versiya, amal qilish sanasi, chiqim koeffitsienti                       | bom_line                         |
| bom_line               | id, BOM, xomashyo, norma miqdori, yoʻqotish %                                         | item                             |
| budget                 | id, davr, MJM, modda, rejalashtirilgan summa                                          | cost_item                        |
| user, role, permission | id, F.I.Sh., login, parol xesh, rol, filial cheklovlari                               | audit_log                        |
| audit_log              | id, foydalanuvchi, sana-vaqt, obyekt turi, obyekt id, amal, eski qiymat, yangi qiymat | user                             |

## 7.2. Hisob tamoyillari

- Har bir moliyaviy operatsiya boshlangʻich hujjatdan kelib chiqadi; qoldiqlar hech qachon qoʻlda tahrirlanmaydi, faqat hujjatlar orqali oʻzgaradi.

- Yagona haqiqat manbai — jurnal yozuvlari. Bosh kitob, aylanma-qoldiq vedomosti va barcha hisobotlar faqat shulardan hosil qilinadi; parallel, mustaqil qoldiq jadvallari yuritilmaydi.

- Tezlik uchun yigʻma registrlar ishlatilishi mumkin, lekin ular hosila hisoblanadi va hujjat oʻzgarganda qayta hisoblanadi hamda jurnalga sverka qilinadi.

- Barcha pul maydonlari NUMERIC(18,2) tipida; miqdorlar NUMERIC(18,4). Dastur kodida ham suzuvchi nuqtali tip ishlatilmaydi — maxsus decimal kutubxonasi qoʻllanadi.

- Valyutali operatsiyalarda summa ham valyutada, ham hisob valyutasida (UZS) saqlanadi; kurs hujjat sanasiga qayd etiladi va keyinchalik qayta hisoblanmaydi.

- Turli valyutadagi summalar hech qachon bevosita qoʻshilmaydi.

- Har bir yozuv uchun yaratilgan/oʻzgartirilgan sana-vaqt va foydalanuvchi saqlanadi (soft delete qoʻllanadi).

- Audit yozuvlari faqat qoʻshiladi: dastur ularni oʻchira yoki oʻzgartira olmaydi (maʼlumotlar bazasi darajasidagi huquq bilan taʼminlanadi).


---

# 8. Integratsiyalar

| **Kod** | **Integratsiya**                                    | **Tavsifi**                                                                                                                                            | **Prioritet** |
|---------|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| IN-01   | Elektron hisobvaraq-faktura (Didox.uz / Faktura.uz) | Sotuv hujjatidan EHF shakllantirish, elektron raqamli imzo bilan yuborish, kontragent javobini (qabul/rad) qayd etish, kiruvchi EHF larni yuklab olish | M             |
| IN-02   | Markaziy bank valyuta kurslari                      | Rasmiy kurslarni kunlik avtomatik yuklab olish va tarixni saqlash                                                                                      | M             |
| IN-03   | Bank koʻchirmasi importi                            | 1C-format (.txt), Excel, CSV fayllarini yuklash; bank API mavjud boʻlsa — bevosita ulanish                                                             | M             |
| IN-04   | Telegram bot                                        | Bildirishnomalar, kunlik qisqa moliyaviy xulosa, toʻlov soʻrovini tasdiqlash                                                                           | M             |
| IN-05   | SMS-shlyuz                                          | Kritik ogohlantirishlar va mijozlarga qarzdorlik eslatmalari                                                                                           | K             |
| IN-06   | E-pochta (SMTP)                                     | Hisobotlar, akt sverka, hujjatlarni yuborish                                                                                                           | M             |
| IN-07   | Toʻlov tizimlari (Payme, Click, Uzum)               | Chakana tushumni avtomatik qayd etish (agar qoʻllanilsa)                                                                                               | K             |
| IN-08   | Excel import/eksport                                | Barcha maʼlumotnoma va hisobotlar uchun ikki tomonlama almashinuv, shablon va xatolar hisoboti bilan                                                   | M             |
| IN-09   | Ochiq REST API                                      | Tashqi tizimlar uchun hujjatlangan API (OpenAPI/Swagger), token orqali autentifikatsiya                                                                | K             |
| IN-10   | 1C bilan almashinuv                                 | Buxgalteriya uchun hujjatlarni yuklash (CommerceML yoki CSV)                                                                                           | I             |

> *Har bir integratsiya uchun xatoliklarni qayta ishlash majburiy: soʻrov muvaffaqiyatsiz boʻlsa, u navbatga qoʻyiladi va takroran yuboriladi (eksponensial kutish bilan), foydalanuvchiga esa aniq holat koʻrsatiladi. Tashqi xizmat ishlamayotgani tizimning asosiy funksiyalarini toʻxtatmasligi kerak.*


---

# 9. Nofunksional talablar

## 9.1. Unumdorlik

| **Koʻrsatkich**                       | **Talab**                                                |
|---------------------------------------|----------------------------------------------------------|
| Bir vaqtda ishlovchi foydalanuvchilar | Kamida 100 ta, 300 tagacha kengaytirilishi bilan         |
| Sahifaning yuklanish vaqti            | ≤ 2 soniya (95-persentil)                                |
| Roʻyxat va jadvallarni ochish         | ≤ 1,5 soniya (10 000 yozuvgacha, sahifalash bilan)       |
| API javob vaqti                       | ≤ 500 ms (95-persentil, hisobotlardan tashqari)          |
| Standart hisobotni shakllantirish     | ≤ 5 soniya (1 yillik maʼlumot uchun)                     |
| Ogʻir hisobot                         | Fon rejimida, tayyor boʻlganda bildirishnoma bilan       |
| Yillik hujjatlar hajmi                | 1 000 000 tagacha hujjat satrini muammosiz qayta ishlash |
| Excel eksport                         | 50 000 satrgacha, ≤ 30 soniya                            |

## 9.2. Xavfsizlik

- Barcha trafik HTTPS (TLS 1.2+) orqali uzatiladi; HTTP soʻrovlari HTTPS ga yoʻnaltiriladi.

- Parollar Argon2id yoki bcrypt algoritmi bilan xeshlanadi; parol murakkabligi talablari sozlanadi.

- Autentifikatsiya JWT (qisqa muddatli access + refresh token) asosida; token oʻgʻirlanishiga qarshi himoya choralari qoʻllanadi.

- OWASP Top 10 boʻyicha himoya: SQL-inyeksiya (parametrlangan soʻrovlar), XSS, CSRF, IDOR, xavfsiz fayl yuklash.

- Har bir API soʻrovida huquqlar server tomonida tekshiriladi; frontend’dagi cheklovlar yagona himoya vositasi sifatida qaralmaydi.

- Soʻrovlar chastotasini cheklash (rate limiting) va brute-force hujumlaridan himoya.

- Maxfiy maʼlumotlar (parollar, tokenlar, kalitlar) kodda emas, muhit oʻzgaruvchilarida yoki maxfiylik saqlagichida saqlanadi. Elektron raqamli imzo kalitlari serverda nazorat qilinadigan xizmat orqali ishlatiladi va hech qachon brauzerga uzatilmaydi.

- Loglarda parol, token va toʻliq bank rekvizitlari yozilmaydi.

- Maʼlumotlar bazasi zaxira nusxalari shifrlanadi.

- Fayl yuklashda MIME turi mazmun boʻyicha tekshiriladi, hajmi cheklanadi, fayl yaratilgan nom bilan veb-ildizdan tashqarida saqlanadi va faqat huquq tekshiruvidan oʻtgan manzil orqali beriladi.

## 9.3. Ishonchlilik va uzluksizlik

| **Koʻrsatkich**                | **Talab**                                                      |
|--------------------------------|----------------------------------------------------------------|
| Mavjudlik (uptime)             | ≥ 99,5% oyiga (rejalashtirilgan texnik ishlardan tashqari)     |
| Zaxira nusxa                   | Kuniga kamida 1 marta toʻliq, tranzaksiya loglari uzluksiz     |
| Zaxira nusxalarni saqlash      | Kunlik — 30 kun, haftalik — 12 hafta, oylik — 12 oy            |
| RPO (yoʻqotiladigan maʼlumot)  | ≤ 1 soat                                                       |
| RTO (tiklanish vaqti)          | ≤ 4 soat                                                       |
| Tiklashni tekshirish           | Choraklik test tiklash, natijasi hujjatlashtiriladi            |
| Rejalashtirilgan texnik ishlar | Ish vaqtidan tashqari, kamida 3 kun oldin xabar berilgan holda |

## 9.4. Foydalanish qulayligi va moslik

- Interfeys tili — oʻzbek tili (lotin yozuvi) asosiy; rus va ingliz tillari qoʻshimcha (interfeys matnlari alohida fayllarda, tarjima qoʻshish kod oʻzgartirishsiz).

- Sana formati — KK.OO.YYYY; vaqt — 24 soatlik; ming ajratgichi — probel; kasr ajratgichi — vergul (masalan: 1 250 400,50).

- Asosiy valyuta — soʻm (UZS); koʻp valyutali operatsiyalar qoʻllab-quvvatlanadi.

- Qoʻllab-quvvatlanadigan brauzerlar: Chrome, Edge, Firefox, Safari — oxirgi ikki barqaror versiya.

- Asosiy ish ekrani 1366×768 va undan yuqori; interfeys planshet va telefonda koʻrish uchun moslashuvchan (hisobotlar va dashboard mobil koʻrinishda ham oʻqiladi).

- Klaviatura bilan tez ishlash: asosiy amallar uchun tugmalar birikmasi, formada Tab bilan izchil oʻtish, jadvalga tez kiritish rejimi.

- Barcha xato xabarlari oʻzbek tilida, muammoni va uni bartaraf etish yoʻlini aniq koʻrsatadi.

## 9.5. Kuzatuv va texnik xizmat

- Tuzilmalashtirilgan loglar (JSON) va soʻrov identifikatori orqali kuzatuv.

- Xatolarni markazlashtirilgan yigʻish (Sentry) va masʼul shaxsga ogohlantirish.

- Tizim holati (health-check) endpointi va asosiy metrikalar paneli.

- Maʼlumotlar bazasi migratsiyalari versiyalanadi va orqaga qaytarish imkoni bilan bajariladi.


---

# 10. Interfeys va dizayn talablari

## 10.1. Umumiy tamoyillar

- Ish stoli (dashboard) — kirgandan soʻng birinchi ekran; eng muhim koʻrsatkichlar bir ekranga sigʻadi.

- Barcha roʻyxatlar bir xil mantiq boʻyicha ishlaydi: qidiruv, filtr, tartiblash, ustunlarni sozlash, eksport.

- Hujjat formasi ikki qismli: sarlavha rekvizitlari va tabel qismi; saqlash tugmasi doimo koʻrinadi.

- Ranglar mantiqiy qoʻllanadi: yashil — kirim va ijobiy ogʻish, qizil — chiqim, muddati oʻtgan qarz va salbiy ogʻish, kulrang — qoralama.

- Har qanday summa yonida uning valyutasi koʻrsatiladi; hisob valyutasidagi ekvivalent kerak boʻlganda koʻrsatiladi.

- Xavfli amallar (bekor qilish, davrni yopish) tasdiqlash oynasi bilan himoyalanadi.

- Yorugʻ mavzu asosiy; qorongʻi mavzu — qoʻshimcha imkoniyat.

## 10.2. Asosiy ekranlar roʻyxati

| **№** | **Ekran**        | **Mazmuni**                                                        |
|-------|------------------|--------------------------------------------------------------------|
| 1     | Kirish           | Login, parol, 2FA, parolni tiklash                                 |
| 2     | Dashboard        | KPI kartochkalari, pul oqimi grafigi, qarzdorlik, ogohlantirishlar |
| 3     | Toʻlov kalendari | Kunlar boʻyicha rejalashtirilgan kirim/chiqim va prognoz qoldiq    |
| 4     | Kassa va bank    | Hisoblar roʻyxati, qoldiqlar, operatsiyalar jurnali                |
| 5     | Hujjat formasi   | Kirim/chiqim/oʻtkazma/sotuv/xarid uchun yagona uslubdagi forma     |
| 6     | Kontragentlar    | Roʻyxat, kartochka, qarzdorlik, hujjatlar tarixi, akt sverka       |
| 7     | Sotuv            | Buyurtmalar, realizatsiya, qaytarishlar, debitorlik                |
| 8     | Xarid            | Buyurtmalar, kirimlar, kreditorlik                                 |
| 9     | Ombor            | Qoldiqlar, harakat, koʻchirish, inventarizatsiya, partiyalar       |
| 10    | Ishlab chiqarish | Spetsifikatsiyalar, buyurtmalar, smena hisoboti, kalkulyatsiya     |
| 11    | Byudjet          | Byudjet kiritish, reja-fakt                                        |
| 12    | Hisobotlar       | Hisobotlar katalogi, parametrlar, natija, eksport                  |
| 13    | Tasdiqlash       | Menga tasdiqlashga kelgan hujjatlar navbati                        |
| 14    | Administratsiya  | Foydalanuvchilar, rollar, sozlamalar, audit log                    |

## 10.3. Dizayn va prototip

Ishlab chiqish boshlanishidan oldin Ijrochi asosiy ekranlarning interaktiv prototipini (Figma) taqdim etadi va Buyurtmachi bilan kelishadi. Kelishilgan prototip vizual qismni qabul qilish mezoni hisoblanadi. Dizayn tizimi (ranglar, shriftlar, tugmalar, formalar, jadvallar, bildirishnomalar) alohida hujjat sifatida rasmiylashtiriladi va butun ilovada izchil qoʻllanadi.


---

# 11. Testlash va qabul qilish

## 11.1. Testlash turlari

| **Test turi**          | **Masʼul**  | **Qamrov / mezon**                                            |
|------------------------|-------------|---------------------------------------------------------------|
| Birlik testlari (unit) | Ijrochi     | Biznes-mantiq va hisob-kitob funksiyalari — kamida 70% qamrov |
| Integratsiya testlari  | Ijrochi     | API endpointlari, maʼlumotlar bazasi bilan ishlash            |
| E2E testlari           | Ijrochi     | Asosiy 20 ta foydalanuvchi ssenariysi                         |
| Regressiya testi       | Ijrochi     | Har bir relizdan oldin avtomatik                              |
| Yuklama testi          | Ijrochi     | 100 va 300 bir vaqtdagi foydalanuvchi                         |
| Xavfsizlik tekshiruvi  | Ijrochi     | OWASP Top 10 boʻyicha tekshiruv hisoboti                      |
| Qabul testi (UAT)      | Buyurtmachi | Kelishilgan test ssenariylari boʻyicha, staging muhitida      |

## 11.2. Majburiy buxgalteriya testlari

Quyidagi testlar tizimni qabul qilishning shartsiz talabi hisoblanadi. Misollar QQS toʻlovchi korxona uchun, stavka 12%, narx QQS ichida deb olingan.

| **Test**                                                | **Kutilayotgan natija**                                                                                     |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Sotuv 100 000 000 soʻm (QQS ichida), tannarx 70 000 000 | Tushum 89 285 714,29 · QQS 10 714 285,71 · tannarx 70 000 000 · yalpi foyda 19 285 714,29 (30 000 000 EMAS) |
| Xarid 40 000 000 soʻm (QQS ichida)                      | Materiallar 35 714 285,71 · hisobga olinadigan QQS 4 285 714,29 · taʼminotchiga qarz 40 000 000             |
| Nomutanosib yozuv (debet ≠ kredit)                      | Qayd etish RAD ETILADI, hech narsa yozilmaydi                                                               |
| «Toʻlash» tugmasi ikki marta bosildi                    | Bitta toʻlov yaratiladi; ikkinchi soʻrov birinchisining natijasini qaytaradi                                |
| Yopilgan davrga hujjat qayd etish                       | Tushunarli xatolik bilan rad etiladi, qisman yozuv qolmaydi                                                 |
| Huquqi yoʻq foydalanuvchi himoyalangan amalni bajaradi  | 403; urinish audit logga yoziladi                                                                           |
| Qayd etilgan sotuvni storno qilish                      | Qoldiqlar avvalgi holatga qaytadi; ikkala hujjat ham tizimda koʻrinadi; asl hujjat oʻzgarmaydi              |
| Turli narxlarda ketma-ket kirim va chiqimlar            | Ombor qoldigʻi SUMMASI tegishli buxgalteriya hisobi qoldigʻiga teng chiqadi                                 |
| Koʻp mayda satrli hujjat (yaxlitlash sinovi)            | Satrlar QQS yigʻindisi hujjat QQS jamisiga aynan teng                                                       |

> *Invariant testlari (6.2-boʻlim) generatsiya qilingan tasodifiy maʼlumotlarda ham bajarilishi kerak: har qanday toʻgʻri yozuvlar toʻplamida debet = kredit va aktivlar = majburiyatlar + kapital.*

## 11.3. Bajarilgan deb hisoblash mezonlari (Definition of Done)

- Funksiya TZ dagi talab kodiga toʻliq mos keladi va kelishilgan prototipga muvofiq.

- Avtomatik testlar yozilgan va muvaffaqiyatli oʻtgan.

- Kod koʻrib chiqishdan (code review) oʻtgan, kritik va yuqori darajadagi izohlar yopilgan.

- Xatolarni qayta ishlash va foydalanuvchiga tushunarli xabarlar amalga oshirilgan.

- Huquqlar tekshiruvi server tomonida qoʻshilgan.

- Foydalanuvchi hujjati (qoʻllanma) tegishli boʻlimi yangilangan.

- Funksiya staging muhitiga joylashtirilgan va Buyurtmachi tomonidan koʻrib chiqilgan.

Moliyaviy funksiyalar uchun qoʻshimcha ravishda: ikki yozuvlilik test bilan tasdiqlangan, invariantlar tekshirilgan, bosh kitobga sverka bajarilgan, takrorlanishdan himoya, storno va yopilgan davr xatti-harakati tekshirilgan, QQS hisobi 6.6-boʻlim qoidalariga mos.

## 11.4. Nuqsonlar tasnifi va bartaraf etish muddatlari

| **Daraja** | **Taʼrifi**                                                                     | **Reaksiya** | **Bartaraf etish**        |
|------------|---------------------------------------------------------------------------------|--------------|---------------------------|
| Blocker    | Tizim ishlamaydi yoki asosiy jarayon bajarilmaydi; maʼlumot yoʻqoladi           | 2 soat       | 1 ish kuni                |
| Critical   | Muhim funksiya ishlamaydi, vaqtinchalik yechim yoʻq; notoʻgʻri moliyaviy natija | 4 soat       | 3 ish kuni                |
| Major      | Funksiya notoʻgʻri ishlaydi, ammo vaqtinchalik yechim bor                       | 1 ish kuni   | 7 ish kuni                |
| Minor      | Kichik nosozlik, qulaylikka taʼsir qiladi                                       | 3 ish kuni   | Keyingi relizda           |
| Trivial    | Matn, tekislash, kosmetik kamchilik                                             | —            | Rejalashtirilgan tartibda |

> *Moliyaviy hisob-kitobdagi har qanday nomuvofiqlik (qoldiq, tannarx, QQS, qarzdorlik summasi) avtomatik ravishda kamida Critical darajaga tenglashtiriladi.*


---

# 12. Loyiha bosqichlari va muddatlari

Loyiha iterativ tarzda, har bosqich oxirida ishlaydigan natija taqdim etilgan holda amalga oshiriladi. Muddatlar taxminiy boʻlib, jamoa tarkibi kelishilgandan soʻng aniqlashtiriladi.

| **Bosqich**                         | **Tarkibi**                                                                                    | **Muddat**        | **Natija**                                                               |
|-------------------------------------|------------------------------------------------------------------------------------------------|-------------------|--------------------------------------------------------------------------|
| 1\. Tahlil va dizayn                | TZ ni yakuniy kelishish, hisoblar rejasini buxgalter bilan tasdiqlash, MB sxemasi, UI prototip | 3 hafta           | Tasdiqlangan TZ va hisoblar rejasi, Figma prototipi, arxitektura hujjati |
| 2\. Poydevor                        | Autentifikatsiya, rollar va huquqlar, maʼlumotnomalar, audit log asosi                         | 3 hafta           | Xavfsiz asos, huquqlar ishlaydi                                          |
| 3\. Buxgalteriya dvigateli          | Hisoblar rejasi, jurnal, bosh kitob, davrlar, storno, invariantlar, atomiklik                  | 5 hafta           | 6-boʻlim invariantlari testdan oʻtgan yadro                              |
| 4\. Pul oqimlari                    | Kassa, bank, oʻtkazmalar, toʻlov kalendari, bank koʻchirmasi sverkasi                          | 3 hafta           | Pul harakati toʻliq hisobga olinadi                                      |
| 5\. Kontragentlar bilan hisob-kitob | Sotuv, xarid, debitorlik va kreditorlik, akt sverka, kreditlar                                 | 4 hafta           | Sotuv va xarid sikli toʻliq ishlaydi                                     |
| 6\. Ombor va ishlab chiqarish       | Ombor, partiyalar, tannarx, BOM, ishlab chiqarish buyurtmasi, kalkulyatsiya                    | 5 hafta           | Tannarx avtomatik hisoblanadi va bosh kitobga sverka boʻladi             |
| 7\. Hisobot va analitika            | P&L, balans, DDS, bosh kitob, aylanma-qoldiq, dashboard, byudjet, ish haqi                     | 4 hafta           | Moliyaviy hisobotlar toʻplami                                            |
| 8\. Integratsiyalar                 | Didox (EHF) va ERI, MB kurslari, bank, Telegram, e-pochta, Excel                               | 3 hafta           | Rasmiy hujjat aylanishi ishlaydi                                         |
| 9\. Ishga tushirish                 | Maʼlumot koʻchirish va boshlangʻich qoldiqlar, UAT, oʻqitish, hujjatlar, prod                  | 3 hafta           | Sanoat ekspluatatsiyasiga qabul qilingan tizim                           |
| Jami                                | —                                                                                              | ≈ 33 hafta (8 oy) | —                                                                        |

> *3-bosqich (buxgalteriya dvigateli) kritik hisoblanadi: uning invariantlari testdan oʻtmaguncha keyingi bosqichlarga oʻtilmaydi. Bosqichlar 5–7 qisman parallel bajarilishi mumkin va bu umumiy muddatni 6–7 oyga qisqartiradi; buning uchun jamoada kamida 2 backend va 2 frontend dasturchi hamda buxgalteriya boʻyicha maslahatchi boʻlishi talab etiladi. AI moliyaviy tahlilchi (5.13-boʻlim) ushbu muddatga va byudjetga KIRMAYDI.*


---

# 13. Yetkazib berish, kafolat va qoʻllab-quvvatlash

## 13.1. Yetkaziladigan natijalar

- Loyihaning toʻliq manba kodi va uni Buyurtmachi repozitoriysiga topshirish (mulk huquqi Buyurtmachiga oʻtadi).

- Maʼlumotlar bazasi sxemasi va migratsiya skriptlari.

- Joylashtirish uchun Docker konfiguratsiyalari va bosqichma-bosqich yoʻriqnoma.

- API hujjati (OpenAPI/Swagger).

- Foydalanuvchi qoʻllanmasi — rollar kesimida, ekran rasmlari bilan, oʻzbek tilida.

- Administrator qoʻllanmasi: zaxiralash, tiklash, yangilash, monitoring.

- Video-darsliklar yoki jonli oʻqitish sessiyalari (kamida 3 sessiya, har bir rol guruhi uchun).

- Test ssenariylari va oʻtkazilgan testlar hisoboti.

## 13.2. Kafolat

Ijrochi tizim sanoat ekspluatatsiyasiga qabul qilingan kundan boshlab 6 (olti) oy davomida bepul kafolat xizmatini koʻrsatadi. Kafolat TZ talablariga mos kelmaydigan nuqsonlarni bartaraf etishni oʻz ichiga oladi. Yangi funksional talablar kafolatga kirmaydi va alohida kelishiladi.

## 13.3. Texnik qoʻllab-quvvatlash (SLA)

| **Parametr**                | **Shart**                                                        |
|-----------------------------|------------------------------------------------------------------|
| Qoʻllab-quvvatlash vaqti    | Dushanba–shanba, 09:00–18:00 (Toshkent vaqti)                    |
| Blocker darajadagi nosozlik | 24/7 rejimida qabul qilinadi, reaksiya — 2 soat                  |
| Murojaat kanallari          | Telegram guruh, e-pochta, muammolarni qayd etish tizimi          |
| Oylik profilaktika          | Yangilanishlar, zaxira nusxalarni tekshirish, ishlash tahlili    |
| Hisobot                     | Oylik: murojaatlar, bartaraf etilgan nuqsonlar, tizim mavjudligi |


---

# 14. Risklar va ularni kamaytirish

| **Risk**                                             | **Ehtimollik** | **Taʼsiri**                   | **Kamaytirish chorasi**                                                            |
|------------------------------------------------------|----------------|-------------------------------|------------------------------------------------------------------------------------|
| Talablar loyiha davomida oʻzgaradi                   | Yuqori         | Muddat va byudjet oshadi      | Oʻzgarishlarni rasmiy soʻrov orqali qabul qilish, har bir oʻzgarish uchun baholash |
| Boshlangʻich maʼlumotlar sifatsiz (Excel’da xatolar) | Yuqori         | Notoʻgʻri qoldiq va tannarx   | Koʻchirishdan oldin maʼlumotlarni tozalash va inventarizatsiya oʻtkazish           |
| Xodimlar yangi tizimga qarshilik koʻrsatadi          | Oʻrta          | Tizim ishlatilmaydi           | Erta bosqichda jalb qilish, oʻqitish, ichki «champion» tayinlash                   |
| Didox/bank API sida oʻzgarishlar                     | Oʻrta          | Integratsiya ishlamay qoladi  | Integratsiyalarni alohida qatlamga ajratish, monitoring va tez tuzatish            |
| Buyurtmachi tomonidan qaror kechikishi               | Oʻrta          | Bosqichlar suriladi           | Har hafta status uchrashuvi, qaror kutayotgan masalalar reyestri                   |
| Asosiy dasturchining loyihadan chiqishi              | Past           | Bilim yoʻqoladi               | Kod koʻrib chiqish amaliyoti, hujjatlashtirish, jamoada almashuv                   |
| Qonunchilikdagi oʻzgarishlar (soliq stavkalari)      | Oʻrta          | Hisob-kitob notoʻgʻri boʻladi | Stavkalarni sozlamalarda saqlash, amal qilish sanasi bilan versiyalash             |
| Maʼlumotlar yoʻqolishi                               | Past           | Kritik                        | Kunlik zaxira nusxa, choraklik test tiklash, alohida saqlash joyi                  |


---

# 15. Ilovalar

## Ilova A. Hisobotlar roʻyxati

| **№** | **Hisobot nomi**                        | **Asosiy kesimlar**            | **Davriylik**  |
|-------|-----------------------------------------|--------------------------------|----------------|
| A1    | Pul mablagʻlari harakati (DDS)          | Modda, hisob, filial           | Kunlik / oylik |
| A2    | Toʻlov kalendari va qoldiq prognozi     | Kun, hisob                     | Kunlik         |
| A3    | Foyda va zararlar (P&L)                 | Filial, mahsulot guruhi, davr  | Oylik          |
| A4    | Debitorlik qarzdorligi (aging)          | Mijoz, menejer, muddat         | Haftalik       |
| A5    | Kreditorlik qarzdorligi (aging)         | Taʼminotchi, muddat            | Haftalik       |
| A6    | Marjinallik tahlili                     | Mahsulot, mijoz, menejer       | Oylik          |
| A7    | Ombor qoldiqlari va qiymati             | Ombor, kategoriya, partiya     | Kunlik         |
| A8    | Ombor aylanmasi va harakatsiz tovarlar  | Nomenklatura, ombor            | Oylik          |
| A9    | Yaroqlilik muddati nazorati             | Partiya, ombor                 | Kunlik         |
| A10   | Tannarx tarkibi kalkulyatsiyasi         | Mahsulot, element              | Oylik          |
| A11   | Norma va fakt sarfi ogʻishi             | Mahsulot, xomashyo, smena      | Smena / oylik  |
| A12   | Byudjet reja-fakt                       | MJM, modda                     | Oylik          |
| A13   | Sotuv dinamikasi                        | Davr, mahsulot, mijoz, menejer | Kunlik / oylik |
| A14   | ABC/XYZ tahlil                          | Mahsulot, mijoz                | Choraklik      |
| A15   | Solishtirish dalolatnomasi (akt sverka) | Kontragent, davr               | Talab boʻyicha |

## Ilova B. Hujjat turlari va raqamlash

| **Hujjat turi**             | **Prefiks** | **Namuna**      | **Qoldiqqa taʼsiri**   |
|-----------------------------|-------------|-----------------|------------------------|
| Pul kirimi                  | PK          | PK-2026-000145  | Kassa/bank +           |
| Pul chiqimi                 | PCH         | PCH-2026-000982 | Kassa/bank −           |
| Ichki oʻtkazma              | OT          | OT-2026-000037  | Hisoblar oʻrtasida     |
| Sotuv buyurtmasi            | SB          | SB-2026-001204  | Rezerv                 |
| Realizatsiya                | RL          | RL-2026-003317  | Ombor −, debitorlik +  |
| Sotuvdan qaytarish          | SQ          | SQ-2026-000061  | Ombor +, debitorlik −  |
| Xarid buyurtmasi            | XB          | XB-2026-000488  | Kutilayotgan kirim     |
| Tovar kirimi                | TK          | TK-2026-000913  | Ombor +, kreditorlik + |
| Ombor koʻchirish            | OK          | OK-2026-000254  | Omborlar oʻrtasida     |
| Hisobdan chiqarish          | HCH         | HCH-2026-000119 | Ombor −                |
| Inventarizatsiya            | INV         | INV-2026-000012 | Ombor +/−              |
| Ishlab chiqarish buyurtmasi | IB          | IB-2026-000376  | —                      |
| Smena hisoboti              | SH          | SH-2026-001501  | Xomashyo −, mahsulot + |
| Ish haqi vedomosti          | IH          | IH-2026-000024  | Kreditorlik +          |

## Ilova C. Kelishuv varaqasi

Ushbu texnik topshiriq quyida imzo qoʻygan tomonlar oʻrtasida kelishilgan va ishlab chiqish uchun asos hisoblanadi. Har qanday oʻzgartirish yozma qoʻshimcha kelishuv orqali rasmiylashtiriladi.

| **Tomon**                | **Lavozimi va F.I.Sh.**                                  | **Imzo**                 | **Sana**                   |
|--------------------------|----------------------------------------------------------|--------------------------|----------------------------|
| Buyurtmachi              | __________ | __________ | __________ . __________ . 2026 |
| Moliya boʻyicha masʼul   | __________ | __________ | __________ . __________ . 2026 |
| Ijrochi (loyiha rahbari) | __________ | __________ | __________ . __________ . 2026 |
| Texnik rahbar            | __________ | __________ | __________ . __________ . 2026 |

---

# 16. Ishlab chiqishdan oldingi majburiy aniqlashtirishlar (Definition of Ready)

Ushbu bo‘lim v1.1 dagi talablarni almashtirmaydi; ularni dasturchi, buxgalter, loyiha rahbari va Buyurtmachi bir xil talqin qilishi uchun aniqlashtiradi. Quyidagi bandlar tasdiqlanmasdan tegishli modul ishlab chiqishga **READY** deb hisoblanmaydi.

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| DR-01 | Hisoblar rejasi va `account_map` Buyurtmachining bosh buxgalteri tomonidan tasdiqlangan bo‘lishi shart | M |
| DR-02 | Har bir operatsion hujjat uchun posting rule: trigger, debet/kredit roli, QQS, valyuta, tannarx va storno qoidasi yozma tasdiqlanadi | M |
| DR-03 | Har bir hujjat uchun statuslar va ruxsat etilgan status o‘tishlari (state transition) tasdiqlanadi | M |
| DR-04 | Tasdiqlash marshrutlari: summa chegarasi, rol, filial/MJM, ketma-ket yoki parallel tasdiqlash qoidalari tasdiqlanadi | M |
| DR-05 | Har bir integratsiya uchun sandbox/test credential, production credential egasi va masʼul shaxs aniqlanadi | M |
| DR-06 | Migratsiya manbalari (Excel/1C/boshqa), fayl namunasi, ustunlar mappingi va boshlang‘ich qoldiq sanasi kelishiladi | M |
| DR-07 | UAT uchun kamida 20 asosiy ssenariy va ularning kutiladigan natijalari Buyurtmachi bilan kelishiladi | M |
| DR-08 | Production hosting varianti, domen, SSL, backup joyi, RPO/RTO va masʼul shaxslar tasdiqlanadi | M |
| DR-09 | Soliq stavkalari va meʼyoriy parametrlar kodga qattiq yozilmaydi; go-live oldidan moliya/buxgalteriya masʼuli tomonidan amaldagi qiymatlar tasdiqlanadi | M |
| DR-10 | M, K va I prioritetlaridan qaysilari konkret relizga kirishi release scope hujjatida muzlatiladi | M |

**Ready Gate:** DR-01...DR-10 ichidagi majburiy bandlar yopilmagan modulga ishlab chiqish boshlash mumkin emas, faqat texnik spike/prototip qilish mumkin.

---

# 17. Hujjat workflowlari va holatlar mashinasi

## 17.1. Umumiy state machine

Barcha operatsion hujjatlar quyidagi bazaviy holatlardan foydalanadi:

`QORALAMA → TASDIQLASHDA → TASDIQLANGAN → QAYD_ETILGAN`

Muqobil yakuniy yo‘llar:

- `QORALAMA/TASDIQLASHDA/TASDIQLANGAN → BEKOR_QILINGAN`
- `QAYD_ETILGAN → STORNO_QILINGAN`
- `QAYD_ETILGAN` hujjat **bevosita tahrirlanmaydi**.
- Status o‘tishi faqat backend domen xizmati orqali bajariladi.
- Har bir status o‘tishi audit logda: `kim`, `qachon`, `oldingi holat`, `yangi holat`, `sabab`, `request_id` bilan saqlanadi.

## 17.2. Majburiy workflow talablar

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| WF-01 | Frontend statusni to‘g‘ridan-to‘g‘ri almashtirmaydi; faqat ruxsat etilgan action endpoint chaqiradi | M |
| WF-02 | Har bir transition uchun server tomonida permission va business-rule tekshiruvi bor | M |
| WF-03 | Tasdiqlash paytida hujjatning versiyasi tekshiriladi; eskirgan versiya bilan action bajarilmaydi | M |
| WF-04 | Rad etishda sabab majburiy va tarixda saqlanadi | M |
| WF-05 | Tasdiqlangan hujjat tarkibi o‘zgarsa, oldingi tasdiqlar bekor qilinadi va qayta tasdiqlash boshlanadi | M |
| WF-06 | Qayd etish (post) atomik operatsiya: document + journal + stock/cash/AR/AP + audit bir tranzaksiyada | M |
| WF-07 | Storno asl hujjatni o‘zgartirmaydi; bog‘langan reversal hujjat/jurnal yozuvi yaratadi | M |
| WF-08 | Yopilgan davrga post/storno urinishlari maxsus huquqsiz rad etiladi | M |
| WF-09 | Approval inbox foydalanuvchiga faqat uning vakolati doirasidagi navbatni ko‘rsatadi | M |
| WF-10 | Har bir approval action idempotent bo‘lishi shart | M |

## 17.3. Modul bo‘yicha workflow kartalari

Har bir hujjat turi uchun quyidagi karta alohida to‘ldiriladi:

| Maydon | Mazmun |
|---|---|
| Hujjat turi | Masalan: Realizatsiya |
| Yaratishi mumkin | Rol(lar) |
| Tasdiqlaydi | Rol(lar), limit |
| Post qiladi | Avtomatik / rol |
| Omborga taʼsir | Ha/Yo‘q, qachon |
| Pulga taʼsir | Ha/Yo‘q, qachon |
| Debitor/kreditorga taʼsir | Ha/Yo‘q |
| Posting rule ID | Masalan `PR-SALE-001` |
| Storno qoidasi | Qaysi yozuvlar teskari qilinadi |
| Print/EHF | Qaysi bosqichda |
| Integratsiya | Didox/bank/Telegram va h.k. |

---

# 18. Posting rules va account map — buxgalteriya implementatsiya kontrakti

## 18.1. Asosiy qoida

Kodda 1010, 2810, 4010 kabi real hisob raqamlariga bevosita bog‘lanish taqiqlanadi. Biznes-mantiq **semantic account role** bilan ishlaydi, masalan:

- `CASH_MAIN`
- `BANK_MAIN`
- `AR_CUSTOMER`
- `AP_SUPPLIER`
- `INVENTORY_RAW`
- `INVENTORY_FINISHED`
- `VAT_INPUT`
- `VAT_OUTPUT`
- `SALES_REVENUE`
- `COGS`
- `PAYROLL_PAYABLE`
- `RETAINED_EARNINGS`

Ularning real hisob kodi `account_map` orqali tashkilot/filial va amal qilish sanasi bo‘yicha sozlanadi.

## 18.2. Posting rule formati

Har bir posting rule quyidagi maydonlarga ega bo‘ladi:

| Maydon | Talab |
|---|---|
| `rule_id` | O‘zgarmas unikal ID |
| `document_type` | Hujjat turi |
| `event` | POST / STORNO / PERIOD_CLOSE / REVALUATION |
| `effective_from/to` | Amal qilish sanalari |
| `debit_role` | Semantic debit account role |
| `credit_role` | Semantic credit account role |
| `amount_formula` | Qaysi summadan olinadi |
| `dimensions` | filial, MJM, counterparty, item va boshqalar |
| `currency_rule` | hujjat valyutasi + UZS ekvivalenti |
| `tax_rule` | QQS/soliq treatment |
| `cost_rule` | tannarx manbasi |
| `rounding_rule` | yaxlitlash |
| `reversal_rule_id` | storno qoidasi |
| `approved_by` | bosh buxgalter |
| `version` | versiya va tarix |

## 18.3. Majburiy posting test matritsasi

Quyidagi hujjatlar kamida posting-rule testiga ega bo‘lishi shart:

1. Pul kirimi.
2. Pul chiqimi.
3. Ichki o‘tkazma.
4. Sotuv/realizatsiya.
5. Sotuvdan qaytarish.
6. Xarid/tovar kirimi.
7. Taʼminotchiga avans.
8. Mijozdan avans.
9. Ombor ko‘chirish.
10. Hisobdan chiqarish.
11. Inventarizatsiya farqi.
12. Ishlab chiqarish smena hisoboti.
13. Ish haqi vedomosti.
14. Asosiy vosita kirimi.
15. Amortizatsiya.
16. Kredit olish.
17. Kredit asosiy qarz to‘lovi.
18. Kredit foizi.
19. Valyuta konvertatsiyasi.
20. Kurs farqi.
21. Davr yopilishi.
22. Yil yakuni natijasini taqsimlanmagan foydaga ko‘chirish.

**Qabul mezoni:** har bir rule bo‘yicha test `debet = kredit` va tegishli sub-ledger ↔ GL sverkasini tasdiqlaydi.

---

# 19. API kontrakti va backend standartlari

## 19.1. Umumiy talablar

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| API-01 | API bazaviy prefiksi versiyalanadi: `/api/v1/...` | M |
| API-02 | OpenAPI 3.x hujjati kod bilan birga yangilanadi va CI’da validatsiya qilinadi | M |
| API-03 | Barcha list endpointlar server-side pagination, sort va filter bilan ishlaydi | M |
| API-04 | Moliyaviy create/action endpointlarda `Idempotency-Key` qo‘llab-quvvatlanadi | M |
| API-05 | Mutatsiyalarda optimistic locking (`version`/ETag) ishlatiladi | M |
| API-06 | Standart xato formati: `code`, `message`, `details`, `field_errors`, `request_id` | M |
| API-07 | Server ichki stack trace yoki SQL xatoni clientga chiqarmaydi | M |
| API-08 | Sana-vaqt API’da timezone bilan ISO-8601; DB’da UTC, biznes sanasi alohida saqlanadi | M |
| API-09 | Pul summasi JSON’da float sifatida uzatilmaydi; decimal string yoki minor-unit integer ishlatiladi | M |
| API-10 | Har bir endpoint permission scope bilan hujjatlashtiriladi | M |
| API-11 | Bulk import/export async job sifatida ishlaydi; holat endpointi mavjud | M |
| API-12 | API breaking change faqat yangi major API versiyada qilinadi | K |

## 19.2. Standart xato formati

```json
{
  "code": "PERIOD_CLOSED",
  "message": "Tanlangan moliyaviy davr yopilgan.",
  "details": {
    "period": "2026-08"
  },
  "field_errors": [],
  "request_id": "req_..."
}
```

## 19.3. Standart action endpointlar

Hujjatlar uchun CRUD bilan birga quyidagi action semantikasi qo‘llanadi:

- `POST /documents/{id}/submit`
- `POST /documents/{id}/approve`
- `POST /documents/{id}/reject`
- `POST /documents/{id}/post`
- `POST /documents/{id}/reverse`
- `POST /documents/{id}/cancel`

Aniq endpoint nomlari implementatsiyada o‘zgarishi mumkin, lekin action va audit semantikasi saqlanishi shart.

---

# 20. Maʼlumotlar bazasi va data integrity talablari

## 20.1. Naming va obyektlarni ajratish

`account` atamasi ikki xil maʼnoda ishlatilmasligi kerak:

- `treasury_account` — kassa/bank hisoblari;
- `gl_account` — buxgalteriya hisoblar rejasi.

`user`, `role`, `permission` alohida jadvallar bo‘ladi; ularning aloqalari mapping jadvallari orqali yuritiladi.

## 20.2. Majburiy DB constraintlar

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| DB-01 | Barcha biznes jadvallarida PK va kerakli FK constraintlar mavjud | M |
| DB-02 | Hujjat raqamlarida tashkilot/filial/yil doirasida unikal constraint | M |
| DB-03 | `journal_line`: debit va credit bir satrda bir vaqtda musbat bo‘la olmaydi | M |
| DB-04 | Jurnal yozuvi post bo‘lishidan oldin debit va credit summalari tengligi tekshiriladi | M |
| DB-05 | Miqdor/summa uchun float/double taqiqlanadi | M |
| DB-06 | `currency`, `tax_rate`, `account_map`, `posting_rule` uchun effective-date tarix saqlanadi | M |
| DB-07 | Posted moliyaviy yozuvlarni UPDATE/DELETE qilish servis va DB huquqlari bilan cheklanadi | M |
| DB-08 | Audit log append-only; odatiy app roli UPDATE/DELETE qila olmaydi | M |
| DB-09 | Soft-delete faqat biznes jihatdan ruxsat etilgan maʼlumotnomalarda; moliyaviy tranzaksiyalarda delete yo‘q | M |
| DB-10 | Har bir mutatsiyada `created_at/by`, `updated_at/by`, `version` saqlanadi | M |
| DB-11 | Filial/MJM bo‘yicha izolatsiya query darajasida majburiy | M |
| DB-12 | Katta jadvallar uchun indeks rejasi va query plan testlari mavjud | K |

## 20.3. Qo‘shimcha majburiy obyektlar

Mavjud 7.1 obyektlariga kamida quyidagilar qo‘shiladi:

- `approval_workflow`
- `approval_step`
- `approval_instance`
- `approval_action`
- `posting_rule`
- `account_map`
- `exchange_rate`
- `tax_rate`
- `notification`
- `notification_delivery`
- `integration_job`
- `integration_event`
- `outbox_event`
- `file_attachment`
- `import_job`
- `export_job`
- `reconciliation_match`
- `user_role`
- `role_permission`
- `user_scope`
- `refresh_session`
- `password_reset_token`
- `system_setting`
- `feature_flag`

## 20.4. Transactional Outbox

Moliyaviy tranzaksiya muvaffaqiyatli commit bo‘lgandan keyin Telegram, email, Didox yoki boshqa tashqi tizimga yuborish uchun event yo‘qolib ketmasligi kerak. Shu sababli:

1. biznes tranzaksiya bilan birga `outbox_event` yoziladi;
2. worker uni tashqi xizmatga yuboradi;
3. muvaffaqiyatli yuborilganda holat belgilanadi;
4. xatoda retry qilinadi;
5. maksimal urinishdan so‘ng DLQ/manual review navbatiga o‘tadi.

---

# 21. Xavfsizlik va sessiya siyosati

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| SEC-01 | Administrator, direktor, moliya direktori va bosh buxgalter uchun 2FA majburiy | M |
| SEC-02 | Refresh tokenlar serverda session yozuvi bilan bog‘langan va revoke qilinadi | M |
| SEC-03 | Parol almashtirilganda yoki foydalanuvchi bloklanganda aktiv sessiyalar bekor qilinadi | M |
| SEC-04 | Login urinishlari rate limit + vaqtinchalik lockout bilan himoyalanadi | M |
| SEC-05 | Password reset token bir martalik va qisqa muddatli | M |
| SEC-06 | Permission faqat backendda yakuniy qaror qiladi; frontend faqat UX uchun yashiradi | M |
| SEC-07 | Filial/MJM/ombor scope’lari har bir relevant query va actionda tekshiriladi | M |
| SEC-08 | Secretlar `.env` faylni repozitoriyga commit qilish orqali saqlanmaydi | M |
| SEC-09 | Production DB internetga ochiq bo‘lmaydi; faqat zarur servislar kiradi | M |
| SEC-10 | Backup shifrlangan va restore huquqi cheklangan | M |
| SEC-11 | Audit logda login, permission denial, approval, post, reverse, period close/open, export kabi xavfli amallar qayd etiladi | M |
| SEC-12 | Audit retention muddati Buyurtmachi siyosati va amaldagi talablar bilan alohida tasdiqlanadi | M |
| SEC-13 | Xodim/kontragent shaxsiy maʼlumotlariga minimal zarur huquq prinsipi qo‘llanadi | M |
| SEC-14 | Production maʼlumotlari development muhitiga ko‘chirilmaydi; staging nusxasi anonimlashtiriladi | M |
| SEC-15 | Dependency va container image zaifliklari CI’da skan qilinadi | K |

---

# 22. Integratsiyalar ishonchliligi va tashqi servislar

## 22.1. Umumiy integratsiya kontrakti

Har bir integratsiya uchun alohida `Integration Passport` yaratiladi:

- provider;
- base URL;
- auth turi;
- credential egasi;
- sandbox/prod muhiti;
- rate limit;
- timeout;
- retry siyosati;
- idempotency imkoniyati;
- webhook mavjudligi;
- webhook signature tekshiruvi;
- xato kodlari mappingi;
- SLA;
- fallback/manual jarayon;
- monitoring va alert;
- maʼlumotlar maxfiyligi.

## 22.2. Retry siyosati

- Faqat vaqtinchalik xatolar (`timeout`, 429, tanlangan 5xx) avtomatik retry qilinadi.
- 4xx biznes xatolari ko‘r-ko‘rona qayta yuborilmaydi.
- Exponential backoff + jitter ishlatiladi.
- Har bir job uchun maksimal urinish soni sozlanadi.
- Takror yuborish moliyaviy dublikat yaratmasligi shart.
- Webhooklar signature/secret bilan tekshiriladi va idempotent qabul qilinadi.

## 22.3. Tashqi servis ishlamasa

Didox, bank, SMS, Telegram, SMTP yoki MB kurslari vaqtincha ishlamasa:

1. asosiy moliyaviy tizim ishlashda davom etadi;
2. foydalanuvchi integratsiya holatini ko‘radi;
3. job navbatda qoladi;
4. kritik holat monitoringga chiqadi;
5. zarur bo‘lsa manual retry mavjud bo‘ladi.

---

# 23. Maʼlumotlarni ko‘chirish (migration) va boshlang‘ich qoldiqlar

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| MIG-01 | Har bir manba fayl/tizim uchun mapping hujjati tuziladi | M |
| MIG-02 | Importdan oldin data profiling: bo‘sh, dublikat, noto‘g‘ri STIR/SKU/sana/valyuta qiymatlari aniqlanadi | M |
| MIG-03 | Import validation xatolari satr va ustun darajasida hisobot qilinadi | M |
| MIG-04 | Bir xil faylni takror import qilish dublikat yaratmaydi yoki foydalanuvchini aniq ogohlantiradi | M |
| MIG-05 | Master-data va opening balance importlari alohida bosqichlarda bajariladi | M |
| MIG-06 | Boshlang‘ich GL qoldiqlarida debit=kredit; AR/AP subledger GL bilan sverka qilinadi | M |
| MIG-07 | Ombor miqdori va summasi tegishli GL qoldig‘i bilan sverka qilinadi | M |
| MIG-08 | Migratsiyadan oldin va keyin reconciliation report tuziladi | M |
| MIG-09 | Dry-run stagingda kamida bir marta to‘liq bajariladi | M |
| MIG-10 | Cutover sanasi va freeze-window oldindan kelishiladi | M |
| MIG-11 | Importdan keyin Buyurtmachi sign-off bermaguncha production go-live yakunlangan hisoblanmaydi | M |
| MIG-12 | Noto‘g‘ri migratsiya uchun rollback/reload rejasi hujjatlashtiriladi | M |

---

# 24. DevOps, release, rollback va observability

## 24.1. CI/CD gate

Productionga deploy qilish uchun:

1. lint/typecheck;
2. unit test;
3. integration test;
4. migration validation;
5. security/dependency scan;
6. build;
7. smoke test;
8. staging UAT yoki tegishli approval

muvaffaqiyatli o‘tishi shart.

## 24.2. Database migration qoidalari

- Migratsiya fayllari immutable va versiyalangan.
- Production migratsiyasidan oldin backup/restore tayyorligi tekshiriladi.
- Katta jadvalni bloklaydigan migratsiya maintenance windowda bajariladi.
- Destructive migration kamida ikki bosqichli backward-compatible usulda bajariladi.
- Rollback imkoni bo‘lmasa, roll-forward recovery rejasi yoziladi.

## 24.3. Monitoring

Kamida quyidagi metrikalar:

- API latency p50/p95/p99;
- 4xx/5xx rate;
- DB connection pool;
- slow query;
- queue depth;
- failed integration jobs;
- backup status;
- disk/storage;
- CPU/RAM;
- login failure;
- posting/reversal failure;
- reconciliation mismatch;
- health/readiness.

Kritik alertlar masʼul shaxsga Telegram/e-pochta orqali yuboriladi.

## 24.4. Log va tracing

- Har requestga `request_id`.
- Async job/eventga `correlation_id`.
- JSON structured log.
- PII/token/parol loglanmaydi.
- Moliyaviy action loglari audit log bilan bog‘lanadi.

---

# 25. Talab → kod → test → qabul traceability

## 25.1. Traceability Matrix

Har bir talab uchun quyidagi bog‘lanish yuritiladi:

| Requirement ID | Modul | Issue/Task | API/Service | DB migration | Test ID | UAT ID | Holat |
|---|---|---|---|---|---|---|---|
| `SL-05` | Sotuv | `FIN-...` | payment allocation | ... | `T-SL-05-01` | `UAT-...` | Planned/Done |

**Qoidalar:**

- `M` talab `Test ID` va `UAT/acceptance` bog‘lanishisiz Done bo‘lmaydi.
- Moliyaviy talab posting/invariant testi bo‘lmasa Done bo‘lmaydi.
- Requirement ID commit/PR/issue tavsifida ko‘rsatiladi.
- Scope o‘zgarishi yangi requirement yoki mavjud requirement versiyasi orqali qilinadi.

## 25.2. Modul qabul mezoni

Modul qabul qilinadi, agar:

1. barcha `M` talablar bajarilgan;
2. barcha kritik workflowlar E2E testdan o‘tgan;
3. permission testlari o‘tgan;
4. audit trail mavjud;
5. xatolik va empty/loading state’lar ishlaydi;
6. relevant posting/invariant testlari o‘tgan;
7. NFR bo‘yicha tegishli limitlar bajarilgan;
8. OpenAPI yangilangan;
9. foydalanuvchi qo‘llanmasi yangilangan;
10. Buyurtmachi stagingda sign-off bergan.

---

# 26. Go-live checklist

Production ishga tushirishdan oldin quyidagi bandlar belgilanishi shart:

- [ ] Final TZ va scope tasdiqlangan.
- [ ] Hisoblar rejasi va account map tasdiqlangan.
- [ ] Posting rule matritsasi tasdiqlangan.
- [ ] Rollar va permissionlar tasdiqlangan.
- [ ] Production domain va TLS ishlaydi.
- [ ] Production secretlar joylashtirilgan.
- [ ] 2FA siyosati yoqilgan.
- [ ] Backup muvaffaqiyatli olingan.
- [ ] Restore testi o‘tkazilgan.
- [ ] Monitoring va alertlar ishlaydi.
- [ ] Migratsiya dry-run o‘tgan.
- [ ] Opening balance sverka qilingan.
- [ ] AR/AP ↔ GL sverka qilingan.
- [ ] Ombor summa/miqdor ↔ GL sverka qilingan.
- [ ] Asosiy 20+ E2E/UAT ssenariy o‘tgan.
- [ ] Security review yakunlangan.
- [ ] Performance test o‘tgan.
- [ ] Didox/bank/SMTP/Telegram production integratsiyalari tekshirilgan.
- [ ] Rollback/cutover rejasi tasdiqlangan.
- [ ] Administrator va foydalanuvchilar o‘qitilgan.
- [ ] Support kontaktlari va SLA aktiv.
- [ ] Buyurtmachi go-live sign-off bergan.

---

# 27. Ochiq qarorlar reyestri

Quyidagi nuqtalar implementatsiyadan oldin Buyurtmachi bilan to‘ldiriladi. Bu qiymatlar ataylab o‘ylab topilmagan.

| **ID** | **Qaror** | **Holat** | **Masʼul** |
|---|---|---|---|
| OD-01 | Aniq production hosting: cloud yoki on-premise | Ochiq | Buyurtmachi + Texnik rahbar |
| OD-02 | Domen/subdomen | Ochiq | Buyurtmachi |
| OD-03 | Hisoblar rejasi va account map | Ochiq | Bosh buxgalter |
| OD-04 | Posting rule matritsasi | Ochiq | Bosh buxgalter + Backend lead |
| OD-05 | Approval limitlari | Ochiq | Direktor + Moliya direktori |
| OD-06 | Weighted Average yoki FIFO qaysi kundan ishlashi | Ochiq | Bosh buxgalter |
| OD-07 | Didox yoki Faktura operatori va API shartlari | Ochiq | Buyurtmachi |
| OD-08 | Bank(lar) va real API mavjudligi | Ochiq | Buyurtmachi |
| OD-09 | SMS provider | Ochiq | Buyurtmachi |
| OD-10 | Productionda 2FA usuli | Ochiq | Texnik rahbar |
| OD-11 | Audit va hujjat attachment retention muddati | Ochiq | Buyurtmachi |
| OD-12 | Migratsiya cutover sanasi | Ochiq | Loyiha rahbari |
| OD-13 | M/K/I talablaridan Release 1 ga yakuniy scope | Ochiq | Buyurtmachi + Loyiha rahbari |
| OD-14 | AI 2-bosqichning alohida byudjeti va modeli/provideri | Ochiq | Keyingi bosqich |

---

# 28. Yakuniy implementatsiya prinsiplari

1. **Jurnal — yagona moliyaviy haqiqat manbai.**
2. **Posted hujjat o‘zgarmaydi; tuzatish storno orqali.**
3. **Debet = kredit — buzilmas invariant.**
4. **Ombor miqdori ham, summasi ham GL bilan sverka qilinadi.**
5. **Barcha pul operatsiyalari atomik va idempotent.**
6. **Account kodlari hard-code qilinmaydi.**
7. **Permission va scope har doim serverda tekshiriladi.**
8. **Tashqi integratsiya ishlamay qolishi asosiy tizimni to‘xtatmaydi.**
9. **M talab test va acceptance mezonisiz Done emas.**
10. **Productionga faqat backup, restore, monitoring, migration va UAT tayyor bo‘lganda chiqiladi.**
11. **Soliq, buxgalteriya va yuridik parametrlar sozlanadigan bo‘ladi va go-live oldidan Buyurtmachining vakolatli mutaxassisi tomonidan tasdiqlanadi.**
12. **AI moduli moliyaviy yadrodan ajratilgan; AI ishlamasa asosiy tizim ishlashda davom etadi.**

---

## Ilova D. Environment va secretlar ro‘yxati

Aniq qiymatlar repozitoriyga yozilmaydi; faqat nomlari `.env.example` da saqlanadi.

```text
APP_ENV=
APP_URL=
DATABASE_URL=
REDIS_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
TELEGRAM_BOT_TOKEN=
SMS_PROVIDER=
SMS_API_KEY=
DIDOX_BASE_URL=
DIDOX_CLIENT_ID=
DIDOX_CLIENT_SECRET=
BANK_INTEGRATION_CONFIG=
SENTRY_DSN=
```

Production secretlari secret-manager yoki himoyalangan deployment muhiti orqali beriladi.

---

## Ilova E. Definition of Done — qisqa checklist

- [ ] Requirement ID mavjud.
- [ ] Acceptance criteria yozilgan.
- [ ] Kod review o‘tgan.
- [ ] Unit/integration test o‘tgan.
- [ ] Zarur bo‘lsa E2E test o‘tgan.
- [ ] Permission test o‘tgan.
- [ ] Audit log tekshirilgan.
- [ ] Financial bo‘lsa posting/invariant test o‘tgan.
- [ ] API/OpenAPI yangilangan.
- [ ] Migration xavfsiz.
- [ ] Error/loading/empty state mavjud.
- [ ] Stagingga deploy qilingan.
- [ ] Buyurtmachi ko‘rib chiqqan.
- [ ] Dokumentatsiya yangilangan.

---

---

# 29. Login, foydalanuvchi akkauntlari va rolga asoslangan kirish

## 29.1. Asosiy prinsip

Tizimda har bir real xodimning **alohida foydalanuvchi akkaunti** bo‘ladi. Bir nechta odam bitta umumiy login/paroldan foydalanishi taqiqlanadi. Agar korxonada ayni paytda bitta CEO, bitta buxgalter va bitta ombor boshlig‘i bo‘lsa, ularning har biri uchun bittadan alohida akkaunt yaratiladi.

Bu talab audit uchun majburiy: tizim har bir amalni aynan qaysi foydalanuvchi bajarganini ko‘rsatishi kerak.

## 29.2. Login formasi

Login sahifasida:

- BIOLIFE Finance logotipi va tizim nomi;
- `Login` maydoni;
- `Parol` maydoni;
- `Parolni ko‘rsatish/yashirish`;
- `Tizimga kirish` tugmasi;
- `Parolni unutdingizmi?`;
- login xatosida tushunarli xabar;
- loading holati;
- bloklangan akkaunt uchun maxsus xabar;
- birinchi kirishda vaqtinchalik parolni o‘zgartirish;
- 2FA talab qilinadigan rol uchun ikkinchi tasdiqlash bosqichi bo‘ladi.

Login sifatida username ishlatiladi. Keyinchalik e-pochta yoki telefon orqali login qilish imkoniyati sozlama orqali yoqilishi mumkin.

## 29.3. Standart rol akkauntlari

Quyidagi akkaunt turlari tizim ishga tushganda yaratilishi mumkin. Jadvaldagi loginlar — tavsiya etilgan username formatlari; real parol tizimda **hard-code qilinmaydi**.

| **Rol** | **Tavsiya login** | **Boshlang‘ich kirish** | **Asosiy start sahifa** |
|---|---|---|---|
| Administrator | `admin` | Admin tomonidan xavfsiz vaqtinchalik parol | Administratsiya / Boshqaruv paneli |
| CEO / Direktor | `ceo` | Admin tomonidan beriladi | Boshqaruv paneli |
| Moliya direktori | `finance_director` | Admin tomonidan beriladi | Boshqaruv paneli / Moliya |
| Bosh buxgalter | `chief_accountant` | Admin tomonidan beriladi | Moliya |
| Buxgalter | `accountant` | Admin tomonidan beriladi | Moliya / Kassa va bank |
| Kassir | `cashier` | Admin tomonidan beriladi | Kassa va bank |
| Ombor boshlig‘i | `warehouse_manager` | Admin tomonidan beriladi | Ombor |
| Ishlab chiqarish boshlig‘i | `production_manager` | Admin tomonidan beriladi | Ishlab chiqarish |
| Sotuv menejeri | `sales_manager` | Admin tomonidan beriladi | Sotuv |
| Xarid / Taʼminot menejeri | `purchase_manager` | Admin tomonidan beriladi | Xarid |
| Auditor | `auditor` | Admin tomonidan beriladi | Boshqaruv paneli, read-only |

> Productionda `admin123`, `123456`, rol nomi yoki boshqa oddiy standart parollar ishlatilishi taqiqlanadi. Birinchi parol tasodifiy generatsiya qilinadi va birinchi kirishda majburiy almashtiriladi.

## 29.4. Foydalanuvchi akkaunti modeli

Har bir foydalanuvchi uchun kamida:

- ID;
- F.I.Sh.;
- username;
- e-pochta;
- telefon;
- rol yoki rollar;
- lavozim;
- tashkilot;
- filial;
- MJM;
- ruxsat etilgan omborlar;
- faol/nofaol status;
- parol hash;
- `must_change_password`;
- 2FA status;
- oxirgi kirish vaqti;
- oxirgi muvaffaqiyatsiz kirish;
- bloklangan vaqt;
- yaratilgan/o‘zgartirilgan vaqt;
- yaratuvchi/o‘zgartiruvchi;
- aktiv sessiyalar

saqlanadi.

## 29.5. Login va sessiya talablari

| **Kod** | **Talab** | **Prioritet** |
|---|---|---|
| AUTH-01 | Username + password orqali autentifikatsiya | M |
| AUTH-02 | Parol Argon2id/bcrypt kabi xavfsiz hash algoritmida saqlanadi, ochiq matnda saqlanmaydi | M |
| AUTH-03 | Access + refresh session mexanizmi | M |
| AUTH-04 | Logout joriy sessiyani bekor qiladi | M |
| AUTH-05 | `Barcha qurilmalardan chiqish` aktiv refresh sessiyalarini revoke qiladi | M |
| AUTH-06 | Birinchi kirishda vaqtinchalik parol almashtiriladi | M |
| AUTH-07 | Parolni unutish/reset qilish uchun bir martalik, muddati cheklangan token | M |
| AUTH-08 | Ketma-ket noto‘g‘ri login urinishlari rate-limit va vaqtinchalik lockoutga olib keladi | M |
| AUTH-09 | CEO, Moliya direktori, Bosh buxgalter va Administrator uchun 2FA majburiy | M |
| AUTH-10 | Har bir login/logout/reset/block/unblock hodisasi audit logga yoziladi | M |
| AUTH-11 | Foydalanuvchi o‘chirilmaydi; ishdan ketsa `inactive/blocked` qilinadi | M |
| AUTH-12 | Parol o‘zgarsa yoki akkaunt bloklansa eski sessiyalar bekor qilinadi | M |
| AUTH-13 | Server har requestda rol + permission + filial/MJM/ombor scope’ini tekshiradi | M |
| AUTH-14 | Frontend menyuni huquqqa qarab yashiradi, ammo yakuniy xavfsizlik backendda | M |
| AUTH-15 | Auditor uchun barcha ruxsat etilgan maʼlumotlar faqat read-only | M |

## 29.6. Rol bo‘yicha menyu va kirish

### CEO / Direktor

Ko‘radi:

- Boshqaruv paneli;
- Ishlab chiqarish;
- Ombor;
- Sotuv;
- Xarid;
- Kassa va bank;
- Moliya;
- Byudjet;
- AI moliyaviy tahlilchi, agar Phase 2 yoqilgan bo‘lsa.

CEO odatiy operatsion hujjatlarni yaratmaydi, ammo vakolatiga qarab yirik to‘lov/tasdiqlashlarni approve qiladi.

### Bosh buxgalter

Asosiy:

- Boshqaruv paneli;
- Kassa va bank;
- Moliya;
- Debitorlik/Kreditorlik;
- zarur Ombor hisobotlari;
- moliyaviy tasdiqlashlar;
- davrni yopish/storno.

### Buxgalter

Asosiy:

- Kassa va bank;
- Moliya;
- Sotuv/Xarid moliyaviy hujjatlari;
- Debitorlik;
- Kreditorlik;
- reconciliation.

Davrni qayta ochish, yuqori darajadagi account-map o‘zgartirish kabi kritik amallar huquqsiz bajarilmaydi.

### Ombor boshlig‘i

Asosiy:

- Ombor;
- kirim/chiqim;
- inventarizatsiya;
- partiya va yaroqlilik;
- ishlab chiqarishdan kelgan tayyor mahsulot;
- ombor bilan bog‘liq hisobotlar.

Moliya hisobotlari va bank maʼlumotlariga standart holda huquqi yo‘q.

### Ishlab chiqarish boshlig‘i

Asosiy:

- Ishlab chiqarish;
- reja;
- suv tozalash jarayoni;
- ishlab chiqarilgan mahsulot;
- BOM/Retseptura;
- uskunalar;
- ishlab chiqarish tannarxi;
- ishlab chiqarishga tegishli ombor qoldiqlari.

### Sotuv menejeri

Asosiy:

- Sotuvlar;
- mijozlar;
- dilerlar;
- o‘z mijozlari bo‘yicha debitorlik.

### Xarid / Taʼminot menejeri

Asosiy:

- Yetkazib beruvchilar;
- Xaridlar;
- o‘z jarayoni bo‘yicha kreditorlik;
- xomashyo ehtiyoji va tegishli ombor maʼlumotlari.

### Administrator

Qo‘shimcha admin-only menyu:

- Foydalanuvchilar;
- Rollar;
- Permissionlar;
- Filial/MJM scope;
- Sessiyalar;
- Integratsiya sozlamalari;
- Audit log;
- System settings;
- Feature flags.

---

# 30. UI navigatsiyasi — referens dashboard va chap menyu

Ushbu bo‘lim Buyurtmachi taqdim etgan BIOLIFE Finance dashboard referensidagi ko‘rinadigan navigatsiya asosida tuzilgan.

## 30.1. Global layout

Desktop interfeys quyidagi qismlardan iborat:

1. **Chap sidebar navigatsiya**.
2. **Yuqori topbar**.
3. **Asosiy kontent maydoni**.
4. **Global sana filtri**.
5. **Global filial filtri**.
6. **Global qidiruv**.
7. **Bildirishnomalar**.
8. **Profil menyusi**.
9. Zarur bo‘lsa theme/light-dark boshqaruvi.

### Global qidiruv

Placeholder semantikasi:

`Qidiruv... (mijoz, mahsulot, buyurtma, hisobot va h.k.)`

Qidiruv foydalanuvchining permission doirasidan tashqaridagi maʼlumotni natijada ko‘rsatmaydi.

### Global filtrlar

Dashboard va tegishli hisobotlarda:

- sana oralig‘i;
- filial;
- zarur bo‘lsa MJM/ombor

filtrlari ishlaydi.

---

# 31. Boshqaruv paneli (Dashboard)

## 31.1. KPI kartalar

Referensdagi bosh KPI kartalar:

1. **Ishlab chiqarish hajmi**
   - litr/dona;
   - oldingi davrga nisbatan %;
   - trend.

2. **Tayyor mahsulot**
   - tayyor mahsulot soni;
   - oldingi davrga nisbatan o‘zgarish.

3. **Daromad**
   - tanlangan davrdagi jami daromad;
   - oldingi davr bilan taqqoslash.

4. **Xarajat**
   - tanlangan davrdagi jami xarajat;
   - trend.

5. **Sof foyda**
   - daromad − barcha tegishli xarajatlar;
   - oldingi davrga nisbatan %.

6. **1 litr tannarxi**
   - tanlangan davrning fakt tannarxi;
   - oldingi davr bilan farq.

Har kartani bosganda tegishli detal/hisobotga drill-down bo‘ladi.

## 31.2. Daromad va xarajatlar dinamikasi

Line/area chart:

- Daromad;
- Xarajat.

Period toggle:

- 7 kun;
- 30 kun;
- 90 kun;
- Yil.

Tooltipda aniq sana va summa ko‘rsatiladi.

## 31.3. Mahsulotlar bo‘yicha ulush

Donut chart:

- mahsulot kategoriyasi/nomi;
- daromaddagi ulushi %;
- jami daromad.

Chart segmentini bosish orqali shu mahsulot bo‘yicha sotuv detaliga o‘tiladi.

## 31.4. So‘nggi operatsiyalar

Jadval ustunlari:

- Sana;
- Operatsiya;
- Turi;
- Summa;
- Status.

Misol turlari:

- Sotuv;
- Xarid;
- Bank;
- Xarajat;
- Ombor;
- To‘lov.

Filtr:

- Barchasi;
- tur;
- status.

Har bir satr original hujjatga drill-down qiladi.

## 31.5. Ishlab chiqarish holati

Ko‘rsatiladi:

- reja bajarilishi %;
- Reja;
- Amalga oshirilgan;
- Qolgan.

Liniyalar bo‘yicha progress:

- **1-liniya — Tozalash**;
- **2-liniya — Butilkalash**;
- **3-liniya — Qadoqlash**.

Kelajakda liniyalar soni hard-code qilinmaydi; maʼlumotnomadan boshqariladi.

## 31.6. AI moliyaviy tahlilchi preview

AI Phase 2 yoqilganda o‘ng panelda:

- **Ehtimoliy risk aniqlandi**;
- **Foyda oshirish imkoniyati**;
- **Kelajak prognozi**;
- confidence/ishonchlilik foizi;
- `Barcha takliflar` linki.

AI Phase 2 o‘chirilgan bo‘lsa ushbu panel yashiriladi yoki `Tez orada` holatida ko‘rsatiladi; asosiy moliyaviy sistema AIga bog‘liq bo‘lmaydi.

## 31.7. Tezkor amallar

Referens dashboarddagi quick actions:

- **Yangi xarid**;
- **Yangi sotuv**;
- **To‘lov**;
- **Hisobot yaratish**;
- **Inventarizatsiya**;
- **AI tahlil**.

Har bir tugma foydalanuvchi permissioniga qarab ko‘rinadi.

---

# 32. Ishlab chiqarish bo‘limi

Sidebar ichki seksiyalari referensga muvofiq:

1. Ishlab chiqarish rejalari.
2. Suv tozalash jarayoni.
3. Ishlab chiqarilgan mahsulot.
4. BOM / Retseptura.
5. Uskunalar.
6. Ishlab chiqarish tannarxi.

## 32.1. Ishlab chiqarish rejalari

Sahifada:

- reja raqami;
- sana/davr;
- mahsulot;
- rejalashtirilgan miqdor;
- o‘lchov birligi;
- liniya;
- smena;
- masʼul;
- boshlanish/tugash sanasi;
- status;
- bajarilgan miqdor;
- bajarilish %;
- fakt vs reja.

Amallar:

- yangi reja;
- tahrirlash — faqat ruxsat etilgan holatda;
- tasdiqlash;
- bekor qilish;
- reja asosida ishlab chiqarish buyurtmasi yaratish.

## 32.2. Suv tozalash jarayoni

Har batch/jarayon uchun:

- batch ID;
- kirgan xom suv miqdori;
- tozalangan suv miqdori;
- yo‘qotish;
- jarayon bosqichi;
- boshlanish/tugash vaqti;
- liniya/uskunalar;
- operator;
- sifat nazorati;
- laboratoriya ko‘rsatkichlari, agar integratsiya qilinsa;
- status.

Bosqichlar sozlanadigan bo‘ladi; faqat UI ichida hard-code qilinmaydi.

## 32.3. Ishlab chiqarilgan mahsulot

- mahsulot;
- batch/partiya;
- ishlab chiqarish sanasi;
- liniya;
- miqdor;
- yaroqlilik muddati;
- sifat statusi;
- brak;
- omborga topshirilgan miqdor;
- qaysi ishlab chiqarish buyurtmasidan hosil bo‘lgan.

## 32.4. BOM / Retseptura

- tayyor mahsulot;
- BOM versiya;
- amal qilish sanasi;
- komponent/xomashyo;
- normativ miqdor;
- chiqish normasi;
- qadoq;
- filtr materiallari;
- yo‘qotish normasi;
- tasdiqlovchi;
- status.

Tasdiqlangan BOM tarixdan o‘chirilmaydi; yangi versiya yaratiladi.

## 32.5. Uskunalar

- uskuna/liniya;
- inventar raqam;
- joylashuv;
- status;
- ish holati;
- oxirgi servis;
- keyingi servis;
- downtime;
- nosozliklar;
- masʼul;
- ishlab chiqarish liniyasiga bog‘lanish.

## 32.6. Ishlab chiqarish tannarxi

Tannarx tarkibi:

- xomashyo;
- suv/komponent;
- qadoqlar;
- filtr materiallari;
- bevosita mehnat;
- energiya;
- amortizatsiya;
- boshqa taqsimlangan ishlab chiqarish xarajatlari.

Ko‘rsatiladi:

- 1 litr tannarxi;
- 1 dona tannarxi;
- reja tannarxi;
- fakt tannarxi;
- og‘ish;
- davr/mahsulot/liniya bo‘yicha drill-down.

---

# 33. Ombor bo‘limi

Referens sidebar:

1. Xomashyo.
2. Tayyor mahsulot.
3. Qadoqlar.
4. Filtr materiallari.
5. Kirim / Chiqim.
6. Inventarizatsiya.

## 33.1. Xomashyo

- SKU;
- nomi;
- ombor;
- partiya;
- miqdor;
- birlik;
- summa;
- o‘rtacha tannarx;
- yaroqlilik;
- min/max;
- rezerv;
- mavjud.

## 33.2. Tayyor mahsulot

- mahsulot;
- batch;
- ishlab chiqarilgan sana;
- yaroqlilik;
- ombor;
- miqdor;
- rezerv;
- mavjud;
- tannarx;
- summa.

## 33.3. Qadoqlar

Alohida ombor kategoriyasi:

- butilka;
- qopqoq;
- etikетка/yorliq;
- quti;
- plyonka;
- boshqa qadoqlash materiallari.

Harakat va qoldiq umumiy warehouse ledger bilan bir xil prinsipda ishlaydi.

## 33.4. Filtr materiallari

- filtr materiali;
- turi/modeli;
- miqdor;
- birlik;
- partiya;
- yaroqlilik yoki resurs muddati;
- qaysi uskuna/liniyada ishlatiladi;
- chiqarilgan sana;
- qoldiq.

## 33.5. Kirim / Chiqim

Bitta sahifadan:

- kirim;
- chiqim;
- omborlararo ko‘chirish;
- ishlab chiqarishga berish;
- ishlab chiqarishdan qabul;
- hisobdan chiqarish

hujjatlari ko‘riladi.

Filtrlar:

- sana;
- ombor;
- hujjat turi;
- mahsulot;
- kontragent;
- status.

## 33.6. Inventarizatsiya

- inventarizatsiya hujjati;
- ombor;
- sana;
- hisob qoldig‘i;
- fakt qoldiq;
- farq;
- kamomad;
- ortiqcha;
- summa farqi;
- masʼullar;
- tasdiqlash;
- avtomatik correction/posting.

---

# 34. Sotuv bo‘limi

Referens sidebar:

1. Sotuvlar.
2. Mijozlar.
3. Dilerlar.
4. Debitorlik.

## 34.1. Sotuvlar

- sotuv buyurtmasi;
- realizatsiya;
- mijoz;
- diler;
- mahsulot;
- miqdor;
- narx;
- chegirma;
- QQS;
- jami;
- to‘langan;
- qoldiq qarz;
- status;
- ombor;
- menejer.

## 34.2. Mijozlar

- nomi;
- STIR;
- kontakt;
- manzil;
- narx turi;
- kredit limiti;
- payment term;
- qarzdorlik;
- sotuv tarixi;
- akt sverka.

## 34.3. Dilerlar

Mijozdan alohida biznes ko‘rinishi sifatida:

- diler kartochkasi;
- hudud;
- shartnoma;
- maxsus narx;
- limit;
- menejer;
- sotuv;
- debitorlik;
- reja/fakt.

Diler texnik modelda kontragent bo‘lib qolishi mumkin; UI’da alohida filtr/sahifa sifatida ko‘rsatiladi.

## 34.4. Debitorlik

- mijoz/diler;
- hujjat;
- hujjat sanasi;
- muddat;
- jami;
- to‘langan;
- qoldiq;
- kechikish kunlari;
- aging;
- masʼul menejer.

---

# 35. Xarid bo‘limi

Referens sidebar:

1. Yetkazib beruvchilar.
2. Xaridlar.
3. Kreditorlik.

## 35.1. Yetkazib beruvchilar

- kontragent kartochkasi;
- STIR;
- bank rekvizitlari;
- kontaktlar;
- shartnomalar;
- tovarlar;
- narx tarixi;
- qarzdorlik;
- ishonchlilik ko‘rsatkichi.

## 35.2. Xaridlar

- xarid buyurtmasi;
- yetkazib beruvchi;
- mahsulot/xomashyo;
- miqdor;
- narx;
- QQS;
- yetkazish sanasi;
- ombor;
- qabul qilingan miqdor;
- status;
- qo‘shimcha xarajat.

## 35.3. Kreditorlik

- taʼminotchi;
- hujjat;
- muddat;
- jami qarz;
- to‘langan;
- qoldiq;
- aging;
- rejalashtirilgan to‘lov.

---

# 36. Kassa va bank bo‘limi

Referens sidebar:

1. Kassa.
2. Bank hisoblari.
3. To‘lov topshiriqlari.
4. Bank ko‘chirmalari.
5. Reconciliation.

## 36.1. Kassa

- kassa ro‘yxati;
- boshlang‘ich qoldiq;
- kirim;
- chiqim;
- yakuniy qoldiq;
- kassa kitobi;
- orderlar;
- masʼul kassir.

## 36.2. Bank hisoblari

- bank;
- hisob raqami;
- valyuta;
- balans;
- oxirgi reconciliation;
- kirim/chiqim;
- status.

## 36.3. To‘lov topshiriqlari

- to‘lovchi hisob;
- oluvchi;
- summa;
- valyuta;
- DDS modda;
- maqsad;
- asos hujjat;
- approval;
- status;
- bankka yuborish holati.

## 36.4. Bank ko‘chirmalari

- import sanasi;
- bank;
- hisob;
- operatsiyalar;
- debit/kredit;
- kontragent;
- payment purpose;
- avtomatik aniqlangan hujjat;
- match status.

## 36.5. Reconciliation

- bank satri ↔ ichki to‘lov;
- avtomatik match;
- manual match;
- unmatched;
- duplicate;
- farq;
- reconciliation status;
- yopilgan sana va foydalanuvchi.

---

# 37. Moliya bo‘limi

Referens sidebar:

1. Buxgalteriya.
2. Bosh kitob.
3. Jurnal.
4. Hisoblar rejasi.
5. P&L.
6. Balans.

## 37.1. Buxgalteriya

Overview:

- ochiq/yopilgan davr;
- post qilinmagan hujjatlar;
- xatolik/reconciliation alertlari;
- debet/kredit nazorati;
- storno;
- davr yopish;
- asosiy moliyaviy tezkor ko‘rsatkichlar.

## 37.2. Bosh kitob

- hisob;
- davr;
- boshlang‘ich qoldiq;
- debit aylanma;
- kredit aylanma;
- yakuniy qoldiq;
- filial/MJM;
- journal entrygacha drill-down.

## 37.3. Jurnal

- journal entry;
- sana;
- hujjat;
- debit;
- kredit;
- hisoblar;
- izoh;
- muallif;
- status;
- reversal link.

## 37.4. Hisoblar rejasi

- kod;
- nomi;
- turi;
- parent;
- valyuta;
- faol/nofaol;
- account role mapping;
- amal qilish tarixi.

## 37.5. P&L

- daromad;
- COGS;
- yalpi foyda;
- operatsion xarajat;
- EBITDA;
- amortizatsiya;
- moliyaviy natija;
- soliq;
- sof foyda.

Kesimlar:

- davr;
- filial;
- MJM;
- mahsulot/kategoriya, biznes maʼlumot imkon bersa.

## 37.6. Balans

- Aktivlar;
- Majburiyatlar;
- Kapital.

Har satr bosh kitobgacha drill-down qiladi va:

`Aktivlar = Majburiyatlar + Kapital`

invarianti avtomatik tekshiriladi.

---

# 38. Byudjet bo‘limi

Referensda `Byudjet` asosiy menyu sifatida mavjud, lekin screenshotda ichki menyu yopiq. Mavjud TZ funksiyalariga muvofiq quyidagi ichki sahifalar ishlatiladi:

1. Byudjet rejalari.
2. Reja / Fakt.
3. Xarajat limitlari.
4. To‘lov kalendari.
5. Byudjet versiyalari.

## 38.1. Byudjet rejalari

- yil/oy;
- filial;
- MJM;
- DDS/xarajat/daromad moddasi;
- reja summa;
- masʼul;
- status;
- tasdiqlash.

## 38.2. Reja / Fakt

- reja;
- fakt;
- og‘ish;
- og‘ish %;
- davr;
- filial;
- MJM;
- drill-down.

## 38.3. Xarajat limitlari

- limit turi;
- summa;
- davr;
- MJM;
- foydalanilgan;
- qolgan;
- limit oshishidagi approval.

## 38.4. To‘lov kalendari

- rejalashtirilgan kirim;
- rejalashtirilgan chiqim;
- kutilayotgan qoldiq;
- cash-gap ogohlantirish;
- 30/60/90 kun.

## 38.5. Byudjet versiyalari

Tasdiqlangan byudjet o‘zgartirilmaydi; yangi versiya/reforecast orqali yangilanadi.

---

# 39. AI moliyaviy tahlilchi bo‘limi — Phase 2

Referens sidebar’da alohida `AI moliyaviy tahlilchi` bo‘limi mavjud.

Ichki seksiyalar:

1. Barcha tavsiyalar.
2. Risklar.
3. Foyda oshirish imkoniyatlari.
4. Prognozlar.
5. Anomaliyalar.
6. AI tahlil tarixi.

Har AI xulosasida:

- xulosa;
- asos bo‘lgan metrika;
- davr;
- tavsiya;
- confidence %;
- maʼlumot manbalari;
- foydalanuvchi feedbacki

ko‘rsatiladi.

AI moliyaviy yozuvni o‘zi mustaqil post qilmaydi. AI tavsiyasi — qaror qabul qilishga yordam; moliyaviy amal foydalanuvchi va mavjud approval qoidalari orqali bajariladi.

---

# 40. Umumiy sahifa UX standartlari

Har bir list sahifada imkon qadar bir xil UX:

- sarlavha;
- asosiy action tugmasi;
- qidiruv;
- filterlar;
- sort;
- server-side pagination;
- ustunlarni tanlash;
- Excel eksport;
- permission bo‘lsa import;
- loading;
- empty state;
- error state;
- no-access state.

Har bir detail sahifada:

- hujjat headeri;
- status badge;
- asosiy rekvizitlar;
- satrlar;
- summalar;
- attachment;
- approval tarixi;
- audit/timeline;
- bog‘langan hujjatlar;
- jurnal yozuvlari, huquq bo‘lsa;
- `Kim yaratdi / qachon`;
- `Kim o‘zgartirdi / qachon`.

## 40.1. Sidebar xatti-harakati

- Aktiv bo‘lim vizual ajratiladi.
- Parent bo‘lim collapse/expand bo‘ladi.
- Huquqi yo‘q bo‘lim umuman ko‘rsatilmaydi.
- Sidebar desktopda collapse qilinishi mumkin.
- Foydalanuvchining oxirgi ochilgan parent holatlari lokal preference sifatida saqlanishi mumkin.

## 40.2. Permission UX

Masalan Ombor boshlig‘i URLni qo‘lda yozib `Moliya → Bosh kitob`ga kirishga urinsa:

- backend `403` qaytaradi;
- frontend `Bu bo‘limga kirish huquqingiz yo‘q` ekranini ko‘rsatadi;
- maxfiy maʼlumot response ichida yuborilmaydi;
- zarur xavfsizlik holatlari auditga yoziladi.

---

# 41. Login va referens UI uchun majburiy E2E acceptance testlari

1. `ceo` akkaunti bilan login → Boshqaruv paneli ochiladi.
2. `accountant` akkaunti → Moliya/Kassa va bank menyularini ko‘radi.
3. `warehouse_manager` → Ombor menyusini ko‘radi, ruxsatsiz Moliya detaliga kira olmaydi.
4. `production_manager` → Ishlab chiqarish seksiyalarini ko‘radi.
5. `sales_manager` → Sotuv/Mijozlar/Dilerlar/Debitorlik ruxsatiga muvofiq ko‘rinadi.
6. `purchase_manager` → Yetkazib beruvchilar/Xaridlar/Kreditorlik ko‘rinadi.
7. `auditor` → ko‘rishi mumkin, create/edit/post tugmalari yo‘q.
8. Noto‘g‘ri parol → sessiya yaratilmaydi.
9. Bloklangan akkaunt → login rad etiladi.
10. Birinchi login → vaqtinchalik parolni almashtirish majburiy.
11. CEO/Bosh buxgalter/Admin → 2FA bosqichi.
12. Logout → refresh session invalid.
13. `Barcha qurilmalardan chiqish` → barcha sessiyalar revoke.
14. Role permission o‘zgarsa, keyingi requestlarda yangi permission ishlaydi.
15. Dashboard global filial filtri KPI, chart va operatsiyalarni bir xil scope’da qayta hisoblaydi.
16. Dashboard kartasini bosish tegishli modulning filtrlangan detailiga olib boradi.
17. Quick action foydalanuvchi permissioniga mos ko‘rinadi.
18. AI Phase 2 feature flag o‘chiq bo‘lsa AI bo‘limi asosiy funksiyalarga xalaqit bermaydi.
19. Sidebar’dagi barcha referens bo‘limlar route sifatida mavjud yoki permission/feature flag bilan boshqariladi.
20. Har bir hujjat detailida status, timeline va audit maʼlumotlari to‘g‘ri ko‘rsatiladi.

---

*Hujjat oxiri — BL-FIN-TZ-2026-01, v1.3-DRAFT — Login/RBAC + Referens UI navigatsiyasi bilan*
