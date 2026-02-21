import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Users, Award } from "lucide-react";

const values = [
  { icon: Target, title: "Data-Driven", desc: "Every decision backed by analytics and real performance data." },
  { icon: Eye, title: "Transparent", desc: "Full visibility into your campaigns, spend, and results." },
  { icon: Users, title: "Client-First", desc: "Your success is our success. We treat your budget like our own." },
  { icon: Award, title: "Excellence", desc: "We never settle. Continuous testing and optimization is in our DNA." },
];

const team = [
  { name: "Aditya Verma", role: "Founder & CEO", bio: "10+ years in performance marketing. Previously led growth at a unicorn startup." },
  { name: "Sneha Kapoor", role: "Head of Paid Media", bio: "Google & Meta certified. Managed over ₹100Cr in ad spend across industries." },
  { name: "Vikram Singh", role: "Creative Director", bio: "Award-winning creative strategist with a passion for conversion-focused design." },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              We Build Brands That
              <br />
              <span className="text-gold">Dominate Markets</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              GrowthPulse is a premium digital marketing agency that helps ambitious brands scale through data-driven performance marketing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading badge="Our Story" title="Born From a Mission to Deliver Real Results" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="prose prose-lg mx-auto text-muted-foreground text-center">
            <p>Founded in 2019, GrowthPulse was born out of frustration with marketing agencies that promised the world but delivered vanity metrics. We set out to build an agency where every rupee spent is accountable, every strategy is backed by data, and every client sees real, measurable growth.</p>
            <p className="mt-4">Today, we serve 500+ brands across e-commerce, D2C, B2B, and B2C verticals — managing over ₹50 Crore in annual ad spend with an average ROAS of 3.2x.</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container mx-auto">
          <SectionHeading badge="Our Values" title="What Sets Us Apart" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading badge="Our Team" title="Meet the Growth Experts" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-xl border border-border bg-card">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-primary">{m.name.charAt(0)}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground">{m.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{m.role}</p>
                <p className="text-sm text-muted-foreground">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
