import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { BoltIcon, ChartIcon, TargetIcon } from "@/components/icons";

function Pill({ icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-900/5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-brand-900 text-white shadow-md shadow-teal-900/20">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-sm font-semibold text-brand-900">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600">{body}</div>
    </div>
  );
}

export function Solution() {
  return (
    <AnimatedSection id="solution" className="scroll-mt-24 bg-slate-100/80 py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">
            A done-for-you system—built for local revenue
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Victoria Leads AI combines automation, ad creative, campaign support, and conversion-focused workflows so
            your marketing connects to outcomes you can measure—without adding a full marketing department.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Pill
            icon={BoltIcon}
            title="Automation &amp; AI workflows"
            body="Lead capture, notifications, email replies, and follow-up sequences that run consistently."
          />
          <Pill
            icon={TargetIcon}
            title="Creative &amp; campaign assets"
            body="Figma-based creative plus campaign-ready assets for Google Ads and Meta."
          />
          <Pill
            icon={ChartIcon}
            title="Tracking &amp; analytics"
            body="Lead tracking and performance insight so you know what drives revenue."
          />
          <Pill
            icon={BoltIcon}
            title="Ongoing optimization"
            body="Iteration on messaging, targeting, and conversion to improve results over time."
          />
        </div>
      </Container>
    </AnimatedSection>
  );
}
