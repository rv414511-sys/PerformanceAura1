import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Loader2, Plus, Trash2, ChevronUp, ChevronDown, Bell, Gift, Video, Star, Image as ImageIcon, Type, Layout, Layers, Palette, Sparkles, MonitorPlay, SlidersHorizontal, Box } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import ContainerEditor from "@/components/admin/ContainerEditor";

// ─── Types ───
interface PopupConfig {
  id: string;
  name: string;
  type: "welcome" | "offer" | "discount" | "signup" | "lead-magnet" | "messenger" | "custom";
  trigger: "on-load" | "on-scroll" | "on-click" | "after-delay";
  delay: number; // seconds
  scrollPercent: number;
  enabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
  textColor: string;
  position: "center" | "bottom-right" | "bottom-left" | "top-right" | "full-screen";
}

interface OfferBanner {
  id: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
  textColor: string;
  enabled: boolean;
  position: "top" | "bottom";
  closeable: boolean;
}

interface VideoTestimonial {
  id: string;
  name: string;
  company: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  quote: string;
  rating: number;
  enabled: boolean;
}

interface SlideItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  overlay: boolean;
  overlayColor: string;
}

interface NotificationItem {
  id: string;
  text: string;
  icon: string;
  link: string;
  enabled: boolean;
  type: "info" | "success" | "warning" | "offer";
}

const genId = () => Math.random().toString(36).slice(2, 10);

const newPopup = (): PopupConfig => ({
  id: genId(), name: "New Popup", type: "welcome", trigger: "on-load",
  delay: 3, scrollPercent: 50, enabled: true, title: "Welcome!", message: "Get 20% off on your first order!",
  buttonText: "Claim Now", buttonLink: "/contact", image: "", bgColor: "#27187E", textColor: "#F7F7FF",
  position: "center",
});

const newBanner = (): OfferBanner => ({
  id: genId(), text: "🔥 Limited Time Offer - Get 30% OFF!", buttonText: "Shop Now",
  buttonLink: "/contact", bgColor: "#27187E", textColor: "#F7F7FF", enabled: true,
  position: "top", closeable: true,
});

const newVideoTestimonial = (): VideoTestimonial => ({
  id: genId(), name: "", company: "", youtubeUrl: "", thumbnailUrl: "",
  quote: "", rating: 5, enabled: true,
});

const newSlide = (): SlideItem => ({
  id: genId(), image: "", title: "", subtitle: "", buttonText: "",
  buttonLink: "", overlay: true, overlayColor: "rgba(0,0,0,0.4)",
});

const newNotification = (): NotificationItem => ({
  id: genId(), text: "", icon: "🔔", link: "", enabled: true, type: "info",
});

// ─── Reusable section wrapper ───
const Section = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
    {children}
  </div>
);

const AdminElementorPro = () => {
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

  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [banners, setBanners] = useState<OfferBanner[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [globalStyles, setGlobalStyles] = useState({
    fontFamily: "Inter", headingFont: "Space Grotesk",
    borderRadius: "12", containerMaxWidth: "1280",
    shadowIntensity: "medium", animationSpeed: "normal",
  });

  useEffect(() => {
    if (!settings) return;
    if (settings.elementor_popups?.value?.items) setPopups(settings.elementor_popups.value.items);
    if (settings.elementor_banners?.value?.items) setBanners(settings.elementor_banners.value.items);
    if (settings.elementor_video_testimonials?.value?.items) setVideoTestimonials(settings.elementor_video_testimonials.value.items);
    if (settings.elementor_slides?.value?.items) setSlides(settings.elementor_slides.value.items);
    if (settings.elementor_notifications?.value?.items) setNotifications(settings.elementor_notifications.value.items);
    if (settings.elementor_global_styles?.value) setGlobalStyles(prev => ({ ...prev, ...settings.elementor_global_styles.value }));
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
      toast({ title: "✅ Saved successfully!" });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const SaveBtn = ({ onClick }: { onClick: () => void }) => (
    <Button onClick={onClick} disabled={saveMutation.isPending} className="mt-3">
      {saveMutation.isPending ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Save size={14} className="mr-1" />} Save
    </Button>
  );

  const moveItem = <T,>(arr: T[], idx: number, dir: -1 | 1): T[] => {
    const ni = idx + dir;
    if (ni < 0 || ni >= arr.length) return arr;
    const newArr = [...arr];
    [newArr[idx], newArr[ni]] = [newArr[ni], newArr[idx]];
    return newArr;
  };

  if (isLoading) return <p className="text-muted-foreground">Loading Elementor Pro...</p>;

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">⚡ Elementor Pro</h1>
          <p className="text-sm text-muted-foreground">Advanced website builder — popups, banners, videos, slides, notifications sab manage karein.</p>
        </div>
      </div>

      <Tabs defaultValue="popups" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-muted p-1 rounded-xl">
          <TabsTrigger value="popups" className="text-xs"><Bell size={12} className="mr-1" /> Popups</TabsTrigger>
          <TabsTrigger value="banners" className="text-xs"><Gift size={12} className="mr-1" /> Offer Banners</TabsTrigger>
          <TabsTrigger value="video-testimonials" className="text-xs"><Video size={12} className="mr-1" /> Video Reviews</TabsTrigger>
          <TabsTrigger value="slides" className="text-xs"><MonitorPlay size={12} className="mr-1" /> Image Slider</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs"><Bell size={12} className="mr-1" /> Notifications</TabsTrigger>
          <TabsTrigger value="global-styles" className="text-xs"><Palette size={12} className="mr-1" /> Global Styles</TabsTrigger>
          <TabsTrigger value="containers" className="text-xs"><Box size={12} className="mr-1" /> Container Editor</TabsTrigger>
        </TabsList>

        {/* ═══ POPUPS ═══ */}
        <TabsContent value="popups">
          <Section title="🪟 Popup Builder" desc="Welcome, discount, signup, lead-magnet, messenger popups banayein. Trigger set karein — page load, scroll, delay.">
            {popups.map((popup, i) => (
              <div key={popup.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setPopups(moveItem(popups, i, -1))} disabled={i === 0}><ChevronUp size={12} /></Button>
                    <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setPopups(moveItem(popups, i, 1))} disabled={i === popups.length - 1}><ChevronDown size={12} /></Button>
                  </div>
                  <span className="text-sm font-semibold flex-1">{popup.name || "Untitled Popup"}</span>
                  <Switch checked={popup.enabled} onCheckedChange={(v) => { const arr = [...popups]; arr[i].enabled = v; setPopups(arr); }} />
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPopups(popups.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Name</label>
                    <Input value={popup.name} onChange={(e) => { const arr = [...popups]; arr[i].name = e.target.value; setPopups(arr); }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Type</label>
                    <Select value={popup.type} onValueChange={(v) => { const arr = [...popups]; arr[i].type = v as any; setPopups(arr); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["welcome", "offer", "discount", "signup", "lead-magnet", "messenger", "custom"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Trigger</label>
                    <Select value={popup.trigger} onValueChange={(v) => { const arr = [...popups]; arr[i].trigger = v as any; setPopups(arr); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-load">On Page Load</SelectItem>
                        <SelectItem value="on-scroll">On Scroll</SelectItem>
                        <SelectItem value="on-click">On Button Click</SelectItem>
                        <SelectItem value="after-delay">After Delay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {popup.trigger === "after-delay" && (
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">Delay (seconds)</label>
                    <Input type="number" className="w-24" value={popup.delay} onChange={(e) => { const arr = [...popups]; arr[i].delay = Number(e.target.value); setPopups(arr); }} />
                  </div>
                )}
                {popup.trigger === "on-scroll" && (
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">Scroll %</label>
                    <Input type="number" className="w-24" value={popup.scrollPercent} onChange={(e) => { const arr = [...popups]; arr[i].scrollPercent = Number(e.target.value); setPopups(arr); }} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Popup Title" value={popup.title} onChange={(e) => { const arr = [...popups]; arr[i].title = e.target.value; setPopups(arr); }} />
                  <Input placeholder="Button Text" value={popup.buttonText} onChange={(e) => { const arr = [...popups]; arr[i].buttonText = e.target.value; setPopups(arr); }} />
                </div>
                <Textarea placeholder="Popup Message..." value={popup.message} onChange={(e) => { const arr = [...popups]; arr[i].message = e.target.value; setPopups(arr); }} rows={2} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Button Link (e.g. /contact)" value={popup.buttonLink} onChange={(e) => { const arr = [...popups]; arr[i].buttonLink = e.target.value; setPopups(arr); }} />
                  <div>
                    <label className="text-xs text-muted-foreground">Position</label>
                    <Select value={popup.position} onValueChange={(v) => { const arr = [...popups]; arr[i].position = v as any; setPopups(arr); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["center", "bottom-right", "bottom-left", "top-right", "full-screen"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-muted-foreground">BG Color</label>
                    <input type="color" value={popup.bgColor} onChange={(e) => { const arr = [...popups]; arr[i].bgColor = e.target.value; setPopups(arr); }} className="w-8 h-8 rounded cursor-pointer border" />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-muted-foreground">Text Color</label>
                    <input type="color" value={popup.textColor} onChange={(e) => { const arr = [...popups]; arr[i].textColor = e.target.value; setPopups(arr); }} className="w-8 h-8 rounded cursor-pointer border" />
                  </div>
                </div>

                <ImageUpload value={popup.image} onChange={(url) => { const arr = [...popups]; arr[i].image = url; setPopups(arr); }} folder="popups" label="Popup Image (optional)" />
              </div>
            ))}
            <Button variant="outline" onClick={() => setPopups([...popups, newPopup()])} className="w-full">
              <Plus size={16} className="mr-2" /> Add Popup
            </Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "elementor_popups", value: { items: popups } })} />
          </Section>
        </TabsContent>

        {/* ═══ OFFER BANNERS ═══ */}
        <TabsContent value="banners">
          <Section title="🎁 Offer Banners" desc="Top ya bottom par sticky offer banners add karein. Closeable bhi bana sakte hain.">
            {banners.map((banner, i) => (
              <div key={banner.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold flex-1">{banner.text.slice(0, 40) || "New Banner"}</span>
                  <Switch checked={banner.enabled} onCheckedChange={(v) => { const arr = [...banners]; arr[i].enabled = v; setBanners(arr); }} />
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setBanners(banners.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <Input placeholder="Banner text..." value={banner.text} onChange={(e) => { const arr = [...banners]; arr[i].text = e.target.value; setBanners(arr); }} />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Button Text" value={banner.buttonText} onChange={(e) => { const arr = [...banners]; arr[i].buttonText = e.target.value; setBanners(arr); }} />
                  <Input placeholder="Button Link" value={banner.buttonLink} onChange={(e) => { const arr = [...banners]; arr[i].buttonLink = e.target.value; setBanners(arr); }} />
                </div>
                <div className="flex gap-3 items-center flex-wrap">
                  <Select value={banner.position} onValueChange={(v) => { const arr = [...banners]; arr[i].position = v as any; setBanners(arr); }}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">Closeable</label>
                    <Switch checked={banner.closeable} onCheckedChange={(v) => { const arr = [...banners]; arr[i].closeable = v; setBanners(arr); }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-muted-foreground">BG</label>
                    <input type="color" value={banner.bgColor} onChange={(e) => { const arr = [...banners]; arr[i].bgColor = e.target.value; setBanners(arr); }} className="w-8 h-8 rounded cursor-pointer border" />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-muted-foreground">Text</label>
                    <input type="color" value={banner.textColor} onChange={(e) => { const arr = [...banners]; arr[i].textColor = e.target.value; setBanners(arr); }} className="w-8 h-8 rounded cursor-pointer border" />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => setBanners([...banners, newBanner()])} className="w-full">
              <Plus size={16} className="mr-2" /> Add Offer Banner
            </Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "elementor_banners", value: { items: banners } })} />
          </Section>
        </TabsContent>

        {/* ═══ VIDEO TESTIMONIALS ═══ */}
        <TabsContent value="video-testimonials">
          <Section title="🎥 Video Testimonials" desc="YouTube video reviews add karein. Slider format mein website par dikhenge.">
            {videoTestimonials.map((vt, i) => (
              <div key={vt.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setVideoTestimonials(moveItem(videoTestimonials, i, -1))} disabled={i === 0}><ChevronUp size={12} /></Button>
                    <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setVideoTestimonials(moveItem(videoTestimonials, i, 1))} disabled={i === videoTestimonials.length - 1}><ChevronDown size={12} /></Button>
                  </div>
                  <span className="text-sm font-semibold flex-1">{vt.name || "New Video Review"}</span>
                  <Switch checked={vt.enabled} onCheckedChange={(v) => { const arr = [...videoTestimonials]; arr[i].enabled = v; setVideoTestimonials(arr); }} />
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setVideoTestimonials(videoTestimonials.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Client Name" value={vt.name} onChange={(e) => { const arr = [...videoTestimonials]; arr[i].name = e.target.value; setVideoTestimonials(arr); }} />
                  <Input placeholder="Company Name" value={vt.company} onChange={(e) => { const arr = [...videoTestimonials]; arr[i].company = e.target.value; setVideoTestimonials(arr); }} />
                </div>
                <Input placeholder="YouTube URL (e.g. https://youtube.com/watch?v=...)" value={vt.youtubeUrl} onChange={(e) => { const arr = [...videoTestimonials]; arr[i].youtubeUrl = e.target.value; setVideoTestimonials(arr); }} />
                <Textarea placeholder="Short quote from client..." value={vt.quote} onChange={(e) => { const arr = [...videoTestimonials]; arr[i].quote = e.target.value; setVideoTestimonials(arr); }} rows={2} />
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Rating</label>
                  <Select value={String(vt.rating)} onValueChange={(v) => { const arr = [...videoTestimonials]; arr[i].rating = Number(v); setVideoTestimonials(arr); }}>
                    <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map(r => <SelectItem key={r} value={String(r)}>{"⭐".repeat(r)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <ImageUpload value={vt.thumbnailUrl} onChange={(url) => { const arr = [...videoTestimonials]; arr[i].thumbnailUrl = url; setVideoTestimonials(arr); }} folder="testimonials" label="Custom Thumbnail (optional)" />
              </div>
            ))}
            <Button variant="outline" onClick={() => setVideoTestimonials([...videoTestimonials, newVideoTestimonial()])} className="w-full">
              <Plus size={16} className="mr-2" /> Add Video Testimonial
            </Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "elementor_video_testimonials", value: { items: videoTestimonials } })} />
          </Section>
        </TabsContent>

        {/* ═══ IMAGE SLIDER ═══ */}
        <TabsContent value="slides">
          <Section title="🖼️ Image Slider / Carousel Builder" desc="Hero ya kisi bhi section ke liye image slides banayein with text overlay aur buttons.">
            {slides.map((slide, i) => (
              <div key={slide.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setSlides(moveItem(slides, i, -1))} disabled={i === 0}><ChevronUp size={12} /></Button>
                    <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setSlides(moveItem(slides, i, 1))} disabled={i === slides.length - 1}><ChevronDown size={12} /></Button>
                  </div>
                  <span className="text-sm font-semibold flex-1">Slide {i + 1}: {slide.title || "Untitled"}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSlides(slides.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <ImageUpload value={slide.image} onChange={(url) => { const arr = [...slides]; arr[i].image = url; setSlides(arr); }} folder="slides" label="Slide Image" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Slide Title" value={slide.title} onChange={(e) => { const arr = [...slides]; arr[i].title = e.target.value; setSlides(arr); }} />
                  <Input placeholder="Subtitle" value={slide.subtitle} onChange={(e) => { const arr = [...slides]; arr[i].subtitle = e.target.value; setSlides(arr); }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Button Text" value={slide.buttonText} onChange={(e) => { const arr = [...slides]; arr[i].buttonText = e.target.value; setSlides(arr); }} />
                  <Input placeholder="Button Link" value={slide.buttonLink} onChange={(e) => { const arr = [...slides]; arr[i].buttonLink = e.target.value; setSlides(arr); }} />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs text-muted-foreground">Dark Overlay</label>
                  <Switch checked={slide.overlay} onCheckedChange={(v) => { const arr = [...slides]; arr[i].overlay = v; setSlides(arr); }} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => setSlides([...slides, newSlide()])} className="w-full">
              <Plus size={16} className="mr-2" /> Add Slide
            </Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "elementor_slides", value: { items: slides } })} />
          </Section>
        </TabsContent>

        {/* ═══ NOTIFICATIONS ═══ */}
        <TabsContent value="notifications">
          <Section title="🔔 Notification Messages" desc="Auto-sliding notification popup messages banayein — offers, social proof, events.">
            {notifications.map((notif, i) => (
              <div key={notif.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold flex-1">{notif.text.slice(0, 40) || "New Notification"}</span>
                  <Switch checked={notif.enabled} onCheckedChange={(v) => { const arr = [...notifications]; arr[i].enabled = v; setNotifications(arr); }} />
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setNotifications(notifications.filter((_, j) => j !== i))}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Icon Emoji (e.g. 🔥)" value={notif.icon} onChange={(e) => { const arr = [...notifications]; arr[i].icon = e.target.value; setNotifications(arr); }} className="w-20" />
                  <Input placeholder="Notification text..." value={notif.text} onChange={(e) => { const arr = [...notifications]; arr[i].text = e.target.value; setNotifications(arr); }} className="md:col-span-2" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Link (optional)" value={notif.link} onChange={(e) => { const arr = [...notifications]; arr[i].link = e.target.value; setNotifications(arr); }} />
                  <Select value={notif.type} onValueChange={(v) => { const arr = [...notifications]; arr[i].type = v as any; setNotifications(arr); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => setNotifications([...notifications, newNotification()])} className="w-full">
              <Plus size={16} className="mr-2" /> Add Notification
            </Button>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "elementor_notifications", value: { items: notifications } })} />
          </Section>
        </TabsContent>

        {/* ═══ GLOBAL STYLES ═══ */}
        <TabsContent value="global-styles">
          <Section title="🎨 Global Styles" desc="Puri website ke fonts, border radius, shadow, animation speed control karein.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Body Font</label>
                <Select value={globalStyles.fontFamily} onValueChange={(v) => setGlobalStyles({ ...globalStyles, fontFamily: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Inter", "Poppins", "DM Sans", "Plus Jakarta Sans", "Outfit", "Manrope", "Sora"].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Heading Font</label>
                <Select value={globalStyles.headingFont} onValueChange={(v) => setGlobalStyles({ ...globalStyles, headingFont: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Space Grotesk", "Clash Display", "Plus Jakarta Sans", "Sora", "Cabinet Grotesk", "Satoshi"].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Border Radius (px)</label>
                <Input type="number" value={globalStyles.borderRadius} onChange={(e) => setGlobalStyles({ ...globalStyles, borderRadius: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Container Max Width (px)</label>
                <Input type="number" value={globalStyles.containerMaxWidth} onChange={(e) => setGlobalStyles({ ...globalStyles, containerMaxWidth: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Shadow Intensity</label>
                <Select value={globalStyles.shadowIntensity} onValueChange={(v) => setGlobalStyles({ ...globalStyles, shadowIntensity: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="heavy">Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Animation Speed</label>
                <Select value={globalStyles.animationSpeed} onValueChange={(v) => setGlobalStyles({ ...globalStyles, animationSpeed: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                    <SelectItem value="none">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SaveBtn onClick={() => saveMutation.mutate({ key: "elementor_global_styles", value: globalStyles })} />
          </Section>
        </TabsContent>

        {/* ═══ CONTAINER EDITOR ═══ */}
        <TabsContent value="containers">
          <ContainerEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminElementorPro;
