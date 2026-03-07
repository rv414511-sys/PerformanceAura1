import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, BarChart3, TrendingUp, Film, PenTool, Share2, Monitor, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Target, title: "Meta Ads", slug: "meta-ads", desc: "Precision-targeted campaigns on Facebook & Instagram that convert audiences into customers." },
  { icon: BarChart3, title: "Google Ads", slug: "google-ads", desc: "High-intent search and display campaigns that capture ready-to-buy customers." },
  { icon: TrendingUp, title: "Performance Marketing", slug: "performance-marketing", desc: "ROI-focused strategies with transparent reporting and continuous optimization." },
  { icon: Film, title: "Video Editing", slug: "video-editing", desc: "Professional video content for ads, social media, and brand storytelling." },
  { icon: PenTool, title: "Content Writing", slug: "content-writing", desc: "SEO-optimized content that ranks, engages, and converts." },
  { icon: Share2, title: "Social Media", slug: "social-media-marketing", desc: "Strategic social management that builds communities and drives sales." },
  { icon: Monitor, title: "Web Design", slug: "web-design", desc: "Modern, conversion-focused websites built for growth." },
];

const ServicesSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <SectionHeading
        badge="What We Do"
        title="AI-Powered Services That Drive Growth"
        subtitle="From strategy to execution, we combine AI intelligence with human creativity to handle every aspect of your digital marketing."
      />
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
              <span className="inline-flex items-center text-sm font-medium text-primary">
                Learn More <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
