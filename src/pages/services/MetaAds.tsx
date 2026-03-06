import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Target } from "lucide-react";

const data = {
  icon: Target,
  title: "Meta Ads",
  headline: "Professional Meta Ads Services for Growing Businesses",
  description: "Reach your ideal audience with precision-targeted campaigns on Facebook and Instagram that drive real conversions and measurable ROI.",
  aboutTitle: "What Are Meta Ads & Why Your Business Needs Them",
  aboutText: [
    "Meta Ads encompass Facebook and Instagram advertising — the most powerful social media platforms for reaching potential customers. With over 3 billion monthly active users, Meta platforms offer unmatched audience reach and targeting capabilities.",
    "At PerformanceAura, we design data-driven Meta Ad campaigns that go beyond vanity metrics. We focus on conversions, customer acquisition cost, and return on ad spend to ensure every rupee you invest delivers measurable business growth.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Higher Conversion Rates", desc: "Our precision targeting and creative optimization ensure maximum conversions from every campaign." },
    { title: "Stronger Online Presence", desc: "Build brand awareness and establish authority across Facebook and Instagram platforms." },
    { title: "Better Brand Visibility", desc: "Reach millions of potential customers with targeted ads that resonate with your audience." },
    { title: "More Leads & Sales", desc: "Generate high-quality leads and drive sales with conversion-optimized campaign funnels." },
  ],
  deliverables: [
    "Comprehensive audience research & segmentation",
    "Creative strategy with A/B testing",
    "Retargeting & lookalike audience setup",
    "Campaign structure optimization",
    "Weekly performance reporting & analytics",
    "Continuous bid and budget optimization",
  ],
};

const MetaAds = () => <ServicePageTemplate data={data} />;
export default MetaAds;
