/**
 * Database Helper Functions
 * 
 * Provides convenient CRUD operations for all Supabase tables.
 * All data goes to the Supabase project configured in .env.
 * 
 * Tables: leads, blog_posts, courses, resources, reviews, 
 *         profiles, payments, site_settings, user_roles
 */

import { supabase } from "@/integrations/supabase/client";

// ========== LEADS (Contact Form) ==========
export const insertLead = async ({ name, email, phone, company, message }) => {
  return supabase.from("leads").insert({ name, email, phone, company, message });
};

export const getLeads = async () => {
  return supabase.from("leads").select("*").order("created_at", { ascending: false });
};

export const updateLeadStatus = async (id, status) => {
  return supabase.from("leads").update({ status }).eq("id", id);
};

export const deleteLead = async (id) => {
  return supabase.from("leads").delete().eq("id", id);
};

// ========== BLOG POSTS ==========
export const getPublishedPosts = async () => {
  return supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
};

export const getPostBySlug = async (slug) => {
  return supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
};

export const getAllPosts = async () => {
  return supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
};

export const upsertPost = async (post) => {
  return supabase.from("blog_posts").upsert(post);
};

export const deletePost = async (id) => {
  return supabase.from("blog_posts").delete().eq("id", id);
};

// ========== COURSES ==========
export const getPublishedCourses = async () => {
  return supabase.from("courses").select("*").eq("published", true).order("created_at", { ascending: false });
};

export const getAllCourses = async () => {
  return supabase.from("courses").select("*").order("created_at", { ascending: false });
};

export const upsertCourse = async (course) => {
  return supabase.from("courses").upsert(course);
};

export const deleteCourse = async (id) => {
  return supabase.from("courses").delete().eq("id", id);
};

// ========== RESOURCES ==========
export const getPublishedResources = async () => {
  return supabase.from("resources").select("*").eq("published", true).order("created_at", { ascending: false });
};

export const upsertResource = async (resource) => {
  return supabase.from("resources").upsert(resource);
};

export const deleteResource = async (id) => {
  return supabase.from("resources").delete().eq("id", id);
};

// ========== REVIEWS ==========
export const getPublishedReviews = async () => {
  return supabase.from("reviews").select("*").eq("published", true).order("created_at", { ascending: false });
};

export const upsertReview = async (review) => {
  return supabase.from("reviews").upsert(review);
};

export const deleteReview = async (id) => {
  return supabase.from("reviews").delete().eq("id", id);
};

// ========== PROFILES ==========
export const getProfile = async (userId) => {
  return supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
};

export const updateProfile = async (userId, updates) => {
  return supabase.from("profiles").update(updates).eq("id", userId);
};

// ========== PAYMENTS ==========
export const getUserPayments = async (userId) => {
  return supabase.from("payments").select("*").eq("user_id", userId).order("created_at", { ascending: false });
};

export const getAllPayments = async () => {
  return supabase.from("payments").select("*").order("created_at", { ascending: false });
};

// ========== SITE SETTINGS ==========
export const getSetting = async (key) => {
  return supabase.from("site_settings").select("value").eq("key", key).maybeSingle();
};

export const upsertSetting = async (key, value) => {
  return supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
};

// ========== USER ROLES ==========
export const getUserRoles = async (userId) => {
  return supabase.from("user_roles").select("*").eq("user_id", userId);
};

export const assignRole = async (userId, role) => {
  return supabase.from("user_roles").upsert({ user_id: userId, role });
};
