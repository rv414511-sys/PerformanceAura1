INSERT INTO public.user_roles (user_id, role) VALUES ('1cc3e6eb-674e-4d99-9e3c-c47ec6e87742', 'admin') ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.profiles (id, full_name) VALUES ('1cc3e6eb-674e-4d99-9e3c-c47ec6e87742', 'Ravi Verma') ON CONFLICT (id) DO UPDATE SET full_name = 'Ravi Verma';