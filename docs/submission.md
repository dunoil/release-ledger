# Competition submission — Release Ledger (prepared 18 Nov 2026, submit 19 Nov 2026)

Target: GitHub Discussions → **Challenge Submissions** in `hyper-elements/hyper-elements`
Repository (create on submission day): https://github.com/dunoil/release-ledger
All numbers below come from the actual run on 18 Nov 2026 (`out/checks.json`, `out/batch.json`).

---

### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
RELEASE LEDGER — Every version, on the record: a software release kit (announcement email, release page, sign-off PDF, announcement cards from one release file)

### Project description

One release file in → **85 personalised announcement emails, a 4-page sign-off PDF, a public release page and 4 announcement cards** out — from one theme and one set of shared components.

Release notes fail in a predictable way: the email says one thing, the website another, and the document that was signed says a third. This kit makes that impossible by construction. Every change carries a **ledger id** (`RL-1042`) from the one release file: the email quotes it, the page's cards carry it, and the sign-off sheet prints it next to the signature line.

- **Announcement email** (`Email` → `render()`) — breaking changes lead, in their own ruled block, before the full change table. No Svg, no remote images: the LedgerStrip (one cell per change, coloured by type, in ledger order) is a `Grid` of `Column`s, so it survives image-blocking inboxes. `MergeTag` greeting; plain-text twin from the same render.
- **Release page** (`Page` → `render()`) — dark ledger hero, every change as a typed `ledger.ChangeEntry` card, phone styles, no client-side JavaScript.
- **Sign-off notes** (`Document` → `renderPdf()`) — the formal record: one A4 sheet per signing team (Engineering, Support, Finance Ops, Compliance), `PageHeader`/`PageFooter` with `PageNumber`, the same change table the email sent, and name/signature/date lines plus a dissent line. No browser makes this PDF.
- **Announcement cards** (`Canvas` → `renderImage()`) — 1080×1080 PNGs, one per change type, each led by that type's colour and count. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (18 Nov 2026):** 85 subscriber emails · 4 sign-off pages in one PDF · 4 announcement cards · **gate: 0 errors, 0 warnings** · full batch in **2.2s**.

**Corrections pass:** subscriber generation is deterministic (no clock, no randomness), so fixing one record re-renders only that record — the other 84 emails are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/release-ledger

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots — cool paper, slate ink, signal blue, a sans + mono pairing, named `card`/`stamp`/`mono` styles, Button variants, per-format overrides. One deliberate constraint shaped it: phone styles are an error in a Document or a Canvas, so the theme carries no `mobile` blocks — Email/Page templates set their own.
- **Shared components across roots** (`Wordmark`, `LedgerStrip`, `CountLine`, `ChangeTable`, `BreakingBlock`) are why the emailed change and the signed change are the same change.
- **The mark is built from layout primitives on purpose.** An Email cannot hold an Svg, so the LedgerStrip is a Grid of Columns — and it recolours automatically per release, because the colours are data on the changes.
- **A custom element with `defineElement()`**: `ledger.ChangeEntry` with typed props (`prop.text`, `prop.choice`). A mistyped change type is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 18 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (85 emails) · `npm run make:sample` (6) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the announcement email (HTML + plain text), the release page, the sign-off notes as a PDF and the announcement card PNG, all from the demo run — and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026 for the SOWN entry; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.
