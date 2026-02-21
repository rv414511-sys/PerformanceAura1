import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Target, TrendingUp, Zap, Star, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import heroTeam from "@/assets/hero-team.jpg";

const services = [
  { icon: Target, title: "Meta Ads", desc: "Precision-targeted campaigns on Facebook & Instagram that convert audiences into customers." },
  { icon: BarChart3, title: "Google Ads", desc: "High-intent search and display campaigns that capture ready-to-buy customers." },
  { icon: TrendingUp, title: "Performance Marketing", desc: "ROI-focused strategies with transparent reporting and continuous optimization." },
  { icon: Zap, title: "E-commerce Growth", desc: "End-to-end growth solutions for online stores, from acquisition to retention." },
  { icon: Users, title: "D2C & B2B Marketing", desc: "Tailored strategies for direct-to-consumer and business-to-business brands." },
];

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "₹50Cr+", label: "Ad Spend Managed" },
  { value: "3.2x", label: "Avg. ROAS" },
  { value: "98%", label: "Client Retention" },
];

const testimonials = [
  { name: "Rahul Sharma", role: "CEO, TechVista", text: "GrowthPulse transformed our digital presence. Our ROAS increased by 4.5x within the first quarter.", rating: 5 },
  { name: "Priya Patel", role: "Founder, StyleBox", text: "Their e-commerce expertise helped us scale from ₹10L to ₹1Cr monthly revenue in just 6 months.", rating: 5 },
  { name: "Amit Desai", role: "CMO, BuildRight", text: "The most data-driven marketing team we've ever worked with. Exceptional results, every single month.", rating: 5 },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
                Premium Digital Marketing Agency
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight">
                Grow Your Brand
                <br />
                <span className="text-gold">Without Limits</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
                We craft data-driven marketing strategies that deliver measurable ROI for e-commerce, D2C, and B2B brands.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Get Free Consultation <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/20 rounded-2xl blur-2xl" />
                <img
                  src={heroTeam}
                  alt="Digital marketing team analyzing growth data"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-primary-foreground/10"
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <TrendingUp size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-card-foreground">4.5x</div>
                      <div className="text-xs text-muted-foreground">Avg. ROAS Growth</div>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gold text-gold-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
                  ⭐ Trusted by 500+ Brands
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gold">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
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

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <div className="container mx-auto">
          <SectionHeading
            badge="Testimonials"
            title="What Our Clients Say"
            subtitle="Don't just take our word for it — hear from brands we've helped grow."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-card-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Ready to Scale Your Business?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Book a free strategy call and discover how we can 3x your marketing ROI.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Book Free Strategy Call <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
