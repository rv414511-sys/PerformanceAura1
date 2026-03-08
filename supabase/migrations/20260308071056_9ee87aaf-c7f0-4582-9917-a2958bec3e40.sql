
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Security definer function for role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin can read all user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can manage leads" ON public.leads FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  keywords TEXT[],
  meta_description TEXT,
  read_time TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create resources table
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  file_url TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published resources" ON public.resources FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage resources" ON public.resources FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create resource_downloads table (track who downloaded)
CREATE TABLE public.resource_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert own downloads" ON public.resource_downloads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all downloads" ON public.resource_downloads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published reviews" ON public.reviews FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  topics TEXT[],
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending',
  payment_type TEXT NOT NULL,
  item_id UUID,
  item_title TEXT,
  provider TEXT,
  provider_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for auto profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
