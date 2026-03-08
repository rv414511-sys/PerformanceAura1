import { motion } from "framer-motion";
import { ShoppingCart, Building2, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useSetting } from "@/hooks/useSiteSettings";

const defaultProblems = [
  { audience: "E-Commerce Brands", headline: "Burning ad budget with low ROAS?", pain: "You're spending lakhs on ads but your cost-per-acquisition keeps climbing. Retargeting feels random, creative fatigue is real, and scaling profitably seems impossible.", stat: "72% of e-commerce brands waste 40%+ of their ad spend on poorly targeted campaigns." },
  { audience: "B2B Companies", headline: "Getting leads that never convert?", pain: "Your campaigns generate form fills, but sales teams complain about lead quality. Decision-makers aren't seeing your ads, and your sales cycle keeps getting longer.", stat: "Only 27% of B2B leads are sales-ready — the rest are wasted effort without proper qualification." },
  { audience: "D2C Brands", headline: "Stuck at the same revenue ceiling?", pain: "You cracked the initial product-market fit, but scaling beyond ₹10-20L/month feels like hitting a wall. CAC is rising, repeat purchases are low, and you can't find new audiences.", stat: "83% of D2C brands plateau within 18 months due to lack of a systematic scaling framework." },
];

const iconList = [ShoppingCart, Building2, Rocket];

const ProblemSection = () => {
  const { value: data } = useSetting("problems");
  const problems = data?.items?.length ? data.items : defaultProblems;

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <SectionHeading badge="Sound Familiar?" title="The Growth Challenges Holding You Back" subtitle="If any of these feel like your reality, you're not alone — and there's a proven way out." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p: any, i: number) => {
            const Icon = iconList[i % iconList.length];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative p-8 rounded-2xl bg-card border border-border group hover:border-destructive/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-destructive" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.audience}</span>
                <h3 className="font-display text-2xl font-bold text-card-foreground mt-2 mb-3">{p.headline}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.pain}</p>
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <p className="text-xs text-destructive font-medium">📊 {p.stat}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
