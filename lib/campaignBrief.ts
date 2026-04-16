/** Supabase public.campaign_briefs — align with your table; adjust mappings if column names differ. */
export const CAMPAIGN_BRIEFS_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_CAMPAIGN_BRIEFS_TABLE || "campaign_briefs";

export const LEAD_SOURCE = process.env.NEXT_PUBLIC_LEAD_SOURCE || "victorialeads.ca/start-your-campaign";

export type CampaignBriefValues = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  services: string;
  serviceArea: string;
  targetCustomer: string;
  offer: string;
  goal: CampaignGoalValue;
  preferredPlatform: PlatformValue;
  notes: string;
};

export const GOAL_OPTIONS = [
  { value: "more_leads", label: "More Leads" },
  { value: "more_calls", label: "More Calls" },
  { value: "more_quotes", label: "More Quote Requests" },
  { value: "more_bookings", label: "More Bookings" },
] as const;

export type CampaignGoalValue = (typeof GOAL_OPTIONS)[number]["value"];

export const PLATFORM_OPTIONS = [
  { value: "google_ads", label: "Google Ads" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "mixed", label: "Mixed / Not Sure" },
] as const;

export type PlatformValue = (typeof PLATFORM_OPTIONS)[number]["value"];

const GOAL_TO_DB: Record<CampaignGoalValue, string> = {
  more_leads: "lead_generation",
  more_calls: "more_calls",
  more_quotes: "quote_requests",
  more_bookings: "bookings",
};

export function goalLabel(value: CampaignGoalValue): string {
  return GOAL_OPTIONS.find((g) => g.value === value)?.label ?? value;
}

export function platformLabel(value: PlatformValue): string {
  return PLATFORM_OPTIONS.find((p) => p.value === value)?.label ?? value;
}

export function buildCampaignBriefNotes(values: CampaignBriefValues): string {
  const lines = [
    `Source: ${LEAD_SOURCE}`,
    `Contact: ${values.contactName.trim()} <${values.email.trim()}> ${values.phone.trim()}`,
    values.website.trim() ? `Website: ${values.website.trim()}` : null,
    `Campaign goal: ${goalLabel(values.goal)}`,
    `Target customer: ${values.targetCustomer.trim()}`,
    values.notes.trim() ? `Additional notes: ${values.notes.trim()}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

/** Row shape for Supabase insert — matches typical campaign_briefs CSV columns. */
export type CampaignBriefRow = {
  business_name: string;
  campaign_name: string;
  platform: string;
  service_area: string;
  landing_page_url: string | null;
  /** Promotional offer / hook from the form (not the goal). */
  offer: string;
  /**
   * Real CTA button copy (e.g. “Book a Free Estimate”). Intake does not collect this yet;
   * goals belong in `campaign_goal` + notes, not here.
   */
  cta: string | null;
  business_type: string;
  core_services: string;
  trust_points: string | null;
  campaign_goal: string;
  status: string;
  notes: string;
};

export function toCampaignBriefRow(values: CampaignBriefValues): CampaignBriefRow {
  const name = values.businessName.trim();
  return {
    business_name: name,
    campaign_name: `${name} — Campaign brief`,
    platform: values.preferredPlatform,
    service_area: values.serviceArea.trim(),
    landing_page_url: values.website.trim() || null,
    offer: values.offer.trim(),
    cta: null,
    business_type: values.businessType.trim(),
    core_services: values.services.trim(),
    trust_points: values.targetCustomer.trim() || null,
    campaign_goal: GOAL_TO_DB[values.goal],
    status: "new",
    notes: buildCampaignBriefNotes(values),
  };
}

export const INITIAL_CAMPAIGN_BRIEF_VALUES: CampaignBriefValues = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  businessType: "",
  services: "",
  serviceArea: "",
  targetCustomer: "",
  offer: "",
  goal: "more_leads",
  preferredPlatform: "google_ads",
  notes: "",
};
