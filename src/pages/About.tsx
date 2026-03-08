import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Users, Award, LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import founderImg from "@/assets/founder-ravi.png";
import { useSetting } from "@/hooks/useSiteSettings";

const iconMap: Record<string, LucideIcon> = { Target, Eye, Users, Award };

const About = () => {
  const { value: pageData } = useSetting("page_about");

  const d = {
    badge: "About Us",
    title: "We Build Brands That",
    titleHighlight: "Dominate Markets",
    subtitle: "PerformanceAura is a premium AI-powered digital marketing agency that helps ambitious brands scale through data-driven performance marketing.",
    story_badge: "Our Story",
    story_title: "Born From a Mission to Deliver Real Results",
    story_paragraphs: [
      "Founded in 2021, PerformanceAura was born out of frustration with marketing agencies that promised the world but delivered vanity metrics. We set out to build an agency where every rupee spent is accountable.",
      "Today, we serve 50+ brands across e-commerce, D2C, B2B, and B2C verticals — managing over ₹1 Crore in ad spend with an average ROAS of 3.2x.",
    ],
    values: [
      { icon: "Target", title: "Data-Driven", desc: "Every decision backed by analytics and real performance data.", image_url: "" },
      { icon: "Eye", title: "Transparent", desc: "Full visibility into your campaigns, spend, and results.", image_url: "" },
      { icon: "Users", title: "Client-First", desc: "Your success is our success. We treat your budget like our own.", image_url: "" },
      { icon: "Award", title: "Excellence", desc: "We never settle. Continuous testing and optimization is in our DNA.", image_url: "" },
    ],
    founder_name: "Ravi Verma",
    founder_title: "Founder & CEO",
    founder_bio: "With 5+ years in performance marketing and experience scaling brands from ₹0 to ₹1Cr+ in revenue, Ravi founded PerformanceAura to make premium digital marketing accessible to every ambitious brand. He leads a team of marketing experts dedicated to driving measurable growth for businesses across India.",
    founder_image: "",
    ...pageData,
  };

  const getIcon = (name: string): LucideIcon => {
    return iconMap[name] || (LucideIcons as any)[name] || Target;
  };

  return (
    <>
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">{d.badge}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              {d.title}<br /><span className="text-gold">{d.titleHighlight}</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">{d.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading badge={d.story_badge} title={d.story_title} />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground text-center space-y-4 text-lg">
            {d.story_paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container mx-auto">
          <SectionHeading badge="Our Values" title="What Sets Us Apart" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.values.map((v: any, i: number) => {
              const Icon = getIcon(v.icon);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl bg-card border border-border text-center">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                    {v.image_url ? (
                      <img src={v.image_url} alt={v.title} className="w-6 h-6 object-contain" />
                    ) : (
                      <Icon size={24} className="text-primary" />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading badge="Our Founder" title="Meet the Growth Expert" />
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl border border-border bg-card">
              <img src={d.founder_image || founderImg} alt={`${d.founder_name} — ${d.founder_title}`} className="w-40 h-40 rounded-2xl object-cover object-top shadow-lg border border-border" />
              <div className="text-center md:text-left">
                <h3 className="font-display text-2xl font-bold text-card-foreground">{d.founder_name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{d.founder_title}</p>
                <p className="text-muted-foreground leading-relaxed">{d.founder_bio}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
