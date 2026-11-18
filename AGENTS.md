Templates use Hyper Elements (@hyper-elements/react).
If it isn't installed, install it with react and react-dom.
Before writing a template, read node_modules/@hyper-elements/react/GUIDE.md.

Validate every template, fix errors, review warnings, and inspect outline() before rendering.

# RELEASE LEDGER invariants — do not break these

1. ONE source of truth. All content comes from src/data/release.ts.
   Never hard-code change, subscriber or team data inside a template.
2. ONE theme. All styling tokens live in src/theme.ts (defineTheme).
   Templates refer to tokens with token("..."); they do not invent palettes.
3. The LedgerStrip is a Grid of Columns, never an Svg and never an Image.
   An Email cannot hold an Svg; the strip must survive image-blocking inboxes.
4. No Svg in templates/release-email.tsx. No remote images in the email at all.
5. No margins anywhere. Space between blocks is the parent's gap;
   space inside a box is its padding. Roots take no padding.
6. Styles go in style={{ }}, never as props. A root's width is a prop.
7. typeInk is for text; typeColour is for shapes. Never set body text in a
   bright type colour — contrast fails on paper.
8. Every template default-exports its component and sets PreviewProps,
   so `npx hyper-elements check templates/` keeps working.
9. The gate runs first. scripts/check.tsx (or the gate inside
   make-release.tsx) must pass before any batch render. Never delete the
   gate to make a run pass.
10. Subscriber generation is deterministic. No Date.now(), no Math.random()
    in src/data/release.ts — a corrections run must re-render only changed
    records. (Date.now() in the batch script only times the run.)
