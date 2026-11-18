# RELEASE LEDGER — design notes

## Concept

A template kit for a software product's release day. One release file
renders the announcement email, the public release page, the sign-off
release notes (PDF) and the announcement cards. Domain and style are
deliberately the opposite pole from a warm editorial kit: cool paper
`#eef1f4`, slate ink `#101c28`, signal blue `#1d4ed8`, all-sans Inter
with monospace stamps, and a colour per change type carried as data
(green/blue/amber/red — each with a darkened ink ≥ 4.5:1 for text).

Signature: the **LedgerStrip** — one cell per change, coloured by type,
in ledger order — plus the **ledger id** (`RL-1042`) that follows every
change from the data file into the email, the page cards and the
signature sheet. Trust through traceability: that is the product idea
and the design idea at once.

## Build lessons (from the gate, all fixed)

1. Theme element defaults are flat style objects — no `style:` wrapper,
   and no nested `elements` inside a Table entry (`TableCell` gets its
   own top-level entry).
2. Theme defaults reject `padding: {x, y}` — use the array form
   `[vertical, horizontal]` there (and, in this version, in Section
   styles too).
3. `TableCell` holds text and inline `Span`s directly — never a nested
   `Text`. Inline runs inside `Text` are `Span`s, not nested `Text`s.
4. An Email has no `subject` prop and a root has no padding.
5. A theme Button `color` fights Section token inheritance
   (`theme/inherited` warning) — the `primaryForeground` role does that
   job.
6. Font weight 800 with only 400/700 files given draws at 700 in PDF/PNG
   with a warning — headings now sit at 700 so every output agrees.
