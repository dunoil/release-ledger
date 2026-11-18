import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Text,
  token,
} from "@hyper-elements/react";
import { release } from "../src/data/release";
import type { Release } from "../src/data/release";
import { ledgerTheme } from "../src/theme";
import {
  BreakingBlock,
  CountLine,
  KitFooter,
  LedgerStrip,
} from "../src/components/shared";
import { ChangeEntryCard } from "../src/components/change-entry";

/**
 * OUTPUT 2 — The public release page (Page root -> responsive web HTML,
 * no client-side JavaScript).
 *
 * The email's public twin. Where the email must survive Outlook, the page
 * gets the full grid: every change as a typed ledger.ChangeEntry card,
 * breaking changes called out above the fold.
 */
export function ReleasePage({ rel = release }: { rel?: Release }) {
  return (
    <Page
      theme={ledgerTheme}
      width={1100}
      title={`${rel.product} ${rel.version} — ${rel.codename} release notes`}
      description={rel.summary}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#101c28",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#eef1f4",
            muted: "#aeb9c4",
            primary: "#7aa5ff",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#7aa5ff",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`Release ${rel.version} — ${rel.codename} · ${rel.date}`}
            </Text>
            <Heading
              level={1}
              style={{ fontSize: 44, mobile: { fontSize: 30 } }}
            >
              Every version, on the record.
            </Heading>
            <Text style={{ fontSize: 17 }}>{rel.summary}</Text>
            <CountLine rel={rel} />
            <Row style={{ gap: 12 }}>
              <Button href="https://ledgerline.example/signup">
                Start with {rel.version}
              </Button>
              <Button
                href="https://ledgerline.example/releases"
                variant="secondary"
                style={{ color: "#101c28" }}
              >
                All releases
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 10 }}>
            <LedgerStrip changes={rel.changes} cell={20} />
            <Text style={{ apply: ["quiet"], color: "#aeb9c4" }}>
              The ledger strip: one cell per change, coloured by type, in
              ledger order — the same mark your email and sign-off sheet
              carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <BreakingBlock rel={rel} />
        <Heading level={2}>The nine changes</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {rel.changes.map((change) => (
            <ChangeEntryCard
              key={change.id}
              entryId={change.id}
              kind={change.type}
              scope={change.scope}
              title={change.title}
              detail={change.detail}
            />
          ))}
        </Grid>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Every change carries the ledger id it was reviewed under. Quote
          one to support and we open the same record you are reading.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

ReleasePage.PreviewProps = { rel: release };
export default ReleasePage;
