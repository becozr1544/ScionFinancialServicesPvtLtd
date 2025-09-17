CREATE TABLE loan_applications (
  id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  customer_name text,
  email text,
  phone text,
  loan_type text,
  amount numeric,
  status text DEFAULT 'pending'::text
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for loan applications" ON public.loan_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to read all loan applications" ON public.loan_applications FOR SELECT USING (auth.role() = 'authenticated');
