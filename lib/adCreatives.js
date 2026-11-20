/**
 * Stub row for Supabase `ad_creatives` — filled later by Make + OpenAI.
 *
 * Table override: NEXT_PUBLIC_SUPABASE_AD_CREATIVES_TABLE (default: ad_creatives)
 * If insert fails (missing table/columns), the brief still succeeds; Make can create the row.
 */

import { campaignGoalLabel } from "@/lib/campaignBrief";

export const AD_CREATIVES_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_AD_CREATIVES_TABLE || "ad_creatives";

/**
 * @param {import("@/lib/campaignBrief").CampaignBriefFormValues} values
 * @param {import("@/lib/campaignBrief").CampaignBriefInsert} briefRow
 */
export function toAdCreativeStub(values, briefRow) {
  const campaignName = `${briefRow.business_name} — ${campaignGoalLabel(briefRow.campaign_goal)}`;

  return {
    business_name: briefRow.business_name,
    campaign_name: campaignName,
    platform: "google_ads",
    service_area: briefRow.service_area,
    landing_page_url: briefRow.landing_page_url,
    offer: briefRow.offer,
    cta: briefRow.cta,
    /** Copy fields left empty for OpenAI / Make to fill */
    headline_1: null,
    headline_2: null,
    headline_3: null,
    description_1: null,
    description_2: null,
    social_primary_text_1: null,
    social_headline_1: null,
    image_prompt: null,
    image_url: null,
    status: "pending_generation",
    notes: [
      `Auto-stub from campaign brief (${briefRow.contact_email})`,
      `Business type: ${briefRow.business_type}`,
      `Core services: ${briefRow.core_services}`,
      briefRow.trust_points ? `Trust: ${briefRow.trust_points}` : null,
      briefRow.notes ? `Client notes: ${briefRow.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}
