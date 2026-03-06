import ServicePageTemplate from "@/components/ServicePageTemplate";
import { PenTool } from "lucide-react";

const data = {
  icon: PenTool,
  title: "Content Writing",
  headline: "SEO-Optimized Content Writing That Converts",
  description: "Compelling, keyword-rich content that ranks on search engines, engages your audience, and drives meaningful business results.",
  aboutTitle: "Why Quality Content Is the Foundation of Digital Success",
  aboutText: [
    "Content is the backbone of every successful digital marketing strategy. From website copy to blog posts, SEO articles to ad creatives — the words you use determine whether visitors convert into customers.",
    "At PerformanceAura, our content team combines SEO expertise with persuasive copywriting to create content that ranks, resonates, and converts. We research your industry, understand your audience, and craft messaging that positions your brand as the authority in your space.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Higher Search Rankings", desc: "SEO-optimized content that drives organic traffic and improves domain authority." },
    { title: "Increased Conversions", desc: "Persuasive copy that guides visitors through your funnel and drives action." },
    { title: "Brand Authority", desc: "Position your brand as an industry thought leader through expert content." },
    { title: "Consistent Brand Voice", desc: "Maintain a unified tone and messaging across all touchpoints." },
  ],
  deliverables: [
    "Website copy & landing page content",
    "SEO blog articles & thought leadership",
    "Ad copy for Meta & Google campaigns",
    "Email marketing content",
    "Social media captions & content calendars",
    "Product descriptions & category pages",
  ],
};

const ContentWriting = () => <ServicePageTemplate data={data} />;
export default ContentWriting;
