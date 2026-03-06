import ServicePageTemplate from "@/components/ServicePageTemplate";
import { BarChart3 } from "lucide-react";

const data = {
  icon: BarChart3,
  title: "Google Ads",
  headline: "Google Ads Management That Captures High-Intent Buyers",
  description: "Capture customers actively searching for your products or services with high-converting Google Search, Display, and Shopping campaigns.",
  aboutTitle: "Why Google Ads Is Essential for Business Growth",
  aboutText: [
    "Google Ads puts your business in front of customers exactly when they're searching for what you offer. Unlike social media, Google captures high-intent users — people ready to buy, book, or enquire.",
    "PerformanceAura's Google Ads team specializes in creating tightly structured campaigns with laser-focused keyword targeting, compelling ad copy, and optimized landing pages that maximize your quality score and minimize cost-per-click.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Capture Ready-to-Buy Traffic", desc: "Target users with high purchase intent through strategic keyword bidding and match types." },
    { title: "Maximize Quality Score", desc: "Lower your CPC and improve ad positions with optimized ad relevance and landing pages." },
    { title: "Full-Funnel Coverage", desc: "From Search to Display to Shopping — we cover every stage of the customer journey." },
    { title: "Transparent ROI Tracking", desc: "Every click, conversion, and sale is tracked and reported for complete transparency." },
  ],
  deliverables: [
    "Keyword research & competitive analysis",
    "Search, Display & Shopping campaign setup",
    "Bid strategy optimization",
    "Landing page recommendations & optimization",
    "Conversion tracking & analytics setup",
    "Monthly performance reviews & strategy adjustments",
  ],
};

const GoogleAds = () => <ServicePageTemplate data={data} />;
export default GoogleAds;
