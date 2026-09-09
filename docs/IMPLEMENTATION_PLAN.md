# Implementatsiya rejasi

## 1. UI foundation — bajarildi

TZ 1.3 dagi referens dashboard, sidebar va rol start sahifalari uchun React/Vite baza yaratildi.

## 2. Backend foundation

Node/NestJS modular monolith:

- `auth`: access/refresh session, Argon2id, lockout, 2FA hook;
- `iam`: user, role, permission, branch/MJM/warehouse scope;
- `ledger`: chart of accounts, journal, posting rules, period close, reversal;
- `operations`: sales, purchases, warehouse, production, cash/bank;
- `reports`: P&L, balance, cash flow, aging and dashboard read models.

## 3. Data integrity gates

- Debit = credit before posting;
- Asset = liability + equity;
- financial amounts never float;
- posted rows immutable;
- idempotency key and optimistic locking on mutations;
- append-only audit log;
- tenant/branch/scope filters enforced at query/service layer.

## 4. Verification gates

- `npm run build` — passed 09.09.2026;
- local dev server `http://127.0.0.1:4173/` — HTTP 200;
- browser visual QA — unavailable in current environment (no browser surface exposed);
- backend/API, database migrations and E2E — not yet implemented.
