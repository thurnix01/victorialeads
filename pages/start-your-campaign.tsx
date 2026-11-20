import { Seo } from "@/components/Seo";
import { CampaignBriefForm } from "@/components/CampaignBriefForm";
import { Container } from "@/components/Container";

const title = "Start your campaign | Victoria Leads";
const description =
  "Submit a short campaign brief for your Victoria-area trade or service business. Victoria Leads helps with ads, creative, lead capture, and follow-up automation.";

export default function StartYourCampaignPage() {
  return (
    <>
      <Seo title={title} description={description} path="/start-your-campaign/" />

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
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Tell us about the campaign you want to run
              </h1>
              <p className="mt-4 text-base text-ink/65 sm:text-lg">
                A few focused questions help us understand your business, your customers, and what a winning campaign
                looks like—so we can move fast with clear recommendations.
              </p>
              <p className="mt-3 text-sm font-medium text-ink/80">
                This only takes a few minutes. You can move step by step—save the thinking for the fields, not the form.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <CampaignBriefForm />
            </div>
          </Container>
        </main>

        <footer className="border-t border-ink/10 bg-paper py-8">
          <Container className="flex flex-col items-center justify-between gap-4 text-center text-sm text-ink/60 sm:flex-row sm:text-left">
            <div>
              <div className="font-display font-bold text-ink">Victoria Leads</div>
              <div className="text-xs text-ink/45">Victoria, BC &amp; surrounding areas</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/#how" className="transition hover:text-ink">
                How it works
              </a>
              <a href="/#pricing" className="transition hover:text-ink">
                Pricing
              </a>
              <a href="mailto:info@victorialeads.ca" className="transition hover:text-ink">
                info@victorialeads.ca
              </a>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}
