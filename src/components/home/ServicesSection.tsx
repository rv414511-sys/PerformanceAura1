import { motion } from "framer-motion";
import { Target, BarChart3, TrendingUp, Zap, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Target, title: "Meta Ads", desc: "Precision-targeted campaigns on Facebook & Instagram that convert audiences into customers." },
  { icon: BarChart3, title: "Google Ads", desc: "High-intent search and display campaigns that capture ready-to-buy customers." },
  { icon: TrendingUp, title: "Performance Marketing", desc: "ROI-focused strategies with transparent reporting and continuous optimization." },
  { icon: Zap, title: "E-commerce Growth", desc: "End-to-end growth solutions for online stores, from acquisition to retention." },
  { icon: Users, title: "D2C & B2B Marketing", desc: "Tailored strategies for direct-to-consumer and business-to-business brands." },
];

const ServicesSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <SectionHeading
        badge="What We Do"
        title="Services That Drive Growth"
        subtitle="From strategy to execution, we handle every aspect of your digital marketing."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <service.icon size={24} className="text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
