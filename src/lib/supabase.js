/**
 * Supabase Client - Portable Configuration
 * 
 * FOR LOCAL DEVELOPMENT / VERCEL DEPLOYMENT:
 * Create a .env file in project root with:
 * 
 *   VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
 *   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_public_key
 * 
 * The app reads these from environment variables automatically.
 * In Lovable Preview, it uses the built-in Cloud backend.
 * 
 * This file re-exports the auto-generated client for convenience.
 */

export { supabase } from "@/integrations/supabase/client";
