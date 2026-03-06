import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Monitor } from "lucide-react";

const data = {
  icon: Monitor,
  title: "Web Design & Development",
  headline: "Professional Web Design Services for Growing Businesses",
  description: "Modern, responsive websites designed for conversions — built to represent your brand and turn visitors into customers.",
  aboutTitle: "Why Your Website Is Your Most Important Marketing Asset",
  aboutText: [
    "Your website is your digital storefront. It's often the first impression potential customers have of your brand, and it needs to be fast, beautiful, and optimized for conversions.",
    "PerformanceAura designs and develops custom websites that combine stunning visuals with strategic UX. From landing pages to full e-commerce platforms, we build digital experiences that convert visitors into paying customers and keep them coming back.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
  benefits: [
    { title: "Higher Conversion Rates", desc: "Conversion-focused design with strategic CTAs, layouts, and user flows." },
    { title: "Mobile-First Design", desc: "Responsive websites that look and perform perfectly on every device." },
    { title: "SEO-Ready Architecture", desc: "Built with clean code, fast loading times, and SEO best practices." },
    { title: "Brand-Aligned Aesthetics", desc: "Designs that reflect your brand identity and establish credibility." },
  ],
  deliverables: [
    "Custom UI/UX design & prototyping",
    "Responsive front-end development",
    "E-commerce store setup & optimization",
    "Landing page design for campaigns",
    "Website speed optimization",
    "Ongoing maintenance & support",
  ],
};

const WebDesign = () => <ServicePageTemplate data={data} />;
export default WebDesign;
