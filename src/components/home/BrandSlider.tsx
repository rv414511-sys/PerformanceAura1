import { motion } from "framer-motion";
import { useSetting } from "@/hooks/useSiteSettings";

const defaultBrands = [
  "Flipkart", "Nykaa", "BoAt", "Mamaearth", "Sugar Cosmetics",
  "Lenskart", "Bewakoof", "Pepperfry", "UrbanClap", "PharmEasy",
  "CaratLane", "Vedantu", "Zivame", "WOW Skin Science",
];

const BrandSlider = () => {
  const { value: data } = useSetting("brands");
  const brands = data?.items?.length ? data.items.filter((b: string) => b.trim()) : defaultBrands;

  return (
    <section className="py-10 bg-surface overflow-hidden">
      <div className="container mx-auto px-6 mb-6">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground">Trusted by Leading Brands Across India</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
        <motion.div className="flex gap-16 items-center whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
          {[...brands, ...brands].map((brand: string, i: number) => (
            <span key={i} className="flex-shrink-0 text-lg font-semibold text-muted-foreground/60 hover:text-primary transition-colors select-none tracking-wide">{brand}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandSlider;
