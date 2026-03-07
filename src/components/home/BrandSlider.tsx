import { motion } from "framer-motion";

const brands = [
  "Flipkart", "Nykaa", "BoAt", "Mamaearth", "Sugar Cosmetics",
  "Lenskart", "Bewakoof", "Pepperfry", "UrbanClap", "PharmEasy",
  "CaratLane", "Vedantu", "Zivame", "MamaEarth", "WOW Skin Science",
];

const BrandSlider = () => (
  <section className="py-10 bg-surface border-y border-border overflow-hidden">
    <div className="container mx-auto px-6 mb-4">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground">
        Trusted by Leading Brands Across India
      </p>
    </div>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
      <motion.div
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-6 py-3 rounded-lg border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BrandSlider;
