# Biolife functional audit — 2026-09-09

## Release verdict

NOT READY for production sale as a complete financial ERP. The application is a React prototype backed by persistent JSON with a real Gemini connection. API-backed seed records remain synthetic; relabeling them does not make them real company transactions.

## Fixed in this audit

- AI: changed from Gemini 3.6 Flash to an available Gemini 3.5 Flash-Lite model, minimal thinking, bounded output, relevant context, incremental NDJSON responses, cancellation, 20-second upstream deadline, 60-second cache keyed by context/model/history/prompt. Failures are visible errors, not fabricated fallback analysis.
- AI: bounded recent conversation context; abort on unmount; prevent clearing during generation; removed fabricated KPI fallback values and unconditional Online label.
- Record forms: create and edit persist to the active section; automatic UUID code when blank; error feedback; refresh list without logout or page reload.
- CRUD: invalid sections and malformed rows rejected; duplicate codes rejected; identity preserved on edit; finalized record changes/deletion rejected.
- Persistence: serialized mutations with atomic file replacement; delete retains a recovery copy in `trash`; mutations add audit events. This is a single-process local safeguard, NOT an accounting ledger or tamper-proof audit.
- Analytics: removed numeric sums/averages that incorrectly parsed heterogeneous values such as `98 400 L → 84 260 L`, `245M / 232M`, `Farq: 0`. Counts and status counts remain real computations.
- Dashboard: removed fixed 76.4% and calculates an explicitly labeled line average; removed dead global search/date/notification/more controls; chart period switches data; save refreshes without logout.
- CSV export is accurately labeled; quotes, Unicode BOM and spreadsheet formula prefixes handled.

## Verification

- `node tools/audit-test.mjs`: 40 section reads match their distinct JSON rows; create/update/delete; disk persistence; duplicate rejection; invalid section rejection; finalized-record protection; 10 parallel writes preserved; empty AI prompt rejected.
- Tests use an isolated database in `backups/test-*`; real company records are not modified. The deleted test record is retained only in the isolated test trash.
- React production build passed. Large bundle warning remains.
- Real Gemini test: first text 6,199 ms, complete 6,309 ms; repeat request 8 ms. Prior observed full response ~42 seconds. These are individual measurements, not p95/SLA guarantees.
- Browser visual/E2E checks have not been completed in this audit. Build success is not proof of UI acceptance.

## Remaining mandatory work, ordered by risk

1. CRITICAL — Login is still a client-side role selector, ignores password and has no server auth. API has no authenticated user/role/branch scope. Do not expose this server publicly. Implement individual accounts, password hashing, sessions, role/scope checks, lockout, mandatory 2FA for privileged roles and session revocation (TZ 29).
2. CRITICAL — No double-entry accounting engine, approved account map, effective-date tax configuration, closed periods, reversal workflow or reconciliation invariants. Generic status locks implemented here do not replace these requirements (TZ 6, 18, 20).
3. HIGH — Existing summary/chart/product-mix values are precomputed seed snapshots. Adding records does not generate journal entries or recompute P&L/balance/DDS. Use normalized documents and exact minor-unit/decimal fields; derive reports from posted ledger data.
4. HIGH — Generic five-cell rows are not full detail models. Contracts, product lines, contacts, quantities, units, VAT, attachments, links, versioning, branches and timelines need module-specific validated schemas. Sample bank identifiers and STIR are not verified business data.
5. HIGH — JSON storage supports one process only. PostgreSQL migrations/constraints, transaction/idempotency controls and tested backup restore remain required. Audit entries currently have no authenticated actor.
6. HIGH — Approvals, posting, storno, imports, true XLSX/PDF export, inventory valuation/BOM consumption, bank and Didox integrations remain absent.
7. HIGH — Gemini has access to the passed database context without user permission scoping because auth is absent. Rotation of the chat-exposed API credential is required before release; secret remains server-side and ignored by Git.
8. MEDIUM — Department navigation lacks stable URLs/deep links/back behavior; module tables have no real server pagination/sorting. Full keyboard/modal focus handling, responsive browser verification, error and race-condition tests remain.
9. MEDIUM — Dashboard quick links and generic create-operation workflow are not integrated domain workflows. Some snapshot descriptions use August data while implying current-day status.
10. MEDIUM — Production CI, monitoring, dependency pinning/reproducible release policy, TLS deployment, support/SLA, load testing and UAT acceptance have not been established.

## Required business inputs before accounting release

TZ sections 16 and 27 explicitly leave the approved account map, posting policy, valuation and closing rules, integration provider credentials and migration sign-off open. Confirm these with the responsible accountant/customer; do not invent accounting policy. Real data must be supplied/imported and reconciled before seed records can be replaced responsibly.
