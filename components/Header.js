import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

function NavLink({ href, children }) {
  return (
    <a href={href} className="text-sm font-medium text-ink/65 transition hover:text-ink">
      {children}
    </a>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b backdrop-blur-md transition",
        isScrolled ? "border-ink/10 bg-paper/95" : "border-transparent bg-paper/70",
      ].join(" ")}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-ink text-[11px] font-bold tracking-[0.12em] text-white">
            VL
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-ink">Victoria Leads</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">Revenue systems · BC</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink href="#how">How it works</NavLink>
          <NavLink href="#system">The system</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="/start-your-campaign/">Campaign brief</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#demo" className="inline-flex">
            <Button as="span" className="!py-2.5 !text-xs sm:!text-sm">
              Book a demo
            </Button>
          </a>
        </div>
      </Container>
    </header>
  );
}
