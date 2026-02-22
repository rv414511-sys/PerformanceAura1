import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const caseStudies = [
  {
    industry: "E-Commerce — Fashion",
    brand: "StyleBox India",
    challenge: "High CAC and inconsistent ROAS below 1.5x on Meta Ads with declining repeat purchase rate.",
    solution: "Rebuilt campaign structure with Advantage+ Shopping, implemented server-side tracking, and launched a retention-focused retargeting funnel.",
    results: [
      { metric: "ROAS", before: "1.4x", after: "4.8x" },
      { metric: "CAC", before: "₹1,200", after: "₹380" },
      { metric: "Monthly Revenue", before: "₹12L", after: "₹1.1Cr" },
    ],
    timeline: "6 months",
  },
  {
    industry: "B2B — SaaS",
    brand: "CloudDesk Technologies",
    challenge: "Google Ads generating 200+ leads/month but only 3% were sales-qualified, wasting the sales team's time.",
    solution: "Implemented intent-based keyword strategy, added lead scoring via form qualification, and built a nurture funnel with LinkedIn retargeting.",
    results: [
      { metric: "SQL Rate", before: "3%", after: "28%" },
      { metric: "Cost per SQL", before: "₹8,500", after: "₹2,100" },
      { metric: "Pipeline Value", before: "₹15L/mo", after: "₹85L/mo" },
    ],
    timeline: "4 months",
  },
  {
    industry: "D2C — Health & Wellness",
    brand: "PureVeda Naturals",
    challenge: "Stuck at ₹18L/month revenue with rising ad costs and no systematic scaling framework.",
    solution: "Built a full-funnel Meta + Google strategy, introduced UGC-led creatives, and implemented a subscription model for repeat purchases.",
    results: [
      { metric: "Monthly Revenue", before: "₹18L", after: "₹72L" },
      { metric: "Repeat Purchase", before: "12%", after: "38%" },
      { metric: "Ad Spend Efficiency", before: "2.1x", after: "5.2x" },
    ],
    timeline: "5 months",
  },
];

const CaseStudySection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <SectionHeading
        badge="Proven Results"
        title="Real Brands, Real Growth"
        subtitle="See how we've helped businesses like yours achieve breakthrough results."
      />
      <div className="space-y-8">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 md:p-10 rounded-2xl border border-border bg-card hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                {cs.industry}
              </span>
              <span className="text-xs text-muted-foreground">⏱ {cs.timeline}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-card-foreground mb-4 flex items-center gap-2">
              {cs.brand} <ArrowUpRight size={20} className="text-primary" />
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-destructive mb-2">🔴 Challenge</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2">🟢 Solution</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gold mb-2">📊 Results</h4>
                <div className="space-y-2">
                  {cs.results.map((r, j) => (
                    <div key={j} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{r.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-muted-foreground/50">{r.before}</span>
                        <span className="font-bold text-primary">{r.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudySection;
