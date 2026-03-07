import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Clients Served" },
  { value: "₹5Cr+", label: "Ad Spend Managed" },
  { value: "3.2x", label: "Avg. ROAS" },
  { value: "95%", label: "Client Retention" },
];

const StatsSection = () => (
  <section className="bg-primary py-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-gold">{stat.value}</div>
            <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
