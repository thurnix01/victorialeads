import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

function Step({ number, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
          <span className="text-sm font-semibold">{number}</span>
        </div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <AnimatedSection id="how" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              How it works (3 simple steps)
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              You don’t need to learn marketing. You just need a system that keeps improving.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Typical setup: under 7 days
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Step
            number="1"
            title="We Launch Your Campaign"
            body="We build your ads + a high-converting landing page focused on roofing jobs in Victoria."
          />
          <Step
            number="2"
            title="AI Optimizes Everything"
            body="Headlines, images, and targeting improve weekly to lower cost-per-lead and increase bookings."
          />
          <Step
            number="3"
            title="You Get More Jobs"
            body="Leads go straight to your inbox/phone so you can follow up fast and book work consistently."
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}

