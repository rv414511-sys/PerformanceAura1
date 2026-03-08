
-- Storage bucket for website images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Allow anyone to view images
CREATE POLICY "Anyone can view site images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');

-- Only admins can upload/update/delete images
CREATE POLICY "Admins can upload site images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- Site settings table for homepage content management
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default homepage settings
INSERT INTO public.site_settings (key, value) VALUES
  ('hero', '{"title": "AI-Powered Digital Marketing That Delivers Real Results", "subtitle": "We help brands scale profitably with Meta Ads, Google Ads, AI Automation & Performance Marketing strategies that generate measurable ROI.", "cta_text": "Book Free Consultation", "cta_link": "/contact"}'),
  ('stats', '{"items": [{"label": "Ad Spend Managed", "value": "₹1Cr+"}, {"label": "Campaigns Delivered", "value": "120+"}, {"label": "Average ROAS", "value": "3.2x"}, {"label": "Client Retention", "value": "94%"}]}'),
  ('founder', '{"name": "Ravi Verma", "title": "Founder & CEO", "description": "Digital marketing strategist with expertise in performance marketing, AI automation, and brand growth strategies."}');
