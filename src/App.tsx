import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import MetaAds from "./pages/services/MetaAds";
import GoogleAds from "./pages/services/GoogleAds";
import PerformanceMarketing from "./pages/services/PerformanceMarketing";
import VideoEditing from "./pages/services/VideoEditing";
import ContentWriting from "./pages/services/ContentWriting";
import SocialMediaMarketing from "./pages/services/SocialMediaMarketing";
import WebDesign from "./pages/services/WebDesign";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
