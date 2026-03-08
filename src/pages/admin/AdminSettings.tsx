import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import CustomSectionBuilder, { type CustomSection, newCustomSection } from "@/components/admin/CustomSectionBuilder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ─── Defaults (same as used in homepage components) ───
const defaultServices = [
  { icon: "Target", title: "Meta Ads", slug: "meta-ads", desc: "Precision-targeted campaigns on Facebook & Instagram that convert audiences into customers." },
  { icon: "BarChart3", title: "Google Ads", slug: "google-ads", desc: "High-intent search and display campaigns that capture ready-to-buy customers." },
  { icon: "TrendingUp", title: "Performance Marketing", slug: "performance-marketing", desc: "ROI-focused strategies with transparent reporting and continuous optimization." },
  { icon: "Film", title: "Video Editing", slug: "video-editing", desc: "Professional video content for ads, social media, and brand storytelling." },
  { icon: "PenTool", title: "Content Writing", slug: "content-writing", desc: "SEO-optimized content that ranks, engages, and converts." },
  { icon: "Share2", title: "Social Media", slug: "social-media-marketing", desc: "Strategic social management that builds communities and drives sales." },
  { icon: "Monitor", title: "Web Design", slug: "web-design", desc: "Modern, conversion-focused websites built for growth." },
];

const defaultStats = [
  { value: "50+", label: "Clients Served" },
  { value: "₹1Cr+", label: "Ad Spend Managed" },
  { value: "3.2x", label: "Avg. ROAS" },
  { value: "120+", label: "Campaigns Managed" },
];

const defaultProblems = [
  { audience: "E-Commerce Brands", headline: "Burning ad budget with low ROAS?", pain: "You're spending lakhs on ads but your cost-per-acquisition keeps climbing.", stat: "72% of e-commerce brands waste 40%+ of their ad spend." },
  { audience: "B2B Companies", headline: "Getting leads that never convert?", pain: "Your campaigns generate form fills, but sales teams complain about lead quality.", stat: "Only 27% of B2B leads are sales-ready." },
  { audience: "D2C Brands", headline: "Stuck at the same revenue ceiling?", pain: "Scaling beyond ₹10-20L/month feels like hitting a wall.", stat: "83% of D2C brands plateau within 18 months." },
];

const defaultSolutions = [
  { title: "Meta Ads Strategy", subtitle: "Facebook & Instagram Mastery", points: ["Lookalike & interest-based audience stacking", "Dynamic creative testing", "Full-funnel retargeting"], result: "Avg. 3.8x ROAS across 200+ brands" },
  { title: "Google Ads Funnel", subtitle: "Search, Shopping & Display", points: ["High-intent keyword mapping", "Performance Max optimization", "Smart bidding"], result: "40% lower CPA vs. industry average" },
  { title: "Performance Tracking", subtitle: "Data-Driven Decisions", points: ["Server-side tracking setup", "Custom attribution modeling", "Real-time dashboard"], result: "98% tracking accuracy post iOS-14" },
];

const defaultProcess = [
  { step: "01", title: "Deep Audit", duration: "Week 1", desc: "We analyze your current campaigns, tracking setup, and competitors.", deliverables: ["Ad account audit report", "Competitor analysis", "Tracking health check"] },
  { step: "02", title: "Custom Strategy", duration: "Week 2", desc: "We build a full-funnel strategy tailored to your business.", deliverables: ["Media plan", "Audience mapping", "Creative brief"] },
  { step: "03", title: "Launch & Execute", duration: "Week 3-4", desc: "Campaign setup, tracking implementation, and launch.", deliverables: ["Campaign setup", "Pixel implementation", "Creative production"] },
  { step: "04", title: "Optimize & Scale", duration: "Ongoing", desc: "Continuous testing, refinement, and scaling.", deliverables: ["Weekly reports", "A/B test results", "Scaling recommendations"] },
];

const defaultFaqs = [
  { q: "How quickly can I expect results?", a: "Most clients see measurable improvements within 2-3 weeks." },
  { q: "What's the minimum ad budget?", a: "We recommend a minimum monthly ad spend of ₹1 lakh." },
  { q: "Do you work with specific industries only?", a: "We specialize in e-commerce, D2C, and B2B but work across industries." },
  { q: "How is PerformanceAura different?", a: "We focus on ROAS, implement server-side tracking, and provide full transparency." },
];

const defaultCaseStudies = [
  { industry: "E-Commerce — Fashion", brand: "StyleBox India", challenge: "High CAC and inconsistent ROAS below 1.5x.", solution: "Rebuilt campaign structure with Advantage+ Shopping.", timeline: "6 months", results: [{ metric: "ROAS", before: "1.4x", after: "3.2x" }, { metric: "CAC", before: "₹1,200", after: "₹650" }] },
];

const defaultSections = [
  { id: "hero", label: "Hero Section", visible: true },
  { id: "brands", label: "Brand Slider", visible: true },
  { id: "stats", label: "Statistics", visible: true },
  { id: "problems", label: "Problem Section", visible: true },
  { id: "solutions", label: "Solutions", visible: true },
  { id: "services", label: "Services", visible: true },
  { id: "process", label: "Process Steps", visible: true },
  { id: "founder", label: "Founder", visible: true },
  { id: "case-studies", label: "Case Studies", visible: true },
  { id: "testimonials", label: "Testimonials", visible: true },
  { id: "faq", label: "FAQ", visible: true },
  { id: "cta", label: "CTA Section", visible: true },
];

const animationOptions = [
  { value: "fade-up", label: "Fade Up (Default)" },
  { value: "fade-in", label: "Fade In" },
  { value: "slide-left", label: "Slide from Left" },
  { value: "slide-right", label: "Slide from Right" },
  { value: "scale", label: "Scale Up" },
  { value: "none", label: "No Animation" },
];

const AdminSettings = () => {
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

  // All section states
  const [hero, setHero] = useState({ title: "", titleHighlight: "", subtitle: "", cta_text: "", cta_link: "", badge: "", secondary_cta_text: "", secondary_cta_link: "" });
  const [stats, setStats] = useState<{ label: string; value: string }[]>([]);
  const [founder, setFounder] = useState({ name: "", title: "", quote: "", description: "", image_url: "", stats: [{ label: "", value: "" }] as { label: string; value: string }[] });
  const [services, setServices] = useState<{ title: string; slug: string; desc: string; icon: string }[]>([]);
  const [problems, setProblems] = useState<{ audience: string; headline: string; pain: string; stat: string }[]>([]);
  const [solutions, setSolutions] = useState<{ title: string; subtitle: string; points: string[]; result: string }[]>([]);
  const [process, setProcess] = useState<{ step: string; title: string; duration: string; desc: string; deliverables: string[] }[]>([]);
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [cta, setCta] = useState({ badge: "", title: "", subtitle: "", guarantee: "", button_text: "", button_link: "", phone: "" });
  const [brands, setBrands] = useState<string[]>([]);
  const [caseStudies, setCaseStudies] = useState<{ industry: string; brand: string; challenge: string; solution: string; timeline: string; results: { metric: string; before: string; after: string }[] }[]>([]);
  const [general, setGeneral] = useState({ logo_url: "", phone: "", email: "", address: "", facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "", footer_text: "" });
  const [colors, setColors] = useState({ primary_h: "249", primary_s: "68", primary_l: "29", accent_h: "14", accent_s: "100", accent_l: "57", primary_hex: "#1a0f5e", accent_hex: "#ff6b2b" });
  const [sections, setSections] = useState(defaultSections);
  const [sectionAnimations, setSectionAnimations] = useState<Record<string, string>>({});
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);

  // ─── Initialize with DEFAULTS when DB is empty ───
  useEffect(() => {
    if (!settings) return;
    
    const heroVal = settings.hero?.value;
    setHero({
      title: heroVal?.title || "Grow Your Brand",
      titleHighlight: heroVal?.titleHighlight || "Without Limits",
      subtitle: heroVal?.subtitle || "PerformanceAura crafts AI-driven marketing strategies that deliver measurable ROI.",
      cta_text: heroVal?.cta_text || "Get Free Consultation",
      cta_link: heroVal?.cta_link || "/contact",
      badge: heroVal?.badge || "AI-Powered Digital Marketing Agency",
      secondary_cta_text: heroVal?.secondary_cta_text || "Our Services",
      secondary_cta_link: heroVal?.secondary_cta_link || "/services",
    });

    setStats(settings.stats?.value?.items?.length ? settings.stats.value.items : [...defaultStats]);
    setServices(settings.services?.value?.items?.length ? settings.services.value.items : [...defaultServices]);
    setProblems(settings.problems?.value?.items?.length ? settings.problems.value.items : [...defaultProblems]);
    setSolutions(settings.solutions?.value?.items?.length ? settings.solutions.value.items : [...defaultSolutions]);
    setProcess(settings.process?.value?.items?.length ? settings.process.value.items : [...defaultProcess]);
    setFaqs(settings.faqs?.value?.items?.length ? settings.faqs.value.items : [...defaultFaqs]);
    setCaseStudies(settings.case_studies?.value?.items?.length ? settings.case_studies.value.items : [...defaultCaseStudies]);

    if (settings.founder?.value) {
      setFounder({ name: "", title: "", quote: "", description: "", image_url: "", stats: [], ...settings.founder.value });
    }
    if (settings.cta?.value) {
      setCta({ badge: "Limited: Only 5 strategy call slots left this month", title: "Stop Guessing.\nStart Growing.", subtitle: "Book a free 30-minute strategy call.", guarantee: "🔒 100% free. No commitment.", button_text: "Book Free Strategy Call", button_link: "/contact", phone: "+91-98765-43210", ...settings.cta.value });
    }
    if (settings.brands?.value?.items?.length) {
      setBrands(settings.brands.value.items);
    }
    if (settings.general?.value) {
      setGeneral({ logo_url: "", phone: "", email: "", address: "", facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "", footer_text: "", ...settings.general.value });
    }
    if (settings.colors?.value) {
      setColors({ primary_h: "249", primary_s: "68", primary_l: "29", accent_h: "14", accent_s: "100", accent_l: "57", primary_hex: "#1a0f5e", accent_hex: "#ff6b2b", ...settings.colors.value });
    }
    if (settings.homepage_sections?.value?.items?.length) {
      setSections(settings.homepage_sections.value.items);
    }
    if (settings.section_animations?.value) {
      setSectionAnimations(settings.section_animations.value);
    }
    if (settings.custom_sections?.value?.items?.length) {
      setCustomSections(settings.custom_sections.value.items);
    }
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
      toast({ title: "✅ Settings saved!" });
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

  // ─── Helpers ───
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100; s /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => { const k = (n + h / 30) % 12; const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * c).toString(16).padStart(2, '0'); };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    let r = parseInt(result[1], 16) / 255, g = parseInt(result[2], 16) / 255, b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
        case g: h = ((b - r) / d + 2) * 60; break;
        case b: h = ((r - g) / d + 4) * 60; break;
      }
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sections.length) return;
    const arr = [...sections];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setSections(arr);
  };

  if (isLoading) return <p className="text-muted-foreground">Loading settings...</p>;

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">🛠️ Website Settings</h1>
      <p className="text-muted-foreground mb-6 text-sm">Puri website ka content, sections, colors, animations — sab yahan se manage karein.</p>

      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-muted p-1 rounded-xl">
          {["sections", "custom-builder", "general", "hero", "stats", "services", "problems", "solutions", "process", "founder", "case-studies", "faq", "cta", "brands", "colors", "animations"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t.replace("-", " ")}</TabsTrigger>
          ))}
        </TabsList>

        {/* ═══ SECTIONS ═══ */}
        <TabsContent value="sections">
          <Section title="📑 Homepage Sections" desc="Sections ko show/hide karein aur order change karein. Drag to reorder.">
            <div className="space-y-2">
              {sections.map((sec, i) => (
                <div key={sec.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex flex-col gap-0.5">
                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => moveSection(i, -1)} disabled={i === 0}>
                      <ChevronUp size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => moveSection(i, 1)} disabled={i === sections.length - 1}>
                      <ChevronDown size={14} />
                    </Button>
                  </div>
                  <span className="text-sm font-medium text-foreground flex-1">{sec.label}</span>
                  <div className="flex items-center gap-2">
                    {sec.visible ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} className="text-muted-foreground" />}
                    <Switch checked={sec.visible} onCheckedChange={(checked) => {
                      const arr = [...sections];
                      arr[i].visible = checked;
                      setSections(arr);
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "homepage_sections", value: { items: sections } })} />
          </Section>
        </TabsContent>

        {/* ═══ GENERAL ═══ */}
        <TabsContent value="general">
          <Section title="🌐 General Settings" desc="Logo, contact info, social links, footer text">
            <ImageUpload value={general.logo_url} onChange={(url) => setGeneral({ ...general, logo_url: url })} folder="branding" label="Website Logo" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phone" value={general.phone} onChange={(v) => setGeneral({ ...general, phone: v })} />
              <Field label="Email" value={general.email} onChange={(v) => setGeneral({ ...general, email: v })} />
            </div>
            <Field label="Address" value={general.address} onChange={(v) => setGeneral({ ...general, address: v })} />
            <Textarea placeholder="Footer description text" value={general.footer_text} onChange={(e) => setGeneral({ ...general, footer_text: e.target.value })} rows={2} />
            <h3 className="font-semibold text-sm text-foreground mt-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(["facebook", "twitter", "instagram", "linkedin", "youtube"] as const).map((s) => (
                <Field key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} value={(general as any)[s]} onChange={(v) => setGeneral({ ...general, [s]: v })} placeholder={`https://${s}.com/...`} />
              ))}
            </div>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "general", value: general })} />
          </Section>
        </TabsContent>

        {/* ═══ HERO ═══ */}
        <TabsContent value="hero">
          <Section title="🏠 Hero Section" desc="Homepage ka sabse pehla section">
            <Field label="Badge Text" value={hero.badge} onChange={(v) => setHero({ ...hero, badge: v })} />
            <Field label="Main Heading" value={hero.title} onChange={(v) => setHero({ ...hero, title: v })} />
            <Field label="Highlighted Text (orange)" value={hero.titleHighlight} onChange={(v) => setHero({ ...hero, titleHighlight: v })} />
            <Textarea placeholder="Sub Heading / Description" value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Primary Button Text" value={hero.cta_text} onChange={(v) => setHero({ ...hero, cta_text: v })} />
              <Field label="Primary Button Link" value={hero.cta_link} onChange={(v) => setHero({ ...hero, cta_link: v })} />
              <Field label="Secondary Button Text" value={hero.secondary_cta_text} onChange={(v) => setHero({ ...hero, secondary_cta_text: v })} />
              <Field label="Secondary Button Link" value={hero.secondary_cta_link} onChange={(v) => setHero({ ...hero, secondary_cta_link: v })} />
            </div>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "hero", value: hero })} />
          </Section>
        </TabsContent>

        {/* ═══ STATS ═══ */}
        <TabsContent value="stats">
          <Section title="📊 Statistics" desc="Homepage par dikhne wale numbers — individually add/remove karein">
            {stats.map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Input placeholder="Value (e.g. 50+)" value={s.value} onChange={(e) => { const n = [...stats]; n[i] = { ...n[i], value: e.target.value }; setStats(n); }} className="flex-1" />
                <Input placeholder="Label (e.g. Clients Served)" value={s.label} onChange={(e) => { const n = [...stats]; n[i] = { ...n[i], label: e.target.value }; setStats(n); }} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => setStats(stats.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setStats([...stats, { label: "", value: "" }])}><Plus size={14} className="mr-1" /> Add Stat</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "stats", value: { items: stats } })} />
          </Section>
        </TabsContent>

        {/* ═══ SERVICES ═══ */}
        <TabsContent value="services">
          <Section title="🔧 Services" desc="Individually add, edit, ya delete karein — ek service add karne se baaki nahi jayengi">
            {services.map((s, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Service #{i + 1}: {s.title || "New"}</span>
                  <Button variant="ghost" size="icon" onClick={() => setServices(services.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Title (e.g. Meta Ads)" value={s.title} onChange={(e) => { const n = [...services]; n[i] = { ...n[i], title: e.target.value }; setServices(n); }} />
                  <Input placeholder="URL Slug (e.g. meta-ads)" value={s.slug} onChange={(e) => { const n = [...services]; n[i] = { ...n[i], slug: e.target.value }; setServices(n); }} />
                </div>
                <Textarea placeholder="Short description" value={s.desc} onChange={(e) => { const n = [...services]; n[i] = { ...n[i], desc: e.target.value }; setServices(n); }} rows={2} />
                <Input placeholder="Icon name (Target, BarChart3, Film, PenTool, Share2, Monitor, Star)" value={s.icon} onChange={(e) => { const n = [...services]; n[i] = { ...n[i], icon: e.target.value }; setServices(n); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setServices([...services, { title: "", slug: "", desc: "", icon: "Star" }])}><Plus size={14} className="mr-1" /> Add Service</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "services", value: { items: services } })} />
          </Section>
        </TabsContent>

        {/* ═══ PROBLEMS ═══ */}
        <TabsContent value="problems">
          <Section title="⚠️ Problem Section" desc="Customer pain points — add/remove individually">
            {problems.map((p, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Problem #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setProblems(problems.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <Input placeholder="Audience" value={p.audience} onChange={(e) => { const n = [...problems]; n[i] = { ...n[i], audience: e.target.value }; setProblems(n); }} />
                <Input placeholder="Headline" value={p.headline} onChange={(e) => { const n = [...problems]; n[i] = { ...n[i], headline: e.target.value }; setProblems(n); }} />
                <Textarea placeholder="Pain point" value={p.pain} onChange={(e) => { const n = [...problems]; n[i] = { ...n[i], pain: e.target.value }; setProblems(n); }} rows={2} />
                <Input placeholder="Statistic" value={p.stat} onChange={(e) => { const n = [...problems]; n[i] = { ...n[i], stat: e.target.value }; setProblems(n); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setProblems([...problems, { audience: "", headline: "", pain: "", stat: "" }])}><Plus size={14} className="mr-1" /> Add Problem</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "problems", value: { items: problems } })} />
          </Section>
        </TabsContent>

        {/* ═══ SOLUTIONS ═══ */}
        <TabsContent value="solutions">
          <Section title="✅ Solutions Section" desc="Solutions breakdown — individually manage">
            {solutions.map((s, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Solution #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setSolutions(solutions.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Title" value={s.title} onChange={(e) => { const n = [...solutions]; n[i] = { ...n[i], title: e.target.value }; setSolutions(n); }} />
                  <Input placeholder="Subtitle" value={s.subtitle} onChange={(e) => { const n = [...solutions]; n[i] = { ...n[i], subtitle: e.target.value }; setSolutions(n); }} />
                </div>
                <Textarea placeholder="Points (one per line)" value={s.points.join("\n")} onChange={(e) => { const n = [...solutions]; n[i] = { ...n[i], points: e.target.value.split("\n") }; setSolutions(n); }} rows={4} />
                <Input placeholder="Result text" value={s.result} onChange={(e) => { const n = [...solutions]; n[i] = { ...n[i], result: e.target.value }; setSolutions(n); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setSolutions([...solutions, { title: "", subtitle: "", points: [""], result: "" }])}><Plus size={14} className="mr-1" /> Add Solution</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "solutions", value: { items: solutions } })} />
          </Section>
        </TabsContent>

        {/* ═══ PROCESS ═══ */}
        <TabsContent value="process">
          <Section title="🔄 Process Section" desc="Step-by-step process">
            {process.map((p, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Step #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setProcess(process.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Step Number (01)" value={p.step} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], step: e.target.value }; setProcess(n); }} />
                  <Input placeholder="Title" value={p.title} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], title: e.target.value }; setProcess(n); }} />
                  <Input placeholder="Duration" value={p.duration} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], duration: e.target.value }; setProcess(n); }} />
                </div>
                <Textarea placeholder="Description" value={p.desc} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], desc: e.target.value }; setProcess(n); }} rows={2} />
                <Textarea placeholder="Deliverables (one per line)" value={p.deliverables.join("\n")} onChange={(e) => { const n = [...process]; n[i] = { ...n[i], deliverables: e.target.value.split("\n") }; setProcess(n); }} rows={3} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setProcess([...process, { step: `0${process.length + 1}`, title: "", duration: "", desc: "", deliverables: [""] }])}><Plus size={14} className="mr-1" /> Add Step</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "process", value: { items: process } })} />
          </Section>
        </TabsContent>

        {/* ═══ FOUNDER ═══ */}
        <TabsContent value="founder">
          <Section title="👤 Founder Section" desc="Founder details, photo, quote aur stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" value={founder.name} onChange={(v) => setFounder({ ...founder, name: v })} />
              <Field label="Title" value={founder.title} onChange={(v) => setFounder({ ...founder, title: v })} />
            </div>
            <Textarea placeholder="Quote" value={founder.quote} onChange={(e) => setFounder({ ...founder, quote: e.target.value })} rows={3} />
            <Textarea placeholder="Description / Bio" value={founder.description} onChange={(e) => setFounder({ ...founder, description: e.target.value })} rows={3} />
            <ImageUpload value={founder.image_url} onChange={(url) => setFounder({ ...founder, image_url: url })} folder="founder" label="Founder Photo" />
            <h3 className="font-semibold text-sm text-foreground">Founder Stats</h3>
            {(founder.stats || []).map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Input placeholder="Value" value={s.value} onChange={(e) => { const n = [...(founder.stats || [])]; n[i] = { ...n[i], value: e.target.value }; setFounder({ ...founder, stats: n }); }} className="flex-1" />
                <Input placeholder="Label" value={s.label} onChange={(e) => { const n = [...(founder.stats || [])]; n[i] = { ...n[i], label: e.target.value }; setFounder({ ...founder, stats: n }); }} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => setFounder({ ...founder, stats: (founder.stats || []).filter((_, j) => j !== i) })}><Trash2 size={14} className="text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setFounder({ ...founder, stats: [...(founder.stats || []), { label: "", value: "" }] })}><Plus size={14} className="mr-1" /> Add Stat</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "founder", value: founder })} />
          </Section>
        </TabsContent>

        {/* ═══ CASE STUDIES ═══ */}
        <TabsContent value="case-studies">
          <Section title="📈 Case Studies" desc="Client success stories">
            {caseStudies.map((cs, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Case Study #{i + 1}: {cs.brand || "New"}</span>
                  <Button variant="ghost" size="icon" onClick={() => setCaseStudies(caseStudies.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Brand Name" value={cs.brand} onChange={(e) => { const n = [...caseStudies]; n[i] = { ...n[i], brand: e.target.value }; setCaseStudies(n); }} />
                  <Input placeholder="Industry" value={cs.industry} onChange={(e) => { const n = [...caseStudies]; n[i] = { ...n[i], industry: e.target.value }; setCaseStudies(n); }} />
                  <Input placeholder="Timeline" value={cs.timeline} onChange={(e) => { const n = [...caseStudies]; n[i] = { ...n[i], timeline: e.target.value }; setCaseStudies(n); }} />
                </div>
                <Textarea placeholder="Challenge" value={cs.challenge} onChange={(e) => { const n = [...caseStudies]; n[i] = { ...n[i], challenge: e.target.value }; setCaseStudies(n); }} rows={2} />
                <Textarea placeholder="Solution" value={cs.solution} onChange={(e) => { const n = [...caseStudies]; n[i] = { ...n[i], solution: e.target.value }; setCaseStudies(n); }} rows={2} />
                <h4 className="text-xs font-semibold text-muted-foreground">Results (Metric → Before → After)</h4>
                {(cs.results || []).map((r, j) => (
                  <div key={j} className="flex gap-2 items-center">
                    <Input placeholder="Metric" value={r.metric} onChange={(e) => { const n = [...caseStudies]; const res = [...n[i].results]; res[j] = { ...res[j], metric: e.target.value }; n[i] = { ...n[i], results: res }; setCaseStudies(n); }} className="flex-1" />
                    <Input placeholder="Before" value={r.before} onChange={(e) => { const n = [...caseStudies]; const res = [...n[i].results]; res[j] = { ...res[j], before: e.target.value }; n[i] = { ...n[i], results: res }; setCaseStudies(n); }} className="w-24" />
                    <Input placeholder="After" value={r.after} onChange={(e) => { const n = [...caseStudies]; const res = [...n[i].results]; res[j] = { ...res[j], after: e.target.value }; n[i] = { ...n[i], results: res }; setCaseStudies(n); }} className="w-24" />
                    <Button variant="ghost" size="icon" onClick={() => { const n = [...caseStudies]; n[i] = { ...n[i], results: n[i].results.filter((_, k) => k !== j) }; setCaseStudies(n); }}><Trash2 size={12} className="text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => { const n = [...caseStudies]; n[i] = { ...n[i], results: [...(n[i].results || []), { metric: "", before: "", after: "" }] }; setCaseStudies(n); }}><Plus size={12} className="mr-1" /> Add Result</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setCaseStudies([...caseStudies, { industry: "", brand: "", challenge: "", solution: "", timeline: "", results: [] }])}><Plus size={14} className="mr-1" /> Add Case Study</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "case_studies", value: { items: caseStudies } })} />
          </Section>
        </TabsContent>

        {/* ═══ FAQ ═══ */}
        <TabsContent value="faq">
          <Section title="❓ FAQ Section" desc="Add, edit, delete individually">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">FAQ #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <Input placeholder="Question" value={f.q} onChange={(e) => { const n = [...faqs]; n[i] = { ...n[i], q: e.target.value }; setFaqs(n); }} />
                <Textarea placeholder="Answer" value={f.a} onChange={(e) => { const n = [...faqs]; n[i] = { ...n[i], a: e.target.value }; setFaqs(n); }} rows={3} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setFaqs([...faqs, { q: "", a: "" }])}><Plus size={14} className="mr-1" /> Add FAQ</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "faqs", value: { items: faqs } })} />
          </Section>
        </TabsContent>

        {/* ═══ CTA ═══ */}
        <TabsContent value="cta">
          <Section title="📢 CTA Section" desc="Bottom call-to-action">
            <Field label="Badge Text" value={cta.badge} onChange={(v) => setCta({ ...cta, badge: v })} />
            <Field label="Heading" value={cta.title} onChange={(v) => setCta({ ...cta, title: v })} />
            <Textarea placeholder="Description" value={cta.subtitle} onChange={(e) => setCta({ ...cta, subtitle: e.target.value })} rows={2} />
            <Field label="Guarantee Text" value={cta.guarantee} onChange={(v) => setCta({ ...cta, guarantee: v })} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Button Text" value={cta.button_text} onChange={(v) => setCta({ ...cta, button_text: v })} />
              <Field label="Button Link" value={cta.button_link} onChange={(v) => setCta({ ...cta, button_link: v })} />
            </div>
            <Field label="Phone Number" value={cta.phone} onChange={(v) => setCta({ ...cta, phone: v })} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "cta", value: cta })} />
          </Section>
        </TabsContent>

        {/* ═══ BRANDS ═══ */}
        <TabsContent value="brands">
          <Section title="🏢 Brand Slider" desc="Trusted brands — ek line mein ek brand">
            <Textarea placeholder="Brand names (one per line)" value={brands.join("\n")} onChange={(e) => setBrands(e.target.value.split("\n"))} rows={8} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "brands", value: { items: brands.filter(b => b.trim()) } })} />
          </Section>
        </TabsContent>

        {/* ═══ COLORS ═══ */}
        <TabsContent value="colors">
          <Section title="🎨 Colors & Branding" desc="Primary aur accent colors — hex ya HSL se change karein">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div className="space-y-3 p-4 rounded-xl border border-border">
                <h3 className="font-semibold text-sm">Primary Color (Main Brand)</h3>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={hslToHex(Number(colors.primary_h), Number(colors.primary_s), Number(colors.primary_l))}
                    onChange={(e) => {
                      const hsl = hexToHsl(e.target.value);
                      if (hsl) setColors({ ...colors, primary_h: String(hsl.h), primary_s: String(hsl.s), primary_l: String(hsl.l), primary_hex: e.target.value });
                    }}
                    className="w-16 h-12 rounded-lg cursor-pointer border border-border"
                  />
                  <Input
                    placeholder="#1a0f5e"
                    value={hslToHex(Number(colors.primary_h), Number(colors.primary_s), Number(colors.primary_l))}
                    onChange={(e) => {
                      const hsl = hexToHsl(e.target.value);
                      if (hsl) setColors({ ...colors, primary_h: String(hsl.h), primary_s: String(hsl.s), primary_l: String(hsl.l), primary_hex: e.target.value });
                    }}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1"><label className="text-xs text-muted-foreground">H</label><Input type="number" min="0" max="360" value={colors.primary_h} onChange={(e) => setColors({ ...colors, primary_h: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">S%</label><Input type="number" min="0" max="100" value={colors.primary_s} onChange={(e) => setColors({ ...colors, primary_s: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">L%</label><Input type="number" min="0" max="100" value={colors.primary_l} onChange={(e) => setColors({ ...colors, primary_l: e.target.value })} /></div>
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-3 p-4 rounded-xl border border-border">
                <h3 className="font-semibold text-sm">Accent Color (Buttons, Highlights)</h3>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={hslToHex(Number(colors.accent_h), Number(colors.accent_s), Number(colors.accent_l))}
                    onChange={(e) => {
                      const hsl = hexToHsl(e.target.value);
                      if (hsl) setColors({ ...colors, accent_h: String(hsl.h), accent_s: String(hsl.s), accent_l: String(hsl.l), accent_hex: e.target.value });
                    }}
                    className="w-16 h-12 rounded-lg cursor-pointer border border-border"
                  />
                  <Input
                    placeholder="#ff6b2b"
                    value={hslToHex(Number(colors.accent_h), Number(colors.accent_s), Number(colors.accent_l))}
                    onChange={(e) => {
                      const hsl = hexToHsl(e.target.value);
                      if (hsl) setColors({ ...colors, accent_h: String(hsl.h), accent_s: String(hsl.s), accent_l: String(hsl.l), accent_hex: e.target.value });
                    }}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1"><label className="text-xs text-muted-foreground">H</label><Input type="number" min="0" max="360" value={colors.accent_h} onChange={(e) => setColors({ ...colors, accent_h: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">S%</label><Input type="number" min="0" max="100" value={colors.accent_s} onChange={(e) => setColors({ ...colors, accent_s: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">L%</label><Input type="number" min="0" max="100" value={colors.accent_l} onChange={(e) => setColors({ ...colors, accent_l: e.target.value })} /></div>
                </div>
              </div>
            </div>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "colors", value: colors })} />
          </Section>
        </TabsContent>

        {/* ═══ ANIMATIONS ═══ */}
        <TabsContent value="animations">
          <Section title="✨ Section Animations" desc="Har section ka animation type select karein">
            <div className="space-y-3">
              {sections.map((sec) => (
                <div key={sec.id} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-muted/30">
                  <span className="text-sm font-medium text-foreground flex-1">{sec.label}</span>
                  <Select value={sectionAnimations[sec.id] || "fade-up"} onValueChange={(val) => setSectionAnimations({ ...sectionAnimations, [sec.id]: val })}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {animationOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "section_animations", value: sectionAnimations })} />
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper components
const Section = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
  <div className="p-6 rounded-xl border border-border bg-card space-y-4">
    <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
    <p className="text-sm text-muted-foreground">{desc}</p>
    {children}
  </div>
);

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || label} />
  </div>
);

export default AdminSettings;
