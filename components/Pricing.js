import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function Pricing() {
  return (
    <AnimatedSection id="pricing" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Pricing</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              One clear investment. Full system.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              Built for owners who want predictable inbound—not another DIY course. Ad spend is billed separately to
              the platforms.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-ink/15 bg-white p-7 sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-bold text-ink">Revenue Builder</p>
                  <p className="mt-1 text-sm text-ink/50">Automation · creative · campaign support</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-ink">$1,500</p>
                  <p className="text-sm text-ink/50">per month</p>
                </div>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-ink/75">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-sea" aria-hidden />
                  Capture, notify, nurture, track, and optimize in one package
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-sea" aria-hidden />
                  AI copy + Figma creative for Google Ads and Meta
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-sea" aria-hidden />
                  Campaign brief workflow when you’re ready to launch
                </li>
              </ul>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <p className="font-display text-base font-bold text-ink">Launch commitment</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  If we don’t get your lead capture and follow-up live within 7 days of a completed campaign brief
                  (assuming you provide assets and approvals on time), your first month is on us.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#demo" className="inline-flex flex-1">
                  <Button as="span" className="w-full">
                    Book a free demo
                  </Button>
                </a>
                <a href="/start-your-campaign/" className="inline-flex flex-1">
                  <Button as="span" variant="secondary" className="w-full">
                    Submit a campaign brief
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
