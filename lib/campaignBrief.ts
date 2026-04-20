/** Supabase public.campaign_briefs — align with your table; adjust mappings if column names differ. */
export const CAMPAIGN_BRIEFS_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_CAMPAIGN_BRIEFS_TABLE || "campaign_briefs";

export const LEAD_SOURCE = process.env.NEXT_PUBLIC_LEAD_SOURCE || "victorialeads.ca/start-your-campaign";

export const PLATFORM_OPTIONS = [
  { value: "google_ads", label: "Google Ads" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
] as const;

export type PlatformValue = (typeof PLATFORM_OPTIONS)[number]["value"];

export const FORMAT_OPTIONS = [
  { value: "image", label: "Image" },
  { value: "carousel", label: "Carousel" },
  { value: "video", label: "Video" },
] as const;

export type CreativeFormatValue = (typeof FORMAT_OPTIONS)[number]["value"];

/** Intake form state — maps to campaign / ad workflow fields; copy and assets are filled by automation later. */
export type CampaignBriefValues = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  campaignName: string;
  offer: string;
  cta: string;
  finalUrl: string;
  platforms: PlatformValue[];
  formats: CreativeFormatValue[];
  creativeBrief: string;
  designNotes: string;
};

export function platformLabel(value: PlatformValue): string {
  return PLATFORM_OPTIONS.find((p) => p.value === value)?.label ?? value;
}

export function formatLabel(value: CreativeFormatValue): string {
  return FORMAT_OPTIONS.find((f) => f.value === value)?.label ?? value;
}

export function platformsSummary(values: PlatformValue[]): string {
  return values.map(platformLabel).join(", ");
}

export function formatsSummary(values: CreativeFormatValue[]): string {
  return values.map(formatLabel).join(", ");
}

export function buildCampaignBriefNotes(values: CampaignBriefValues): string {
  const lines = [
    `Source: ${LEAD_SOURCE}`,
    `Contact: ${values.contactName.trim()} <${values.email.trim()}> ${values.phone.trim()}`,
    values.website.trim() ? `Business website: ${values.website.trim()}` : null,
    `Landing / final URL: ${values.finalUrl.trim()}`,
    `Platforms: ${platformsSummary(values.platforms)}`,
    `Creative formats: ${formatsSummary(values.formats)}`,
    `Campaign goal (brief): ${values.creativeBrief.trim()}`,
    values.designNotes.trim() ? `Design notes: ${values.designNotes.trim()}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

/** Row shape for Supabase insert — matches typical campaign_briefs CSV columns. */
export type CampaignBriefRow = {
  business_name: string;
  campaign_name: string;
  /** Comma-separated platform keys, e.g. google_ads,facebook */
  platform: string;
  service_area: string;
  landing_page_url: string | null;
  offer: string;
  cta: string;
  business_type: string;
  /** Filled later by automation; not collected on intake. */
  core_services: string;
  trust_points: string | null;
  /** Short client goal text from the intake “creative brief” field. */
  campaign_goal: string;
  status: string;
  notes: string;
};

export function toCampaignBriefRow(values: CampaignBriefValues): CampaignBriefRow {
  const name = values.businessName.trim();
  const platforms = [...values.platforms].sort().join(",");
  return {
    business_name: name,
    campaign_name: values.campaignName.trim(),
    platform: platforms,
    service_area: values.location.trim(),
    landing_page_url: values.finalUrl.trim() || null,
    offer: values.offer.trim(),
    cta: values.cta.trim(),
    business_type: values.industry.trim(),
    core_services: "",
    trust_points: null,
    campaign_goal: values.creativeBrief.trim(),
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
  industry: "",
  location: "",
  campaignName: "",
  offer: "",
  cta: "",
  finalUrl: "",
  platforms: [],
  formats: [],
  creativeBrief: "",
  designNotes: "",
};
