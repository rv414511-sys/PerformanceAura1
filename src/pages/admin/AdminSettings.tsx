import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [hero, setHero] = useState({ title: "", subtitle: "", cta_text: "", cta_link: "", badge: "", secondary_cta_text: "", secondary_cta_link: "" });
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
  const [colors, setColors] = useState({ primary_h: "249", primary_s: "68", primary_l: "29", accent_h: "14", accent_s: "100", accent_l: "57" });

  useEffect(() => {
    if (!settings) return;
    if (settings.hero) setHero({ title: "", subtitle: "", cta_text: "", cta_link: "", badge: "", secondary_cta_text: "", secondary_cta_link: "", ...settings.hero.value });
    if (settings.stats) setStats(settings.stats.value?.items || []);
    if (settings.founder) setFounder({ name: "", title: "", quote: "", description: "", image_url: "", stats: [], ...settings.founder.value });
    if (settings.services) setServices(settings.services.value?.items || []);
    if (settings.problems) setProblems(settings.problems.value?.items || []);
    if (settings.solutions) setSolutions(settings.solutions.value?.items || []);
    if (settings.process) setProcess(settings.process.value?.items || []);
    if (settings.faqs) setFaqs(settings.faqs.value?.items || []);
    if (settings.cta) setCta({ badge: "", title: "", subtitle: "", guarantee: "", button_text: "", button_link: "", phone: "", ...settings.cta.value });
    if (settings.brands) setBrands(settings.brands.value?.items || []);
    if (settings.case_studies) setCaseStudies(settings.case_studies.value?.items || []);
    if (settings.general) setGeneral({ logo_url: "", phone: "", email: "", address: "", facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "", footer_text: "", ...settings.general.value });
    if (settings.colors) setColors({ primary_h: "249", primary_s: "68", primary_l: "29", accent_h: "14", accent_s: "100", accent_l: "57", ...settings.colors.value });
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
      toast({ title: "✅ Settings saved successfully!" });
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

  if (isLoading) return <p className="text-muted-foreground">Loading settings...</p>;

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">🛠️ Website Settings</h1>
      <p className="text-muted-foreground mb-6">Yahan se aap puri website ka content manage kar sakte hain — text, images, sections, colors sab kuchh.</p>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-muted p-1 rounded-xl">
          {["general", "hero", "stats", "services", "problems", "solutions", "process", "founder", "case-studies", "faq", "cta", "brands", "colors"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t.replace("-", " ")}</TabsTrigger>
          ))}
        </TabsList>

        {/* GENERAL */}
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

        {/* HERO */}
        <TabsContent value="hero">
          <Section title="🏠 Hero Section" desc="Homepage ka sabse pehla section — heading, description, buttons">
            <Field label="Badge Text" value={hero.badge} onChange={(v) => setHero({ ...hero, badge: v })} placeholder="e.g. AI-Powered Digital Marketing Agency" />
            <Field label="Main Heading" value={hero.title} onChange={(v) => setHero({ ...hero, title: v })} placeholder="e.g. Grow Your Brand Without Limits" />
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

        {/* STATS */}
        <TabsContent value="stats">
          <Section title="📊 Statistics" desc="Homepage par dikhne wale numbers">
            {stats.map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Input placeholder="Value (e.g. 50+)" value={s.value} onChange={(e) => { const n = [...stats]; n[i].value = e.target.value; setStats(n); }} className="flex-1" />
                <Input placeholder="Label (e.g. Clients Served)" value={s.label} onChange={(e) => { const n = [...stats]; n[i].label = e.target.value; setStats(n); }} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => setStats(stats.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setStats([...stats, { label: "", value: "" }])}><Plus size={14} className="mr-1" /> Add Stat</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "stats", value: { items: stats } })} />
          </Section>
        </TabsContent>

        {/* SERVICES */}
        <TabsContent value="services">
          <Section title="🔧 Services" desc="Homepage aur services page par dikhne wali services — add, edit, delete">
            {services.map((s, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Service #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setServices(services.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Title (e.g. Meta Ads)" value={s.title} onChange={(e) => { const n = [...services]; n[i].title = e.target.value; setServices(n); }} />
                  <Input placeholder="URL Slug (e.g. meta-ads)" value={s.slug} onChange={(e) => { const n = [...services]; n[i].slug = e.target.value; setServices(n); }} />
                </div>
                <Textarea placeholder="Short description" value={s.desc} onChange={(e) => { const n = [...services]; n[i].desc = e.target.value; setServices(n); }} rows={2} />
                <Input placeholder="Icon name (e.g. Target, BarChart3, Film)" value={s.icon} onChange={(e) => { const n = [...services]; n[i].icon = e.target.value; setServices(n); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setServices([...services, { title: "", slug: "", desc: "", icon: "Star" }])}><Plus size={14} className="mr-1" /> Add Service</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "services", value: { items: services } })} />
          </Section>
        </TabsContent>

        {/* PROBLEMS */}
        <TabsContent value="problems">
          <Section title="⚠️ Problem Section" desc="Customer ke problems / pain points">
            {problems.map((p, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Problem #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setProblems(problems.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <Input placeholder="Audience (e.g. E-Commerce Brands)" value={p.audience} onChange={(e) => { const n = [...problems]; n[i].audience = e.target.value; setProblems(n); }} />
                <Input placeholder="Headline" value={p.headline} onChange={(e) => { const n = [...problems]; n[i].headline = e.target.value; setProblems(n); }} />
                <Textarea placeholder="Pain point description" value={p.pain} onChange={(e) => { const n = [...problems]; n[i].pain = e.target.value; setProblems(n); }} rows={2} />
                <Input placeholder="Statistic" value={p.stat} onChange={(e) => { const n = [...problems]; n[i].stat = e.target.value; setProblems(n); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setProblems([...problems, { audience: "", headline: "", pain: "", stat: "" }])}><Plus size={14} className="mr-1" /> Add Problem</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "problems", value: { items: problems } })} />
          </Section>
        </TabsContent>

        {/* SOLUTIONS */}
        <TabsContent value="solutions">
          <Section title="✅ Solutions Section" desc="Aapke solutions / services breakdown">
            {solutions.map((s, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Solution #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setSolutions(solutions.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Title" value={s.title} onChange={(e) => { const n = [...solutions]; n[i].title = e.target.value; setSolutions(n); }} />
                  <Input placeholder="Subtitle" value={s.subtitle} onChange={(e) => { const n = [...solutions]; n[i].subtitle = e.target.value; setSolutions(n); }} />
                </div>
                <Textarea placeholder="Points (one per line)" value={s.points.join("\n")} onChange={(e) => { const n = [...solutions]; n[i].points = e.target.value.split("\n"); setSolutions(n); }} rows={4} />
                <Input placeholder="Result text" value={s.result} onChange={(e) => { const n = [...solutions]; n[i].result = e.target.value; setSolutions(n); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setSolutions([...solutions, { title: "", subtitle: "", points: [""], result: "" }])}><Plus size={14} className="mr-1" /> Add Solution</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "solutions", value: { items: solutions } })} />
          </Section>
        </TabsContent>

        {/* PROCESS */}
        <TabsContent value="process">
          <Section title="🔄 Process Section" desc="Step-by-step process / how it works">
            {process.map((p, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Step #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setProcess(process.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Step Number (01)" value={p.step} onChange={(e) => { const n = [...process]; n[i].step = e.target.value; setProcess(n); }} />
                  <Input placeholder="Title" value={p.title} onChange={(e) => { const n = [...process]; n[i].title = e.target.value; setProcess(n); }} />
                  <Input placeholder="Duration (Week 1)" value={p.duration} onChange={(e) => { const n = [...process]; n[i].duration = e.target.value; setProcess(n); }} />
                </div>
                <Textarea placeholder="Description" value={p.desc} onChange={(e) => { const n = [...process]; n[i].desc = e.target.value; setProcess(n); }} rows={2} />
                <Textarea placeholder="Deliverables (one per line)" value={p.deliverables.join("\n")} onChange={(e) => { const n = [...process]; n[i].deliverables = e.target.value.split("\n"); setProcess(n); }} rows={3} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setProcess([...process, { step: `0${process.length + 1}`, title: "", duration: "", desc: "", deliverables: [""] }])}><Plus size={14} className="mr-1" /> Add Step</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "process", value: { items: process } })} />
          </Section>
        </TabsContent>

        {/* FOUNDER */}
        <TabsContent value="founder">
          <Section title="👤 Founder Section" desc="Founder ki details, photo, quote aur stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name" value={founder.name} onChange={(v) => setFounder({ ...founder, name: v })} />
              <Field label="Title" value={founder.title} onChange={(v) => setFounder({ ...founder, title: v })} />
            </div>
            <Textarea placeholder="Quote (italics mein dikhega)" value={founder.quote} onChange={(e) => setFounder({ ...founder, quote: e.target.value })} rows={3} />
            <Textarea placeholder="Description / Bio" value={founder.description} onChange={(e) => setFounder({ ...founder, description: e.target.value })} rows={3} />
            <ImageUpload value={founder.image_url} onChange={(url) => setFounder({ ...founder, image_url: url })} folder="founder" label="Founder Photo" />
            <h3 className="font-semibold text-sm text-foreground">Founder Stats</h3>
            {(founder.stats || []).map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Input placeholder="Value (e.g. 5+)" value={s.value} onChange={(e) => { const n = [...(founder.stats || [])]; n[i].value = e.target.value; setFounder({ ...founder, stats: n }); }} className="flex-1" />
                <Input placeholder="Label (e.g. Years Experience)" value={s.label} onChange={(e) => { const n = [...(founder.stats || [])]; n[i].label = e.target.value; setFounder({ ...founder, stats: n }); }} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => setFounder({ ...founder, stats: (founder.stats || []).filter((_, j) => j !== i) })}><Trash2 size={14} className="text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setFounder({ ...founder, stats: [...(founder.stats || []), { label: "", value: "" }] })}><Plus size={14} className="mr-1" /> Add Stat</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "founder", value: founder })} />
          </Section>
        </TabsContent>

        {/* CASE STUDIES */}
        <TabsContent value="case-studies">
          <Section title="📈 Case Studies" desc="Client success stories with before/after results">
            {caseStudies.map((cs, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Case Study #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setCaseStudies(caseStudies.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Brand Name" value={cs.brand} onChange={(e) => { const n = [...caseStudies]; n[i].brand = e.target.value; setCaseStudies(n); }} />
                  <Input placeholder="Industry" value={cs.industry} onChange={(e) => { const n = [...caseStudies]; n[i].industry = e.target.value; setCaseStudies(n); }} />
                  <Input placeholder="Timeline" value={cs.timeline} onChange={(e) => { const n = [...caseStudies]; n[i].timeline = e.target.value; setCaseStudies(n); }} />
                </div>
                <Textarea placeholder="Challenge" value={cs.challenge} onChange={(e) => { const n = [...caseStudies]; n[i].challenge = e.target.value; setCaseStudies(n); }} rows={2} />
                <Textarea placeholder="Solution" value={cs.solution} onChange={(e) => { const n = [...caseStudies]; n[i].solution = e.target.value; setCaseStudies(n); }} rows={2} />
                <h4 className="text-xs font-semibold text-muted-foreground">Results (Metric → Before → After)</h4>
                {(cs.results || []).map((r, j) => (
                  <div key={j} className="flex gap-2 items-center">
                    <Input placeholder="Metric" value={r.metric} onChange={(e) => { const n = [...caseStudies]; n[i].results[j].metric = e.target.value; setCaseStudies(n); }} className="flex-1" />
                    <Input placeholder="Before" value={r.before} onChange={(e) => { const n = [...caseStudies]; n[i].results[j].before = e.target.value; setCaseStudies(n); }} className="w-24" />
                    <Input placeholder="After" value={r.after} onChange={(e) => { const n = [...caseStudies]; n[i].results[j].after = e.target.value; setCaseStudies(n); }} className="w-24" />
                    <Button variant="ghost" size="icon" onClick={() => { const n = [...caseStudies]; n[i].results = n[i].results.filter((_, k) => k !== j); setCaseStudies(n); }}><Trash2 size={12} className="text-destructive" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => { const n = [...caseStudies]; n[i].results = [...(n[i].results || []), { metric: "", before: "", after: "" }]; setCaseStudies(n); }}><Plus size={12} className="mr-1" /> Add Result</Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setCaseStudies([...caseStudies, { industry: "", brand: "", challenge: "", solution: "", timeline: "", results: [] }])}><Plus size={14} className="mr-1" /> Add Case Study</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "case_studies", value: { items: caseStudies } })} />
          </Section>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq">
          <Section title="❓ FAQ Section" desc="Frequently Asked Questions — add, edit, delete">
            {faqs.map((f, i) => (
              <div key={i} className="p-4 border border-border rounded-xl space-y-3 bg-muted/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">FAQ #{i + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <Input placeholder="Question" value={f.q} onChange={(e) => { const n = [...faqs]; n[i].q = e.target.value; setFaqs(n); }} />
                <Textarea placeholder="Answer" value={f.a} onChange={(e) => { const n = [...faqs]; n[i].a = e.target.value; setFaqs(n); }} rows={3} />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setFaqs([...faqs, { q: "", a: "" }])}><Plus size={14} className="mr-1" /> Add FAQ</Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "faqs", value: { items: faqs } })} />
          </Section>
        </TabsContent>

        {/* CTA */}
        <TabsContent value="cta">
          <Section title="📢 CTA Section" desc="Bottom call-to-action section">
            <Field label="Badge Text" value={cta.badge} onChange={(v) => setCta({ ...cta, badge: v })} placeholder="e.g. Limited: Only 5 slots left" />
            <Field label="Heading" value={cta.title} onChange={(v) => setCta({ ...cta, title: v })} />
            <Textarea placeholder="Description" value={cta.subtitle} onChange={(e) => setCta({ ...cta, subtitle: e.target.value })} rows={2} />
            <Field label="Guarantee Text" value={cta.guarantee} onChange={(v) => setCta({ ...cta, guarantee: v })} placeholder="e.g. 100% free. No commitment." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Button Text" value={cta.button_text} onChange={(v) => setCta({ ...cta, button_text: v })} />
              <Field label="Button Link" value={cta.button_link} onChange={(v) => setCta({ ...cta, button_link: v })} />
            </div>
            <Field label="Phone Number" value={cta.phone} onChange={(v) => setCta({ ...cta, phone: v })} />
            <SaveBtn onClick={() => saveMutation.mutate({ key: "cta", value: cta })} />
          </Section>
        </TabsContent>

        {/* BRANDS */}
        <TabsContent value="brands">
          <Section title="🏢 Brand Slider" desc="Trusted brands ki list — names ya logos">
            <Textarea
              placeholder="Brand names (one per line)"
              value={brands.join("\n")}
              onChange={(e) => setBrands(e.target.value.split("\n"))}
              rows={8}
            />
            <p className="text-xs text-muted-foreground">Har line mein ek brand ka naam likhein</p>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "brands", value: { items: brands.filter(b => b.trim()) } })} />
          </Section>
        </TabsContent>

        {/* COLORS */}
        <TabsContent value="colors">
          <Section title="🎨 Colors & Branding" desc="Website ke primary aur accent colors change karein">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Primary Color (Main Brand Color)</h3>
                <div className="flex gap-3 items-end">
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Hue</label><Input type="number" min="0" max="360" value={colors.primary_h} onChange={(e) => setColors({ ...colors, primary_h: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Saturation %</label><Input type="number" min="0" max="100" value={colors.primary_s} onChange={(e) => setColors({ ...colors, primary_s: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Lightness %</label><Input type="number" min="0" max="100" value={colors.primary_l} onChange={(e) => setColors({ ...colors, primary_l: e.target.value })} /></div>
                </div>
                <div className="h-12 rounded-lg border" style={{ background: `hsl(${colors.primary_h}, ${colors.primary_s}%, ${colors.primary_l}%)` }} />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Accent Color (Buttons, Highlights)</h3>
                <div className="flex gap-3 items-end">
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Hue</label><Input type="number" min="0" max="360" value={colors.accent_h} onChange={(e) => setColors({ ...colors, accent_h: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Saturation %</label><Input type="number" min="0" max="100" value={colors.accent_s} onChange={(e) => setColors({ ...colors, accent_s: e.target.value })} /></div>
                  <div className="flex-1"><label className="text-xs text-muted-foreground">Lightness %</label><Input type="number" min="0" max="100" value={colors.accent_l} onChange={(e) => setColors({ ...colors, accent_l: e.target.value })} /></div>
                </div>
                <div className="h-12 rounded-lg border" style={{ background: `hsl(${colors.accent_h}, ${colors.accent_s}%, ${colors.accent_l}%)` }} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">💡 Tip: HSL color picker use karein — Google mein "HSL color picker" search karein values pata karne ke liye.</p>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "colors", value: colors })} />
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
