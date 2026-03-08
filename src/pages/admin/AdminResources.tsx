import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Edit2, X, Check, Upload, Loader2 } from "lucide-react";
import { useRef } from "react";

const AdminResources = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", file_url: "", published: true });

  const { data: resources, isLoading } = useQuery({
    queryKey: ["admin-resources"],
    queryFn: async () => {
      const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File 10MB se chhota hona chahiye", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `resources/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(fileName, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(fileName);
    setForm({ ...form, file_url: urlData.publicUrl });
    toast({ title: "File uploaded!" });
    setUploading(false);
  };

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
    onSuccess: () => { toast({ title: editId ? "✅ Updated!" : "✅ Resource created!" }); qc.invalidateQueries({ queryKey: ["admin-resources"] }); resetForm(); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("resources").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast({ title: "Deleted" }); qc.invalidateQueries({ queryKey: ["admin-resources"] }); },
  });

  const resetForm = () => { setForm({ title: "", description: "", category: "", file_url: "", published: true }); setEditId(null); setShowForm(false); };

  const startEdit = (r: any) => {
    setForm({ title: r.title, description: r.description || "", category: r.category || "", file_url: r.file_url || "", published: r.published });
    setEditId(r.id); setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">📥 Resources</h1>
          <p className="text-sm text-muted-foreground mt-1">PDF, guides, templates upload karein — users signup ke baad download kar sakenge</p>
        </div>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>{showForm ? <><X size={14} className="mr-1" /> Cancel</> : <><Plus size={14} className="mr-1" /> Add Resource</>}</Button>
      </div>
      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Title *</label>
              <Input placeholder="Resource ka naam" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <Input placeholder="PDF, Guide, Template, Checklist" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
          </div>
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          
          {/* File upload area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">File Upload</label>
            {form.file_url ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <span className="text-sm text-foreground truncate flex-1">{form.file_url.split("/").pop()}</span>
                <Button variant="outline" size="sm" onClick={() => setForm({ ...form, file_url: "" })}>Change</Button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin text-primary" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Upload size={24} className="text-muted-foreground" />
                    <p className="text-sm font-medium">Click karke file upload karein</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, Images • Max 10MB</p>
                  </div>
                )}
              </div>
            )}
            <input ref={fileRef} type="file" onChange={handleFileUpload} className="hidden" />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
            </label>
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
                <p className="text-xs text-muted-foreground">{r.category} • {r.download_count} downloads • {r.published ? "✅ Published" : "📝 Draft"}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(r)}><Edit2 size={14} /></Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(r.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
          {resources?.length === 0 && <p className="text-muted-foreground text-center py-8">Koi resource nahi hai abhi.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminResources;
