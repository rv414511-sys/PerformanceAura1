import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Sparkles } from "lucide-react";

const data = {
  icon: Sparkles,
  title: "AI Automation",
  headline: "AI Automation Systems That Save Time and Scale Revenue",
  description:
    "Automate repetitive marketing and sales workflows with reliable AI systems built for business growth.",
  aboutTitle: "Why AI Automation Matters",
  aboutText: [
    "AI automation removes repetitive manual tasks from your daily operations.",
    "We build practical automations for lead qualification, CRM updates, follow-ups, reporting, and campaign optimization.",
  ],
  industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Agencies", "Local Businesses"],
  benefits: [
    { title: "Faster Execution", desc: "Automate manual workflows and reduce operational delays." },
    { title: "Lower Costs", desc: "Save team bandwidth by removing repetitive tasks." },
    { title: "Better Lead Handling", desc: "Capture, enrich, and route leads instantly." },
    { title: "Always-On Systems", desc: "Run automations 24/7 with monitoring and guardrails." },
  ],
  deliverables: [
    "Workflow audit & automation map",
    "Lead capture and routing automation",
    "CRM and sheet sync",
    "Automated follow-up sequences",
    "AI-assisted reporting",
    "Monitoring and optimization support",
  ],
};

const AIAutomation = () => <ServicePageTemplate data={data} />;

export default AIAutomation;
