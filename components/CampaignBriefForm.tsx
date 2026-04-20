/**
 * Multi-step campaign brief for local trades / service businesses.
 *
 * Supabase browser client: set in `.env.local` (see `lib/supabase.js`):
 *   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
 *
 * Inserts into `campaign_briefs` (override with NEXT_PUBLIC_SUPABASE_CAMPAIGN_BRIEFS_TABLE).
 * Do not send `created_at` — let the column default / DB trigger set it.
 */
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabase";
import {
  CAMPAIGN_BRIEFS_TABLE,
  CAMPAIGN_GOAL_OPTIONS,
  INITIAL_CAMPAIGN_BRIEF_VALUES,
  campaignGoalLabel,
  toCampaignBriefInsert,
  type CampaignBriefFormValues,
  type CampaignGoalSlug,
} from "@/lib/campaignBrief";
import { supabaseErrorMessage } from "@/lib/supabaseErrors";

const STEPS = [
  { id: 1, title: "Business", short: "Biz" },
  { id: 2, title: "Contact", short: "You" },
  { id: 3, title: "Services & area", short: "Where" },
  { id: 4, title: "Goal & CTA", short: "Goal" },
  { id: 5, title: "Review", short: "Send" },
] as const;

function validEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function validOptionalUrl(s: string): boolean {
  const t = s.trim();
  if (!t) return true;
  try {
    const u = t.includes("://") ? t : `https://${t}`;
    const parsed = new URL(u);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validOptionalPhone(s: string): boolean {
  const t = s.trim();
  if (!t) return true;
  return t.replace(/[^\d]/g, "").length >= 10;
}

function validateStep(step: number, v: CampaignBriefFormValues): Partial<Record<keyof CampaignBriefFormValues, string>> {
  const e: Partial<Record<keyof CampaignBriefFormValues, string>> = {};
  if (step === 1) {
    if (!v.businessName.trim()) e.businessName = "Business name is required.";
    if (!v.businessType.trim()) e.businessType = "Business type is required.";
  }
  if (step === 2) {
    if (!v.contactName.trim()) e.contactName = "Contact name is required.";
    if (!v.contactEmail.trim()) e.contactEmail = "Email is required.";
    else if (!validEmail(v.contactEmail)) e.contactEmail = "Enter a valid email.";
    if (!validOptionalPhone(v.phone)) e.phone = "Enter a full phone number or leave blank.";
  }
  if (step === 3) {
    if (!v.serviceArea.trim()) e.serviceArea = "Service area is required.";
    if (!v.coreServices.trim()) e.coreServices = "Core services are required.";
    if (!validOptionalUrl(v.landingPageUrl)) e.landingPageUrl = "Enter a valid URL or leave blank.";
  }
  if (step === 4) {
    if (!v.cta.trim()) e.cta = "Call to action is required.";
  }
  return e;
}

function inputClass(error?: string) {
  return [
    "mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400",
    error ? "border-rose-400 ring-2 ring-rose-100" : "border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20",
  ].join(" ");
}

function Field({
  label,
  id,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-0.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </label>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-err`} className="text-xs font-medium text-rose-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CampaignBriefForm() {
  const [values, setValues] = useState<CampaignBriefFormValues>(INITIAL_CAMPAIGN_BRIEF_VALUES);
  const [step, setStep] = useState(1);
  const [touchedSteps, setTouchedSteps] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const stepErrors = useMemo(() => validateStep(step, values), [step, values]);
  const showErrors = touchedSteps[step] === true;
  const err = (k: keyof CampaignBriefFormValues) => (showErrors ? stepErrors[k] : undefined);

  const stepValid = step === 5 ? true : Object.keys(validateStep(step, values)).length === 0;

  function setField<K extends keyof CampaignBriefFormValues>(key: K, value: CampaignBriefFormValues[K]) {
    setValues((p) => ({ ...p, [key]: value }));
  }

  function markTouched() {
    setTouchedSteps((t) => ({ ...t, [step]: true }));
  }

  function goNext() {
    markTouched();
    if (Object.keys(validateStep(step, values)).length) return;
    setStep((s) => Math.min(5, s + 1));
    setSubmitError("");
  }

  function goBack() {
    setSubmitError("");
    setStep((s) => Math.max(1, s - 1));
  }

  function validateAll(): boolean {
    for (let s = 1; s <= 4; s++) {
      if (Object.keys(validateStep(s, values)).length) {
        setStep(s);
        setTouchedSteps({ 1: true, 2: true, 3: true, 4: true, 5: true });
        return false;
      }
    }
    return true;
  }

  async function handleSubmit() {
    setSubmitError("");
    setTouchedSteps({ 1: true, 2: true, 3: true, 4: true, 5: true });
    if (!validateAll()) return;

    if (!supabase) {
      setSubmitError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.");
      return;
    }

    setIsSubmitting(true);
    const row = toCampaignBriefInsert(values);

    try {
      const { error } = await supabase.from(CAMPAIGN_BRIEFS_TABLE).insert([row]);
      if (error) throw error;
      setIsSuccess(true);
      setValues(INITIAL_CAMPAIGN_BRIEF_VALUES);
      setStep(1);
      setTouchedSteps({});
    } catch (e: unknown) {
      setSubmitError(supabaseErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  }

  function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step !== 5) return;
    void handleSubmit();
  }

  function dismissSuccess() {
    setIsSuccess(false);
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50 to-white p-8 text-center shadow-lg shadow-slate-900/5">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700"
          aria-hidden
        >
          ✓
        </div>
        <h2 className="mt-5 text-xl font-semibold text-emerald-950">Brief submitted</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-emerald-900/85">
          Thanks — we received your campaign details. We&apos;ll follow up with next steps, usually within one business day.
        </p>
        <Button type="button" className="mt-8" onClick={dismissSuccess}>
          Submit another brief
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-6" noValidate>
      {/* Progress */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-teal-800">Progress</p>
        <div className="mt-4 flex items-center justify-between gap-1">
          {STEPS.map((s) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={[
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition sm:h-10 sm:w-10 sm:text-sm",
                    done ? "bg-teal-600 text-white" : active ? "bg-brand-900 text-white ring-2 ring-teal-400/50" : "bg-slate-200 text-slate-600",
                  ].join(" ")}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : s.id}
                </div>
                <span className={["mt-2 hidden text-center text-[11px] font-medium sm:block", active ? "text-brand-900" : "text-slate-500"].join(" ")}>
                  {s.title}
                </span>
                <span className="mt-1.5 text-center text-[10px] font-medium text-slate-500 sm:hidden">{s.short}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/[0.06] sm:p-8 md:p-10">
        <div key={step} className="animate-step-enter space-y-6">
          {step === 1 ? (
            <>
              <header>
                <h2 className="text-lg font-semibold text-brand-900 sm:text-xl">Business</h2>
                <p className="mt-1 text-sm text-slate-600">Who you are and what trade or service you run.</p>
              </header>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business name" id="cbf-bn" required error={err("businessName")}>
                  <input
                    id="cbf-bn"
                    name="businessName"
                    autoComplete="organization"
                    value={values.businessName}
                    onChange={(e) => setField("businessName", e.target.value)}
                    className={inputClass(err("businessName"))}
                    placeholder="e.g. Island Heating Ltd."
                  />
                </Field>
                <Field label="Business type" id="cbf-bt" required error={err("businessType")}>
                  <input
                    id="cbf-bt"
                    name="businessType"
                    value={values.businessType}
                    onChange={(e) => setField("businessType", e.target.value)}
                    className={inputClass(err("businessType"))}
                    placeholder="e.g. HVAC, plumbing, electrical"
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <header>
                <h2 className="text-lg font-semibold text-brand-900 sm:text-xl">Contact</h2>
                <p className="mt-1 text-sm text-slate-600">How we reach you about this campaign.</p>
              </header>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Contact name" id="cbf-cn" required error={err("contactName")}>
                  <input
                    id="cbf-cn"
                    name="contactName"
                    autoComplete="name"
                    value={values.contactName}
                    onChange={(e) => setField("contactName", e.target.value)}
                    className={inputClass(err("contactName"))}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Contact email" id="cbf-ce" required error={err("contactEmail")}>
                  <input
                    id="cbf-ce"
                    name="contactEmail"
                    type="email"
                    autoComplete="email"
                    value={values.contactEmail}
                    onChange={(e) => setField("contactEmail", e.target.value)}
                    className={inputClass(err("contactEmail"))}
                    placeholder="you@company.com"
                  />
                </Field>
                <Field label="Phone" id="cbf-ph" hint="Optional — include area code if you add it." error={err("phone")}>
                  <input
                    id="cbf-ph"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className={inputClass(err("phone"))}
                    placeholder="(250) 555-0123"
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <header>
                <h2 className="text-lg font-semibold text-brand-900 sm:text-xl">Services &amp; area</h2>
                <p className="mt-1 text-sm text-slate-600">What you want leads for and where you operate.</p>
              </header>
              <div className="grid gap-5">
                <Field label="Service area" id="cbf-sa" required error={err("serviceArea")}>
                  <input
                    id="cbf-sa"
                    name="serviceArea"
                    value={values.serviceArea}
                    onChange={(e) => setField("serviceArea", e.target.value)}
                    className={inputClass(err("serviceArea"))}
                    placeholder="e.g. Greater Victoria, Langford, Sidney"
                  />
                </Field>
                <Field label="Core services" id="cbf-cs" required hint="Comma-separated is fine." error={err("coreServices")}>
                  <textarea
                    id="cbf-cs"
                    name="coreServices"
                    rows={4}
                    value={values.coreServices}
                    onChange={(e) => setField("coreServices", e.target.value)}
                    className={[inputClass(err("coreServices")), "min-h-[100px] resize-y"].join(" ")}
                    placeholder="e.g. Furnace install, AC tune-ups, 24/7 emergency repairs"
                  />
                </Field>
                <Field label="Offer" id="cbf-of" hint="Optional — discount, free estimate, seasonal promo…">
                  <textarea
                    id="cbf-of"
                    name="offer"
                    rows={3}
                    value={values.offer}
                    onChange={(e) => setField("offer", e.target.value)}
                    className={[inputClass(), "min-h-[88px] resize-y"].join(" ")}
                    placeholder="What should people get when they respond?"
                  />
                </Field>
                <Field label="Trust points" id="cbf-tp" hint="Optional — licences, years in business, reviews…">
                  <textarea
                    id="cbf-tp"
                    name="trustPoints"
                    rows={3}
                    value={values.trustPoints}
                    onChange={(e) => setField("trustPoints", e.target.value)}
                    className={[inputClass(), "min-h-[88px] resize-y"].join(" ")}
                    placeholder="Why customers should trust you"
                  />
                </Field>
                <Field label="Landing page URL" id="cbf-lp" hint="Optional — where ad clicks should go (https://…).">
                  <input
                    id="cbf-lp"
                    name="landingPageUrl"
                    type="url"
                    autoComplete="url"
                    value={values.landingPageUrl}
                    onChange={(e) => setField("landingPageUrl", e.target.value)}
                    className={inputClass(err("landingPageUrl"))}
                    placeholder="https://…"
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <header>
                <h2 className="text-lg font-semibold text-brand-900 sm:text-xl">Goal &amp; call to action</h2>
                <p className="mt-1 text-sm text-slate-600">What success looks like and what you want people to do.</p>
              </header>
              <div className="grid gap-5">
                <Field label="Campaign goal" id="cbf-cg" required>
                  <select
                    id="cbf-cg"
                    name="campaignGoal"
                    value={values.campaignGoal}
                    onChange={(e) => setField("campaignGoal", e.target.value as CampaignGoalSlug)}
                    className={inputClass()}
                  >
                    {CAMPAIGN_GOAL_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Call to action (CTA)" id="cbf-cta" required error={err("cta")} hint="Short line for buttons or ads.">
                  <input
                    id="cbf-cta"
                    name="cta"
                    value={values.cta}
                    onChange={(e) => setField("cta", e.target.value)}
                    className={inputClass(err("cta"))}
                    placeholder="e.g. Book a free estimate"
                  />
                </Field>
                <Field label="Notes" id="cbf-no" hint="Optional — timing, competitors, links, anything else.">
                  <textarea
                    id="cbf-no"
                    name="notes"
                    rows={4}
                    value={values.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    className={[inputClass(), "min-h-[100px] resize-y"].join(" ")}
                    placeholder="Anything else we should know?"
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 5 ? (
            <>
              <header>
                <h2 className="text-lg font-semibold text-brand-900 sm:text-xl">Review &amp; submit</h2>
                <p className="mt-1 text-sm text-slate-600">Confirm everything below, then submit your brief.</p>
              </header>
              <dl className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 bg-slate-50/80">
                <ReviewRow k="Business" v={values.businessName} />
                <ReviewRow k="Business type" v={values.businessType} />
                <ReviewRow k="Contact" v={values.contactName} />
                <ReviewRow k="Email" v={values.contactEmail} />
                <ReviewRow k="Phone" v={values.phone.trim() || "—"} />
                <ReviewRow k="Service area" v={values.serviceArea} />
                <ReviewRow k="Core services" v={values.coreServices} />
                <ReviewRow k="Offer" v={values.offer.trim() || "—"} />
                <ReviewRow k="Trust points" v={values.trustPoints.trim() || "—"} />
                <ReviewRow k="Landing page" v={values.landingPageUrl.trim() || "—"} />
                <ReviewRow k="Campaign goal" v={campaignGoalLabel(values.campaignGoal)} />
                <ReviewRow k="CTA" v={values.cta} />
                <ReviewRow k="Notes" v={values.notes.trim() || "—"} />
              </dl>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <Button type="button" variant="secondary" onClick={goBack} disabled={isSubmitting}>
            Previous
          </Button>
        ) : (
          <span />
        )}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          {submitError ? (
            <p className="max-w-full text-sm font-medium text-rose-600 sm:max-w-md sm:text-right">{submitError}</p>
          ) : null}
          {step < 5 ? (
            <Button type="button" onClick={goNext} disabled={!stepValid}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit brief"}
            </Button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">
        By submitting, you agree to be contacted about your campaign. No spam — just clear next steps.
      </p>
    </form>
  );
}

function ReviewRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1 px-4 py-3.5 sm:grid-cols-[minmax(0,160px)_1fr] sm:gap-6 sm:px-5">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
      <dd className="text-sm leading-snug text-slate-800 whitespace-pre-wrap">{v}</dd>
    </div>
  );
}
