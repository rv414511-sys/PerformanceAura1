import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  { name: "Rahul Sharma", role: "CEO, TechVista Solutions", text: "GrowthPulse transformed our digital presence. Our ROAS increased by 4.5x within the first quarter. Their data-driven approach is genuinely world-class.", rating: 5, avatar: "RS" },
  { name: "Priya Patel", role: "Founder, StyleBox India", text: "Their e-commerce expertise helped us scale from ₹10L to ₹1Cr monthly revenue in just 6 months. The team feels like an extension of our own.", rating: 5, avatar: "PP" },
  { name: "Amit Desai", role: "CMO, BuildRight Infra", text: "The most data-driven marketing team we've ever worked with. They reduced our cost-per-SQL by 75% while tripling our pipeline value.", rating: 5, avatar: "AD" },
  { name: "Sneha Kulkarni", role: "Co-founder, PureVeda Naturals", text: "We were stuck at ₹18L/month for over a year. GrowthPulse broke through that ceiling and got us to ₹72L in 5 months. Absolute game-changers.", rating: 5, avatar: "SK" },
  { name: "Vikram Reddy", role: "Director, CloudDesk Technologies", text: "Finally, a marketing agency that understands B2B. They didn't just get us leads — they got us meetings with decision-makers.", rating: 5, avatar: "VR" },
  { name: "Meera Joshi", role: "Head of Growth, FitNation", text: "Their creative strategy and audience targeting on Meta Ads is unmatched. We've never seen this level of granularity and care from an agency.", rating: 5, avatar: "MJ" },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-surface">
    <div className="container mx-auto">
      <SectionHeading
        badge="Testimonials"
        title="What Our Clients Say"
        subtitle="Don't just take our word for it — hear from brands we've helped grow."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
          >
            <Quote size={24} className="text-primary/20 mb-3" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                {t.avatar}
              </div>
              <div>
                <div className="font-semibold text-card-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
