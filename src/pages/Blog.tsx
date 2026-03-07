import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "How AI is Revolutionizing Digital Marketing in 2026",
    slug: "ai-revolutionizing-digital-marketing-2026",
    excerpt: "Discover how artificial intelligence is transforming ad targeting, content creation, and campaign optimization for modern brands.",
    date: "March 5, 2026",
    category: "AI & Marketing",
  },
  {
    title: "5 Meta Ads Strategies That Generated 4x ROAS for Our Clients",
    slug: "meta-ads-strategies-4x-roas",
    excerpt: "Real case studies from PerformanceAura showing exactly how we structure winning Facebook and Instagram campaigns.",
    date: "February 28, 2026",
    category: "Meta Ads",
  },
  {
    title: "Google Ads vs Meta Ads: Where Should You Spend Your Budget?",
    slug: "google-ads-vs-meta-ads-budget-allocation",
    excerpt: "A data-driven comparison to help you allocate your marketing budget for maximum ROI across platforms.",
    date: "February 20, 2026",
    category: "Strategy",
  },
  {
    title: "The Complete Guide to Performance Marketing for D2C Brands",
    slug: "performance-marketing-guide-d2c-brands",
    excerpt: "Everything you need to know about scaling your direct-to-consumer brand with performance marketing.",
    date: "February 15, 2026",
    category: "Performance Marketing",
  },
  {
    title: "Why Every Business Needs AI Automation in 2026",
    slug: "ai-automation-business-2026",
    excerpt: "From lead nurturing to customer support — learn how AI automation saves time and boosts revenue.",
    date: "February 10, 2026",
    category: "AI Automation",
  },
  {
    title: "SEO Content Writing: How to Rank #1 on Google",
    slug: "seo-content-writing-rank-google",
    excerpt: "Our proven content framework that has helped 100+ brands dominate search engine results pages.",
    date: "February 5, 2026",
    category: "Content Writing",
  },
];

const Blog = () => (
  <>
    <section className="hero-gradient section-padding pt-32">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
            Blog
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Insights & Strategies
            <br />
            <span className="text-gold">From Industry Experts</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Stay ahead with the latest digital marketing trends, AI strategies, and growth hacks from PerformanceAura.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <SectionHeading badge="Latest Posts" title="Read, Learn, Grow" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                <span className="inline-block text-xs font-semibold text-primary bg-secondary px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays size={14} /> {post.date}
                  </div>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read More <ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Blog;
