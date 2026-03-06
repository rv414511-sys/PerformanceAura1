import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Film } from "lucide-react";

const data = {
  icon: Film,
  title: "Video Editing",
  headline: "Professional Video Editing Services That Tell Your Story",
  description: "High-quality video editing for ads, social media, and brand content that captures attention and drives engagement.",
  aboutTitle: "Why Video Content Is King in Digital Marketing",
  aboutText: [
    "Video content generates 1200% more shares than text and images combined. In today's scroll-heavy digital landscape, professionally edited videos are the fastest way to capture attention and convey your brand message.",
    "PerformanceAura's video editing team creates scroll-stopping content optimized for every platform — from 15-second Instagram Reels to long-form YouTube content. We understand the algorithms and formats that drive maximum engagement and conversions.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Higher Engagement Rates", desc: "Video content drives significantly more engagement than static posts across all platforms." },
    { title: "Platform-Optimized", desc: "Content formatted and optimized for each platform's specific requirements and algorithms." },
    { title: "Brand Consistency", desc: "Maintain a cohesive visual identity across all your video content and campaigns." },
    { title: "Faster Turnaround", desc: "Quick delivery without compromising on quality — perfect for time-sensitive campaigns." },
  ],
  deliverables: [
    "Ad creative video production",
    "Social media content editing (Reels, Shorts, TikTok)",
    "Brand storytelling videos",
    "Motion graphics & animations",
    "Thumbnail design & optimization",
    "Multi-format delivery for all platforms",
  ],
};

const VideoEditing = () => <ServicePageTemplate data={data} />;
export default VideoEditing;
