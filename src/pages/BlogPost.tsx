import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  metaDescription: string;
  content: { type: "h2" | "h3" | "p"; text: string }[];
  keywords: string[];
}> = {
  "ai-revolutionizing-digital-marketing-2026": {
    title: "How AI is Revolutionizing Digital Marketing in 2026",
    category: "AI & Marketing",
    date: "March 5, 2026",
    readTime: "8 min read",
    metaDescription: "Discover how artificial intelligence is transforming ad targeting, content creation, and campaign optimization for modern brands in 2026.",
    keywords: ["AI marketing", "digital marketing AI", "AI ad targeting", "marketing automation"],
    content: [
      { type: "p", text: "Artificial intelligence has fundamentally changed how brands approach digital marketing. At PerformanceAura, we've seen firsthand how AI-powered strategies deliver 2-3x better results compared to traditional methods." },
      { type: "h2", text: "AI-Powered Ad Targeting: Precision at Scale" },
      { type: "p", text: "Modern AI algorithms analyze millions of data points to identify your ideal customer segments. Platforms like Meta and Google now use machine learning to optimize ad delivery in real-time, ensuring your budget reaches the people most likely to convert." },
      { type: "p", text: "At PerformanceAura, we leverage these AI capabilities alongside our proprietary optimization frameworks to achieve an average ROAS of 3.2x for our clients across e-commerce, D2C, and B2B verticals." },
      { type: "h2", text: "Content Creation with AI Assistance" },
      { type: "p", text: "AI tools now assist in generating ad copy variations, blog outlines, and social media content at scale. However, the human touch remains essential — AI generates options, but experienced marketers select and refine what resonates with your specific audience." },
      { type: "h3", text: "Best Practices for AI-Assisted Content" },
      { type: "p", text: "Use AI for brainstorming and first drafts, but always review for brand voice consistency. Test multiple AI-generated variations through A/B testing to find winning combinations. Combine AI efficiency with human creativity for the best results." },
      { type: "h2", text: "Predictive Analytics and Campaign Optimization" },
      { type: "p", text: "AI-driven predictive analytics can forecast campaign performance before you spend a single rupee. By analyzing historical data and market trends, AI models help allocate budgets more effectively across channels and audiences." },
      { type: "p", text: "This is particularly valuable for performance marketing, where every rupee needs to generate measurable returns. PerformanceAura uses AI-powered analytics dashboards to give clients real-time visibility into their campaign performance." },
      { type: "h2", text: "Getting Started with AI Marketing" },
      { type: "p", text: "The key to successful AI marketing is starting with clean data and clear objectives. Whether you're running Meta Ads, Google Ads, or a full-funnel performance marketing strategy, AI can enhance every stage of the customer journey." },
      { type: "p", text: "Ready to leverage AI for your marketing? Contact PerformanceAura for a free consultation and discover how AI-driven strategies can transform your business growth." },
    ],
  },
  "meta-ads-strategies-4x-roas": {
    title: "5 Meta Ads Strategies That Generated 4x ROAS for Our Clients",
    category: "Meta Ads",
    date: "February 28, 2026",
    readTime: "10 min read",
    metaDescription: "Real case studies from PerformanceAura showing exactly how we structure winning Facebook and Instagram ad campaigns for maximum ROAS.",
    keywords: ["Meta Ads", "Facebook Ads", "ROAS", "ad strategy", "performance marketing"],
    content: [
      { type: "p", text: "After managing over ₹5 Crore in Meta Ads spend across 150+ brands, we've identified five proven strategies that consistently deliver 3-4x ROAS. Here's what works in 2026." },
      { type: "h2", text: "1. Advantage+ Shopping Campaigns with Custom Audiences" },
      { type: "p", text: "Meta's Advantage+ Shopping campaigns use AI to automatically find your best customers. But the secret is feeding them high-quality custom audience signals. We layer first-party data, website visitors, and lookalike audiences to guide the algorithm." },
      { type: "h2", text: "2. UGC-Led Creative Strategy" },
      { type: "p", text: "User-generated content outperforms polished brand ads by 2-3x in most D2C verticals. We build creative frameworks around authentic customer testimonials, unboxing videos, and genuine product reviews." },
      { type: "h3", text: "Creative Testing Framework" },
      { type: "p", text: "Test 3-5 new creative concepts weekly. Kill underperformers within 48 hours. Scale winners aggressively while maintaining creative diversity to prevent ad fatigue." },
      { type: "h2", text: "3. Full-Funnel Retargeting Architecture" },
      { type: "p", text: "Most brands only retarget cart abandoners. At PerformanceAura, we build multi-stage retargeting funnels: awareness → engagement → consideration → conversion → retention. Each stage gets tailored messaging and offers." },
      { type: "h2", text: "4. Server-Side Tracking Implementation" },
      { type: "p", text: "With iOS privacy changes, client-side tracking captures only 60-70% of conversions. Server-side tracking through Meta's Conversions API recovers 20-30% of lost attribution, giving the algorithm better data to optimize against." },
      { type: "h2", text: "5. Dynamic Product Ads with AI Optimization" },
      { type: "p", text: "For e-commerce brands, dynamic product ads automatically show the right products to the right people. Combined with AI-driven bid strategies and catalog optimization, these campaigns consistently deliver 4x+ ROAS." },
      { type: "p", text: "Want to implement these strategies for your brand? PerformanceAura specializes in high-performance Meta Ads campaigns. Get in touch for a free audit of your current campaigns." },
    ],
  },
  "google-ads-vs-meta-ads-budget-allocation": {
    title: "Google Ads vs Meta Ads: Where Should You Spend Your Budget?",
    category: "Strategy",
    date: "February 20, 2026",
    readTime: "7 min read",
    metaDescription: "A data-driven comparison to help you allocate your marketing budget between Google Ads and Meta Ads for maximum ROI.",
    keywords: ["Google Ads", "Meta Ads", "budget allocation", "digital marketing strategy"],
    content: [
      { type: "p", text: "One of the most common questions we get at PerformanceAura is: 'Should I invest in Google Ads or Meta Ads?' The answer depends on your business model, audience, and goals. Here's our data-driven framework." },
      { type: "h2", text: "When Google Ads Works Best" },
      { type: "p", text: "Google Ads excels for high-intent searches. If people are actively searching for your product or service, Google captures that demand. It's ideal for B2B lead generation, service businesses, and products with clear search volume." },
      { type: "h3", text: "Google Ads Strengths" },
      { type: "p", text: "Intent-based targeting means higher conversion rates. Search campaigns capture existing demand. Shopping ads work excellently for e-commerce with established product awareness." },
      { type: "h2", text: "When Meta Ads Works Best" },
      { type: "p", text: "Meta Ads excels at demand generation — showing your product to people who didn't know they needed it. It's powerful for D2C brands, impulse purchases, and visually appealing products." },
      { type: "h3", text: "Meta Ads Strengths" },
      { type: "p", text: "Superior visual storytelling capabilities. Advanced AI-driven audience discovery. Lower CPMs for awareness campaigns. Excellent for building brand recognition alongside performance." },
      { type: "h2", text: "The PerformanceAura Approach: Integrated Strategy" },
      { type: "p", text: "We typically recommend a blended approach. Start with 60% Meta / 40% Google for D2C brands, and 40% Meta / 60% Google for B2B. Then optimize based on data. The channels work best together — Meta creates awareness, Google captures intent." },
      { type: "p", text: "Need help building an integrated paid media strategy? PerformanceAura manages both platforms with unified reporting and cross-channel optimization." },
    ],
  },
  "performance-marketing-guide-d2c-brands": {
    title: "The Complete Guide to Performance Marketing for D2C Brands",
    category: "Performance Marketing",
    date: "February 15, 2026",
    readTime: "12 min read",
    metaDescription: "Everything you need to know about scaling your direct-to-consumer brand with performance marketing strategies that deliver measurable ROI.",
    keywords: ["performance marketing", "D2C marketing", "direct to consumer", "scaling brands"],
    content: [
      { type: "p", text: "Performance marketing is the backbone of every successful D2C brand. At PerformanceAura, we've helped 100+ D2C brands build scalable, profitable marketing engines. Here's our complete guide." },
      { type: "h2", text: "What is Performance Marketing?" },
      { type: "p", text: "Performance marketing is a results-driven approach where you only pay for measurable outcomes — clicks, leads, or sales. Unlike traditional advertising, every rupee is trackable and accountable." },
      { type: "h2", text: "Building Your Performance Marketing Stack" },
      { type: "p", text: "A solid performance marketing stack includes: paid social (Meta, Instagram), paid search (Google), analytics (GA4, server-side tracking), CRM (for customer lifecycle management), and creative production tools." },
      { type: "h3", text: "Essential Tracking Setup" },
      { type: "p", text: "Before spending on ads, ensure proper tracking: Meta Pixel + Conversions API, Google Analytics 4, UTM parameters on all links, and a unified dashboard for cross-channel reporting." },
      { type: "h2", text: "The D2C Performance Marketing Funnel" },
      { type: "p", text: "Stage 1: Awareness — Reach new audiences with engaging content. Stage 2: Consideration — Retarget engaged users with product benefits. Stage 3: Conversion — Drive purchases with offers and social proof. Stage 4: Retention — Re-engage customers for repeat purchases." },
      { type: "h2", text: "Scaling Without Breaking ROAS" },
      { type: "p", text: "The biggest challenge in D2C is maintaining ROAS while scaling spend. Our approach: increase budgets by 20% every 3-4 days, diversify creative constantly, expand to new audiences gradually, and monitor frequency caps." },
      { type: "p", text: "PerformanceAura specializes in helping D2C brands scale from ₹5L to ₹50L monthly revenue while maintaining healthy unit economics. Contact us to build your growth engine." },
    ],
  },
  "ai-automation-business-2026": {
    title: "Why Every Business Needs AI Automation in 2026",
    category: "AI Automation",
    date: "February 10, 2026",
    readTime: "6 min read",
    metaDescription: "From lead nurturing to customer support — learn how AI automation saves time, reduces costs, and boosts revenue for modern businesses.",
    keywords: ["AI automation", "business automation", "marketing automation", "AI tools"],
    content: [
      { type: "p", text: "AI automation is no longer a luxury — it's a competitive necessity. Businesses using AI automation report 30-40% reduction in operational costs and 2x faster response times. Here's why you need it." },
      { type: "h2", text: "Lead Nurturing on Autopilot" },
      { type: "p", text: "AI-powered email sequences and chatbots can nurture leads 24/7 without human intervention. At PerformanceAura, we implement automated lead nurturing workflows that convert 3x more prospects into customers." },
      { type: "h2", text: "Customer Support Automation" },
      { type: "p", text: "AI chatbots handle 70-80% of routine customer queries instantly. This frees your team to focus on complex issues while ensuring customers get immediate responses." },
      { type: "h3", text: "Smart Routing and Escalation" },
      { type: "p", text: "AI doesn't just answer questions — it intelligently routes complex queries to the right team member with full context, reducing resolution time by 50%." },
      { type: "h2", text: "Marketing Campaign Automation" },
      { type: "p", text: "From social media scheduling to bid optimization, AI automates repetitive marketing tasks. This lets your marketing team focus on strategy and creativity instead of manual execution." },
      { type: "h2", text: "Getting Started with AI Automation" },
      { type: "p", text: "Start small — automate one process, measure the impact, then expand. PerformanceAura offers AI Automation courses and implementation services to help businesses of all sizes harness the power of AI." },
    ],
  },
  "seo-content-writing-rank-google": {
    title: "SEO Content Writing: How to Rank #1 on Google",
    category: "Content Writing",
    date: "February 5, 2026",
    readTime: "9 min read",
    metaDescription: "Our proven SEO content framework that has helped 100+ brands dominate search engine results and drive organic traffic.",
    keywords: ["SEO content writing", "Google ranking", "content marketing", "organic traffic"],
    content: [
      { type: "p", text: "SEO content writing is one of the most cost-effective marketing strategies available. At PerformanceAura, our content team has helped brands achieve page 1 rankings for competitive keywords. Here's our framework." },
      { type: "h2", text: "Keyword Research: The Foundation" },
      { type: "p", text: "Every great piece of content starts with keyword research. We look for keywords with high search volume, moderate competition, and strong commercial intent. Tools like Ahrefs and SEMrush help identify opportunities." },
      { type: "h3", text: "Long-Tail Keywords Strategy" },
      { type: "p", text: "Don't just target broad keywords. Long-tail keywords (3-5 words) have lower competition and higher conversion rates. For example, 'digital marketing agency in Delhi' converts better than just 'digital marketing'." },
      { type: "h2", text: "Content Structure for SEO" },
      { type: "p", text: "Use a clear hierarchy: H1 for the main title, H2 for major sections, H3 for subsections. Include your target keyword in the H1, first paragraph, and naturally throughout the content. Aim for 1,500-2,500 words for competitive topics." },
      { type: "h2", text: "On-Page SEO Essentials" },
      { type: "p", text: "Optimize meta titles (under 60 characters), meta descriptions (under 160 characters), URL slugs, image alt text, and internal links. Each page should target one primary keyword and 2-3 related secondary keywords." },
      { type: "h2", text: "Content That Converts" },
      { type: "p", text: "SEO traffic is only valuable if it converts. Include clear CTAs, social proof, and lead magnets in your content. PerformanceAura combines SEO expertise with conversion optimization to ensure your content drives both traffic and revenue." },
    ],
  },
};

const slugs = Object.keys(blogPosts);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : undefined;

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
        <Button asChild><Link to="/blog">Back to Blog</Link></Button>
      </div>
    );
  }

  return (
    <>
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold mb-6">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="inline-block text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full mb-4 border border-gold/20">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none">
            {post.content.map((block, i) => {
              if (block.type === "h2") return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{block.text}</h2>;
              if (block.type === "h3") return <h3 key={i} className="font-display text-xl font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;
              return <p key={i} className="text-muted-foreground text-lg leading-relaxed mb-4">{block.text}</p>;
            })}
          </motion.div>

          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-muted-foreground" />
              {post.keywords.map((kw, i) => (
                <span key={i} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{kw}</span>
              ))}
            </div>
          </div>

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
