import { motion } from "framer-motion";
import { useSetting } from "@/hooks/useSiteSettings";

const defaultStats = [
  { value: "50+", label: "Clients Served" },
  { value: "₹1Cr+", label: "Ad Spend Managed" },
  { value: "3.2x", label: "Avg. ROAS" },
  { value: "120+", label: "Campaigns Managed" },
];

const StatsSection = () => {
  const { value: data } = useSetting("stats");
  const stats = data?.items?.length ? data.items : defaultStats;

  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
