import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ChevronUp, ChevronDown, Image, Type, AlignLeft, MousePointer, Minus, Columns } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

// ─── Block Types ───
export type BlockType = "heading" | "paragraph" | "image" | "button" | "spacer" | "divider";

export interface Block {
  id: string;
  type: BlockType;
  content: string;        // text content or image URL
  align: "left" | "center" | "right";
  fontSize: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  fontWeight: "normal" | "medium" | "semibold" | "bold";
  textColor: string;      // hex color or empty for default
  link: string;           // for buttons
  height: string;         // for spacer (px)
}

// ─── Layout Templates ───
export type LayoutTemplate = "full-width" | "text-left-image-right" | "image-left-text-right" | "two-columns" | "three-columns" | "banner-with-overlay" | "centered-content";

export interface CustomSection {
  id: string;
  name: string;
  template: LayoutTemplate;
  bgColor: string;        // hex or empty
  bgImage: string;        // URL or empty
  paddingY: "sm" | "md" | "lg" | "xl";
  blocks: Block[];        // for full-width / centered
  leftBlocks: Block[];    // for split layouts
  rightBlocks: Block[];   // for split layouts
  col1Blocks: Block[];    // for 3-col
  col2Blocks: Block[];
  col3Blocks: Block[];
  animation: string;
}

const templates: { value: LayoutTemplate; label: string; icon: React.ReactNode }[] = [
  { value: "full-width", label: "Full Width", icon: <AlignLeft size={16} /> },
  { value: "centered-content", label: "Centered Content", icon: <Type size={16} /> },
  { value: "text-left-image-right", label: "Text Left + Image Right", icon: <Columns size={16} /> },
  { value: "image-left-text-right", label: "Image Left + Text Right", icon: <Columns size={16} /> },
  { value: "two-columns", label: "Two Columns", icon: <Columns size={16} /> },
  { value: "three-columns", label: "Three Columns", icon: <Columns size={16} /> },
  { value: "banner-with-overlay", label: "Banner with Text Overlay", icon: <Image size={16} /> },
];

const blockTypes: { value: BlockType; label: string; icon: React.ReactNode }[] = [
  { value: "heading", label: "Heading", icon: <Type size={14} /> },
  { value: "paragraph", label: "Paragraph", icon: <AlignLeft size={14} /> },
  { value: "image", label: "Image", icon: <Image size={14} /> },
  { value: "button", label: "Button", icon: <MousePointer size={14} /> },
  { value: "spacer", label: "Spacer", icon: <Minus size={14} /> },
  { value: "divider", label: "Divider", icon: <Minus size={14} /> },
];

const genId = () => Math.random().toString(36).slice(2, 10);

const newBlock = (type: BlockType): Block => ({
  id: genId(),
  type,
  content: "",
  align: "left",
  fontSize: type === "heading" ? "3xl" : "base",
  fontWeight: type === "heading" ? "bold" : "normal",
  textColor: "",
  link: "",
  height: "40",
});

export const newCustomSection = (): CustomSection => ({
  id: genId(),
  name: "New Section",
  template: "full-width",
  bgColor: "",
  bgImage: "",
  paddingY: "lg",
  blocks: [],
  leftBlocks: [],
  rightBlocks: [],
  col1Blocks: [],
  col2Blocks: [],
  col3Blocks: [],
  animation: "fade-up",
});

// ─── Block Editor ───
const BlockEditor = ({ blocks, onChange }: { blocks: Block[]; onChange: (b: Block[]) => void }) => {
  const moveBlock = (idx: number, dir: -1 | 1) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= blocks.length) return;
    const arr = [...blocks];
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    onChange(arr);
  };

  const updateBlock = (idx: number, patch: Partial<Block>) => {
    const arr = [...blocks];
    arr[idx] = { ...arr[idx], ...patch };
    onChange(arr);
  };

  const removeBlock = (idx: number) => onChange(blocks.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={block.id} className="p-3 rounded-lg border border-border bg-background space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-0.5">
              <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => moveBlock(i, -1)} disabled={i === 0}><ChevronUp size={12} /></Button>
              <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1}><ChevronDown size={12} /></Button>
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase flex-1">
              {blockTypes.find(b => b.value === block.type)?.icon} {block.type}
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeBlock(i)}><Trash2 size={12} className="text-destructive" /></Button>
          </div>

          {/* Content by type */}
          {block.type === "heading" && (
            <>
              <Input placeholder="Heading text..." value={block.content} onChange={(e) => updateBlock(i, { content: e.target.value })} />
              <div className="flex gap-2">
                <Select value={block.fontSize} onValueChange={(v) => updateBlock(i, { fontSize: v as any })}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["xl", "2xl", "3xl", "4xl"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={block.fontWeight} onValueChange={(v) => updateBlock(i, { fontWeight: v as any })}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["normal", "medium", "semibold", "bold"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={block.align} onValueChange={(v) => updateBlock(i, { align: v as any })}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["left", "center", "right"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <label className="text-xs text-muted-foreground">Color</label>
                  <input type="color" value={block.textColor || "#000000"} onChange={(e) => updateBlock(i, { textColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border" />
                </div>
              </div>
            </>
          )}

          {block.type === "paragraph" && (
            <>
              <Textarea placeholder="Paragraph text..." value={block.content} onChange={(e) => updateBlock(i, { content: e.target.value })} rows={3} />
              <div className="flex gap-2">
                <Select value={block.fontSize} onValueChange={(v) => updateBlock(i, { fontSize: v as any })}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["sm", "base", "lg", "xl"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={block.align} onValueChange={(v) => updateBlock(i, { align: v as any })}>
                  <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["left", "center", "right"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <label className="text-xs text-muted-foreground">Color</label>
                  <input type="color" value={block.textColor || "#666666"} onChange={(e) => updateBlock(i, { textColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer border" />
                </div>
              </div>
            </>
          )}

          {block.type === "image" && (
            <ImageUpload value={block.content} onChange={(url) => updateBlock(i, { content: url })} folder="custom-sections" label="Upload Image" />
          )}

          {block.type === "button" && (
            <div className="space-y-2">
              <Input placeholder="Button text" value={block.content} onChange={(e) => updateBlock(i, { content: e.target.value })} />
              <Input placeholder="Link URL (e.g. /contact)" value={block.link} onChange={(e) => updateBlock(i, { link: e.target.value })} />
              <Select value={block.align} onValueChange={(v) => updateBlock(i, { align: v as any })}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["left", "center", "right"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          {block.type === "spacer" && (
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground">Height (px)</label>
              <Input type="number" className="w-24" value={block.height} onChange={(e) => updateBlock(i, { height: e.target.value })} />
            </div>
          )}

          {block.type === "divider" && (
            <p className="text-xs text-muted-foreground">Horizontal line divider</p>
          )}
        </div>
      ))}

      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        {blockTypes.map((bt) => (
          <Button key={bt.value} variant="outline" size="sm" onClick={() => onChange([...blocks, newBlock(bt.value)])}>
            {bt.icon} <span className="ml-1">{bt.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ───
interface Props {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

const CustomSectionBuilder = ({ sections, onChange }: Props) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const addSection = () => {
    onChange([...sections, newCustomSection()]);
    setExpandedIdx(sections.length);
  };

  const removeSection = (idx: number) => {
    onChange(sections.filter((_, i) => i !== idx));
    setExpandedIdx(null);
  };

  const updateSection = (idx: number, patch: Partial<CustomSection>) => {
    const arr = [...sections];
    arr[idx] = { ...arr[idx], ...patch };
    onChange(arr);
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= sections.length) return;
    const arr = [...sections];
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    onChange(arr);
    setExpandedIdx(ni);
  };

  const getBlocksForTemplate = (sec: CustomSection) => {
    const t = sec.template;
    if (t === "full-width" || t === "centered-content" || t === "banner-with-overlay") return "blocks";
    if (t === "text-left-image-right" || t === "image-left-text-right" || t === "two-columns") return "split";
    if (t === "three-columns") return "three";
    return "blocks";
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        🎨 Naye custom sections banayein — template choose karein, phir usme blocks (heading, text, image, button) add karein.
      </p>

      {sections.map((sec, i) => (
        <div key={sec.id} className="border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center gap-3 p-4 bg-muted/50 cursor-pointer"
            onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
          >
            <div className="flex flex-col gap-0.5" onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => moveSection(i, -1)} disabled={i === 0}><ChevronUp size={14} /></Button>
              <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => moveSection(i, 1)} disabled={i === sections.length - 1}><ChevronDown size={14} /></Button>
            </div>
            <span className="text-sm font-semibold text-foreground flex-1">{sec.name || "Untitled Section"}</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{templates.find(t => t.value === sec.template)?.label}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); removeSection(i); }}>
              <Trash2 size={14} className="text-destructive" />
            </Button>
          </div>

          {/* Expanded Editor */}
          {expandedIdx === i && (
            <div className="p-4 space-y-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Section Name</label>
                  <Input value={sec.name} onChange={(e) => updateSection(i, { name: e.target.value })} placeholder="e.g. Our Team" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Layout Template</label>
                  <Select value={sec.template} onValueChange={(v) => updateSection(i, { template: v as LayoutTemplate })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {templates.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Background Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={sec.bgColor || "#ffffff"} onChange={(e) => updateSection(i, { bgColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border" />
                    <Input value={sec.bgColor} onChange={(e) => updateSection(i, { bgColor: e.target.value })} placeholder="#ffffff or empty" className="flex-1" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Padding</label>
                  <Select value={sec.paddingY} onValueChange={(v) => updateSection(i, { paddingY: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small (py-8)</SelectItem>
                      <SelectItem value="md">Medium (py-12)</SelectItem>
                      <SelectItem value="lg">Large (py-20)</SelectItem>
                      <SelectItem value="xl">Extra Large (py-28)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Animation</label>
                  <Select value={sec.animation || "fade-up"} onValueChange={(v) => updateSection(i, { animation: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fade-up">Fade Up</SelectItem>
                      <SelectItem value="fade-in">Fade In</SelectItem>
                      <SelectItem value="slide-left">Slide Left</SelectItem>
                      <SelectItem value="slide-right">Slide Right</SelectItem>
                      <SelectItem value="scale">Scale</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {sec.template === "banner-with-overlay" && (
                <ImageUpload value={sec.bgImage} onChange={(url) => updateSection(i, { bgImage: url })} folder="custom-sections" label="Background Banner Image" />
              )}

              {/* Block editors based on template */}
              {getBlocksForTemplate(sec) === "blocks" && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">📦 Content Blocks</h4>
                  <BlockEditor blocks={sec.blocks} onChange={(blocks) => updateSection(i, { blocks })} />
                </div>
              )}

              {getBlocksForTemplate(sec) === "split" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      📦 {sec.template === "text-left-image-right" ? "Left (Text)" : sec.template === "image-left-text-right" ? "Left (Image)" : "Left Column"}
                    </h4>
                    <BlockEditor blocks={sec.leftBlocks} onChange={(leftBlocks) => updateSection(i, { leftBlocks })} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      📦 {sec.template === "text-left-image-right" ? "Right (Image)" : sec.template === "image-left-text-right" ? "Right (Text)" : "Right Column"}
                    </h4>
                    <BlockEditor blocks={sec.rightBlocks} onChange={(rightBlocks) => updateSection(i, { rightBlocks })} />
                  </div>
                </div>
              )}

              {getBlocksForTemplate(sec) === "three" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(["col1Blocks", "col2Blocks", "col3Blocks"] as const).map((col, ci) => (
                    <div key={col}>
                      <h4 className="text-sm font-semibold text-foreground mb-2">📦 Column {ci + 1}</h4>
                      <BlockEditor blocks={sec[col]} onChange={(blocks) => updateSection(i, { [col]: blocks })} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addSection} className="w-full">
        <Plus size={16} className="mr-2" /> Add New Custom Section
      </Button>
    </div>
  );
};

export default CustomSectionBuilder;
