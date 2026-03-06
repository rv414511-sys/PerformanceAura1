import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, BarChart3, TrendingUp, Film, PenTool, Share2, Monitor, ArrowRight } from "lucide-react";

const services = [
  { icon: Target, title: "Meta Ads", slug: "meta-ads", desc: "Precision-targeted campaigns on Facebook & Instagram that convert audiences into customers." },
  { icon: BarChart3, title: "Google Ads", slug: "google-ads", desc: "High-intent search and display campaigns that capture ready-to-buy customers." },
  { icon: TrendingUp, title: "Performance Marketing", slug: "performance-marketing", desc: "ROI-focused strategies with transparent reporting and continuous optimization." },
  { icon: Film, title: "Video Editing", slug: "video-editing", desc: "Professional video content for ads, social media, and brand storytelling." },
  { icon: PenTool, title: "Content Writing", slug: "content-writing", desc: "SEO-optimized content that ranks, engages, and converts your audience." },
  { icon: Share2, title: "Social Media Marketing", slug: "social-media-marketing", desc: "Strategic social management that builds communities and drives sales." },
  { icon: Monitor, title: "Web Design & Development", slug: "web-design", desc: "Modern, conversion-focused websites that represent your brand beautifully." },
];

const Services = () => (
  <>
    <section className="hero-gradient section-padding pt-32">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
            Our Services
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Marketing Solutions<br /><span className="text-gold">That Deliver Results</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            From paid ads to full-funnel performance marketing — PerformanceAura offers everything you need to scale.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/services/${service.slug}`} className="group block p-8 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon size={24} className="text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="hero-gradient section-padding">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            Let's Build Your Growth Engine
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get a custom marketing strategy tailored to your business goals.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contact">Get Started <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default Services;
