import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-700 hover:text-slate-900 transition"
    >
      {children}
    </a>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-white/70",
        isScrolled ? "border-slate-200 bg-white/80" : "border-transparent bg-white/50",
      ].join(" ")}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center shadow-sm">
            <span className="text-sm font-bold">AI</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">AI Lead Engine</div>
            <div className="text-xs text-slate-500">Roofing • Victoria, BC</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="#how">How it works</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#proof">Results</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#how" className="hidden sm:inline-flex">
            <Button as="span" variant="secondary">
              See how it works
            </Button>
          </a>
          <a href="#demo" className="inline-flex">
            <Button as="span">Get more leads</Button>
          </a>
        </div>
      </Container>
    </div>
  );
}

