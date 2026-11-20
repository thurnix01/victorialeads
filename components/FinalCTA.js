import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";

export function FinalCTA() {
  return (
    <AnimatedSection id="demo" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">Free demo</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              See the system against your real calendar.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              Tell us about your trade or service business. We’ll walk through capture, follow-up, creative, and how
              campaigns turn into booked work—without the fluff.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex gap-3">
                <span className="text-signal" aria-hidden>
                  →
                </span>
                Clear plan in one short call
              </li>
              <li className="flex gap-3">
                <span className="text-signal" aria-hidden>
                  →
                </span>
                Built for Victoria-area trades and service companies
              </li>
              <li className="flex gap-3">
                <span className="text-signal" aria-hidden>
                  →
                </span>
                Prefer to skip the call?{" "}
                <a href="/start-your-campaign/" className="underline underline-offset-4 hover:text-white">
                  Start a campaign brief
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-white/15 bg-white p-6 text-ink sm:p-8">
              <div className="font-display text-lg font-bold text-ink">Book a free demo</div>
              <p className="mt-1 text-sm text-ink/50">We reply within one business day.</p>
              <div className="mt-6">
                <LeadForm compact />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
