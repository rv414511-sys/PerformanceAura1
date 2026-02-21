import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  children?: ReactNode;
}

const SectionHeading = ({ badge, title, subtitle, centered = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${centered ? "text-center" : ""}`}
  >
    {badge && (
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-secondary px-4 py-1.5 rounded-full mb-4">
        {badge}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
