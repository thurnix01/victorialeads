import Head from "next/head";
import { CampaignBriefForm } from "@/components/CampaignBriefForm";
import { Container } from "@/components/Container";

const title = "Campaign brief | Victoria Leads";
const description =
  "Submit a campaign brief for your Victoria-area trade or service business. Victoria Leads helps with ads, creative, and lead automation.";

/** Same intake as `/start-your-campaign`, on a short URL you can share or link from docs. */
export default function CampaignBriefPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <div className="min-h-screen bg-paper">
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
          <Container className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center bg-ink text-[11px] font-bold tracking-[0.12em] text-white">
                VL
              </span>
              <div className="leading-tight">
                <div className="font-display text-base font-bold text-ink">Victoria Leads</div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">Campaign brief</div>
              </div>
            </a>
            <a href="/" className="text-sm font-medium text-ink/60 transition hover:text-ink">
              Back to home
            </a>
          </Container>
        </header>

        <main>
          <Container className="py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Client intake</p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Campaign brief</h1>
              <p className="mt-4 text-base text-ink/65 sm:text-lg">
                Tell us about your business and what you want this campaign to achieve. It only takes a few minutes.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <CampaignBriefForm />
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}
