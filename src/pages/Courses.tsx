import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Users, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Meta Ads Mastery",
    duration: "8 Weeks",
    students: "2,400+",
    price: "₹14,999",
    desc: "Learn to create high-converting Facebook & Instagram ad campaigns from scratch.",
    topics: ["Campaign structure", "Audience targeting", "Creative best practices", "Scaling strategies"],
  },
  {
    title: "Google Ads Pro",
    duration: "6 Weeks",
    students: "1,800+",
    price: "₹12,999",
    desc: "Master search, display, and shopping campaigns on Google's advertising platform.",
    topics: ["Keyword research", "Bid strategies", "Quality Score optimization", "Conversion tracking"],
  },
  {
    title: "Performance Marketing Blueprint",
    duration: "10 Weeks",
    students: "1,200+",
    price: "₹19,999",
    desc: "A comprehensive course covering full-funnel performance marketing strategies.",
    topics: ["Marketing funnels", "Multi-channel attribution", "CRO techniques", "Analytics & reporting"],
  },
  {
    title: "AI Automation Course",
    duration: "6 Weeks",
    students: "800+",
    price: "₹17,999",
    desc: "Automate your marketing workflows using AI tools — from lead gen to customer nurturing.",
    topics: ["AI chatbots", "Workflow automation", "AI content generation", "Lead scoring with AI"],
  },
  {
    title: "Digital Marketing with AI",
    duration: "12 Weeks",
    students: "1,500+",
    price: "₹24,999",
    desc: "The ultimate program combining traditional digital marketing with cutting-edge AI strategies.",
    topics: ["AI ad optimization", "Predictive analytics", "AI copywriting", "Smart bidding with AI"],
  },
];

const Courses = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
              Learn & Grow
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Master Digital Marketing
              <br />
              <span className="text-gold">With AI & Industry Experts</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Practical, hands-on courses designed to give you real-world skills and results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading badge="Our Courses" title="Industry-Leading Programs" subtitle="Learn from professionals who manage ₹50Cr+ in annual ad spend." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={14} /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users size={14} /> {course.students} students
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-card-foreground mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.desc}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {course.topics.map((t, j) => (
                    <li key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <BookOpen size={12} className="text-primary shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-display text-2xl font-bold text-primary">{course.price}</span>
                  <Button size="sm" asChild>
                    <Link to="/contact">Enroll Now</Link>
                  </Button>
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
