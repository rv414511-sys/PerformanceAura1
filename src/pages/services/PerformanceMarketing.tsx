import ServicePageTemplate from "@/components/ServicePageTemplate";
import { TrendingUp } from "lucide-react";

const data = {
  icon: TrendingUp,
  title: "Performance Marketing",
  headline: "ROI-Focused Performance Marketing That Scales",
  description: "Data-driven, results-oriented marketing strategies with transparent reporting and continuous optimization across all channels.",
  aboutTitle: "What Is Performance Marketing & Why It Matters",
  aboutText: [
    "Performance marketing is a results-based approach where every dollar spent is tied to a measurable outcome — whether it's a lead, sale, or signup. Unlike traditional marketing, you only pay for results.",
    "PerformanceAura brings together multi-channel expertise, advanced analytics, and relentless optimization to build marketing engines that scale profitably. We track every touchpoint and optimize for the metrics that matter most to your business.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Measurable Results", desc: "Every campaign is tied to clear KPIs with transparent, real-time reporting dashboards." },
    { title: "Multi-Channel Attribution", desc: "Understand which channels drive the most value with advanced attribution modeling." },
    { title: "Continuous Optimization", desc: "We never 'set and forget' — campaigns are continuously tested and optimized." },
    { title: "Scalable Growth", desc: "Frameworks designed to scale from ₹1L to ₹1Cr+ monthly spend without losing efficiency." },
  ],
  deliverables: [
    "Multi-channel marketing strategy",
    "Funnel design & optimization",
    "CPA & ROAS optimization",
    "Attribution modeling & analytics",
    "Weekly performance reviews",
    "Quarterly strategy planning sessions",
  ],
};

const PerformanceMarketing = () => <ServicePageTemplate data={data} />;
export default PerformanceMarketing;
