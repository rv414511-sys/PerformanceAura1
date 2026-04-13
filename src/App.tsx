import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useSetting } from "@/hooks/useSiteSettings";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import MetaAds from "./pages/services/MetaAds";
import GoogleAds from "./pages/services/GoogleAds";
import PerformanceMarketing from "./pages/services/PerformanceMarketing";
import VideoEditing from "./pages/services/VideoEditing";
import ContentWriting from "./pages/services/ContentWriting";
import SocialMediaMarketing from "./pages/services/SocialMediaMarketing";
import WebDesign from "./pages/services/WebDesign";
import AIAutomation from "./pages/services/AIAutomation";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminPages from "./pages/admin/AdminPages";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminResources from "./pages/admin/AdminResources";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminElementorPro from "./pages/admin/AdminElementorPro";

const queryClient = new QueryClient();

const SiteSettingsSync = () => {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("site-settings-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => {
          qc.invalidateQueries({ queryKey: ["site-settings"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return null;
};

const AnalyticsTracker = () => {
  const location = useLocation();
  const { user } = useAuth();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const path = `${location.pathname}${location.search || ""}`;
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;
    if (path.startsWith("/admin")) return;

    void supabase.from("analytics_events").insert({
      user_id: user?.id ?? null,
      event_type: "page_view",
      path,
      meta: {
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      },
    });
  }, [location.pathname, location.search, user?.id]);

  return null;
};

const SeoMetaManager = () => {
  const location = useLocation();
  const { value: seo } = useSetting("seo");

  useEffect(() => {
    const siteTitle = seo?.site_title || "PerformanceAura";
    const defaultDescription = seo?.default_description || "";
    const ogImage = seo?.og_image || "";

    const path = location.pathname || "/";
    const pageMap: Record<string, string> = {
      "/": "Home",
      "/about": "About",
      "/services": "Services",
      "/courses": "Courses",
      "/blog": "Blog",
      "/resources": "Resources",
      "/contact": "Contact",
      "/privacy": "Privacy Policy",
      "/terms": "Terms",
      "/refund-policy": "Refund Policy",
    };

    const prettyFromSlug = (s: string) =>
      s
        .split("-")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    let pageTitle = pageMap[path] || "";
    if (path.startsWith("/services/")) {
      const slug = path.split("/services/")[1] || "";
      pageTitle = prettyFromSlug(slug);
    }

    document.title = pageTitle ? `${pageTitle} — ${siteTitle}` : siteTitle;

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => el?.setAttribute(k, v));
        document.head.appendChild(el);
      }
      return el;
    };

    const ensureName = (name: string) => ensureMeta(`meta[name="${name}"]`, { name });
    const ensureProp = (property: string) => ensureMeta(`meta[property="${property}"]`, { property });

    const descEl = ensureName("description");
    descEl.setAttribute("content", defaultDescription);

    const ogTitleEl = ensureProp("og:title");
    ogTitleEl.setAttribute("content", document.title);
    const ogDescEl = ensureProp("og:description");
    ogDescEl.setAttribute("content", defaultDescription);
    const ogTypeEl = ensureProp("og:type");
    ogTypeEl.setAttribute("content", "website");
    if (ogImage) {
      const ogImgEl = ensureProp("og:image");
      ogImgEl.setAttribute("content", ogImage);
      const twImgEl = ensureName("twitter:image");
      twImgEl.setAttribute("content", ogImage);
    }

    const twCardEl = ensureName("twitter:card");
    twCardEl.setAttribute("content", "summary_large_image");
  }, [location.pathname, seo?.site_title, seo?.default_description, seo?.og_image]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SiteSettingsSync />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="resources" element={<AdminResources />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="elementor-pro" element={<AdminElementorPro />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Public */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/services/meta-ads" element={<Layout><MetaAds /></Layout>} />
            <Route path="/services/google-ads" element={<Layout><GoogleAds /></Layout>} />
            <Route path="/services/performance-marketing" element={<Layout><PerformanceMarketing /></Layout>} />
            <Route path="/services/video-editing" element={<Layout><VideoEditing /></Layout>} />
            <Route path="/services/content-writing" element={<Layout><ContentWriting /></Layout>} />
            <Route path="/services/social-media-marketing" element={<Layout><SocialMediaMarketing /></Layout>} />
            <Route path="/services/web-design" element={<Layout><WebDesign /></Layout>} />
            <Route path="/services/ai-automation" element={<Layout><AIAutomation /></Layout>} />
            <Route path="/courses" element={<Layout><Courses /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SeoMetaManager />
          <AnalyticsTracker />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
