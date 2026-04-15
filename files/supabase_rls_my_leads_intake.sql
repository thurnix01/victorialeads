-- Run once in Supabase → SQL Editor (as postgres / service role).
-- Fixes: "new row violates row-level security policy for table \"My Leads Intake\""
--
-- The site uses the public anon key, so inserts must be allowed for role `anon`.

ALTER TABLE public."My Leads Intake" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert from website form"
ON public."My Leads Intake"
FOR INSERT
TO anon
WITH CHECK (true);

-- Optional: tighten later, e.g. WITH CHECK (lead_source = 'victorialeads.ca')
-- Optional: add SELECT policies if you query this table from the client logged in as anon.
