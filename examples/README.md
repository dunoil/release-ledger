# Examples — real artefacts from the demo run

Produced by `npm run render` on the sample release in
`src/data/release.ts` (Ledgerline 4.2.0 "Double Entry"). Nothing here is
hand-made: if it is in this folder, the library rendered it.

- `release-email.html` / `release-email.txt` — the announcement email
  and its plain-text twin (the greeting shows `{{first_name}}` because
  the sample renders the template itself; the batch fills real names).
- `release-page.html` — the public release page.
- `release-notes.pdf` — the sign-off record: one A4 sheet per team.
- `announcement-card.png` — the square announcement card (1080×1080).

Regenerate everything with `npm run check && npm run render`.
