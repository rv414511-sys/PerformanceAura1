import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { CustomSection, Block } from "@/components/admin/CustomSectionBuilder";

const animationVariants: Record<string, any> = {
  "fade-up": { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } },
  "fade-in": { initial: { opacity: 0 }, whileInView: { opacity: 1 } },
  "slide-left": { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } },
  "scale": { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } },
  "none": {},
};

const paddingMap = { sm: "py-8 px-6", md: "py-12 px-6", lg: "py-20 px-6 md:px-12", xl: "py-28 px-6 md:px-12 lg:px-20" };

const fontSizeMap: Record<string, string> = {
  sm: "text-sm", base: "text-base", lg: "text-lg", xl: "text-xl",
  "2xl": "text-2xl", "3xl": "text-3xl", "4xl": "text-4xl md:text-5xl",
};

const fontWeightMap: Record<string, string> = {
  normal: "font-normal", medium: "font-medium", semibold: "font-semibold", bold: "font-bold",
};

const alignMap: Record<string, string> = { left: "text-left", center: "text-center", right: "text-right" };

// ─── Render a single block ───
const RenderBlock = ({ block }: { block: Block }) => {
  const colorStyle = block.textColor ? { color: block.textColor } : {};

  switch (block.type) {
    case "heading":
      return (
        <h2
          className={`font-display ${fontSizeMap[block.fontSize] || "text-3xl"} ${fontWeightMap[block.fontWeight] || "font-bold"} ${alignMap[block.align]} leading-tight`}
          style={colorStyle}
        >
          {block.content}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className={`${fontSizeMap[block.fontSize] || "text-base"} ${alignMap[block.align]} leading-relaxed text-muted-foreground`}
          style={colorStyle}
        >
          {block.content}
        </p>
      );
    case "image":
      return block.content ? (
        <img src={block.content} alt="" className="w-full rounded-xl object-cover max-h-[500px]" loading="lazy" />
      ) : null;
    case "button":
      return (
        <div className={alignMap[block.align]}>
          <Button size="lg" className="mt-2" asChild>
            <Link to={block.link || "#"}>{block.content || "Click Here"}</Link>
          </Button>
        </div>
      );
    case "spacer":
      return <div style={{ height: `${block.height || 40}px` }} />;
    case "divider":
      return <hr className="border-border my-4" />;
    default:
      return null;
  }
};

// ─── Render blocks list ───
const BlockList = ({ blocks }: { blocks: Block[] }) => (
  <div className="space-y-4">
    {blocks.map((block) => (
      <RenderBlock key={block.id} block={block} />
    ))}
  </div>
);

// ─── Main Section Renderer ───
const CustomSectionRenderer = ({ section }: { section: CustomSection }) => {
  const anim = section.animation || "fade-up";
  const variant = animationVariants[anim];
  const padding = paddingMap[section.paddingY] || paddingMap.lg;

  const bgStyle: React.CSSProperties = {};
  if (section.bgColor) bgStyle.backgroundColor = section.bgColor;
  if (section.bgImage && section.template === "banner-with-overlay") {
    bgStyle.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${section.bgImage})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  const Wrapper = anim !== "none" && variant?.initial ? motion.section : "section";
  const wrapperProps = anim !== "none" && variant?.initial
    ? { ...variant, viewport: { once: true }, transition: { duration: 0.6 } }
    : {};

  const content = (() => {
    switch (section.template) {
      case "full-width":
        return (
          <div className="container mx-auto">
            <BlockList blocks={section.blocks} />
          </div>
        );

      case "centered-content":
        return (
          <div className="container mx-auto max-w-3xl text-center">
            <BlockList blocks={section.blocks} />
          </div>
        );

      case "text-left-image-right":
      case "image-left-text-right":
      case "two-columns":
        return (
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <BlockList blocks={section.leftBlocks} />
              <BlockList blocks={section.rightBlocks} />
            </div>
          </div>
        );

      case "three-columns":
        return (
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BlockList blocks={section.col1Blocks} />
              <BlockList blocks={section.col2Blocks} />
              <BlockList blocks={section.col3Blocks} />
            </div>
          </div>
        );

      case "banner-with-overlay":
        return (
          <div className="container mx-auto relative z-10">
            <div className="text-center text-white">
              <BlockList blocks={section.blocks} />
            </div>
          </div>
        );

      default:
        return <BlockList blocks={section.blocks} />;
    }
  })();

  return (
    <Wrapper className={padding} style={bgStyle} {...wrapperProps}>
      {content}
    </Wrapper>
  );
};

export default CustomSectionRenderer;
