import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Edit2, X, Check } from "lucide-react";

const AdminResources = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "", file_url: "", published: true });

  const { data: resources, isLoading } = useQuery({
    queryKey: ["admin-resources"],
    queryFn: async () => {
      const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { title: form.title, description: form.description || null, category: form.category || null, file_url: form.file_url || null, published: form.published };
      if (editId) {
        const { error } = await supabase.from("resources").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("resources").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { toast({ title: editId ? "Resource updated" : "Resource created" }); qc.invalidateQueries({ queryKey: ["admin-resources"] }); resetForm(); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("resources").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast({ title: "Resource deleted" }); qc.invalidateQueries({ queryKey: ["admin-resources"] }); },
  });

  const resetForm = () => { setForm({ title: "", description: "", category: "", file_url: "", published: true }); setEditId(null); setShowForm(false); };

  const startEdit = (r: any) => {
    setForm({ title: r.title, description: r.description || "", category: r.category || "", file_url: r.file_url || "", published: r.published });
    setEditId(r.id); setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Resources</h1>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? <><X size={14} className="mr-1" /> Cancel</> : <><Plus size={14} className="mr-1" /> Add Resource</>}</Button>
      </div>
      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Category (PDF, Guide, etc.)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          <Input placeholder="File URL" value={form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending}><Check size={14} className="mr-1" /> {editId ? "Update" : "Create"}</Button>
          </div>
        </div>
      )}
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {resources?.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <h3 className="font-semibold text-foreground">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.category} • {r.download_count} downloads • {r.published ? "Published" : "Draft"}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(r)}><Edit2 size={14} /></Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(r.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
          {resources?.length === 0 && <p className="text-muted-foreground text-center py-8">No resources yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminResources;
