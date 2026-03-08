import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Edit2, X, Check, Star } from "lucide-react";

const AdminReviews = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", company: "", text: "", rating: 5, published: true });

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { name: form.name, company: form.company || null, text: form.text, rating: form.rating, published: form.published };
      if (editId) {
        const { error } = await supabase.from("reviews").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("reviews").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { toast({ title: editId ? "✅ Review updated!" : "✅ Review added!" }); qc.invalidateQueries({ queryKey: ["admin-reviews"] }); resetForm(); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("reviews").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast({ title: "Review deleted" }); qc.invalidateQueries({ queryKey: ["admin-reviews"] }); },
  });

  const resetForm = () => { setForm({ name: "", company: "", text: "", rating: 5, published: true }); setEditId(null); setShowForm(false); };

  const startEdit = (r: any) => {
    setForm({ name: r.name, company: r.company || "", text: r.text, rating: r.rating, published: r.published });
    setEditId(r.id); setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">⭐ Client Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">Client reviews add karein — yeh homepage par dikhenge</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? <><X size={14} className="mr-1" /> Cancel</> : <><Plus size={14} className="mr-1" /> Add Review</>}</Button>
      </div>
      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Client Name *</label>
              <Input placeholder="Client ka naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Company</label>
              <Input placeholder="Company ka naam" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Testimonial *</label>
            <Textarea placeholder="Client ne kya kaha..." value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium mr-2">Rating:</span>
              {[1,2,3,4,5].map((n) => (
                <button key={n} onClick={() => setForm({ ...form, rating: n })} className="p-0.5">
                  <Star size={20} className={n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
            </label>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.name || !form.text || saveMutation.isPending}>
              <Check size={14} className="mr-1" /> {editId ? "Update" : "Add Review"}
            </Button>
          </div>
        </div>
      )}
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {reviews?.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{r.name}</h3>
                  <span className="text-xs text-muted-foreground">{r.company}</span>
                  <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{r.text}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(r)}><Edit2 size={14} /></Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(r.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
          {reviews?.length === 0 && <p className="text-muted-foreground text-center py-8">Koi review nahi hai abhi.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
