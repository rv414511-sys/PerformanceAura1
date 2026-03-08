import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

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

  // Hero settings
  const [hero, setHero] = useState({ title: "", subtitle: "", cta_text: "", cta_link: "", image_url: "" });
  // Stats settings
  const [stats, setStats] = useState<{ label: string; value: string }[]>([]);
  // Founder settings
  const [founder, setFounder] = useState({ name: "", title: "", description: "", image_url: "" });

  useEffect(() => {
    if (settings) {
      if (settings.hero) setHero({ title: "", subtitle: "", cta_text: "", cta_link: "", image_url: "", ...settings.hero.value });
      if (settings.stats) setStats(settings.stats.value?.items || []);
      if (settings.founder) setFounder({ name: "", title: "", description: "", image_url: "", ...settings.founder.value });
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
      toast({ title: "Settings saved!" });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading settings...</p>;

  return (
    <div className="space-y-10 max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-foreground">Website Settings</h1>

      {/* HERO SECTION */}
      <section className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">🏠 Hero Section</h2>
        <p className="text-sm text-muted-foreground">Homepage ke top section ka content yahan se change karein</p>
        <Input placeholder="Main Heading" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
        <Textarea placeholder="Sub Heading / Description" value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Button Text (e.g. Book Free Consultation)" value={hero.cta_text} onChange={(e) => setHero({ ...hero, cta_text: e.target.value })} />
          <Input placeholder="Button Link (e.g. /contact)" value={hero.cta_link} onChange={(e) => setHero({ ...hero, cta_link: e.target.value })} />
        </div>
        <ImageUpload value={hero.image_url} onChange={(url) => setHero({ ...hero, image_url: url })} folder="hero" label="Hero Background Image" />
        <Button onClick={() => saveMutation.mutate({ key: "hero", value: hero })} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Save size={14} className="mr-1" />} Save Hero
        </Button>
      </section>

      {/* STATS SECTION */}
      <section className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">📊 Statistics</h2>
        <p className="text-sm text-muted-foreground">Homepage par dikhne wale numbers yahan se update karein</p>
        {stats.map((s, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Input placeholder="Label (e.g. Ad Spend Managed)" value={s.label} onChange={(e) => { const n = [...stats]; n[i].label = e.target.value; setStats(n); }} />
            <Input placeholder="Value (e.g. ₹1Cr+)" value={s.value} onChange={(e) => { const n = [...stats]; n[i].value = e.target.value; setStats(n); }} />
          </div>
        ))}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setStats([...stats, { label: "", value: "" }])}>+ Add Stat</Button>
          {stats.length > 0 && <Button variant="outline" size="sm" onClick={() => setStats(stats.slice(0, -1))}>Remove Last</Button>}
        </div>
        <Button onClick={() => saveMutation.mutate({ key: "stats", value: { items: stats } })} disabled={saveMutation.isPending}>
          <Save size={14} className="mr-1" /> Save Stats
        </Button>
      </section>

      {/* FOUNDER SECTION */}
      <section className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-display text-lg font-bold text-foreground">👤 Founder Info</h2>
        <p className="text-sm text-muted-foreground">Founder ki details aur image yahan se update karein</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Name" value={founder.name} onChange={(e) => setFounder({ ...founder, name: e.target.value })} />
          <Input placeholder="Title (e.g. Founder & CEO)" value={founder.title} onChange={(e) => setFounder({ ...founder, title: e.target.value })} />
        </div>
        <Textarea placeholder="Short bio / description" value={founder.description} onChange={(e) => setFounder({ ...founder, description: e.target.value })} rows={3} />
        <ImageUpload value={founder.image_url} onChange={(url) => setFounder({ ...founder, image_url: url })} folder="founder" label="Founder Photo" />
        <Button onClick={() => saveMutation.mutate({ key: "founder", value: founder })} disabled={saveMutation.isPending}>
          <Save size={14} className="mr-1" /> Save Founder
        </Button>
      </section>
    </div>
  );
};

export default AdminSettings;
