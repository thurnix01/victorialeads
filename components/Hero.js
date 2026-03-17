import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CheckIcon } from "@/components/icons";

export function Hero() {
  return (
    <AnimatedSection as="header" className="pt-10 sm:pt-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              AI Lead Engine for Roofing Companies • Victoria, BC
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Get More Roofing Jobs in Victoria Without Hiring a Marketing Team
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Our AI system generates, tests, and optimizes your ads, landing pages, and leads automatically.
            </p>

            <ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:text-base">
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 text-emerald-600" />
                <span>More qualified leads every week</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 text-emerald-600" />
                <span>No contracts, no complexity</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 text-emerald-600" />
                <span>Built specifically for roofing companies</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#demo" className="inline-flex">
                <Button as="span" className="w-full sm:w-auto">
                  Get More Leads
                </Button>
              </a>
              <a href="#how" className="inline-flex">
                <Button as="span" variant="secondary" className="w-full sm:w-auto">
                  See How It Works
                </Button>
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Clear offer. Simple setup. Leads delivered straight to you.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Weekly lead flow</div>
                  <div className="text-xs text-slate-500">Example performance snapshot</div>
                </div>
                <div className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  +28%
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  { label: "New leads", value: "34", hint: "last 30 days" },
                  { label: "Cost per lead", value: "$22", hint: "optimized weekly" },
                  { label: "Booked jobs", value: "11", hint: "from inbound leads" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                    <div>
                      <div className="text-sm font-medium text-slate-700">{row.label}</div>
                      <div className="text-xs text-slate-500">{row.hint}</div>
                    </div>
                    <div className="text-lg font-semibold text-slate-900">{row.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-700">What you get</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">Ads</div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">Landing page</div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">Lead capture</div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">Optimization</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}

