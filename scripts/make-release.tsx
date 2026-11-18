import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import ReleaseEmail from "../templates/release-email";
import ReleaseNotesDocument from "../templates/release-notes-document";
import { ReleaseCanvas } from "../templates/announcement-canvas";
import { release, makeSubscribers } from "../src/data/release";
import type { ChangeType } from "../src/data/release";

/**
 * The batch: one release file -> a personalised announcement email for
 * every subscriber workspace, the multi-team sign-off PDF, and one
 * announcement card per change type.
 *
 *   npm run make               85 subscriber emails + PDF + 4 cards
 *   npm run make:sample        6 emails, for a quick look
 *
 * The gate runs first: the release email is validated before a single
 * file is written, so one bad change entry never becomes 85 bad emails.
 * Subscriber generation is deterministic — a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 85;
const started = Date.now();

const gate = validate(<ReleaseEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/releases", { recursive: true });
const subscribers = makeSubscribers(count);
let emails = 0;
for (const subscriber of subscribers) {
  const { html, text } = await render(
    <ReleaseEmail subscriber={subscriber} />,
  );
  const stem = `out/releases/${subscriber.ref.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const notes = await renderPdf(<ReleaseNotesDocument />);
await writeFile("out/release-notes.pdf", notes.pdf);

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  for (const focus of ["added", "changed", "fixed", "breaking"] as ChangeType[]) {
    const { image } = await renderImage(
      <ReleaseCanvas focus={focus} />,
      { fonts },
    );
    await writeFile(`out/releases/card-${focus}.png`, image);
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  release: `${release.product} ${release.version}`,
  emails,
  signoffPages: release.teams.length,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
