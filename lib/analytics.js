/**
 * Push conversion events into dataLayer for GTM (Meta / Google Ads tags).
 * Configure triggers in GTM-P2L473TN on these event names.
 */

export function trackEvent(eventName, payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
}

/** Demo lead form success (homepage #demo). */
export function trackDemoLeadSubmitted(extra = {}) {
  trackEvent("demo_lead_submitted", {
    form_name: "demo_lead",
    lead_source: extra.lead_source || "victorialeads.ca",
    ...extra,
  });
}

/** Campaign brief success (/start-your-campaign, /campaign-brief). */
export function trackCampaignBriefSubmitted(extra = {}) {
  trackEvent("campaign_brief_submitted", {
    form_name: "campaign_brief",
    ...extra,
  });
}
