import { motion } from "framer-motion";
import { Search, Lightbulb, Play, RefreshCw } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Deep Audit",
    duration: "Week 1",
    desc: "We analyze your current campaigns, tracking setup, landing pages, and competitors to find gaps and quick wins.",
    deliverables: ["Ad account audit report", "Competitor analysis", "Tracking health check"],
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Custom Strategy",
    duration: "Week 2",
    desc: "We build a full-funnel strategy tailored to your business model, audience, and growth targets.",
    deliverables: ["Media plan with budget allocation", "Audience mapping", "Creative brief & calendar"],
  },
  {
    icon: Play,
    step: "03",
    title: "Launch & Execute",
    duration: "Week 3-4",
    desc: "We set up campaigns, implement tracking, launch creatives, and start driving qualified traffic.",
    deliverables: ["Campaign setup & launch", "Pixel & CAPI implementation", "Creative production"],
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Optimize & Scale",
    duration: "Ongoing",
    desc: "We continuously test, refine, and scale what works — killing losers fast and doubling down on winners.",
    deliverables: ["Weekly performance reports", "A/B test results", "Scaling recommendations"],
  },
];

const ProcessSection = () => (
  <section className="section-padding bg-surface">
    <div className="container mx-auto">
      <SectionHeading
        badge="Our Process"
        title="From Audit to Scale in 30 Days"
        subtitle="A proven 4-step framework that takes you from uncertainty to predictable, profitable growth."
      />
      <div className="relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Step circle */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                <s.icon size={28} className="text-primary-foreground" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold tracking-wider uppercase text-gold">{s.duration}</span>
                <h3 className="font-display text-2xl font-bold text-foreground mt-1 mb-2">
                  <span className="text-primary">{s.step}.</span> {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="space-y-1.5">
                  {s.deliverables.map((d, j) => (
                    <div key={j} className="text-xs text-muted-foreground bg-card rounded-lg px-3 py-1.5 border border-border">
                      📋 {d}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
