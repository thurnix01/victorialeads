import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";

export function FinalCTA() {
  return (
    <AnimatedSection id="demo" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 sm:p-10 text-white shadow-sm">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Free demo</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Stop Waiting for Referrals. Start Getting Leads Consistently.
                </h2>
                <p className="mt-4 text-white/75 leading-relaxed">
                  Tell us a bit about your roofing business. We’ll show you exactly how the AI Lead Engine can generate
                  leads in Victoria.
                </p>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-white/85">
                <div>✓ Clear plan in one short call</div>
                <div>✓ No contracts, no fluff</div>
                <div>✓ Built for roofing companies</div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-white/10">
                <div className="text-sm font-semibold text-slate-900">Book a Free Demo</div>
                <div className="mt-1 text-xs text-slate-500">We reply within 1 business day.</div>
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

