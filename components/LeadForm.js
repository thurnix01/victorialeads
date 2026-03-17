import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabase";

const LEAD_SOURCE = process.env.NEXT_PUBLIC_LEAD_SOURCE || "your_site";
const LEAD_CLIENT_ID = process.env.NEXT_PUBLIC_LEAD_CLIENT_ID || null;

function validate(values) {
  const errors = {};
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || "");
  const phoneOk = (values.phone || "").replace(/[^\d]/g, "").length >= 10;

  if (!values.businessName.trim()) errors.businessName = "Business name is required.";
  if (!values.name.trim()) errors.name = "Your name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!emailOk) errors.email = "Enter a valid email.";
  if (!values.phone.trim()) errors.phone = "Phone is required.";
  else if (!phoneOk) errors.phone = "Enter a valid phone number.";

  return errors;
}

function Field({ label, name, value, onChange, placeholder, error, type = "text", autoComplete }) {
  const id = `lead-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
          error ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200 focus:ring-2 focus:ring-slate-900/10",
        ].join(" ")}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({ compact = false }) {
  const [values, setValues] = useState({ businessName: "", name: "", email: "", phone: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [submitError, setSubmitError] = useState("");

  const errors = useMemo(() => validate(values), [values]);
  const show = (key) => touched[key] && errors[key];

  function onChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setTouched({ businessName: true, name: true, email: true, phone: true });
    if (Object.keys(errors).length) return;

    if (!supabase) {
      setSubmitError("Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }

    setStatus("submitting");
    try {
      const { error } = await supabase.from("leads").insert([
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          business_name: values.businessName,
          source: LEAD_SOURCE,
          client_id: LEAD_CLIENT_ID,
        },
      ]);

      if (error) throw error;

      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setSubmitError(error.message || "Something went wrong while saving your request.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="text-sm font-semibold text-emerald-900">Request received.</div>
        <p className="mt-2 text-sm text-emerald-800/90">
          We’ll reach out shortly to confirm details and show you exactly how the AI Lead Engine works.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setTouched({});
            setValues({ businessName: "", name: "", email: "", phone: "" });
          }}
          className="mt-4 text-xs font-semibold text-emerald-900 underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div onBlur={onBlur}>
          <Field
            label="Business name"
            name="businessName"
            value={values.businessName}
            onChange={onChange}
            placeholder="e.g., Westshore Roofing"
            error={show("businessName")}
            autoComplete="organization"
          />
        </div>
        <div onBlur={onBlur}>
          <Field
            label="Your name"
            name="name"
            value={values.name}
            onChange={onChange}
            placeholder="e.g., Mike"
            error={show("name")}
            autoComplete="name"
          />
        </div>
        <div onBlur={onBlur}>
          <Field
            label="Email"
            name="email"
            value={values.email}
            onChange={onChange}
            placeholder="you@company.com"
            error={show("email")}
            type="email"
            autoComplete="email"
          />
        </div>
        <div onBlur={onBlur}>
          <Field
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={onChange}
            placeholder="(250) 555-0123"
            error={show("phone")}
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Submitting…" : "Book a Free Demo"}
      </Button>

      {submitError ? (
        <p className="text-xs font-medium text-rose-600">{submitError}</p>
      ) : null}

      <p className="text-xs text-slate-500">
        By submitting, you agree to be contacted about the AI Lead Engine. No spam.
      </p>
    </form>
  );
}

