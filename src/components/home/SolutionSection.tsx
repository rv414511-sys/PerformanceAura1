import { motion } from "framer-motion";
import { Target, BarChart3, LineChart, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const solutions = [
  {
    icon: Target,
    title: "Meta Ads Strategy",
    subtitle: "Facebook & Instagram Mastery",
    points: [
      "Lookalike & interest-based audience stacking",
      "Dynamic creative testing (50+ variations/month)",
      "Full-funnel retargeting sequences",
      "Advantage+ Shopping campaigns for e-commerce",
    ],
    result: "Avg. 3.8x ROAS across 200+ brands",
  },
  {
    icon: BarChart3,
    title: "Google Ads Funnel",
    subtitle: "Search, Shopping & Display",
    points: [
      "High-intent keyword mapping & negative lists",
      "Performance Max with feed optimization",
      "Smart bidding with manual overrides",
      "Landing page A/B testing integration",
    ],
    result: "40% lower CPA vs. industry average",
  },
  {
    icon: LineChart,
    title: "Performance Tracking",
    subtitle: "Data-Driven Decisions",
    points: [
      "Server-side tracking (CAPI) setup",
      "Custom attribution modeling",
      "Real-time dashboard with KPI alerts",
      "Weekly optimization reports with action items",
    ],
    result: "98% tracking accuracy post iOS-14",
  },
];

const SolutionSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <SectionHeading
        badge="Our Solutions"
        title="How We Solve Your Growth Problems"
        subtitle="A battle-tested system that combines creative strategy, technical precision, and relentless optimization."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
              <s.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-2xl font-bold text-card-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-5">{s.subtitle}</p>
            <ul className="space-y-3 mb-6">
              {s.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm font-semibold text-primary">✅ {s.result}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
