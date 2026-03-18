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
            <a href="mailto:info@victorialeads.ca" className="text-slate-600 hover:text-slate-900 transition">
              info@victorialeads.ca
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">Have more questions? We are happy to help.</p>
            <a
              href="mailto:info@victorialeads.ca?subject=Question%20about%20AI%20Lead%20Engine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Get in touch
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

