/**
 * Shared post-submit hooks: analytics + optional Make + optional ad_creatives stub.
 */

import { supabase } from "@/lib/supabase";
import { trackCampaignBriefSubmitted, trackDemoLeadSubmitted } from "@/lib/analytics";
import { notifyMakeCampaignBrief } from "@/lib/makeWebhook";
import { AD_CREATIVES_TABLE, toAdCreativeStub } from "@/lib/adCreatives";

export async function onDemoLeadSuccess(meta = {}) {
  trackDemoLeadSubmitted(meta);
}

/**
 * After campaign_briefs insert succeeds:
 * 1. GTM conversion event
 * 2. Make webhook (OpenAI → ad_creatives)
 * 3. Best-effort stub row in ad_creatives (pending_generation)
 */
export async function onCampaignBriefSuccess(values, briefRow) {
  trackCampaignBriefSubmitted({
    business_name: briefRow.business_name,
    campaign_goal: briefRow.campaign_goal,
    business_type: briefRow.business_type,
    service_area: briefRow.service_area,
  });

  // Fire-and-forget: don't block success UI on Make / secondary insert
  void notifyMakeCampaignBrief({
    brief: briefRow,
    contact: {
      name: values.contactName,
      email: values.contactEmail,
      phone: values.phone || null,
    },
  });

  if (supabase) {
    const stub = toAdCreativeStub(values, briefRow);
    void supabase
      .from(AD_CREATIVES_TABLE)
      .insert([stub])
      .then(({ error }) => {
        if (error && typeof console !== "undefined") {
          console.warn("[ad_creatives stub]", error.message);
        }
      });
  }
}
