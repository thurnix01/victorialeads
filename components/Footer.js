import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">AI Lead Engine</div>
            <div className="mt-1 text-xs text-slate-500">Victoria, BC • Roofing lead generation</div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#how" className="text-slate-600 hover:text-slate-900 transition">
              How it works
            </a>
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition">
              Features
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition">
              Pricing
            </a>
            <a href="mailto:hello@example.com" className="text-slate-600 hover:text-slate-900 transition">
              hello@example.com
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} AI Lead Engine. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

