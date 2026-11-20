-- Optional: ensure `ad_creatives` can accept stub rows from the campaign brief form.
-- Adjust types/constraints to match your live table. Make + OpenAI fill copy fields later.

-- Example columns used by lib/adCreatives.js → toAdCreativeStub()
-- Run in Supabase SQL only if these columns are missing.

alter table if exists public.ad_creatives
  add column if not exists business_name text,
  add column if not exists campaign_name text,
  add column if not exists platform text default 'google_ads',
  add column if not exists service_area text,
  add column if not exists landing_page_url text,
  add column if not exists offer text,
  add column if not exists cta text,
  add column if not exists headline_1 text,
  add column if not exists headline_2 text,
  add column if not exists headline_3 text,
  add column if not exists description_1 text,
  add column if not exists description_2 text,
  add column if not exists social_primary_text_1 text,
  add column if not exists social_headline_1 text,
  add column if not exists image_prompt text,
  add column if not exists image_url text,
  add column if not exists status text default 'pending_generation',
  add column if not exists notes text;

-- If status is constrained, allow pending_generation:
-- alter table public.ad_creatives drop constraint if exists ad_creatives_status_check;
-- alter table public.ad_creatives add constraint ad_creatives_status_check
--   check (status in ('pending_generation', 'draft', 'approved', 'posted', 'archived'));
