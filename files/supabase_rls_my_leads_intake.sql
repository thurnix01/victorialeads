-- Run once in Supabase → SQL Editor (as postgres / service role).
-- Fixes: "new row violates row-level security policy for table \"my_leads_intake\""
--
-- The site uses the public anon key, so inserts must be allowed for role `anon`.

ALTER TABLE public.my_leads_intake ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert from website form"
ON public.my_leads_intake
FOR INSERT
TO anon
WITH CHECK (true);

-- Optional: tighten later, e.g. WITH CHECK (lead_source = 'victorialeads.ca')
-- Optional: add SELECT policies if you query this table from the client logged in as anon.
