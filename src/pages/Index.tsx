import { useSetting } from "@/hooks/useSiteSettings";
import HeroSection from "@/components/home/HeroSection";
import BrandSlider from "@/components/home/BrandSlider";
import StatsSection from "@/components/home/StatsSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import CaseStudySection from "@/components/home/CaseStudySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import FounderSection from "@/components/home/FounderSection";
import CustomSectionRenderer from "@/components/home/CustomSectionRenderer";
import { motion } from "framer-motion";

const sectionComponentMap: Record<string, React.ComponentType> = {
  hero: HeroSection,
  brands: BrandSlider,
  stats: StatsSection,
  problems: ProblemSection,
  solutions: SolutionSection,
  services: ServicesSection,
  process: ProcessSection,
  founder: FounderSection,
  "case-studies": CaseStudySection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  cta: CTASection,
};

const animationVariants: Record<string, any> = {
  "fade-up": { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } },
  "fade-in": { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
  "slide-left": { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } },
  "scale": { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } },
  "none": {},
};

const defaultSections = [
  { id: "hero", visible: true },
  { id: "brands", visible: true },
  { id: "stats", visible: true },
  { id: "problems", visible: true },
  { id: "solutions", visible: true },
  { id: "services", visible: true },
  { id: "process", visible: true },
  { id: "founder", visible: true },
  { id: "case-studies", visible: true },
  { id: "testimonials", visible: true },
  { id: "faq", visible: true },
  { id: "cta", visible: true },
];

const Index = () => {
  const { value: sectionsData } = useSetting("homepage_sections");
  const { value: animationsData } = useSetting("section_animations");
  const { value: customSectionsData } = useSetting("custom_sections");
  
  const sections = sectionsData?.items?.length ? sectionsData.items : defaultSections;
  const animations = animationsData || {};
  const customSections = customSectionsData?.items || [];

  return (
    <>
      {sections
        .filter((sec: any) => sec.visible !== false)
        .map((sec: any) => {
          // Check if it's a custom section
          if (sec.id.startsWith("custom-")) {
            const customId = sec.id.replace("custom-", "");
            const customSection = customSections.find((cs: any) => cs.id === customId);
            if (!customSection) return null;
            return <CustomSectionRenderer key={sec.id} section={customSection} />;
          }

          // Built-in section
          const Component = sectionComponentMap[sec.id];
          if (!Component) return null;
          
          const anim = animations[sec.id] || "fade-up";
          const variant = animationVariants[anim];
          
          if (anim === "none" || !variant?.initial) {
            return <Component key={sec.id} />;
          }
          
          return (
            <motion.div key={sec.id} {...variant} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Component />
            </motion.div>
          );
        })}
    </>
  );
};

export default Index;
