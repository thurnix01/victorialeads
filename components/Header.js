import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-600 hover:text-brand-900 transition"
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
        "sticky top-0 z-50 border-b backdrop-blur-md supports-[backdrop-filter]:bg-white/75",
        isScrolled ? "border-slate-200/90 bg-white/90 shadow-sm shadow-slate-900/5" : "border-transparent bg-white/60",
      ].join(" ")}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-600 to-brand-900 text-white grid place-items-center shadow-md shadow-teal-900/15">
            <span className="text-xs font-bold tracking-tight">VL</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-brand-900">Victoria Leads AI</div>
            <div className="text-xs text-slate-500">Victoria, BC &amp; surrounding areas</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="#how">How it works</NavLink>
          <NavLink href="#features">What’s included</NavLink>
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
            <Button as="span">Book a demo</Button>
          </a>
        </div>
      </Container>
    </div>
  );
}
