import Head from "next/head";
import { CampaignBriefForm } from "@/components/CampaignBriefForm";
import { Container } from "@/components/Container";

const title = "Start your campaign | Victoria Leads AI";
const description =
  "Submit a short campaign brief for your Victoria-area trade or service business. Victoria Leads AI helps with ads, creative, lead capture, and follow-up automation.";

export default function StartYourCampaignPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <div className="min-h-screen bg-hero-mesh">
        <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/85 backdrop-blur-md">
          <Container className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-brand-900 text-xs font-bold tracking-tight text-white shadow-md shadow-teal-900/15">
                VL
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-brand-900">Victoria Leads AI</div>
                <div className="text-xs text-slate-500">Campaign brief</div>
              </div>
            </a>
            <a
              href="/"
              className="text-sm font-medium text-slate-600 transition hover:text-brand-900"
            >
              Back to home
            </a>
          </Container>
        </header>

        <main>
          <Container className="py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Client intake</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-900 sm:text-4xl">
                Tell us about the campaign you want to run
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                A few focused questions help us understand your business, your customers, and what a winning campaign
                looks like—so we can move fast with clear recommendations.
              </p>
              <p className="mt-3 text-sm font-medium text-slate-700">
                This only takes a few minutes. You can move step by step—save the thinking for the fields, not the form.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <CampaignBriefForm />
            </div>
          </Container>
        </main>

        <footer className="border-t border-slate-200/90 bg-white/80 py-8">
          <Container className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-600 sm:flex-row sm:text-left">
            <div>
              <div className="font-semibold text-brand-900">Victoria Leads AI</div>
              <div className="text-xs text-slate-500">Victoria, BC &amp; surrounding areas</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/#how" className="transition hover:text-brand-900">
                How it works
              </a>
              <a href="/#pricing" className="transition hover:text-brand-900">
                Pricing
              </a>
              <a href="mailto:info@victorialeads.ca" className="transition hover:text-brand-900">
                info@victorialeads.ca
              </a>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}
