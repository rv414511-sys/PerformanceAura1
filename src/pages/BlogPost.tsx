import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fallbackPostDetails: Record<string, any> = {
  "ai-revolutionizing-digital-marketing-2026": {
    title: "How AI is Revolutionizing Digital Marketing in 2026",
    category: "AI & Marketing",
    read_time: "6 min read",
    created_at: "2026-03-05",
    meta_description: "Discover how AI is transforming digital marketing — from ad targeting to creative optimization — and what brands must do to stay ahead in 2026.",
    keywords: ["AI marketing", "automation", "ad optimization", "digital marketing 2026"],
    excerpt: "Discover how AI is transforming ad targeting and campaign optimization.",
    featured_image: null,
    content: `# How AI is Revolutionizing Digital Marketing in 2026

Artificial Intelligence has moved from being a buzzword to an essential tool in every marketer's toolkit. In 2026, AI-driven marketing isn't optional — it's the baseline for competitive brands.

## Why AI is Changing Marketing Forever

AI now helps brands predict customer behavior, personalize creatives at scale, and optimize ad spend in real-time. Machine learning algorithms analyze millions of data points to find patterns that humans simply can't detect.

### Predictive Analytics
AI models can predict which leads are most likely to convert, allowing marketers to focus budgets on high-value prospects. This dramatically reduces cost-per-acquisition and improves ROAS.

### Creative Optimization
Tools powered by AI can generate and test hundreds of ad variations, automatically identifying which visuals, headlines, and CTAs perform best for each audience segment.

## What Brands Should Do Now

### 1. Build Better Data Pipelines
Collect clean first-party data and connect your ad platforms properly. AI is only as good as the data you feed it. Invest in proper tracking, pixel setup, and CRM integration.

### 2. Test Faster with AI-Assisted Workflows
Use weekly creative testing and audience experiments. AI tools can compress what used to take months of A/B testing into days of multivariate optimization.

### 3. Keep Human Strategy at the Core
AI can optimize execution, but business strategy still needs human creativity and empathy. The best results come from pairing human insight with AI speed.

## Key Takeaways
- AI-powered ad platforms deliver 30-50% better ROAS on average
- First-party data is the foundation of effective AI marketing
- Creative testing cycles should be weekly, not monthly
- Human strategy + AI execution = winning formula

The brands that embrace AI marketing now will have an insurmountable advantage by 2027. Don't wait — start building your AI marketing stack today.`,
  },
  "meta-ads-strategies-4x-roas": {
    title: "5 Meta Ads Strategies That Generated 4x ROAS",
    category: "Meta Ads",
    read_time: "7 min read",
    created_at: "2026-02-28",
    meta_description: "Learn 5 proven Meta Ads strategies that helped our clients achieve 4x ROAS — from creative hooks to full-funnel campaign architecture.",
    keywords: ["Meta Ads", "ROAS", "performance marketing", "Facebook Ads"],
    excerpt: "Real case studies showing how we structure winning campaigns.",
    featured_image: null,
    content: `# 5 Meta Ads Strategies That Generated 4x ROAS

After managing over ₹2 Crore in Meta Ads spend across dozens of clients, we've identified five strategies that consistently deliver 4x+ returns on ad spend.

## Strategy #1: Hook-First Creatives

The first 3 seconds of any video ad determine whether someone watches or scrolls. We design every creative with a pattern-interrupt hook — a bold statement, unexpected visual, or provocative question.

### What Works
- Before/after transformations
- Counter-intuitive statements ("Why we stopped running conversion campaigns")
- Direct questions that address pain points

## Strategy #2: Full-Funnel Campaign Architecture

Don't run a single campaign and expect magic. Build separate campaigns for:

### Top of Funnel (Prospecting)
Broad audiences, interest-based targeting, lookalike audiences. Goal: awareness and engagement.

### Middle of Funnel (Remarketing)
Website visitors, video viewers, social engagers. Goal: consideration and trust-building.

### Bottom of Funnel (Conversion)
Cart abandoners, high-intent page visitors. Goal: purchase or lead submission.

## Strategy #3: Offer Clarity

Every ad set should promote one clear offer. Mixed messaging confuses the algorithm and the audience. Test one variable at a time.

## Strategy #4: Landing Page Alignment

Your ad message and landing page content must stay perfectly aligned. If your ad promises "50% off first order," the landing page headline should reinforce that exact offer.

## Strategy #5: Weekly Optimization Cadence

Review performance every 7 days. Pause weak creatives early (CTR below 1%, high CPM with no conversions) and scale winners by increasing budget 20-30% at a time.

## Results We've Seen
- E-commerce brand: 4.2x ROAS in 60 days
- EdTech startup: ₹45 cost per lead (from ₹180)
- Real estate project: 300+ qualified leads in 30 days

Ready to achieve similar results? Book a free strategy call with our Meta Ads team.`,
  },
  "google-ads-vs-meta-ads-budget-allocation": {
    title: "Google Ads vs Meta Ads: Where Should You Spend?",
    category: "Strategy",
    read_time: "5 min read",
    created_at: "2026-02-20",
    meta_description: "A data-driven comparison of Google Ads vs Meta Ads to help you allocate your digital marketing budget for maximum ROI.",
    keywords: ["Google Ads", "Meta Ads", "budget allocation", "digital marketing strategy"],
    excerpt: "A data-driven comparison for budget allocation.",
    featured_image: null,
    content: `# Google Ads vs Meta Ads: Where Should You Spend?

One of the most common questions we get from clients is: "Should I spend on Google Ads or Meta Ads?" The answer depends on your business model, audience, and goals.

## The Short Answer

Use Google Ads for high-intent search traffic and Meta Ads for demand generation and brand awareness. Most businesses need both.

## Google Ads: Capture Existing Demand

Google Ads excels when people are actively searching for your product or service. If someone types "best digital marketing agency in Noida," they're ready to buy.

### Best For
- Service businesses (agencies, consultants, clinics)
- High-ticket products
- Local businesses
- B2B lead generation

## Meta Ads: Create New Demand

Meta Ads (Facebook & Instagram) are powerful for reaching people who don't know they need your product yet. Visual storytelling and precise audience targeting make Meta ideal for building awareness.

### Best For
- E-commerce and D2C brands
- Course and info-product launches
- Brand building and community growth
- App installs

## Budget Rule of Thumb

Start with 60% on high-intent channels (Google Search, Shopping) and 40% on discovery channels (Meta, YouTube). Adjust based on data after 30 days.

## When to Rebalance

If branded search volume grows and your CAC drops on Meta, it means Meta prospecting is working. Move more budget to Meta to accelerate top-of-funnel growth while Google captures the brand demand.

## Our Recommendation

Don't choose one over the other. Build an integrated strategy that uses each platform for what it does best. Track cross-platform attribution and optimize for blended ROAS.`,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const decodedSlug = decodeURIComponent(slug || "").trim();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", decodedSlug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      if (data) return data;

      const fallback = fallbackPostDetails[decodedSlug];
      return fallback ? { slug: decodedSlug, ...fallback } : null;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="section-padding text-center pt-32">
        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
          <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
          <div className="h-64 bg-muted rounded mt-8" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section-padding text-center pt-32">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild><Link to="/blog">Back to Blog</Link></Button>
      </div>
    );
  }

  const parseContent = (content: string) => {
    if (!content) return [];
    return content.split("\n").filter((line) => line.trim().length > 0).map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) return { type: "h3" as const, text: trimmed.slice(4) };
      if (trimmed.startsWith("## ")) return { type: "h2" as const, text: trimmed.slice(3) };
      if (trimmed.startsWith("# ")) return { type: "h1" as const, text: trimmed.slice(2) };
      if (trimmed.startsWith("- ")) return { type: "li" as const, text: trimmed.slice(2) };
      return { type: "p" as const, text: trimmed };
    });
  };

  const blocks = parseContent(post.content || post.excerpt || "");

  return (
    <>
      {/* SEO meta */}
      {post.meta_description && (
        <meta name="description" content={post.meta_description} />
      )}

      {/* Hero */}
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
            {post.excerpt && (
              <p className="text-primary-foreground/80 text-lg mb-4">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              {post.read_time && <span className="flex items-center gap-1.5"><Clock size={14} /> {post.read_time}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="container mx-auto max-w-3xl -mt-8 relative z-10 px-4">
          <img src={post.featured_image} alt={post.title} className="w-full rounded-2xl shadow-lg object-cover max-h-[480px]" />
        </div>
      )}

      {/* Article Content */}
      <article className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          {/* Meta description display */}
          {post.meta_description && (
            <div className="mb-8 p-4 rounded-xl bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground italic">{post.meta_description}</p>
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-1">
            {blocks.map((block, i) => {
              if (block.type === "h1") return <h1 key={i} className="font-display text-3xl font-bold text-foreground mt-10 mb-4">{block.text}</h1>;
              if (block.type === "h2") return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{block.text}</h2>;
              if (block.type === "h3") return <h3 key={i} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;
              if (block.type === "li") return <li key={i} className="text-muted-foreground text-lg leading-relaxed ml-5 list-disc">{block.text}</li>;
              return <p key={i} className="text-muted-foreground text-lg leading-relaxed mb-4">{block.text}</p>;
            })}
          </motion.div>

          {/* Keywords */}
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

          {/* CTA */}
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
