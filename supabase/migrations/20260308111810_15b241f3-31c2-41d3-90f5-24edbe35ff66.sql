-- Harden public lead submission policy to avoid permissive WITH CHECK (true)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) BETWEEN 2 AND 100
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND (phone IS NULL OR char_length(trim(phone)) <= 20)
  AND (company IS NULL OR char_length(trim(company)) <= 100)
  AND (message IS NULL OR char_length(message) <= 1000)
);