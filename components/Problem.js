import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

export function Problem() {
  return (
    <AnimatedSection id="problem" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl">
              Marketing shouldn’t feel like gambling.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              When you’re busy delivering work, you don’t have time to babysit ads, rebuild pages, or chase every lead
              manually. Local trades and service businesses often end up with uneven pipelines—and revenue that’s hard
              to predict.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Paying for clicks that don’t become booked jobs?",
                  body: "Traffic isn’t the goal—qualified leads and revenue are.",
                },
                {
                  title: "Seasonal swings and referral-only dry spells?",
                  body: "You need a repeatable way to fill the calendar.",
                },
                {
                  title: "No bandwidth to run campaigns and follow-up?",
                  body: "Automation and clear workflows should carry the load—not more hours from you.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-900/5"
                >
                  <div className="text-sm font-semibold text-brand-900">{card.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
