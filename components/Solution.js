import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { BoltIcon, ChartIcon, TargetIcon } from "@/components/icons";

function Pill({ icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="mt-3 text-sm text-slate-600 leading-relaxed">{body}</div>
    </div>
  );
}

export function Solution() {
  return (
    <AnimatedSection id="solution" className="scroll-mt-24 py-16 sm:py-20 bg-slate-50/60">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            A Done-For-You AI Lead System
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We build and run the full lead engine—ads, landing pages, tracking, and continuous improvement—
            so you get a steady flow of roofing leads in Victoria.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Pill
            icon={BoltIcon}
            title="Automated ad creation"
            body="New angles, offers, and creatives tested continuously."
          />
          <Pill
            icon={TargetIcon}
            title="High-converting landing pages"
            body="Built to turn clicks into calls—fast, clean, mobile-first."
          />
          <Pill
            icon={ChartIcon}
            title="Lead capture + tracking"
            body="Know what’s working. Follow up faster. Book more jobs."
          />
          <Pill
            icon={BoltIcon}
            title="Continuous optimization"
            body="Weekly improvements to targeting, headlines, and conversion rate."
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}

