/**
 * Supabase/PostgREST errors are plain objects with `message` (not always `instanceof Error`).
 * Use this so users and developers see the real constraint / RLS / type error.
 */
export function supabaseErrorMessage(err: unknown, fallback = "Something went wrong while saving your brief."): string {
  if (err == null) return fallback;

  let raw = "";
  if (typeof err === "string" && err.trim()) raw = err.trim();
  else if (err instanceof Error && err.message) raw = err.message;
  else if (typeof err === "object") {
    const o = err as Record<string, unknown>;
    const msg = o.message;
    if (typeof msg === "string" && msg.length > 0) {
      const parts = [msg];
      const details = o.details;
      if (typeof details === "string" && details.length) parts.push(details);
      const hint = o.hint;
      if (typeof hint === "string" && hint.length) parts.push(`Hint: ${hint}`);
      raw = parts.join(" — ");
    }
  }

  if (!raw) return fallback;

  // Browser network failure — usually bad/paused Supabase URL, offline, or CORS/DNS.
  if (/failed to fetch|networkerror|load failed|fetch failed/i.test(raw)) {
    return "Can’t reach the database (network error). Check that your Supabase project is active and NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are set for production.";
  }

  return raw;
}
