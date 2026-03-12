import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSetting } from "@/hooks/useSiteSettings";

const fallbackCourses = [
  { title: "Meta Ads Mastery", duration: "8 Weeks", price: 14999, description: "Learn to create high-converting Facebook & Instagram ad campaigns.", topics: ["Campaign structure", "Audience targeting", "Creative best practices", "Scaling strategies"] },
  { title: "Google Ads Pro", duration: "6 Weeks", price: 12999, description: "Master search, display, and shopping campaigns on Google.", topics: ["Keyword research", "Bid strategies", "Quality Score optimization", "Conversion tracking"] },
  { title: "Performance Marketing Blueprint", duration: "10 Weeks", price: 19999, description: "Full-funnel performance marketing strategies.", topics: ["Marketing funnels", "Multi-channel attribution", "CRO techniques", "Analytics"] },
];

const Courses = () => {
  const { value: pageData } = useSetting("page_courses");

  const page = {
    badge: "Learn & Grow",
    title: "Master Digital Marketing",
    titleHighlight: "With AI & Industry Experts",
    subtitle: "Practical, hands-on courses designed to give you real-world skills and results.",
    section_badge: "Our Courses",
    section_title: "Industry-Leading Programs",
    section_subtitle: "Learn from professionals who manage ₹50Cr+ in annual ad spend.",
    ...pageData,
  };

  const { data: dbCourses } = useQuery({
    queryKey: ["courses-public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("published", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const courses = dbCourses && dbCourses.length > 0 ? dbCourses : fallbackCourses;

  return (
    <>
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">{page.badge}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              {page.title}<br /><span className="text-gold">{page.titleHighlight}</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">{page.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading badge={page.section_badge} title={page.section_title} subtitle={page.section_subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  {course.duration && <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock size={14} /> {course.duration}</div>}
                </div>
                <h3 className="font-display text-2xl font-bold text-card-foreground mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                {course.topics && course.topics.length > 0 && (
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {course.topics.map((t: string, j: number) => (
                      <li key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen size={12} className="text-primary shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-display text-2xl font-bold text-primary">₹{course.price?.toLocaleString()}</span>
                  <Button size="sm" asChild><Link to={`/contact?course=${encodeURIComponent(course.title)}`}>Enroll Now →</Link></Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
