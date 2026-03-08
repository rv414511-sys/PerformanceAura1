/**
 * Authentication Helper
 * 
 * All auth functions (signUp, signIn, signOut, resendVerification)
 * are provided by the useAuth() hook from src/hooks/useAuth.tsx.
 * 
 * Usage in any component:
 *   import { useAuth } from "@/hooks/useAuth";
 *   const { user, signIn, signUp, signOut, isAdmin } = useAuth();
 * 
 * For direct Supabase auth access:
 */

import { supabase } from "@/integrations/supabase/client";

export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const resendVerification = async (email) => {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: window.location.origin },
  });
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const checkIsAdmin = async (userId) => {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return !!data;
};
