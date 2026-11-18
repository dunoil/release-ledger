import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
  token,
} from "@hyper-elements/react";
import { release } from "../src/data/release";
import type { Release } from "../src/data/release";
import { countByType, typeColour, typeLabel } from "../src/data/release";
import { ledgerTheme } from "../src/theme";
import { LedgerStrip } from "../src/components/shared";

/**
 * OUTPUT 4 — The announcement card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square social card rendered on the server with renderImage(). The
 * batch makes one card per change type (4 cards), each led by that
 * type's colour and count; this default export is the "all changes"
 * card. Fonts are passed in as bytes by the scripts; nothing is fetched.
 */
export function ReleaseCanvas({
  rel = release,
  focus,
}: {
  rel?: Release;
  focus?: "added" | "changed" | "fixed" | "breaking";
}) {
  const headline = focus
    ? `${countByType(rel.changes, focus)} ${typeLabel[focus].toLowerCase()} in ${rel.version}`
    : `${rel.product} ${rel.version} is live`;
  const accent = focus ? typeColour[focus] : "#1d4ed8";
  return (
    <Canvas
      theme={ledgerTheme}
      width={1080}
      height={1080}
      title={`${rel.product} ${rel.version} — ${headline}`}
      lang="en"
      style={{ padding: 72, gap: 28, justifyContent: "space-between" }}
    >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <LedgerStrip changes={rel.changes} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2 }}>
            {rel.product.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20, color: token("colors.muted") }}>
            Release {rel.version} · {rel.codename}
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 24 }}>
        <Column style={{ backgroundColor: accent, height: 18, borderRadius: 4 }} />
        <Text style={{ apply: ["eyebrow"], fontSize: 20 }}>
          {rel.date}
        </Text>
        <Heading level={1} style={{ fontSize: 76, lineHeight: 1.1 }}>
          {headline}
        </Heading>
        <Text style={{ fontSize: 28 }}>
          {rel.changes.length} changes on the record — each with a ledger
          id you can quote back to us.
        </Text>
      </Column>

      <Column style={{ gap: 14 }}>
        <Text style={{ apply: ["mono"], fontSize: 22, color: token("colors.muted") }}>
          {(["added", "changed", "fixed", "breaking"] as const)
            .map((t) => `${countByType(rel.changes, t)} ${typeLabel[t].toLowerCase()}`)
            .join("  ·  ")}
        </Text>
        <Text style={{ fontSize: 20, color: token("colors.muted") }}>
          {rel.product} · Every version, on the record · Full notes in the
          release email, on the release page and in the signed record.
        </Text>
      </Column>
    </Canvas>
  );
}

ReleaseCanvas.PreviewProps = { rel: release };
export default ReleaseCanvas;
