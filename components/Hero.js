import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CheckIcon } from "@/components/icons";

const BRAND_LINE =
  "Victoria Leads AI helps local trades and service-based businesses in Victoria, BC and surrounding areas generate more leads, improve follow-up, and turn marketing into measurable revenue through automated systems, ad creative, campaign support, and conversion-focused customer workflows.";

export function Hero() {
  return (
    <AnimatedSection
      as="header"
      className="relative overflow-hidden border-b border-slate-200/80 bg-hero-mesh pt-10 sm:pt-14"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-teal-800 ring-1 ring-teal-600/20 shadow-sm">
              Victoria Leads AI • Trades &amp; service businesses • Victoria, BC
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-brand-950 sm:text-[2.65rem] sm:leading-[1.1]">
              Automated Lead Generation &amp; Revenue Builder for Local Businesses
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">{BRAND_LINE}</p>

            <ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:text-base">
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 shrink-0 text-teal-600" />
                <span>More qualified leads and clearer follow-up for your team</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 shrink-0 text-teal-600" />
                <span>Automation and AI workflows that protect your time</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 shrink-0 text-teal-600" />
                <span>Marketing tied to measurable revenue—not guesswork</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#demo" className="inline-flex">
                <Button as="span" className="w-full sm:w-auto">
                  Book a free demo
                </Button>
              </a>
              <a href="#how" className="inline-flex">
                <Button as="span" variant="secondary" className="w-full sm:w-auto">
                  See how it works
                </Button>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              One integrated system: capture, notify, nurture, track, and optimize.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-brand-900">Pipeline snapshot</div>
                  <div className="text-xs text-slate-500">Example performance (illustrative)</div>
                </div>
                <div className="rounded-xl bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-600/15">
                  +28%
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  { label: "New leads", value: "34", hint: "last 30 days" },
                  { label: "Cost per lead", value: "$22", hint: "optimized weekly" },
                  { label: "Booked jobs", value: "11", hint: "from inbound leads" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl bg-slate-50/90 px-4 py-3 ring-1 ring-slate-200/80"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-700">{row.label}</div>
                      <div className="text-xs text-slate-500">{row.hint}</div>
                    </div>
                    <div className="text-lg font-semibold text-brand-900">{row.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-slate-200/90 bg-gradient-to-br from-teal-50/50 to-white p-4">
                <div className="text-xs font-semibold text-brand-900">Included focus areas</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="rounded-lg bg-white/90 px-3 py-2 ring-1 ring-teal-600/10">Lead capture</div>
                  <div className="rounded-lg bg-white/90 px-3 py-2 ring-1 ring-teal-600/10">AI follow-up</div>
                  <div className="rounded-lg bg-white/90 px-3 py-2 ring-1 ring-teal-600/10">Ad creative</div>
                  <div className="rounded-lg bg-white/90 px-3 py-2 ring-1 ring-teal-600/10">Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
