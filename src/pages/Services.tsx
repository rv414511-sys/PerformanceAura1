import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, BarChart3, TrendingUp, Zap, Users, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Reach your ideal audience with precision-targeted campaigns across Meta platforms.",
    features: ["Audience research & segmentation", "Creative strategy & A/B testing", "Retargeting & lookalike audiences", "Detailed performance reporting"],
  },
  {
    icon: BarChart3,
    title: "Google Ads (Search & Display)",
    desc: "Capture high-intent customers actively searching for your products or services.",
    features: ["Search, Display & Shopping campaigns", "Keyword research & bid optimization", "Landing page optimization", "Conversion tracking setup"],
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "ROI-focused marketing strategies with transparent, real-time reporting.",
    features: ["Multi-channel attribution", "Funnel optimization", "CPA & ROAS optimization", "Weekly performance reviews"],
  },
  {
    icon: Zap,
    title: "E-commerce Growth",
    desc: "End-to-end growth solutions designed specifically for online stores.",
    features: ["Product feed optimization", "Dynamic remarketing", "Cart abandonment strategies", "Customer lifetime value optimization"],
  },
  {
    icon: Users,
    title: "D2C & B2B Marketing Solutions",
    desc: "Tailored strategies for direct-to-consumer and business-to-business brands.",
    features: ["Lead generation campaigns", "Account-based marketing", "LinkedIn advertising", "Sales funnel automation"],
  },
];

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Marketing Solutions
              <br />
              <span className="text-gold">That Deliver Results</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              From paid ads to full-funnel performance marketing — we offer everything you need to scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="space-y-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center p-8 md:p-12 rounded-2xl border border-border bg-card ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5">
                    <service.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-card-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={16} className="text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-full max-w-sm aspect-square rounded-2xl bg-secondary flex items-center justify-center">
                    <service.icon size={80} className="text-primary/30" />
                  </div>
                </div>
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
              Let's Build Your Growth Engine
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Get a custom marketing strategy tailored to your business goals.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Get Started <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
