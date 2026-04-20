import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabase";
import {
  CAMPAIGN_BRIEFS_TABLE,
  INITIAL_CAMPAIGN_BRIEF_VALUES,
  PLATFORM_OPTIONS,
  type CampaignBriefValues,
  platformLabel,
  toCampaignBriefRow,
} from "@/lib/campaignBrief";
import { supabaseErrorMessage } from "@/lib/supabaseErrors";

const STEPS = [
  { id: 1, title: "Who you are", short: "Client" },
  { id: 2, title: "Campaign details", short: "Ads" },
  { id: 3, title: "Review & send", short: "Review" },
] as const;

function digitsOnly(s: string): string {
  return s.replace(/[^\d]/g, "");
}

function validEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

function validWebsite(s: string): boolean {
  const t = s.trim();
  if (!t) return true;
  try {
    const u = t.includes("://") ? t : `https://${t}`;
    new URL(u);
    return true;
  } catch {
    return false;
  }
}

function validHttpUrl(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  try {
    const u = t.includes("://") ? t : `https://${t}`;
    const parsed = new URL(u);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateStep(step: number, v: CampaignBriefValues): Partial<Record<keyof CampaignBriefValues, string>> {
  const e: Partial<Record<keyof CampaignBriefValues, string>> = {};
  if (step === 1) {
    if (!v.businessName.trim()) e.businessName = "Add your business name.";
    if (!v.contactName.trim()) e.contactName = "Add your name.";
    if (!v.email.trim()) e.email = "Email is required.";
    else if (!validEmail(v.email)) e.email = "Enter a valid email.";
    if (!v.phone.trim()) e.phone = "Phone is required.";
    else if (digitsOnly(v.phone).length < 10) e.phone = "Enter a valid phone number (include area code).";
    if (v.website.trim() && !validWebsite(v.website)) e.website = "Enter a valid website or leave blank.";
  }
  if (step === 2) {
    if (!v.businessType.trim()) e.businessType = "What type of business is this?";
    if (!v.serviceArea.trim()) e.serviceArea = "Where do you serve customers?";
    if (!v.coreServices.trim()) e.coreServices = "List the main services you want to promote.";
    if (!v.offer.trim()) e.offer = "What offer or hook should we highlight?";
    if (!v.landingPageUrl.trim()) e.landingPageUrl = "Where should ad traffic go?";
    else if (!validHttpUrl(v.landingPageUrl)) e.landingPageUrl = "Enter a valid URL (https://…).";
    if (!v.campaignGoal.trim()) e.campaignGoal = "What does a winning campaign look like for you?";
    if (!v.cta.trim()) e.cta = "What should the call to action say?";
  }
  return e;
}

type FieldProps = {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ label, id, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700">
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-rose-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = (error?: string) =>
  [
    "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
    error ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200 focus:ring-2 focus:ring-teal-600/25",
  ].join(" ");

export function CampaignBriefForm() {
  const [values, setValues] = useState<CampaignBriefValues>(INITIAL_CAMPAIGN_BRIEF_VALUES);
  const [step, setStep] = useState(1);
  const [touchedSteps, setTouchedSteps] = useState<Record<number, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState("");

  const stepErrors = useMemo(() => validateStep(step, values), [step, values]);
  const showErrors = touchedSteps[step] === true;

  const stepValid = step === 3 ? true : Object.keys(validateStep(step, values)).length === 0;

  function setField<K extends keyof CampaignBriefValues>(key: K, value: CampaignBriefValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function markTouched() {
    setTouchedSteps((t) => ({ ...t, [step]: true }));
  }

  function goNext() {
    markTouched();
    const err = validateStep(step, values);
    if (Object.keys(err).length) return;
    setStep((s) => Math.min(3, s + 1));
  }

  function goBack() {
    setSubmitError("");
    setStep((s) => Math.max(1, s - 1));
  }

  async function submitCampaignBrief() {
    setSubmitError("");
    setTouchedSteps({ 1: true, 2: true });
    const e1 = validateStep(1, values);
    const e2 = validateStep(2, values);
    if (Object.keys(e1).length || Object.keys(e2).length) {
      if (Object.keys(e1).length) setStep(1);
      else setStep(2);
      return;
    }

    if (!supabase) {
      setSubmitError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }

    setStatus("submitting");
    const row = toCampaignBriefRow(values);

    try {
      const { error } = await supabase.from(CAMPAIGN_BRIEFS_TABLE).insert([row]);
      if (error) throw error;
      setStatus("success");
    } catch (err: unknown) {
      setStatus("idle");
      setSubmitError(supabaseErrorMessage(err));
    }
  }

  function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step !== 3) {
      return;
    }
    void submitCampaignBrief();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl" aria-hidden>
          ✓
        </div>
        <h2 className="mt-4 text-lg font-semibold text-emerald-950">We’ve got your campaign brief</h2>
        <p className="mt-2 text-sm text-emerald-900/90">
          Thanks for the details. We’ll review everything and follow up with next steps—usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStep(1);
            setTouchedSteps({});
            setValues(INITIAL_CAMPAIGN_BRIEF_VALUES);
            setSubmitError("");
          }}
          className="mt-6 text-sm font-semibold text-emerald-900 underline underline-offset-4"
        >
          Submit another brief
        </button>
      </div>
    );
  }

  const err = (key: keyof CampaignBriefValues) => (showErrors ? stepErrors[key] : undefined);

  return (
    <form onSubmit={onFormSubmit} className="space-y-8" noValidate>
      <nav aria-label="Form progress" className="space-y-3">
        <ol className="flex items-center justify-between gap-1 sm:gap-2">
          {STEPS.map((s) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <li key={s.id} className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={[
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition sm:h-10 sm:w-10 sm:text-sm",
                    done
                      ? "bg-teal-700 text-white"
                      : active
                        ? "bg-brand-900 text-white ring-2 ring-teal-600/40"
                        : "bg-slate-200 text-slate-600",
                  ].join(" ")}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? "✓" : s.id}
                </div>
                <span
                  className={[
                    "mt-2 hidden text-center text-[11px] font-medium sm:block sm:text-xs",
                    active ? "text-brand-900" : "text-slate-500",
                  ].join(" ")}
                >
                  {s.title}
                </span>
                <span className="mt-2 text-center text-[10px] font-medium text-slate-500 sm:hidden">{s.short}</span>
              </li>
            );
          })}
        </ol>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-teal-700 transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </nav>

      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
        <div key={step} className="animate-step-enter space-y-6">
          {step === 1 ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-brand-900">Who the client is</h2>
                <p className="mt-1 text-sm text-slate-600">How we reach you and what to call your business.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business name" id="cbf-businessName" error={err("businessName")}>
                  <input
                    id="cbf-businessName"
                    name="businessName"
                    value={values.businessName}
                    onChange={(e) => setField("businessName", e.target.value)}
                    placeholder="e.g., Island Electric Ltd."
                    autoComplete="organization"
                    className={inputClass(err("businessName"))}
                    aria-invalid={err("businessName") ? "true" : "false"}
                  />
                </Field>
                <Field label="Your name" id="cbf-contactName" error={err("contactName")}>
                  <input
                    id="cbf-contactName"
                    name="contactName"
                    value={values.contactName}
                    onChange={(e) => setField("contactName", e.target.value)}
                    placeholder="e.g., Alex"
                    autoComplete="name"
                    className={inputClass(err("contactName"))}
                  />
                </Field>
                <Field label="Email" id="cbf-email" error={err("email")}>
                  <input
                    id="cbf-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={inputClass(err("email"))}
                  />
                </Field>
                <Field label="Phone" id="cbf-phone" error={err("phone")}>
                  <input
                    id="cbf-phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="(250) 555-0123"
                    autoComplete="tel"
                    className={inputClass(err("phone"))}
                  />
                </Field>
                <Field
                  label="Website"
                  id="cbf-website"
                  error={err("website")}
                  hint="Optional — your main site if you have one."
                >
                  <input
                    id="cbf-website"
                    name="website"
                    type="url"
                    value={values.website}
                    onChange={(e) => setField("website", e.target.value)}
                    placeholder="https://yourbusiness.com"
                    autoComplete="url"
                    className={inputClass(err("website"))}
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-brand-900">What to promote &amp; where traffic goes</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Ad copy and posting status are generated later — this step is only the brief for your campaign.
                </p>
              </div>
              <div className="grid gap-5">
                <Field label="Business type" id="cbf-businessType" error={err("businessType")}>
                  <input
                    id="cbf-businessType"
                    name="businessType"
                    value={values.businessType}
                    onChange={(e) => setField("businessType", e.target.value)}
                    placeholder="e.g., HVAC, plumbing, dental"
                    className={inputClass(err("businessType"))}
                  />
                </Field>
                <Field label="Service area" id="cbf-serviceArea" error={err("serviceArea")}>
                  <input
                    id="cbf-serviceArea"
                    name="serviceArea"
                    value={values.serviceArea}
                    onChange={(e) => setField("serviceArea", e.target.value)}
                    placeholder="e.g., Greater Victoria, Langford, Sidney"
                    className={inputClass(err("serviceArea"))}
                  />
                </Field>
                <Field
                  label="Core services"
                  id="cbf-coreServices"
                  error={err("coreServices")}
                  hint="Separate with commas — what you want leads for."
                >
                  <textarea
                    id="cbf-coreServices"
                    name="coreServices"
                    value={values.coreServices}
                    onChange={(e) => setField("coreServices", e.target.value)}
                    placeholder="e.g., Furnace install, AC tune-ups, emergency repairs"
                    rows={3}
                    className={[inputClass(err("coreServices")), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
                <Field label="Offer" id="cbf-offer" error={err("offer")} hint="What should people get when they respond?">
                  <textarea
                    id="cbf-offer"
                    name="offer"
                    value={values.offer}
                    onChange={(e) => setField("offer", e.target.value)}
                    placeholder="e.g., Free in-home quote this month"
                    rows={3}
                    className={[inputClass(err("offer")), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
                <Field
                  label="Trust points"
                  id="cbf-trustPoints"
                  hint="Optional — warranties, years in business, reviews, certifications."
                >
                  <textarea
                    id="cbf-trustPoints"
                    name="trustPoints"
                    value={values.trustPoints}
                    onChange={(e) => setField("trustPoints", e.target.value)}
                    placeholder="e.g., Licensed & insured · 15 years local · 200+ five-star reviews"
                    rows={3}
                    className={[inputClass(), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
                <Field
                  label="Landing page URL"
                  id="cbf-landingPageUrl"
                  error={err("landingPageUrl")}
                  hint="Final URL for ads (can differ from your main website)."
                >
                  <input
                    id="cbf-landingPageUrl"
                    name="landingPageUrl"
                    type="url"
                    value={values.landingPageUrl}
                    onChange={(e) => setField("landingPageUrl", e.target.value)}
                    placeholder="https://…"
                    autoComplete="url"
                    className={inputClass(err("landingPageUrl"))}
                  />
                </Field>
                <Field
                  label="Campaign goal"
                  id="cbf-campaignGoal"
                  error={err("campaignGoal")}
                  hint="In a sentence or two — what does success look like?"
                >
                  <textarea
                    id="cbf-campaignGoal"
                    name="campaignGoal"
                    value={values.campaignGoal}
                    onChange={(e) => setField("campaignGoal", e.target.value)}
                    placeholder="e.g., Book more tune-ups from homeowners in Oak Bay this spring"
                    rows={3}
                    className={[inputClass(err("campaignGoal")), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
                <Field label="Call to action (CTA)" id="cbf-cta" error={err("cta")}>
                  <input
                    id="cbf-cta"
                    name="cta"
                    value={values.cta}
                    onChange={(e) => setField("cta", e.target.value)}
                    placeholder="e.g., Book a free estimate"
                    className={inputClass(err("cta"))}
                  />
                </Field>
                <Field
                  label="Platform"
                  id="cbf-platform"
                  hint="Pick the main channel. Need TikTok, LinkedIn, or multiple? Say so in Notes — options here must match your database."
                >
                  <select
                    id="cbf-platform"
                    name="platform"
                    value={values.platform}
                    onChange={(e) => setField("platform", e.target.value as CampaignBriefValues["platform"])}
                    className={inputClass()}
                  >
                    {PLATFORM_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Notes" id="cbf-notes" hint="Optional — timing, competitors, links, anything else.">
                  <textarea
                    id="cbf-notes"
                    name="notes"
                    value={values.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    placeholder="Anything else we should know?"
                    rows={3}
                    className={[inputClass(), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-brand-900">Review & send</h2>
                <p className="mt-1 text-sm text-slate-600">Double-check your details, then submit your brief.</p>
                <p className="mt-3 rounded-xl border border-teal-200/80 bg-teal-50/80 px-4 py-3 text-sm font-medium text-brand-900">
                  Nothing is sent until you tap <span className="whitespace-nowrap">“Submit campaign brief”</span> below.
                </p>
              </div>
              <dl className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/80">
                <ReviewRow label="Business name" value={values.businessName} />
                <ReviewRow label="Contact name" value={values.contactName} />
                <ReviewRow label="Email" value={values.email} />
                <ReviewRow label="Phone" value={values.phone} />
                <ReviewRow label="Website" value={values.website.trim() || "—"} />
                <ReviewRow label="Business type" value={values.businessType} />
                <ReviewRow label="Service area" value={values.serviceArea} />
                <ReviewRow label="Core services" value={values.coreServices} />
                <ReviewRow label="Offer" value={values.offer} />
                <ReviewRow label="Trust points" value={values.trustPoints.trim() || "—"} />
                <ReviewRow label="Landing page URL" value={values.landingPageUrl} />
                <ReviewRow label="Campaign goal" value={values.campaignGoal} />
                <ReviewRow label="CTA" value={values.cta} />
                <ReviewRow label="Platform" value={platformLabel(values.platform)} />
                <ReviewRow label="Notes" value={values.notes.trim() || "—"} />
              </dl>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={goBack} disabled={status === "submitting"}>
              Previous
            </Button>
          ) : (
            <span />
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {submitError ? (
            <p className="max-w-full break-words text-left text-xs font-medium text-rose-600 sm:max-w-md">{submitError}</p>
          ) : null}
          {step < 3 ? (
            <Button type="button" onClick={goNext} disabled={!stepValid}>
              Next
            </Button>
          ) : (
            <Button
              type="button"
              disabled={status === "submitting"}
              onClick={() => void submitCampaignBrief()}
            >
              {status === "submitting" ? "Submitting…" : "Submit campaign brief"}
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-6 sm:px-5">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-800 whitespace-pre-wrap">{value}</dd>
    </div>
  );
}
