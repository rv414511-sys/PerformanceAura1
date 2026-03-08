import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Edit2, X, Check } from "lucide-react";

const AdminCourses = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", duration: "", price: 0, topics: "", published: true });

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        description: form.description || null,
        duration: form.duration || null,
        price: form.price,
        topics: form.topics ? form.topics.split(",").map((t) => t.trim()) : null,
        published: form.published,
      };
      if (editId) {
        const { error } = await supabase.from("courses").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { toast({ title: editId ? "Course updated" : "Course created" }); qc.invalidateQueries({ queryKey: ["admin-courses"] }); resetForm(); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("courses").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast({ title: "Course deleted" }); qc.invalidateQueries({ queryKey: ["admin-courses"] }); },
  });

  const resetForm = () => { setForm({ title: "", description: "", duration: "", price: 0, topics: "", published: true }); setEditId(null); setShowForm(false); };

  const startEdit = (c: any) => {
    setForm({ title: c.title, description: c.description || "", duration: c.duration || "", price: c.price, topics: c.topics?.join(", ") || "", published: c.published });
    setEditId(c.id); setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Courses</h1>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? <><X size={14} className="mr-1" /> Cancel</> : <><Plus size={14} className="mr-1" /> Add Course</>}</Button>
      </div>
      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Course Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Duration (e.g., 6 Weeks)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            <Input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
            <Input placeholder="Topics (comma separated)" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} />
          </div>
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending}><Check size={14} className="mr-1" /> {editId ? "Update" : "Create"}</Button>
          </div>
        </div>
      )}
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {courses?.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <h3 className="font-semibold text-foreground">{c.title}</h3>
                <p className="text-xs text-muted-foreground">₹{c.price} • {c.duration} • {c.published ? "Published" : "Draft"}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(c)}><Edit2 size={14} /></Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(c.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
          {courses?.length === 0 && <p className="text-muted-foreground text-center py-8">No courses yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
