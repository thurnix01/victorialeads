/**
 * Supabase/PostgREST errors are plain objects with `message` (not always `instanceof Error`).
 * Use this so users and developers see the real constraint / RLS / type error.
 */
export function supabaseErrorMessage(err: unknown, fallback = "Something went wrong while saving your brief."): string {
  if (err == null) return fallback;
  if (typeof err === "string" && err.trim()) return err.trim();
  if (err instanceof Error && err.message) return err.message;

  if (typeof err === "object") {
    const o = err as Record<string, unknown>;
    const msg = o.message;
    if (typeof msg === "string" && msg.length > 0) {
      const parts = [msg];
      const details = o.details;
      if (typeof details === "string" && details.length) parts.push(details);
      const hint = o.hint;
      if (typeof hint === "string" && hint.length) parts.push(`Hint: ${hint}`);
      return parts.join(" — ");
    }
  }

  return fallback;
}
