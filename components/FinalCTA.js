import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";

export function FinalCTA() {
  return (
    <AnimatedSection id="demo" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-teal-700/25 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 p-6 shadow-xl shadow-brand-950/25 sm:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-300/90">Free demo</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  See how Victoria Leads AI fits your business
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  Tell us about your trade or service business. We’ll walk through lead capture, notifications,
                  automated follow-up, tracking, and how we support ads and creative—so you can turn marketing into
                  measurable revenue.
                </p>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-white/90">
                <div>✓ Clear plan in one short call</div>
                <div>✓ No fluff—systems, creative, and campaign support explained</div>
                <div>✓ Built for local Victoria-area trades and service companies</div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-lg ring-1 ring-white/10">
                <div className="text-sm font-semibold text-brand-900">Book a free demo</div>
                <div className="mt-1 text-xs text-slate-500">We reply within one business day.</div>
                <div className="mt-5">
                  <LeadForm compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
