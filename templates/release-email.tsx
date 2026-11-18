import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Text,
} from "@hyper-elements/react";
import { release } from "../src/data/release";
import type { Release, Subscriber } from "../src/data/release";
import { ledgerTheme } from "../src/theme";
import {
  BreakingBlock,
  ChangeTable,
  CountLine,
  KitFooter,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1 — The release announcement email (Email root -> email-safe
 * HTML + a plain-text twin from the same render).
 *
 * No Svg, no remote images: the LedgerStrip is layout, so the release
 * survives image-blocking inboxes. Breaking changes lead — in a release
 * email, the two things that can break you matter more than the seven
 * that cannot.
 */
export function ReleaseEmail({
  rel = release,
  subscriber,
}: {
  rel?: Release;
  subscriber?: Subscriber;
}) {
  return (
    <Email
      theme={ledgerTheme}
      width={600}
      previewText={`${rel.changes.length} changes on the record, 2 of them breaking. Read those first.`}
      title={`${rel.product} ${rel.version} release notes`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark rel={rel} />
        <Heading level={1} style={{ mobile: { fontSize: 25 } }}>
          {rel.version} is live, <MergeTag name="first_name" />
        </Heading>
        <Text>{rel.summary}</Text>
        <CountLine rel={rel} />
        <BreakingBlock rel={rel} />
        <ChangeTable rel={rel} />
        <Button href="https://ledgerline.example/releases/4-2-0">
          Read the full release notes
        </Button>
        {subscriber ? (
          <Text style={{ apply: ["quiet"] }}>
            Sent to the {subscriber.plan} workspace {subscriber.ref}. Your
            upgrade window opens tonight; nothing changes until you accept
            it.
          </Text>
        ) : null}
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive release email because you run Ledgerline.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

ReleaseEmail.PreviewProps = { rel: release };
export default ReleaseEmail;
