import { motion } from "framer-motion";
import { Download, Lock, FileText, BookOpen, CheckSquare, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";

const categoryIcons: Record<string, any> = {
  "PDF": FileText,
  "Guide": BookOpen,
  "Checklist": CheckSquare,
  "Template": Layout,
};

const fallbackResources = [
  { id: "1", title: "Meta Ads Checklist 2026", description: "A step-by-step checklist to launch profitable Meta ad campaigns.", category: "Checklist", download_count: 340 },
  { id: "2", title: "Google Ads Budget Planner", description: "Plan your Google Ads spend with this comprehensive budget template.", category: "Template", download_count: 210 },
  { id: "3", title: "SEO Content Writing Guide", description: "Learn how to write content that ranks on the first page of Google.", category: "Guide", download_count: 520 },
  { id: "4", title: "AI Marketing Automation Playbook", description: "Automate your marketing workflows using AI — a complete PDF guide.", category: "PDF", download_count: 180 },
  { id: "5", title: "Social Media Content Calendar", description: "30-day social media content calendar template for brands.", category: "Template", download_count: 410 },
  { id: "6", title: "Performance Marketing ROI Calculator", description: "Calculate your expected ROI across paid channels.", category: "Template", download_count: 290 },
];

const Resources = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: resources } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await supabase.from("resources").select("*").eq("published", true).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const displayResources = resources && resources.length > 0 ? resources : fallbackResources;

  const handleDownload = async (resource: any) => {
    if (!user) {
      toast({ title: "Sign up required", description: "Please create an account to download resources.", variant: "destructive" });
      return;
    }
    if (resource.file_url) {
      await supabase.from("resource_downloads").insert({ user_id: user.id, resource_id: resource.id });
      window.open(resource.file_url, "_blank");
    } else {
      toast({ title: "Coming soon!", description: "This resource will be available for download shortly." });
    }
  };

  return (
    <>
      <section className="hero-gradient section-padding pt-32">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6 border border-gold/20">
              Free Resources
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Marketing Resources<br /><span className="text-gold">To Accelerate Growth</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Download free guides, templates, and checklists crafted by our marketing experts. Sign up to access all resources.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <SectionHeading badge="Downloads" title="Free Marketing Resources" subtitle="Premium marketing tools — completely free for registered users." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayResources.map((r: any, i: number) => {
              const Icon = categoryIcons[r.category] || FileText;
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <span className="inline-block text-xs font-semibold text-primary bg-secondary px-3 py-1 rounded-full mb-3">{r.category}</span>
                  <h3 className="font-display text-lg font-bold text-card-foreground mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{r.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">{r.download_count}+ downloads</span>
                    {user ? (
                      <Button size="sm" onClick={() => handleDownload(r)}>
                        <Download size={14} className="mr-1" /> Download
                      </Button>
                    ) : (
                      <Button size="sm" asChild>
                        <Link to="/signup"><Lock size={14} className="mr-1" /> Sign Up to Access</Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
