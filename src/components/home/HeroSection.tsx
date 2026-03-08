import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Target, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useSetting } from "@/hooks/useSiteSettings";

const dashboards = [
  { label: "Meta Ads", icon: Target, color: "from-blue-600 to-blue-400", metrics: { spend: "₹2.4L", roas: "3.8x", leads: "1,240", cpc: "₹12.50" } },
  { label: "Google Ads", icon: BarChart3, color: "from-green-600 to-emerald-400", metrics: { spend: "₹1.8L", roas: "4.2x", leads: "890", cpc: "₹18.20" } },
  { label: "AI Automation", icon: Zap, color: "from-purple-600 to-violet-400", metrics: { workflows: "45", saved: "120 hrs", emails: "8,500", conversion: "22%" } },
  { label: "Analytics", icon: TrendingUp, color: "from-orange-500 to-amber-400", metrics: { users: "24.5K", sessions: "38.2K", bounce: "32%", revenue: "₹18.6L" } },
];

const defaults = {
  badge: "AI-Powered Digital Marketing Agency",
  title: "Grow Your Brand",
  titleHighlight: "Without Limits",
  subtitle: "PerformanceAura crafts AI-driven marketing strategies that deliver measurable ROI for e-commerce, D2C, and B2B brands.",
  cta_text: "Get Free Consultation",
  cta_link: "/contact",
  secondary_cta_text: "Our Services",
  secondary_cta_link: "/services",
};

const HeroSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { value: heroData } = useSetting("hero");
  const h = { ...defaults, ...heroData };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
              {h.badge}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight">
              {h.title}<br /><span className="text-gold">{h.titleHighlight || "Without Limits"}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
              {h.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to={h.cta_link}>{h.cta_text} <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10" asChild>
                <Link to={h.secondary_cta_link}>{h.secondary_cta_text}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              {dashboards.map((d, i) => (
                <motion.div key={i} className="relative rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-4 cursor-pointer overflow-hidden" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-10`} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <d.icon size={16} className="text-primary-foreground/70" />
                      <span className="text-xs font-semibold text-primary-foreground/80">{d.label}</span>
                    </div>
                    {hoveredIdx === i ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                        {Object.entries(d.metrics).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-primary-foreground/50 capitalize">{key}</span>
                            <span className="text-gold font-bold">{val}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="h-2 rounded-full bg-primary-foreground/10 w-full" />
                        <div className="h-2 rounded-full bg-primary-foreground/10 w-3/4" />
                        <div className="h-2 rounded-full bg-primary-foreground/10 w-1/2" />
                        <div className="h-6 mt-2 rounded bg-primary-foreground/5 flex items-center justify-center">
                          <div className="flex gap-1">
                            {[40, 65, 45, 80, 55, 70, 50].map((ht, j) => (
                              <div key={j} className="w-1.5 bg-primary-foreground/20 rounded-t" style={{ height: `${ht * 0.3}px` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="bg-card rounded-xl shadow-xl px-5 py-3 border border-border flex items-center gap-3">
                <TrendingUp size={20} className="text-primary" />
                <div>
                  <div className="font-display text-xl font-bold text-card-foreground">3.2x</div>
                  <div className="text-xs text-muted-foreground">Avg. ROAS</div>
                </div>
              </div>
              <div className="bg-accent text-accent-foreground rounded-xl px-5 py-3 shadow-xl flex items-center gap-2 text-sm font-semibold">
                ⭐ Trusted by 50+ Brands
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
