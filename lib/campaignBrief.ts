/** Supabase public.campaign_briefs (intake) — align with your table; adjust env if the table name differs. */
export const CAMPAIGN_BRIEFS_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_CAMPAIGN_BRIEFS_TABLE || "campaign_briefs";

export const LEAD_SOURCE = process.env.NEXT_PUBLIC_LEAD_SOURCE || "victorialeads.ca/start-your-campaign";

/**
 * Values must match Postgres `campaign_briefs_platform_check` on your Supabase table.
 * (TikTok / mixed / etc. are not valid until you extend that constraint or use `notes`.)
 */
export const PLATFORM_OPTIONS = [
  { value: "google_ads", label: "Google Ads" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
] as const;

export type PlatformValue = (typeof PLATFORM_OPTIONS)[number]["value"];

export function platformLabel(value: PlatformValue): string {
  return PLATFORM_OPTIONS.find((p) => p.value === value)?.label ?? value;
}

/** Client intake only — campaign copy and ad status live in your generated / downstream tables. */
export type CampaignBriefValues = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  serviceArea: string;
  coreServices: string;
  offer: string;
  trustPoints: string;
  landingPageUrl: string;
  campaignGoal: string;
  cta: string;
  platform: PlatformValue;
  notes: string;
};

export function buildCampaignBriefNotes(values: CampaignBriefValues): string {
  const extra = values.notes.trim();
  if (!extra) return `Source: ${LEAD_SOURCE}`;
  return `Source: ${LEAD_SOURCE}\n\n${extra}`;
}

/** Row for Supabase insert — snake_case matches intake columns only. */
export type CampaignBriefRow = {
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  website: string | null;
  business_type: string;
  service_area: string;
  core_services: string;
  offer: string;
  trust_points: string | null;
  landing_page_url: string | null;
  campaign_goal: string;
  cta: string;
  platform: string;
  notes: string;
  /** Workflow default for `campaign_briefs` (not collected on the form). */
  status: string;
};

export function toCampaignBriefRow(values: CampaignBriefValues): CampaignBriefRow {
  return {
    business_name: values.businessName.trim(),
    contact_name: values.contactName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    website: values.website.trim() || null,
    business_type: values.businessType.trim(),
    service_area: values.serviceArea.trim(),
    core_services: values.coreServices.trim(),
    offer: values.offer.trim(),
    trust_points: values.trustPoints.trim() || null,
    landing_page_url: values.landingPageUrl.trim() || null,
    campaign_goal: values.campaignGoal.trim(),
    cta: values.cta.trim(),
    platform: values.platform,
    notes: buildCampaignBriefNotes(values),
    status: "new",
  };
}

export const INITIAL_CAMPAIGN_BRIEF_VALUES: CampaignBriefValues = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  businessType: "",
  serviceArea: "",
  coreServices: "",
  offer: "",
  trustPoints: "",
  landingPageUrl: "",
  campaignGoal: "",
  cta: "",
  platform: "google_ads",
  notes: "",
};
