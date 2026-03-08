import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from "@/components/admin/ImageUpload";

const AdminPages = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      data?.forEach((s: any) => { map[s.key] = { id: s.id, value: s.value }; });
      return map;
    },
  });

  // ─── About Page ───
  const [about, setAbout] = useState({
    badge: "About Us",
    title: "We Build Brands That",
    titleHighlight: "Dominate Markets",
    subtitle: "PerformanceAura is a premium AI-powered digital marketing agency that helps ambitious brands scale through data-driven performance marketing.",
    story_badge: "Our Story",
    story_title: "Born From a Mission to Deliver Real Results",
    story_paragraphs: ["Founded in 2021, PerformanceAura was born out of frustration with marketing agencies that promised the world but delivered vanity metrics.", "Today, we serve 50+ brands across e-commerce, D2C, B2B, and B2C verticals."],
    values: [
      { icon: "Target", title: "Data-Driven", desc: "Every decision backed by analytics and real performance data.", image_url: "" },
      { icon: "Eye", title: "Transparent", desc: "Full visibility into your campaigns, spend, and results.", image_url: "" },
      { icon: "Users", title: "Client-First", desc: "Your success is our success.", image_url: "" },
      { icon: "Award", title: "Excellence", desc: "We never settle. Continuous testing and optimization.", image_url: "" },
    ] as { icon: string; title: string; desc: string; image_url: string }[],
    founder_name: "Ravi Verma",
    founder_title: "Founder & CEO",
    founder_bio: "With 5+ years in performance marketing and experience scaling brands from ₹0 to ₹1Cr+ in revenue.",
    founder_image: "",
  });

  // ─── Contact Page ───
  const [contact, setContact] = useState({
    badge: "Get In Touch",
    title: "Let's Start Your",
    titleHighlight: "Growth Journey",
    email: "hello@performanceaura.com",
    phone: "+91 98765 43210",
    address: "Noida, Uttar Pradesh, India",
  });

  // ─── Services Page ───
  const [servicesPage, setServicesPage] = useState({
    badge: "Our Services",
    title: "Marketing Solutions",
    titleHighlight: "That Deliver Results",
    subtitle: "From paid ads to full-funnel performance marketing — PerformanceAura offers everything you need to scale.",
    cta_title: "Let's Build Your Growth Engine",
    cta_subtitle: "Get a custom marketing strategy tailored to your business goals.",
    cta_button: "Get Started",
  });

  // ─── Blog Page ───
  const [blogPage, setBlogPage] = useState({
    badge: "Blog",
    title: "Insights & Strategies",
    titleHighlight: "From Industry Experts",
    subtitle: "Stay ahead with the latest digital marketing trends, AI strategies, and growth hacks from PerformanceAura.",
  });

  // ─── Courses Page ───
  const [coursesPage, setCoursesPage] = useState({
    badge: "Learn & Grow",
    title: "Master Digital Marketing",
    titleHighlight: "With AI & Industry Experts",
    subtitle: "Practical, hands-on courses designed to give you real-world skills and results.",
    section_badge: "Our Courses",
    section_title: "Industry-Leading Programs",
    section_subtitle: "Learn from professionals who manage ₹50Cr+ in annual ad spend.",
  });

  // ─── Resources Page ───
  const [resourcesPage, setResourcesPage] = useState({
    badge: "Free Resources",
    title: "Marketing Resources",
    titleHighlight: "To Accelerate Growth",
    subtitle: "Download free guides, templates, and checklists crafted by our marketing experts.",
    section_badge: "Downloads",
    section_title: "Free Marketing Resources",
    section_subtitle: "Premium marketing tools — completely free for registered users.",
  });

  // ─── Service Pages (individual) ───
  const defaultServicePages: Record<string, any> = {
    "meta-ads": {
      title: "Meta Ads", headline: "Professional Meta Ads Services for Growing Businesses",
      description: "Reach your ideal audience with precision-targeted campaigns on Facebook and Instagram.",
      aboutTitle: "What Are Meta Ads & Why Your Business Needs Them",
      aboutText: ["Meta Ads encompass Facebook and Instagram advertising.", "At PerformanceAura, we design data-driven Meta Ad campaigns."],
      industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
      benefits: [{ title: "Higher Conversion Rates", desc: "Precision targeting ensures maximum conversions." }, { title: "Stronger Online Presence", desc: "Build brand awareness across platforms." }, { title: "Better Brand Visibility", desc: "Reach millions of potential customers." }, { title: "More Leads & Sales", desc: "Generate high-quality leads." }],
      deliverables: ["Comprehensive audience research", "Creative strategy with A/B testing", "Retargeting setup", "Campaign optimization", "Weekly reporting", "Bid optimization"],
      hero_image: "",
    },
    "google-ads": {
      title: "Google Ads", headline: "Google Ads Management That Captures High-Intent Buyers",
      description: "Capture customers actively searching for your products or services.",
      aboutTitle: "Why Google Ads Is Essential for Business Growth",
      aboutText: ["Google Ads puts your business in front of customers when they're searching.", "PerformanceAura's Google Ads team specializes in creating tightly structured campaigns."],
      industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Local Businesses", "Personal Brands"],
      benefits: [{ title: "Capture Ready-to-Buy Traffic", desc: "Target users with high purchase intent." }, { title: "Maximize Quality Score", desc: "Lower CPC with optimized ad relevance." }, { title: "Full-Funnel Coverage", desc: "Search to Display to Shopping." }, { title: "Transparent ROI Tracking", desc: "Every click tracked and reported." }],
      deliverables: ["Keyword research", "Campaign setup", "Bid strategy optimization", "Landing page optimization", "Conversion tracking", "Monthly performance reviews"],
      hero_image: "",
    },
    "performance-marketing": {
      title: "Performance Marketing", headline: "ROI-Focused Performance Marketing That Scales",
      description: "Data-driven strategies with transparent reporting and continuous optimization.",
      aboutTitle: "What is Performance Marketing?",
      aboutText: ["Performance marketing is results-driven advertising.", "We focus on measurable outcomes — ROAS, CPA, LTV."],
      industries: ["E-commerce", "D2C", "B2B", "SaaS", "Real Estate", "Education"],
      benefits: [{ title: "Measurable ROI", desc: "Every rupee tracked." }, { title: "Multi-Channel Strategy", desc: "Across all platforms." }, { title: "Continuous Optimization", desc: "Weekly testing and refinement." }, { title: "Transparent Reporting", desc: "Real-time dashboards." }],
      deliverables: ["Full-funnel strategy", "Cross-channel campaign management", "Attribution modeling", "A/B testing", "Reporting dashboard", "Monthly strategy reviews"],
      hero_image: "",
    },
    "video-editing": {
      title: "Video Editing", headline: "Professional Video Editing for Brands & Creators",
      description: "High-quality video content for ads, social media, and brand storytelling.",
      aboutTitle: "Why Video Content Matters",
      aboutText: ["Video is the most engaging content format.", "We create scroll-stopping videos that convert."],
      industries: ["E-commerce", "Personal Brands", "Education", "Real Estate", "Food & Beverage", "Fashion"],
      benefits: [{ title: "Higher Engagement", desc: "Video gets 2x more engagement than images." }, { title: "Better Ad Performance", desc: "Video ads convert 20-30% better." }, { title: "Brand Storytelling", desc: "Tell your brand's story effectively." }, { title: "Multi-Platform Ready", desc: "Optimized for all platforms." }],
      deliverables: ["Ad video editing", "Social media reels", "Product videos", "Testimonial editing", "Motion graphics", "Thumbnail design"],
      hero_image: "",
    },
    "ai-automation": {
      title: "AI Automation", headline: "AI Automation Systems That Save Time and Scale Revenue",
      description: "Automate repetitive marketing and sales workflows with reliable AI systems built for business growth.",
      aboutTitle: "Why AI Automation Matters",
      aboutText: ["AI automation removes repetitive manual tasks from your daily operations.", "We build practical automations for lead qualification, CRM updates, follow-ups, reporting, and campaign optimization."],
      industries: ["Real Estate", "E-commerce", "Education", "Healthcare", "Agencies", "Local Businesses"],
      benefits: [{ title: "Faster Execution", desc: "Automate manual workflows and reduce operational delays." }, { title: "Lower Costs", desc: "Save team bandwidth by removing repetitive tasks." }, { title: "Better Lead Handling", desc: "Capture, enrich, and route leads instantly." }, { title: "Always-On Systems", desc: "Run automations 24/7 with monitoring and guardrails." }],
      deliverables: ["Workflow audit & automation map", "Lead capture and routing automation", "CRM and sheet sync", "Automated follow-up sequences", "AI-assisted reporting", "Monitoring and optimization support"],
      hero_image: "",
    },
    "content-writing": {
      title: "Content Writing", headline: "SEO Content Writing That Ranks & Converts",
      description: "SEO-optimized content that ranks, engages, and converts your audience.",
      aboutTitle: "The Power of SEO Content",
      aboutText: ["Content is the foundation of organic growth.", "We write content that ranks on Google's first page."],
      industries: ["SaaS", "E-commerce", "Education", "Healthcare", "Finance", "Real Estate"],
      benefits: [{ title: "Higher Rankings", desc: "SEO-optimized content that climbs search results." }, { title: "More Organic Traffic", desc: "Drive free traffic to your site." }, { title: "Better Conversions", desc: "Content that persuades and converts." }, { title: "Authority Building", desc: "Establish thought leadership." }],
      deliverables: ["Blog articles", "Website copy", "Product descriptions", "Meta tags optimization", "Content calendar", "Keyword research"],
      hero_image: "",
    },
    "social-media-marketing": {
      title: "Social Media Marketing", headline: "Strategic Social Media Marketing for Growth",
      description: "Build communities and drive sales with strategic social management.",
      aboutTitle: "Why Social Media Matters",
      aboutText: ["Social media is where your customers spend their time.", "We create strategies that build engaged communities."],
      industries: ["D2C", "Fashion", "Food & Beverage", "Education", "Real Estate", "Personal Brands"],
      benefits: [{ title: "Community Building", desc: "Build loyal followers." }, { title: "Brand Awareness", desc: "Increase visibility." }, { title: "Lead Generation", desc: "Convert followers to customers." }, { title: "Content Strategy", desc: "Consistent, engaging content." }],
      deliverables: ["Content creation", "Posting schedule", "Community management", "Analytics reports", "Story & reel strategy", "Influencer outreach"],
      hero_image: "",
    },
    "web-design": {
      title: "Web Design", headline: "Modern Web Design & Development for Growth",
      description: "Conversion-focused websites that represent your brand beautifully.",
      aboutTitle: "Why Good Web Design Matters",
      aboutText: ["Your website is your digital storefront.", "We build fast, modern, conversion-optimized websites."],
      industries: ["E-commerce", "SaaS", "Education", "Healthcare", "Real Estate", "Agencies"],
      benefits: [{ title: "Higher Conversions", desc: "Design optimized for conversions." }, { title: "Mobile-First", desc: "Perfect on all devices." }, { title: "Fast Loading", desc: "Speed optimized." }, { title: "SEO-Friendly", desc: "Built for search engines." }],
      deliverables: ["UI/UX design", "Responsive development", "Speed optimization", "SEO setup", "Analytics integration", "Ongoing maintenance"],
      hero_image: "",
    },
  };

  const [servicePages, setServicePages] = useState<Record<string, any>>(defaultServicePages);
  const [activeServiceSlug, setActiveServiceSlug] = useState("meta-ads");

  // ─── Initialize from DB ───
  useEffect(() => {
    if (!settings) return;
    if (settings.page_about?.value) setAbout({ ...about, ...settings.page_about.value });
    if (settings.page_contact?.value) setContact({ ...contact, ...settings.page_contact.value });
    if (settings.page_services?.value) setServicesPage({ ...servicesPage, ...settings.page_services.value });
    if (settings.page_blog?.value) setBlogPage({ ...blogPage, ...settings.page_blog.value });
    if (settings.page_courses?.value) setCoursesPage({ ...coursesPage, ...settings.page_courses.value });
    if (settings.page_resources?.value) setResourcesPage({ ...resourcesPage, ...settings.page_resources.value });
    // Service pages
    const sp = { ...defaultServicePages };
    Object.keys(defaultServicePages).forEach((slug) => {
      const key = `page_service_${slug.replace(/-/g, "_")}`;
      if (settings[key]?.value) sp[slug] = { ...sp[slug], ...settings[key].value };
    });
    setServicePages(sp);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const existing = settings?.[key];
      if (existing) {
        const { error } = await supabase.from("site_settings").update({ value, updated_at: new Date().toISOString() }).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_settings").insert({ key, value });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "✅ Page saved!" });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const SaveBtn = ({ onClick }: { onClick: () => void }) => (
    <Button onClick={onClick} disabled={saveMutation.isPending} className="mt-2">
      {saveMutation.isPending ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Save size={14} className="mr-1" />} Save Changes
    </Button>
  );

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const sp = servicePages[activeServiceSlug] || {};

  const updateSP = (field: string, val: any) => {
    setServicePages({ ...servicePages, [activeServiceSlug]: { ...sp, [field]: val } });
  };

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">📄 Page Editor</h1>
      <p className="text-muted-foreground mb-6 text-sm">Sabhi pages ka content yahan se edit karein — About, Contact, Services, Blog, Courses, Resources, aur har service page.</p>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-muted p-1 rounded-xl">
          {["about", "contact", "services", "service-pages", "blog", "courses", "resources"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t.replace("-", " ")}</TabsTrigger>
          ))}
        </TabsList>

        {/* ═══ ABOUT ═══ */}
        <TabsContent value="about">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📖 About Page</h2>

            <h3 className="text-sm font-semibold text-foreground mt-4">Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={about.badge} onChange={(v) => setAbout({ ...about, badge: v })} />
              <Field label="Title" value={about.title} onChange={(v) => setAbout({ ...about, title: v })} />
              <Field label="Highlighted Text" value={about.titleHighlight} onChange={(v) => setAbout({ ...about, titleHighlight: v })} />
            </div>
            <Textarea placeholder="Subtitle" value={about.subtitle} onChange={(e) => setAbout({ ...about, subtitle: e.target.value })} rows={2} />

            <h3 className="text-sm font-semibold text-foreground mt-4">Our Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={about.story_badge} onChange={(v) => setAbout({ ...about, story_badge: v })} />
              <Field label="Title" value={about.story_title} onChange={(v) => setAbout({ ...about, story_title: v })} />
            </div>
            <Textarea placeholder="Story paragraphs (one per line)" value={about.story_paragraphs.join("\n\n")} onChange={(e) => setAbout({ ...about, story_paragraphs: e.target.value.split("\n\n").filter(Boolean) })} rows={6} />

            <h3 className="text-sm font-semibold text-foreground mt-4">Values</h3>
            {about.values.map((v, i) => (
              <div key={i} className="p-3 border border-border rounded-lg space-y-2 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Value #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setAbout({ ...about, values: about.values.filter((_, j) => j !== i) })}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input placeholder="Title" value={v.title} onChange={(e) => { const n = [...about.values]; n[i] = { ...n[i], title: e.target.value }; setAbout({ ...about, values: n }); }} />
                  <Input placeholder="Icon (Target, Eye, Users, Award)" value={v.icon} onChange={(e) => { const n = [...about.values]; n[i] = { ...n[i], icon: e.target.value }; setAbout({ ...about, values: n }); }} />
                </div>
                <Textarea placeholder="Description" value={v.desc} onChange={(e) => { const n = [...about.values]; n[i] = { ...n[i], desc: e.target.value }; setAbout({ ...about, values: n }); }} rows={2} />
                <ImageUpload value={v.image_url} onChange={(url) => { const n = [...about.values]; n[i] = { ...n[i], image_url: url }; setAbout({ ...about, values: n }); }} folder="about" label="Custom Icon/Image (optional)" />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setAbout({ ...about, values: [...about.values, { icon: "Star", title: "", desc: "", image_url: "" }] })}><Plus size={14} className="mr-1" /> Add Value</Button>

            <h3 className="text-sm font-semibold text-foreground mt-4">Founder (About Page)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Name" value={about.founder_name} onChange={(v) => setAbout({ ...about, founder_name: v })} />
              <Field label="Title" value={about.founder_title} onChange={(v) => setAbout({ ...about, founder_title: v })} />
            </div>
            <Textarea placeholder="Bio" value={about.founder_bio} onChange={(e) => setAbout({ ...about, founder_bio: e.target.value })} rows={3} />
            <ImageUpload value={about.founder_image} onChange={(url) => setAbout({ ...about, founder_image: url })} folder="founder" label="Founder Photo" />

            <SaveBtn onClick={() => saveMutation.mutate({ key: "page_about", value: about })} />
          </div>
        </TabsContent>

        {/* ═══ CONTACT ═══ */}
        <TabsContent value="contact">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📞 Contact Page</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={contact.badge} onChange={(v) => setContact({ ...contact, badge: v })} />
              <Field label="Title" value={contact.title} onChange={(v) => setContact({ ...contact, title: v })} />
              <Field label="Highlighted Text" value={contact.titleHighlight} onChange={(v) => setContact({ ...contact, titleHighlight: v })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
              <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
            </div>
            <Field label="Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "page_contact", value: contact })} />
          </div>
        </TabsContent>

        {/* ═══ SERVICES LISTING ═══ */}
        <TabsContent value="services">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">🔧 Services Page</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={servicesPage.badge} onChange={(v) => setServicesPage({ ...servicesPage, badge: v })} />
              <Field label="Title" value={servicesPage.title} onChange={(v) => setServicesPage({ ...servicesPage, title: v })} />
              <Field label="Highlighted Text" value={servicesPage.titleHighlight} onChange={(v) => setServicesPage({ ...servicesPage, titleHighlight: v })} />
            </div>
            <Textarea placeholder="Subtitle" value={servicesPage.subtitle} onChange={(e) => setServicesPage({ ...servicesPage, subtitle: e.target.value })} rows={2} />
            <h3 className="text-sm font-semibold text-foreground mt-4">Bottom CTA</h3>
            <Field label="CTA Title" value={servicesPage.cta_title} onChange={(v) => setServicesPage({ ...servicesPage, cta_title: v })} />
            <Textarea placeholder="CTA Subtitle" value={servicesPage.cta_subtitle} onChange={(e) => setServicesPage({ ...servicesPage, cta_subtitle: e.target.value })} rows={2} />
            <Field label="CTA Button Text" value={servicesPage.cta_button} onChange={(v) => setServicesPage({ ...servicesPage, cta_button: v })} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "page_services", value: servicesPage })} />
          </div>
        </TabsContent>

        {/* ═══ INDIVIDUAL SERVICE PAGES ═══ */}
        <TabsContent value="service-pages">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">🔧 Individual Service Pages</h2>
            <p className="text-sm text-muted-foreground">Kisi bhi service page ka poora content yahan se edit karein.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(servicePages).map((slug) => (
                <Button key={slug} variant={activeServiceSlug === slug ? "default" : "outline"} size="sm" onClick={() => setActiveServiceSlug(slug)}>
                  {servicePages[slug]?.title || slug}
                </Button>
              ))}
            </div>

            <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/20">
              <h3 className="text-sm font-bold text-foreground">Hero</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Title" value={sp.title || ""} onChange={(v) => updateSP("title", v)} />
                <Field label="Headline (H1)" value={sp.headline || ""} onChange={(v) => updateSP("headline", v)} />
              </div>
              <Textarea placeholder="Description" value={sp.description || ""} onChange={(e) => updateSP("description", e.target.value)} rows={3} />
              <ImageUpload value={sp.hero_image || ""} onChange={(url) => updateSP("hero_image", url)} folder="services" label="Hero Image (optional — replaces icon)" />

              <h3 className="text-sm font-bold text-foreground mt-4">About Section</h3>
              <Field label="About Title" value={sp.aboutTitle || ""} onChange={(v) => updateSP("aboutTitle", v)} />
              <Textarea placeholder="About paragraphs (one per blank line)" value={(sp.aboutText || []).join("\n\n")} onChange={(e) => updateSP("aboutText", e.target.value.split("\n\n").filter(Boolean))} rows={5} />

              <h3 className="text-sm font-bold text-foreground mt-4">Industries</h3>
              <Textarea placeholder="One per line" value={(sp.industries || []).join("\n")} onChange={(e) => updateSP("industries", e.target.value.split("\n").filter(Boolean))} rows={4} />

              <h3 className="text-sm font-bold text-foreground mt-4">Benefits</h3>
              {(sp.benefits || []).map((b: any, i: number) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-1">
                    <Input placeholder="Title" value={b.title} onChange={(e) => { const n = [...(sp.benefits || [])]; n[i] = { ...n[i], title: e.target.value }; updateSP("benefits", n); }} />
                    <Input placeholder="Description" value={b.desc} onChange={(e) => { const n = [...(sp.benefits || [])]; n[i] = { ...n[i], desc: e.target.value }; updateSP("benefits", n); }} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => updateSP("benefits", (sp.benefits || []).filter((_: any, j: number) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateSP("benefits", [...(sp.benefits || []), { title: "", desc: "" }])}><Plus size={14} className="mr-1" /> Add Benefit</Button>

              <h3 className="text-sm font-bold text-foreground mt-4">Deliverables</h3>
              <Textarea placeholder="One per line" value={(sp.deliverables || []).join("\n")} onChange={(e) => updateSP("deliverables", e.target.value.split("\n").filter(Boolean))} rows={6} />

              <SaveBtn onClick={() => {
                const key = `page_service_${activeServiceSlug.replace(/-/g, "_")}`;
                saveMutation.mutate({ key, value: sp });
              }} />
            </div>
          </div>
        </TabsContent>

        {/* ═══ BLOG PAGE ═══ */}
        <TabsContent value="blog">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📝 Blog Page</h2>
            <p className="text-sm text-muted-foreground">Blog page ka hero section edit karein. Blog posts ke liye Blog Posts section use karein.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={blogPage.badge} onChange={(v) => setBlogPage({ ...blogPage, badge: v })} />
              <Field label="Title" value={blogPage.title} onChange={(v) => setBlogPage({ ...blogPage, title: v })} />
              <Field label="Highlighted Text" value={blogPage.titleHighlight} onChange={(v) => setBlogPage({ ...blogPage, titleHighlight: v })} />
            </div>
            <Textarea placeholder="Subtitle" value={blogPage.subtitle} onChange={(e) => setBlogPage({ ...blogPage, subtitle: e.target.value })} rows={2} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "page_blog", value: blogPage })} />
          </div>
        </TabsContent>

        {/* ═══ COURSES PAGE ═══ */}
        <TabsContent value="courses">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">🎓 Courses Page</h2>
            <p className="text-sm text-muted-foreground">Courses page ka hero edit karein. Courses ke liye Courses section use karein.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={coursesPage.badge} onChange={(v) => setCoursesPage({ ...coursesPage, badge: v })} />
              <Field label="Title" value={coursesPage.title} onChange={(v) => setCoursesPage({ ...coursesPage, title: v })} />
              <Field label="Highlighted Text" value={coursesPage.titleHighlight} onChange={(v) => setCoursesPage({ ...coursesPage, titleHighlight: v })} />
            </div>
            <Textarea placeholder="Subtitle" value={coursesPage.subtitle} onChange={(e) => setCoursesPage({ ...coursesPage, subtitle: e.target.value })} rows={2} />
            <h3 className="text-sm font-semibold mt-4">Courses Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Section Badge" value={coursesPage.section_badge} onChange={(v) => setCoursesPage({ ...coursesPage, section_badge: v })} />
              <Field label="Section Title" value={coursesPage.section_title} onChange={(v) => setCoursesPage({ ...coursesPage, section_title: v })} />
            </div>
            <Field label="Section Subtitle" value={coursesPage.section_subtitle} onChange={(v) => setCoursesPage({ ...coursesPage, section_subtitle: v })} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "page_courses", value: coursesPage })} />
          </div>
        </TabsContent>

        {/* ═══ RESOURCES PAGE ═══ */}
        <TabsContent value="resources">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📥 Resources Page</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Badge" value={resourcesPage.badge} onChange={(v) => setResourcesPage({ ...resourcesPage, badge: v })} />
              <Field label="Title" value={resourcesPage.title} onChange={(v) => setResourcesPage({ ...resourcesPage, title: v })} />
              <Field label="Highlighted Text" value={resourcesPage.titleHighlight} onChange={(v) => setResourcesPage({ ...resourcesPage, titleHighlight: v })} />
            </div>
            <Textarea placeholder="Subtitle" value={resourcesPage.subtitle} onChange={(e) => setResourcesPage({ ...resourcesPage, subtitle: e.target.value })} rows={2} />
            <h3 className="text-sm font-semibold mt-4">Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Section Badge" value={resourcesPage.section_badge} onChange={(v) => setResourcesPage({ ...resourcesPage, section_badge: v })} />
              <Field label="Section Title" value={resourcesPage.section_title} onChange={(v) => setResourcesPage({ ...resourcesPage, section_title: v })} />
            </div>
            <Field label="Section Subtitle" value={resourcesPage.section_subtitle} onChange={(v) => setResourcesPage({ ...resourcesPage, section_subtitle: v })} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "page_resources", value: resourcesPage })} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || label} />
  </div>
);

export default AdminPages;
