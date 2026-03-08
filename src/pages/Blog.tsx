import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSetting } from "@/hooks/useSiteSettings";

const fallbackPosts = [
  { title: "How AI is Revolutionizing Digital Marketing in 2026", slug: "ai-revolutionizing-digital-marketing-2026", excerpt: "Discover how AI is transforming ad targeting and campaign optimization.", created_at: "2026-03-05", category: "AI & Marketing" },
  { title: "5 Meta Ads Strategies That Generated 4x ROAS", slug: "meta-ads-strategies-4x-roas", excerpt: "Real case studies showing how we structure winning campaigns.", created_at: "2026-02-28", category: "Meta Ads" },
  { title: "Google Ads vs Meta Ads: Where Should You Spend?", slug: "google-ads-vs-meta-ads-budget-allocation", excerpt: "A data-driven comparison for budget allocation.", created_at: "2026-02-20", category: "Strategy" },
];

const Blog = () => {
  const { value: pageData } = useSetting("page_blog");

  const page = {
    badge: "Blog",
    title: "Insights & Strategies",
    titleHighlight: "From Industry Experts",
    subtitle: "Stay ahead with the latest digital marketing trends, AI strategies, and growth hacks from PerformanceAura.",
    ...pageData,
  };

  const { data: dbPosts } = useQuery({
    queryKey: ["blog-posts-public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const posts = dbPosts && dbPosts.length > 0 ? dbPosts : fallbackPosts;

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
          <SectionHeading badge="Latest Posts" title="Read, Learn, Grow" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any, i: number) => (
              <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/blog/${post.slug}`} className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="inline-block text-xs font-semibold text-primary bg-secondary px-3 py-1 rounded-full mb-4">{post.category}</span>
                  <h3 className="font-display text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays size={14} /> {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-primary">Read More <ArrowRight size={14} className="ml-1" /></span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
