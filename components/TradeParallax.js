import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";

const SCENES = [
  {
    src: "/trades/hvac.jpg",
    alt: "Technicians inspecting a rooftop HVAC unit",
    label: "HVAC",
    speed: 0.16,
    className: "left-[4%] top-[8%] w-[42%] sm:w-[38%] lg:left-[6%] lg:w-[34%]",
  },
  {
    src: "/trades/plumbing.jpg",
    alt: "Plumber fixing a sink while a homeowner looks on",
    label: "Plumbing",
    speed: -0.11,
    className: "right-[3%] top-[18%] w-[46%] sm:w-[40%] lg:right-[8%] lg:top-[12%] lg:w-[36%]",
  },
  {
    src: "/trades/electrical.jpg",
    alt: "Technician working on equipment in a service van",
    label: "On the tools",
    speed: 0.09,
    className: "left-[18%] bottom-[6%] w-[48%] sm:left-[22%] sm:w-[42%] lg:left-[28%] lg:w-[38%]",
  },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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
        setOffset(mid);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [motionOk]);

  return (
    <div ref={sectionRef}>
      <AnimatedSection id="crew" className="scroll-mt-24 overflow-hidden bg-fog py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sea">Built for crews</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Real trades. Real job sites. Not stock dashboards.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              The system is for owners who are already on the tools—HVAC, plumbing, electrical, roofing—and need booked
              work without babysitting ads.
            </p>
          </div>
        </Container>

        <div className="relative mx-auto mt-12 h-[420px] max-w-6xl px-4 sm:mt-16 sm:h-[520px] lg:h-[560px]">
          {SCENES.map((scene) => (
            <figure
              key={scene.src}
              className={[
                "absolute overflow-hidden border border-ink/10 bg-ink/5",
                scene.className,
              ].join(" ")}
              style={{
                transform: motionOk ? `translate3d(0, ${offset * scene.speed}px, 0)` : undefined,
                willChange: motionOk ? "transform" : undefined,
              }}
            >
              <img
                src={scene.src}
                alt={scene.alt}
                className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/6]"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                {scene.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
