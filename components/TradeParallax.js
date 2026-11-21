import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * NOC Careers–style collage: one dominant frame + two overlapping supports.
 * Soft parallax on the satellites only (not a random scatter).
 */
export function TradeParallax() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!motionOk) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(Math.max(-120, Math.min(120, mid)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [motionOk]);

  const up = motionOk ? offset * 0.08 : 0;
  const down = motionOk ? offset * -0.06 : 0;

  return (
    <div ref={sectionRef}>
      <AnimatedSection id="crew" className="scroll-mt-24 overflow-hidden bg-fog py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Built for crews</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Real trades. Real job sites. Not stock dashboards.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/65">
                The system is for owners who are already on the tools—HVAC, plumbing, electrical, roofing—and need
                booked work without babysitting ads.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[420px] lg:col-span-7 lg:max-w-none lg:pl-6">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] lg:ml-auto lg:mr-[8%] lg:max-w-[400px]">
                {/* Dominant portrait */}
                <figure className="absolute inset-0 z-10 overflow-hidden rounded-2xl ring-1 ring-ink/10">
                  <img
                    src="/trades/electrical.jpg"
                    alt="Technician working from a service van"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-ink/75 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    On the tools
                  </figcaption>
                </figure>

                {/* Top satellite */}
                <figure
                  className="absolute -left-[22%] top-[6%] z-20 hidden w-[58%] overflow-hidden rounded-xl ring-1 ring-ink/10 sm:block"
                  style={{
                    aspectRatio: "5 / 3",
                    transform: `translate3d(0, ${up}px, 0)`,
                    boxShadow: "0 18px 40px -24px rgba(13, 21, 32, 0.55)",
                    willChange: motionOk ? "transform" : undefined,
                  }}
                >
                  <img
                    src="/trades/hvac.jpg"
                    alt="Technicians inspecting a rooftop HVAC unit"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    HVAC
                  </figcaption>
                </figure>

                {/* Bottom satellite */}
                <figure
                  className="absolute -left-[18%] bottom-[8%] z-20 hidden w-[62%] overflow-hidden rounded-xl ring-1 ring-ink/10 sm:block"
                  style={{
                    aspectRatio: "5 / 3",
                    transform: `translate3d(0, ${down}px, 0)`,
                    boxShadow: "0 18px 40px -24px rgba(13, 21, 32, 0.55)",
                    willChange: motionOk ? "transform" : undefined,
                  }}
                >
                  <img
                    src="/trades/plumbing.jpg"
                    alt="Plumber on a residential job"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Plumbing
                  </figcaption>
                </figure>
              </div>

              {/* Mobile: simple stack when satellites are hidden */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
                <figure className="overflow-hidden rounded-xl ring-1 ring-ink/10">
                  <img src="/trades/hvac.jpg" alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="bg-ink px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    HVAC
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-xl ring-1 ring-ink/10">
                  <img src="/trades/plumbing.jpg" alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="bg-ink px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Plumbing
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
