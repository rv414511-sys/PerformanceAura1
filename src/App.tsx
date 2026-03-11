import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
