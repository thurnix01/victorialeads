import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabase";
import {
  CAMPAIGN_BRIEFS_TABLE,
  FORMAT_OPTIONS,
  INITIAL_CAMPAIGN_BRIEF_VALUES,
  PLATFORM_OPTIONS,
  type CampaignBriefValues,
  type CreativeFormatValue,
  type PlatformValue,
  formatsSummary,
  platformsSummary,
  toCampaignBriefRow,
} from "@/lib/campaignBrief";
import { supabaseErrorMessage } from "@/lib/supabaseErrors";

const STEPS = [
  { id: 1, title: "Business basics", short: "Basics" },
  { id: 2, title: "Campaign inputs", short: "Campaign" },
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
    if (!v.industry.trim()) e.industry = "Add your industry or business type.";
    if (!v.location.trim()) e.location = "Where do you serve customers?";
    if (!v.campaignName.trim()) e.campaignName = "Give this campaign a short name.";
    if (!v.offer.trim()) e.offer = "What’s the main offer or hook?";
    if (!v.cta.trim()) e.cta = "What should the call to action say?";
    if (!v.finalUrl.trim()) e.finalUrl = "Add the landing page or final URL for ads.";
    else if (!validHttpUrl(v.finalUrl)) e.finalUrl = "Enter a valid URL (https://…).";
    if (!v.platforms.length) e.platforms = "Pick at least one platform.";
    if (!v.formats.length) e.formats = "Pick at least one creative format.";
    if (!v.creativeBrief.trim()) e.creativeBrief = "Add a short campaign goal in your own words.";
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

const choiceClass = (checked: boolean, error?: string) =>
  [
    "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition",
    checked
      ? "border-teal-600 bg-teal-50/80 text-brand-900"
      : "border-slate-200 bg-white text-slate-800 hover:border-slate-300",
    error ? "ring-2 ring-rose-100" : "",
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

  function togglePlatform(p: PlatformValue) {
    setValues((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(p) ? prev.platforms.filter((x) => x !== p) : [...prev.platforms, p],
    }));
  }

  function toggleFormat(f: CreativeFormatValue) {
    setValues((prev) => ({
      ...prev,
      formats: prev.formats.includes(f) ? prev.formats.filter((x) => x !== f) : [...prev.formats, f],
    }));
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

  /**
   * Only step 3 may send data. Steps 1–2 use inputs inside one <form>; pressing Enter in a field
   * can trigger implicit form submit in browsers—without this guard, that would POST before review.
   */
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
  const platformErr = showErrors ? stepErrors.platforms : undefined;
  const formatErr = showErrors ? stepErrors.formats : undefined;

  return (
    <form onSubmit={onFormSubmit} className="space-y-8" noValidate>
      {/* Progress */}
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

      {/* Panels */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
        <div key={step} className="animate-step-enter space-y-6">
          {step === 1 ? (
            <>
              <div>
                <h2 className="text-lg font-semibold text-brand-900">Business basics</h2>
                <p className="mt-1 text-sm text-slate-600">How we’ll reach you and what to call your business.</p>
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
                  hint="Optional — paste your site or leave blank if you’re not online yet."
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
                <h2 className="text-lg font-semibold text-brand-900">Campaign inputs</h2>
                <p className="mt-1 text-sm text-slate-600">
                  What we’re promoting and where ads should send people. Ad copy and asset workflow stay on our side.
                </p>
              </div>
              <div className="grid gap-5">
                <Field label="Industry / business type" id="cbf-industry" error={err("industry")}>
                  <input
                    id="cbf-industry"
                    name="industry"
                    value={values.industry}
                    onChange={(e) => setField("industry", e.target.value)}
                    placeholder="e.g., HVAC, plumbing, dental, landscaping"
                    className={inputClass(err("industry"))}
                  />
                </Field>
                <Field label="Location / service area" id="cbf-location" error={err("location")}>
                  <input
                    id="cbf-location"
                    name="location"
                    value={values.location}
                    onChange={(e) => setField("location", e.target.value)}
                    placeholder="e.g., Greater Victoria, Langford, Sidney"
                    className={inputClass(err("location"))}
                  />
                </Field>
                <Field label="Campaign name" id="cbf-campaignName" error={err("campaignName")}>
                  <input
                    id="cbf-campaignName"
                    name="campaignName"
                    value={values.campaignName}
                    onChange={(e) => setField("campaignName", e.target.value)}
                    placeholder="e.g., Spring tune-up push"
                    className={inputClass(err("campaignName"))}
                  />
                </Field>
                <Field label="Main offer" id="cbf-offer" error={err("offer")} hint="What should people get when they respond?">
                  <textarea
                    id="cbf-offer"
                    name="offer"
                    value={values.offer}
                    onChange={(e) => setField("offer", e.target.value)}
                    placeholder="e.g., Free in-home quote + priority scheduling this month"
                    rows={3}
                    className={[inputClass(err("offer")), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
                <Field label="Call to action" id="cbf-cta" error={err("cta")} hint="Button or line you want on the ads.">
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
                  label="Landing page / final URL"
                  id="cbf-finalUrl"
                  error={err("finalUrl")}
                  hint="Where clicks from ads should land (can differ from your main website)."
                >
                  <input
                    id="cbf-finalUrl"
                    name="finalUrl"
                    type="url"
                    value={values.finalUrl}
                    onChange={(e) => setField("finalUrl", e.target.value)}
                    placeholder="https://…"
                    autoComplete="url"
                    className={inputClass(err("finalUrl"))}
                  />
                </Field>

                <fieldset className="space-y-2">
                  <legend className="text-xs font-semibold text-slate-700">Platforms wanted</legend>
                  <p className="text-xs text-slate-500">Select all that apply.</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {PLATFORM_OPTIONS.map((p) => {
                      const checked = values.platforms.includes(p.value);
                      return (
                        <label key={p.value} className={choiceClass(checked, platformErr)}>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                            checked={checked}
                            onChange={() => togglePlatform(p.value)}
                          />
                          <span>{p.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  {platformErr ? (
                    <p className="text-xs font-medium text-rose-600" role="alert">
                      {platformErr}
                    </p>
                  ) : null}
                </fieldset>

                <fieldset className="space-y-2">
                  <legend className="text-xs font-semibold text-slate-700">Creative format wanted</legend>
                  <p className="text-xs text-slate-500">Image, carousel, and/or video.</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {FORMAT_OPTIONS.map((f) => {
                      const checked = values.formats.includes(f.value);
                      return (
                        <label key={f.value} className={choiceClass(checked, formatErr)}>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                            checked={checked}
                            onChange={() => toggleFormat(f.value)}
                          />
                          <span>{f.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  {formatErr ? (
                    <p className="text-xs font-medium text-rose-600" role="alert">
                      {formatErr}
                    </p>
                  ) : null}
                </fieldset>

                <Field
                  label="Short campaign goal"
                  id="cbf-creativeBrief"
                  error={err("creativeBrief")}
                  hint="In a sentence or two — what does “win” look like for this campaign?"
                >
                  <textarea
                    id="cbf-creativeBrief"
                    name="creativeBrief"
                    value={values.creativeBrief}
                    onChange={(e) => setField("creativeBrief", e.target.value)}
                    placeholder="e.g., Fill the calendar for April installs from homeowners south of the bridge"
                    rows={3}
                    className={[inputClass(err("creativeBrief")), "resize-y min-h-[88px]"].join(" ")}
                  />
                </Field>
                <Field
                  label="Optional design notes"
                  id="cbf-designNotes"
                  hint="Brand colours, fonts, assets, competitors you like, or timing."
                >
                  <textarea
                    id="cbf-designNotes"
                    name="designNotes"
                    value={values.designNotes}
                    onChange={(e) => setField("designNotes", e.target.value)}
                    placeholder="Anything the design team should know?"
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
                <ReviewRow label="Business" value={values.businessName} />
                <ReviewRow label="Contact" value={`${values.contactName} · ${values.email} · ${values.phone}`} />
                <ReviewRow label="Website" value={values.website.trim() || "—"} />
                <ReviewRow label="Industry / type" value={values.industry} />
                <ReviewRow label="Location / area" value={values.location} />
                <ReviewRow label="Campaign name" value={values.campaignName} />
                <ReviewRow label="Offer" value={values.offer} />
                <ReviewRow label="Call to action" value={values.cta} />
                <ReviewRow label="Landing / final URL" value={values.finalUrl} />
                <ReviewRow label="Platforms" value={platformsSummary(values.platforms)} />
                <ReviewRow label="Formats" value={formatsSummary(values.formats)} />
                <ReviewRow label="Campaign goal" value={values.creativeBrief} />
                <ReviewRow label="Design notes" value={values.designNotes.trim() || "—"} />
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
