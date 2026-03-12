import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Plus, Trash2, ChevronUp, ChevronDown, Copy, Eye, EyeOff } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export interface ContainerBlock {
  id: string;
  type: "text" | "heading" | "image" | "video" | "button" | "spacer" | "html";
  content: string;
  styles: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    color?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    maxWidth?: string;
  };
  link?: string;
}

export interface WebContainer {
  id: string;
  name: string;
  visible: boolean;
  bgColor: string;
  bgImage: string;
  bgGradient: string;
  textColor: string;
  paddingX: string;
  paddingY: string;
  maxWidth: string;
  borderRadius: string;
  shadow: string;
  animation: string;
  blocks: ContainerBlock[];
}

const genId = () => Math.random().toString(36).slice(2, 10);

const newBlock = (type: ContainerBlock["type"]): ContainerBlock => ({
  id: genId(), type, content: "",
  styles: { fontSize: "16", fontWeight: "normal", textAlign: "left", color: "", padding: "0", margin: "0", borderRadius: "0", maxWidth: "" },
  link: "",
});

const newContainer = (): WebContainer => ({
  id: genId(), name: "New Container", visible: true,
  bgColor: "", bgImage: "", bgGradient: "", textColor: "",
  paddingX: "16", paddingY: "48", maxWidth: "1280",
  borderRadius: "0", shadow: "none", animation: "fade-up",
  blocks: [],
});

const blockTypeLabels: Record<string, string> = {
  heading: "📝 Heading", text: "📄 Text / Paragraph", image: "🖼️ Image",
  video: "🎬 Video (YouTube)", button: "🔘 Button", spacer: "↕️ Spacer", html: "🔧 HTML Code",
};

const ContainerEditor = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [containers, setContainers] = useState<WebContainer[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const { data: settings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      data?.forEach((s: any) => { map[s.key] = { id: s.id, value: s.value }; });
      return map;
    },
  });

  useEffect(() => {
    if (settings?.elementor_containers?.value?.items) {
      setContainers(settings.elementor_containers.value.items);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (value: any) => {
      const existing = settings?.elementor_containers;
      if (existing) {
        const { error } = await supabase.from("site_settings").update({ value, updated_at: new Date().toISOString() }).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_settings").insert({ key: "elementor_containers", value });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: "✅ Containers saved!" });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updateContainer = (idx: number, patch: Partial<WebContainer>) => {
    const arr = [...containers]; arr[idx] = { ...arr[idx], ...patch }; setContainers(arr);
  };

  const moveContainer = (idx: number, dir: -1 | 1) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= containers.length) return;
    const arr = [...containers];
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    setContainers(arr);
    setExpandedIdx(ni);
  };

  const duplicateContainer = (idx: number) => {
    const dup = { ...containers[idx], id: genId(), name: containers[idx].name + " (Copy)", blocks: containers[idx].blocks.map(b => ({ ...b, id: genId() })) };
    const arr = [...containers]; arr.splice(idx + 1, 0, dup); setContainers(arr);
  };

  const updateBlock = (cIdx: number, bIdx: number, patch: Partial<ContainerBlock>) => {
    const arr = [...containers];
    arr[cIdx].blocks[bIdx] = { ...arr[cIdx].blocks[bIdx], ...patch };
    setContainers(arr);
  };

  const updateBlockStyle = (cIdx: number, bIdx: number, stylePatch: Partial<ContainerBlock["styles"]>) => {
    const arr = [...containers];
    arr[cIdx].blocks[bIdx].styles = { ...arr[cIdx].blocks[bIdx].styles, ...stylePatch };
    setContainers(arr);
  };

  const moveBlock = (cIdx: number, bIdx: number, dir: -1 | 1) => {
    const ni = bIdx + dir;
    const blocks = [...containers[cIdx].blocks];
    if (ni < 0 || ni >= blocks.length) return;
    [blocks[bIdx], blocks[ni]] = [blocks[ni], blocks[bIdx]];
    updateContainer(cIdx, { blocks });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">🏗️ Container Editor</h2>
        <p className="text-sm text-muted-foreground">Website ke kisi bhi container ko edit karein — color, background, image, video, text sab change karein. Move, duplicate, ya delete karein.</p>
      </div>

      {containers.map((c, ci) => (
        <div key={c.id} className="border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 p-3 bg-muted/50 cursor-pointer" onClick={() => setExpandedIdx(expandedIdx === ci ? null : ci)}>
            <div className="flex flex-col gap-0.5" onClick={e => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => moveContainer(ci, -1)} disabled={ci === 0}><ChevronUp size={12} /></Button>
              <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => moveContainer(ci, 1)} disabled={ci === containers.length - 1}><ChevronDown size={12} /></Button>
            </div>
            <span className="text-sm font-semibold flex-1">{c.name || "Untitled"}</span>
            {!c.visible && <EyeOff size={14} className="text-muted-foreground" />}
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={e => { e.stopPropagation(); duplicateContainer(ci); }}><Copy size={12} /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={e => { e.stopPropagation(); setContainers(containers.filter((_, i) => i !== ci)); }}><Trash2 size={12} className="text-destructive" /></Button>
          </div>

          {expandedIdx === ci && (
            <div className="p-4 space-y-4 border-t border-border">
              {/* Container Settings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input value={c.name} onChange={e => updateContainer(ci, { name: e.target.value })} />
                </div>
                <div className="flex items-end gap-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Visible</label>
                    <Button variant={c.visible ? "default" : "outline"} size="sm" className="w-full" onClick={() => updateContainer(ci, { visible: !c.visible })}>
                      {c.visible ? <><Eye size={12} className="mr-1" /> On</> : <><EyeOff size={12} className="mr-1" /> Off</>}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">BG Color</label>
                  <div className="flex gap-1">
                    <input type="color" value={c.bgColor || "#ffffff"} onChange={e => updateContainer(ci, { bgColor: e.target.value })} className="w-10 h-9 rounded cursor-pointer border" />
                    <Input value={c.bgColor} onChange={e => updateContainer(ci, { bgColor: e.target.value })} placeholder="#hex" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Text Color</label>
                  <div className="flex gap-1">
                    <input type="color" value={c.textColor || "#000000"} onChange={e => updateContainer(ci, { textColor: e.target.value })} className="w-10 h-9 rounded cursor-pointer border" />
                    <Input value={c.textColor} onChange={e => updateContainer(ci, { textColor: e.target.value })} placeholder="#hex" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Padding X (px)</label>
                  <Input type="number" value={c.paddingX} onChange={e => updateContainer(ci, { paddingX: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Padding Y (px)</label>
                  <Input type="number" value={c.paddingY} onChange={e => updateContainer(ci, { paddingY: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Max Width (px)</label>
                  <Input type="number" value={c.maxWidth} onChange={e => updateContainer(ci, { maxWidth: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Border Radius (px)</label>
                  <Input type="number" value={c.borderRadius} onChange={e => updateContainer(ci, { borderRadius: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Shadow</label>
                  <Select value={c.shadow} onValueChange={v => updateContainer(ci, { shadow: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["none", "sm", "md", "lg", "xl", "2xl"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Animation</label>
                  <Select value={c.animation} onValueChange={v => updateContainer(ci, { animation: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["fade-up", "fade-in", "slide-left", "slide-right", "scale", "none"].map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">BG Gradient</label>
                  <Input value={c.bgGradient} onChange={e => updateContainer(ci, { bgGradient: e.target.value })} placeholder="e.g. linear-gradient(135deg, #27187E, #758BFD)" />
                </div>
              </div>

              <ImageUpload value={c.bgImage} onChange={url => updateContainer(ci, { bgImage: url })} folder="containers" label="Background Image (optional)" />

              {/* Blocks */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground">📦 Blocks</h3>
                {c.blocks.map((block, bi) => (
                  <div key={block.id} className="p-3 rounded-lg border border-border bg-background space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-0.5">
                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => moveBlock(ci, bi, -1)} disabled={bi === 0}><ChevronUp size={10} /></Button>
                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => moveBlock(ci, bi, 1)} disabled={bi === c.blocks.length - 1}><ChevronDown size={10} /></Button>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground flex-1">{blockTypeLabels[block.type] || block.type}</span>
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => { const blocks = [...c.blocks]; blocks.splice(bi + 1, 0, { ...block, id: genId() }); updateContainer(ci, { blocks }); }}><Copy size={10} /></Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => updateContainer(ci, { blocks: c.blocks.filter((_, j) => j !== bi) })}><Trash2 size={10} className="text-destructive" /></Button>
                    </div>

                    {(block.type === "heading" || block.type === "text") && (
                      <>
                        {block.type === "heading" ? (
                          <Input placeholder="Heading text..." value={block.content} onChange={e => updateBlock(ci, bi, { content: e.target.value })} />
                        ) : (
                          <Textarea placeholder="Paragraph text..." value={block.content} onChange={e => updateBlock(ci, bi, { content: e.target.value })} rows={3} />
                        )}
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            <label className="text-[10px] text-muted-foreground">Size</label>
                            <Input type="number" className="w-16 h-7 text-xs" value={block.styles.fontSize || "16"} onChange={e => updateBlockStyle(ci, bi, { fontSize: e.target.value })} />
                          </div>
                          <Select value={block.styles.fontWeight || "normal"} onValueChange={v => updateBlockStyle(ci, bi, { fontWeight: v })}>
                            <SelectTrigger className="w-24 h-7 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>{["normal", "medium", "semibold", "bold"].map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                          </Select>
                          <Select value={block.styles.textAlign || "left"} onValueChange={v => updateBlockStyle(ci, bi, { textAlign: v })}>
                            <SelectTrigger className="w-20 h-7 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>{["left", "center", "right"].map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                          </Select>
                          <div className="flex items-center gap-1">
                            <label className="text-[10px] text-muted-foreground">Color</label>
                            <input type="color" value={block.styles.color || "#000000"} onChange={e => updateBlockStyle(ci, bi, { color: e.target.value })} className="w-7 h-7 rounded cursor-pointer border" />
                          </div>
                        </div>
                      </>
                    )}

                    {block.type === "image" && (
                      <ImageUpload value={block.content} onChange={url => updateBlock(ci, bi, { content: url })} folder="containers" label="Upload Image" />
                    )}

                    {block.type === "video" && (
                      <Input placeholder="YouTube URL (e.g. https://youtube.com/watch?v=...)" value={block.content} onChange={e => updateBlock(ci, bi, { content: e.target.value })} />
                    )}

                    {block.type === "button" && (
                      <div className="flex gap-2">
                        <Input placeholder="Button Text" value={block.content} onChange={e => updateBlock(ci, bi, { content: e.target.value })} />
                        <Input placeholder="Link URL" value={block.link} onChange={e => updateBlock(ci, bi, { link: e.target.value })} />
                      </div>
                    )}

                    {block.type === "spacer" && (
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-muted-foreground">Height (px)</label>
                        <Input type="number" className="w-24" value={block.content || "40"} onChange={e => updateBlock(ci, bi, { content: e.target.value })} />
                      </div>
                    )}

                    {block.type === "html" && (
                      <Textarea placeholder="Custom HTML code..." value={block.content} onChange={e => updateBlock(ci, bi, { content: e.target.value })} rows={4} className="font-mono text-xs" />
                    )}
                  </div>
                ))}

                <div className="flex flex-wrap gap-2">
                  {(Object.keys(blockTypeLabels) as ContainerBlock["type"][]).map(type => (
                    <Button key={type} variant="outline" size="sm" onClick={() => updateContainer(ci, { blocks: [...c.blocks, newBlock(type)] })}>
                      {blockTypeLabels[type]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={() => { setContainers([...containers, newContainer()]); setExpandedIdx(containers.length); }} className="w-full">
        <Plus size={16} className="mr-2" /> Add New Container
      </Button>

      <Button onClick={() => saveMutation.mutate({ items: containers })} disabled={saveMutation.isPending} className="w-full">
        {saveMutation.isPending ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Save size={14} className="mr-1" />} Save All Containers
      </Button>
    </div>
  );
};

export default ContainerEditor;
