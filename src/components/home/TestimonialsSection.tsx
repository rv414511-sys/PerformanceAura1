import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const defaultTestimonials = [
  { name: "Rahul Sharma", company: "CEO, TechVista Solutions", text: "PerformanceAura transformed our digital presence. Our ROAS increased by 4.5x within the first quarter.", rating: 5 },
  { name: "Priya Patel", company: "Founder, StyleBox India", text: "Their e-commerce expertise helped us scale from ₹10L to ₹1Cr monthly revenue in just 6 months.", rating: 5 },
  { name: "Amit Desai", company: "CMO, BuildRight Infra", text: "The most data-driven marketing team we've ever worked with. They reduced our cost-per-SQL by 75%.", rating: 5 },
  { name: "Sneha Kulkarni", company: "Co-founder, PureVeda Naturals", text: "We were stuck at ₹18L/month for over a year. PerformanceAura broke through that ceiling.", rating: 5 },
  { name: "Vikram Reddy", company: "Director, CloudDesk Technologies", text: "Finally, a marketing agency that understands B2B. They got us meetings with decision-makers.", rating: 5 },
  { name: "Meera Joshi", company: "Head of Growth, FitNation", text: "Their creative strategy and audience targeting on Meta Ads is unmatched.", rating: 5 },
];

const TestimonialsSection = () => {
  const { data: reviews } = useQuery({
    queryKey: ["published-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").eq("published", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const testimonials = reviews?.length ? reviews : defaultTestimonials;

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <SectionHeading badge="Testimonials" title="What Our Clients Say" subtitle="Don't just take our word for it — hear from brands we've helped grow." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <Quote size={24} className="text-primary/20 mb-3" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {t.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
