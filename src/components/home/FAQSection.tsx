import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import { useSetting } from "@/hooks/useSiteSettings";

const defaultFaqs = [
  { q: "How quickly can I expect results?", a: "Most clients see measurable improvements within 2-3 weeks of campaign launch. Significant ROI gains typically appear by month 2, with full optimization and scaling kicking in by month 3." },
  { q: "What's the minimum ad budget you work with?", a: "We recommend a minimum monthly ad spend of ₹1 lakh to see meaningful results. However, our strategies are designed to scale — most clients increase their budget within 60 days after seeing positive ROAS." },
  { q: "Do you work with specific industries only?", a: "We specialize in e-commerce, D2C, and B2B companies, but our data-driven approach works across industries. We've delivered results in fashion, health & wellness, SaaS, real estate, education, and more." },
  { q: "How is PerformanceAura different from other agencies?", a: "Three things set us apart: (1) We're obsessed with ROAS, not vanity metrics, (2) We implement server-side tracking for 98% data accuracy, and (3) We provide complete transparency with real-time dashboards — no black boxes." },
  { q: "What platforms do you run ads on?", a: "We primarily run campaigns on Meta (Facebook & Instagram), Google (Search, Shopping, Display, YouTube), and LinkedIn for B2B. We choose platforms based on where your audience lives and your business model." },
  { q: "Do you offer contracts or month-to-month?", a: "We offer both. Most clients start with a 3-month engagement to allow proper strategy implementation and optimization. After that, you can continue month-to-month. Our 98% retention rate speaks for itself." },
  { q: "What does the onboarding process look like?", a: "It's simple: (1) Free strategy call, (2) Deep audit of your current setup in Week 1, (3) Custom strategy presentation in Week 2, (4) Campaign launch in Week 3-4. You'll have a dedicated account manager throughout." },
  { q: "Can I see my campaign performance in real time?", a: "Absolutely. Every client gets access to a live dashboard showing all key metrics — spend, ROAS, CPA, conversions, and more. Plus, you'll receive weekly reports with insights and action items." },
];

const FAQSection = () => {
  const { value: data } = useSetting("faqs");
  const faqs = data?.items?.length ? data.items : defaultFaqs;

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading badge="FAQs" title="Got Questions? We've Got Answers" subtitle="Everything you need to know before getting started." />
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq: any, i: number) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 data-[state=open]:bg-card">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline text-sm md:text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
