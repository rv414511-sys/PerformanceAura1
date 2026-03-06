import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Share2 } from "lucide-react";

const data = {
  icon: Share2,
  title: "Social Media Marketing",
  headline: "Social Media Marketing That Builds Communities & Drives Sales",
  description: "Strategic social media management that grows your audience, builds brand loyalty, and generates consistent leads across all platforms.",
  aboutTitle: "Why Social Media Is Non-Negotiable for Modern Businesses",
  aboutText: [
    "Social media is where your customers spend their time. With billions of active users across platforms, social media marketing is the most effective way to build brand awareness, engage with your audience, and drive traffic to your website.",
    "PerformanceAura creates comprehensive social media strategies that go beyond posting content. We build communities, run engagement campaigns, collaborate with influencers, and use data-driven insights to maximize your social ROI.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Brand Awareness", desc: "Expand your reach and put your brand in front of thousands of potential customers daily." },
    { title: "Community Building", desc: "Foster genuine connections with your audience that drive long-term loyalty." },
    { title: "Lead Generation", desc: "Convert social engagement into qualified leads with strategic content funnels." },
    { title: "Competitive Edge", desc: "Stay ahead of competitors with trend-driven content and platform-specific strategies." },
  ],
  deliverables: [
    "Social media strategy & content calendar",
    "Content creation (graphics, carousels, stories)",
    "Community management & engagement",
    "Influencer marketing campaigns",
    "Monthly analytics & performance reports",
    "Platform-specific growth strategies",
  ],
};

const SocialMediaMarketing = () => <ServicePageTemplate data={data} />;
export default SocialMediaMarketing;
