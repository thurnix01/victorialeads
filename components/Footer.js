import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-display text-lg font-bold text-ink">Victoria Leads</div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/55">
              Automated lead generation &amp; revenue systems for trades and service businesses in Victoria, BC and
              surrounding areas.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="#how" className="text-ink/60 transition hover:text-ink">
              How it works
            </a>
            <a href="#features" className="text-ink/60 transition hover:text-ink">
              What’s included
            </a>
            <a href="#pricing" className="text-ink/60 transition hover:text-ink">
              Pricing
            </a>
            <a href="/start-your-campaign/" className="text-ink/60 transition hover:text-ink">
              Campaign brief
            </a>
            <a href="mailto:info@victorialeads.ca" className="text-ink/60 transition hover:text-ink">
              info@victorialeads.ca
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink/40">
          © {new Date().getFullYear()} Victoria Leads AI. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
