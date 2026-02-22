import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const CTASection = () => (
  <section className="hero-gradient section-padding">
    <div className="container mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold/30">
          <Clock size={16} /> Limited: Only 5 strategy call slots left this month
        </div>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
          Stop Guessing.<br />Start Growing.
        </h2>
        <p className="text-primary-foreground/80 text-lg md:text-xl mb-4 max-w-2xl mx-auto">
          Book a free 30-minute strategy call and get a custom roadmap to 3x your marketing ROI — no strings attached.
        </p>
        <p className="text-gold text-sm font-semibold mb-8">
          🔒 100% free. No commitment. Actionable insights guaranteed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" variant="secondary" className="text-base px-10 py-6" asChild>
            <Link to="/contact">
              Book Free Strategy Call <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
          <span className="text-primary-foreground/60 text-sm">or call us at +91-98765-43210</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
