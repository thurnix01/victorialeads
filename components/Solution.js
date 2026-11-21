import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

export function Solution() {
  return (
    <AnimatedSection id="system" className="scroll-mt-24 overflow-hidden bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">The system</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              One revenue engine—not a pile of tools.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65">
              Victoria Leads is the done-for-you version of what “AI lead gen” courses sell as a DIY side hustle:
              capture, nurture, creative, and campaign support wired for local trades who need jobs—not another
              dashboard.
            </p>

            <dl className="mt-10 space-y-6">
              {[
                {
                  t: "Every lead hits your phone and inbox",
                  d: "When someone requests a quote, you get notified in seconds—and the lead is logged so nothing dies in a missed call.",
                },
                {
                  t: "Prospects stay warm while you’re on site",
                  d: "Automated replies and follow-up keep the conversation moving until you (or your team) book the job.",
                },
                {
                  t: "Ads that sell the job, not a vibe",
                  d: "Google and Meta copy + Figma creative matched to your offer, area, and CTA—so clicks become booked work.",
                },
              ].map((row) => (
                <div key={row.t} className="border-l-2 border-sea pl-5">
                  <dt className="font-display text-lg font-bold text-ink">{row.t}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/60">{row.d}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-6">
            <div
              className="aspect-[4/5] w-full bg-cover bg-center sm:aspect-[5/4] lg:aspect-[4/5]"
              style={{ backgroundImage: "url(/section-workshop.jpg)" }}
              role="img"
              aria-label="Trade work underway"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-ink/90 p-5 text-white sm:p-6">
              <p className="font-display text-lg font-bold">Built for Victoria-area trades</p>
              <p className="mt-1 text-sm text-white/65">HVAC · plumbing · electrical · roofing · home services · more</p>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
