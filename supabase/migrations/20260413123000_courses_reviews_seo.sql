ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS rating INTEGER NOT NULL DEFAULT 5,
ADD COLUMN IF NOT EXISTS learn_points TEXT[];

ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS review_type TEXT NOT NULL DEFAULT 'general',
ADD COLUMN IF NOT EXISTS service_slug TEXT;

CREATE INDEX IF NOT EXISTS reviews_service_slug_idx ON public.reviews(service_slug);
