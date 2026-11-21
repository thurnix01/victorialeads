/**
 * Post-submit analytics only (GTM dataLayer).
 * Intake storage + email now live in n8n — not Supabase / Make.
 */

import { trackCampaignBriefSubmitted, trackDemoLeadSubmitted } from "@/lib/analytics";

export async function onDemoLeadSuccess(meta = {}) {
  trackDemoLeadSubmitted(meta);
}

export async function onCampaignBriefSuccess(values, briefRow) {
  trackCampaignBriefSubmitted({
    business_name: briefRow.business_name,
    campaign_goal: briefRow.campaign_goal,
    business_type: briefRow.business_type,
    service_area: briefRow.service_area,
  });
}
