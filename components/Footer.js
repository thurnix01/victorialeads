import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/90 bg-white py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-brand-900">Victoria Leads AI</div>
            <div className="mt-1 text-xs text-slate-500">
              Local trades &amp; service businesses • Victoria, BC &amp; surrounding areas
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#how" className="text-slate-600 transition hover:text-brand-900">
              How it works
            </a>
            <a href="#features" className="text-slate-600 transition hover:text-brand-900">
              What’s included
            </a>
            <a href="#pricing" className="text-slate-600 transition hover:text-brand-900">
              Pricing
            </a>
            <a href="mailto:info@victorialeads.ca" className="text-slate-600 transition hover:text-brand-900">
              info@victorialeads.ca
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-slate-50/90 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">Questions about automation, creative, or campaign support? We’re here to help.</p>
            <a
              href="mailto:info@victorialeads.ca?subject=Question%20about%20Victoria%20Leads%20AI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition hover:bg-teal-800"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Victoria Leads AI. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
