/**
 * Campaign brief intake — maps form state → Supabase `campaign_briefs` row shape.
 *
 * Table name: set `NEXT_PUBLIC_SUPABASE_CAMPAIGN_BRIEFS_TABLE` or defaults to `campaign_briefs`.
 *
 * If your Postgres columns differ (e.g. `email` instead of `contact_email`), rename columns
 * in Supabase or adjust `toCampaignBriefInsert` below.
 */

export const CAMPAIGN_BRIEFS_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_CAMPAIGN_BRIEFS_TABLE || "campaign_briefs";

/** Form state (camelCase) — easy to bind in React. */
export type CampaignBriefFormValues = {
  businessName: string;
  businessType: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  serviceArea: string;
  coreServices: string;
  offer: string;
  trustPoints: string;
  landingPageUrl: string;
  campaignGoal: CampaignGoalSlug;
  cta: string;
  notes: string;
};

export const CAMPAIGN_GOAL_OPTIONS = [
  { value: "more_leads", label: "More leads" },
  { value: "more_calls", label: "More calls" },
  { value: "more_booked_jobs", label: "More booked jobs" },
  { value: "brand_awareness", label: "Brand awareness" },
] as const;

export type CampaignGoalSlug = (typeof CAMPAIGN_GOAL_OPTIONS)[number]["value"];

export function campaignGoalLabel(slug: CampaignGoalSlug): string {
  return CAMPAIGN_GOAL_OPTIONS.find((o) => o.value === slug)?.label ?? slug;
}

/** Payload keys match typical `campaign_briefs` columns (snake_case). */
export type CampaignBriefInsert = {
  business_name: string;
  business_type: string;
  contact_name: string;
  contact_email: string;
  phone: string | null;
  service_area: string;
  core_services: string;
  offer: string | null;
  trust_points: string | null;
  landing_page_url: string | null;
  campaign_goal: CampaignGoalSlug;
  cta: string;
  notes: string | null;
  status: "submitted";
};

export function toCampaignBriefInsert(values: CampaignBriefFormValues): CampaignBriefInsert {
  return {
    business_name: values.businessName.trim(),
    business_type: values.businessType.trim(),
    contact_name: values.contactName.trim(),
    contact_email: values.contactEmail.trim(),
    phone: values.phone.trim() || null,
    service_area: values.serviceArea.trim(),
    core_services: values.coreServices.trim(),
    offer: values.offer.trim() || null,
    trust_points: values.trustPoints.trim() || null,
    landing_page_url: values.landingPageUrl.trim() || null,
    campaign_goal: values.campaignGoal,
    cta: values.cta.trim(),
    notes: values.notes.trim() || null,
    status: "submitted",
  };
}

export const INITIAL_CAMPAIGN_BRIEF_VALUES: CampaignBriefFormValues = {
  businessName: "",
  businessType: "",
  contactName: "",
  contactEmail: "",
  phone: "",
  serviceArea: "",
  coreServices: "",
  offer: "",
  trustPoints: "",
  landingPageUrl: "",
  campaignGoal: "more_leads",
  cta: "",
  notes: "",
};
