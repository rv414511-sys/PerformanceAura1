import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug!).eq("published", true).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="section-padding text-center pt-32">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section-padding text-center pt-32">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
        <Button asChild><Link to="/blog">Back to Blog</Link></Button>
      </div>
    );
  }

  // Parse content - support markdown-like headings
  const parseContent = (content: string) => {
    if (!content) return [];
    return content.split("\n").filter(Boolean).map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) return { type: "h3" as const, text: trimmed.slice(4) };
      if (trimmed.startsWith("## ")) return { type: "h2" as const, text: trimmed.slice(3) };
      if (trimmed.startsWith("# ")) return { type: "h1" as const, text: trimmed.slice(2) };
      return { type: "p" as const, text: trimmed };
    });
  };

  const blocks = parseContent(post.content || "");

  return (
    <>
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold mb-6">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            {post.category && (
              <span className="inline-block text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full mb-4 border border-gold/20">{post.category}</span>
            )}
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              {post.read_time && <span className="flex items-center gap-1.5"><Clock size={14} /> {post.read_time}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none">
            {blocks.map((block, i) => {
              if (block.type === "h1") return <h2 key={i} className="font-display text-3xl font-bold text-foreground mt-10 mb-4">{block.text}</h2>;
              if (block.type === "h2") return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{block.text}</h2>;
              if (block.type === "h3") return <h3 key={i} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;
              return <p key={i} className="text-muted-foreground text-lg leading-relaxed mb-4">{block.text}</p>;
            })}
          </motion.div>

          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={16} className="text-muted-foreground" />
                {post.keywords.map((kw: string, i: number) => (
                  <span key={i} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{kw}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-8 rounded-2xl bg-primary text-center">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Ready to Grow Your Brand?</h3>
            <p className="text-primary-foreground/80 mb-6">Get a free consultation with PerformanceAura's marketing experts.</p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
