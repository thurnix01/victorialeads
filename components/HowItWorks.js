import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

function Step({ number, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-brand-900 text-white shadow-md shadow-teal-900/20">
          <span className="text-sm font-semibold">{number}</span>
        </div>
        <div className="text-sm font-semibold text-brand-900">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <AnimatedSection id="how" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">
              How it works (three simple steps)
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              You stay focused on customers and crews—we implement the systems, creative, and campaign support behind
              the scenes.
            </p>
          </div>
          <div className="text-xs font-semibold text-teal-700">Typical setup: under 7 days</div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Step
            number="1"
            title="We align on your offer &amp; service area"
            body="We set up lead capture on your site or landing pages, notifications, and tracking—tuned for Victoria, BC and surrounding areas."
          />
          <Step
            number="2"
            title="Automation &amp; creative go live"
            body="AI-assisted email replies, follow-up sequences, and ad creative/campaign assets are activated and tested."
          />
          <Step
            number="3"
            title="You measure, we optimize"
            body="Analytics and performance reviews inform ongoing improvements so leads convert into booked revenue."
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}
