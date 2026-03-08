import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useSetting } from "@/hooks/useSiteSettings";

const defaults = {
  badge: "Limited: Only 5 strategy call slots left this month",
  title: "Stop Guessing.\nStart Growing.",
  subtitle: "Book a free 30-minute strategy call and get a custom roadmap to 3x your marketing ROI — no strings attached.",
  guarantee: "🔒 100% free. No commitment. Actionable insights guaranteed.",
  button_text: "Book Free Strategy Call",
  button_link: "/contact",
  phone: "+91-98765-43210",
};

const CTASection = () => {
  const { value: ctaData } = useSetting("cta");
  const c = { ...defaults, ...ctaData };

  return (
    <section className="hero-gradient section-padding">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold/30">
            <Clock size={16} /> {c.badge}
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 whitespace-pre-line">{c.title}</h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-4 max-w-2xl mx-auto">{c.subtitle}</p>
          <p className="text-gold text-sm font-semibold mb-8">{c.guarantee}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-base px-10 py-6" asChild>
              <Link to={c.button_link}>{c.button_text} <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <span className="text-primary-foreground/60 text-sm">or call us at {c.phone}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
