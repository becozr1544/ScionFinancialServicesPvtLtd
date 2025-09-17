-- Create enum types for better data consistency
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'employee');
CREATE TYPE public.loan_type AS ENUM ('personal', 'home', 'auto', 'business', 'education', 'project_funding');
CREATE TYPE public.loan_status AS ENUM ('pending', 'approved', 'rejected', 'disbursed', 'closed');
CREATE TYPE public.payment_mode AS ENUM ('upi', 'bank_transfer', 'cash', 'cheque');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'converted', 'lost');
CREATE TYPE public.lead_source AS ENUM ('website', 'referral', 'social_media', 'advertisement', 'walk_in', 'phone');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone VARCHAR(15),
  role app_role DEFAULT 'employee',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(15) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  pan_number VARCHAR(10),
  aadhar_number VARCHAR(12),
  date_of_birth DATE,
  occupation TEXT,
  annual_income DECIMAL(15,2),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create loan_applications table
CREATE TABLE public.loan_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  loan_type loan_type NOT NULL,
  requested_amount DECIMAL(15,2) NOT NULL,
  approved_amount DECIMAL(15,2),
  interest_rate DECIMAL(5,2),
  tenure_months INTEGER,
  status loan_status DEFAULT 'pending',
  purpose TEXT,
  monthly_income DECIMAL(15,2),
  existing_loans TEXT,
  collateral_details TEXT,
  documents_submitted TEXT[],
  remarks TEXT,
  processed_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  disbursed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  loan_application_id UUID REFERENCES public.loan_applications(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_mode payment_mode NOT NULL,
  transaction_reference VARCHAR(100),
  receipt_number VARCHAR(50) UNIQUE,
  principal_amount DECIMAL(15,2),
  interest_amount DECIMAL(15,2),
  penalty_amount DECIMAL(15,2) DEFAULT 0,
  notes TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(15) NOT NULL,
  loan_type loan_type,
  interested_amount DECIMAL(15,2),
  source lead_source NOT NULL,
  status lead_status DEFAULT 'new',
  notes TEXT,
  follow_up_date DATE,
  assigned_to UUID REFERENCES auth.users(id),
  converted_to_customer UUID REFERENCES public.customers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create documents table for file uploads
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL, -- 'customer', 'loan_application', 'payment'
  entity_id UUID NOT NULL,
  document_type TEXT NOT NULL, -- 'pan', 'aadhar', 'income_proof', 'bank_statement', etc.
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for customers (authenticated users can access)
CREATE POLICY "Authenticated users can view customers" ON public.customers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create customers" ON public.customers
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update customers" ON public.customers
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for loan_applications
CREATE POLICY "Authenticated users can view loan applications" ON public.loan_applications
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create loan applications" ON public.loan_applications
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update loan applications" ON public.loan_applications
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for payments
CREATE POLICY "Authenticated users can view payments" ON public.payments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create payments" ON public.payments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = recorded_by);

CREATE POLICY "Authenticated users can update payments" ON public.payments
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for leads
CREATE POLICY "Authenticated users can view leads" ON public.leads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can create leads" ON public.leads
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update leads" ON public.leads
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for documents
CREATE POLICY "Authenticated users can view documents" ON public.documents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can upload documents" ON public.documents
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'employee'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loan_applications_updated_at
  BEFORE UPDATE ON public.loan_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_phone ON public.customers(phone);
CREATE INDEX idx_loan_applications_customer_id ON public.loan_applications(customer_id);
CREATE INDEX idx_loan_applications_status ON public.loan_applications(status);
CREATE INDEX idx_payments_loan_application_id ON public.payments(loan_application_id);
CREATE INDEX idx_payments_customer_id ON public.payments(customer_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX idx_documents_entity ON public.documents(entity_type, entity_id);

-- Generate unique receipt numbers for payments
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS TEXT AS $$
DECLARE
  receipt_number TEXT;
BEGIN
  receipt_number := 'RCP' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(nextval('receipt_sequence')::TEXT, 4, '0');
  RETURN receipt_number;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE receipt_sequence START 1;