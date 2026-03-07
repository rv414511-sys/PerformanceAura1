import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
    <div className="container mx-auto px-6 py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
            AI-Powered Digital Marketing Agency
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight">
            Grow Your Brand<br /><span className="text-gold">Without Limits</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
            PerformanceAura crafts AI-driven marketing strategies that deliver measurable ROI for e-commerce, D2C, and B2B brands.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contact">Get Free Consultation <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10" asChild>
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
            <img src={heroTeam} alt="PerformanceAura digital marketing team analyzing growth data" className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-primary-foreground/10" />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <TrendingUp size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-card-foreground">3.2x</div>
                  <div className="text-xs text-muted-foreground">Avg. ROAS</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
              ⭐ Trusted by 150+ Brands
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
