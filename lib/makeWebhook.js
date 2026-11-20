/**
 * Fire a Make.com (Integromat) webhook after a successful campaign brief.
 *
 * Set in `.env.local` (and GitHub Actions secrets/vars for Pages builds):
 *   NEXT_PUBLIC_MAKE_BRIEF_WEBHOOK_URL=https://hook.us1.make.com/xxxxxxxx
 *
 * Recommended Make scenario:
 *   1. Custom webhook (receive brief JSON)
 *   2. OpenAI → generate headlines / primary text / image prompt
 *   3. Supabase → insert into `ad_creatives` (status: draft)
 *   4. Optional: email you + Buffer/Figma steps
 *
 * Returns quietly if the URL is unset — site still works without Make.
 */

export async function notifyMakeCampaignBrief(payload) {
  const url = (process.env.NEXT_PUBLIC_MAKE_BRIEF_WEBHOOK_URL || "").trim();
  if (!url) {
    return { ok: false, skipped: true, reason: "NEXT_PUBLIC_MAKE_BRIEF_WEBHOOK_URL not set" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "victorialeads.ca",
        event: "campaign_brief_submitted",
        submitted_at: new Date().toISOString(),
        ...payload,
      }),
    });

    if (!res.ok) {
      return { ok: false, skipped: false, status: res.status, reason: await res.text().catch(() => "") };
    }
    return { ok: true, skipped: false };
  } catch (err) {
    return {
      ok: false,
      skipped: false,
      reason: err instanceof Error ? err.message : "Webhook request failed",
    };
  }
}
