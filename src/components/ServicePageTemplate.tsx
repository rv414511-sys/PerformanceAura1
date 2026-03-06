import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, LucideIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

interface ServicePageData {
  title: string;
  headline: string;
  description: string;
  aboutTitle: string;
  aboutText: string[];
  industries: string[];
  benefits: { title: string; desc: string }[];
  deliverables: string[];
  icon: LucideIcon;
}

const ServicePageTemplate = ({ data }: { data: ServicePageData }) => (
  <>
    {/* Hero */}
    <section className="hero-gradient section-padding pt-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
              {data.title}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              {data.headline}
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl leading-relaxed">{data.description}</p>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contact">Get Started <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
              <data.icon size={120} className="text-primary-foreground/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* About */}
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading badge="About This Service" title={data.aboutTitle} />
        <div className="space-y-4">
          {data.aboutText.map((text, i) => (
            <motion.p key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-muted-foreground text-lg leading-relaxed text-center">
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>

    {/* Who It's For */}
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <SectionHeading badge="Who It's For" title="Industries We Serve" subtitle="Our expertise spans across diverse sectors" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.industries.map((industry, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors">
              <span className="text-sm font-medium text-card-foreground">{industry}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <SectionHeading badge="Benefits" title="Why Choose PerformanceAura" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.benefits.map((benefit, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Deliverables */}
    <section className="section-padding bg-surface">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading badge="What We Provide" title="Our Deliverables" />
        <div className="space-y-3">
          {data.deliverables.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <CheckCircle size={20} className="text-primary shrink-0" />
              <span className="text-card-foreground font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient section-padding">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Start Growing Your Business With PerformanceAura
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get a custom strategy tailored to your business goals. No commitments, just results.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contact">Book Free Consultation <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default ServicePageTemplate;
