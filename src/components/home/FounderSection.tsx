import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import founderImg from "@/assets/founder-ravi.png";

const FounderSection = () => (
  <section className="section-padding bg-surface">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl" />
            <img src={founderImg} alt="Ravi Verma — Founder & CEO of PerformanceAura" className="relative w-72 h-72 object-cover object-top rounded-2xl shadow-xl border border-border" />
            <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-semibold shadow-lg">Founder & CEO</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-secondary px-4 py-1.5 rounded-full mb-4">Meet Our Founder</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Ravi Verma</h2>
          <div className="relative mb-6">
            <Quote size={24} className="text-primary/20 absolute -top-2 -left-2" />
            <p className="text-muted-foreground text-lg leading-relaxed pl-6 italic">
              "I founded PerformanceAura with one mission — to make premium digital marketing accessible to every ambitious brand. We combine AI-powered strategies with human creativity to deliver results that matter."
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            With 5+ years in performance marketing and experience scaling brands from ₹0 to ₹1Cr+ in revenue, Ravi leads a passionate team of marketing experts dedicated to driving measurable growth for businesses across India.
          </p>
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">5+</div>
              <div className="text-xs text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">50+</div>
              <div className="text-xs text-muted-foreground">Brands Scaled</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">₹1Cr+</div>
              <div className="text-xs text-muted-foreground">Ad Spend Managed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FounderSection;
