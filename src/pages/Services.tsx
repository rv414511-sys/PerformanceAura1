import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, BarChart3, TrendingUp, Film, PenTool, Share2, Monitor, ArrowRight, LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useSetting } from "@/hooks/useSiteSettings";

const iconMap: Record<string, LucideIcon> = { Target, BarChart3, TrendingUp, Film, PenTool, Share2, Monitor };

const defaultServices = [
  { icon: "Target", title: "Meta Ads", slug: "meta-ads", desc: "Precision-targeted campaigns on Facebook & Instagram that convert audiences into customers.", image_url: "" },
  { icon: "BarChart3", title: "Google Ads", slug: "google-ads", desc: "High-intent search and display campaigns that capture ready-to-buy customers.", image_url: "" },
  { icon: "TrendingUp", title: "Performance Marketing", slug: "performance-marketing", desc: "ROI-focused strategies with transparent reporting and continuous optimization.", image_url: "" },
  { icon: "Film", title: "Video Editing", slug: "video-editing", desc: "Professional video content for ads, social media, and brand storytelling.", image_url: "" },
  { icon: "PenTool", title: "Content Writing", slug: "content-writing", desc: "SEO-optimized content that ranks, engages, and converts your audience.", image_url: "" },
  { icon: "Share2", title: "Social Media Marketing", slug: "social-media-marketing", desc: "Strategic social management that builds communities and drives sales.", image_url: "" },
  { icon: "Monitor", title: "Web Design & Development", slug: "web-design", desc: "Modern, conversion-focused websites that represent your brand beautifully.", image_url: "" },
];

const Services = () => {
  const { value: pageData } = useSetting("page_services");
  const { value: servicesData } = useSetting("services");

  const page = {
    badge: "Our Services",
    title: "Marketing Solutions",
    titleHighlight: "That Deliver Results",
    subtitle: "From paid ads to full-funnel performance marketing — PerformanceAura offers everything you need to scale.",
    cta_title: "Let's Build Your Growth Engine",
    cta_subtitle: "Get a custom marketing strategy tailored to your business goals.",
    cta_button: "Get Started",
    ...pageData,
  };

  const services = servicesData?.items?.length ? servicesData.items : defaultServices;

  const getIcon = (name: string): LucideIcon => iconMap[name] || (LucideIcons as any)[name] || Target;

  return (
    <>
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">{page.badge}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              {page.title}<br /><span className="text-gold">{page.titleHighlight}</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">{page.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any, i: number) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link to={`/services/${service.slug}`} className="group block p-8 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {service.image_url ? (
                        <img src={service.image_url} alt={service.title} className="w-6 h-6 object-contain" />
                      ) : (
                        <Icon size={24} className="text-primary group-hover:text-primary-foreground" />
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={16} className="ml-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hero-gradient section-padding">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{page.cta_title}</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">{page.cta_subtitle}</p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contact">{page.cta_button} <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
