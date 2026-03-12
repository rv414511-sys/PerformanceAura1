import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSetting } from "@/hooks/useSiteSettings";
import SectionHeading from "@/components/SectionHeading";
import { ChevronLeft, ChevronRight, Play, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
};

const VideoTestimonialsSection = () => {
  const { value: data } = useSetting("elementor_video_testimonials");
  const items = (data?.items || []).filter((v: any) => v.enabled);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);

  if (items.length === 0) return null;

  const prev = () => setActive((a) => (a === 0 ? items.length - 1 : a - 1));
  const next = () => setActive((a) => (a === items.length - 1 ? 0 : a + 1));

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading badge="Client Stories" title="Video Testimonials" subtitle="Hear directly from our happy clients about their experience." />

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {items.map((vt: any, i: number) => {
              if (i !== active) return null;
              const ytId = getYouTubeId(vt.youtubeUrl || "");
              const thumb = vt.thumbnailUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "");

              return (
                <motion.div key={vt.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}
                  className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
                  {/* Video / Thumbnail */}
                  <div className="relative aspect-video bg-black cursor-pointer" onClick={() => ytId && setPlaying(ytId)}>
                    {playing === ytId ? (
                      <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
                    ) : (
                      <>
                        {thumb && <img src={thumb} alt={vt.name} className="w-full h-full object-cover" />}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                            <Play size={28} className="text-primary-foreground ml-1" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: vt.rating || 5 }).map((_, j) => (
                        <Star key={j} size={16} className="text-gold fill-gold" />
                      ))}
                    </div>
                    {vt.quote && <p className="text-muted-foreground italic mb-3">"{vt.quote}"</p>}
                    <p className="font-semibold text-card-foreground">{vt.name}</p>
                    {vt.company && <p className="text-sm text-muted-foreground">{vt.company}</p>}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {items.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
                <ChevronLeft size={18} />
              </Button>
              <div className="flex items-center gap-2">
                {items.map((_: any, i: number) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? "bg-primary scale-125" : "bg-muted-foreground/30"}`} />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={next} className="rounded-full">
                <ChevronRight size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;
