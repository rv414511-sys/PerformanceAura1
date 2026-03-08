import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Edit2, X, Check } from "lucide-react";

const AdminBlogs = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "", meta_description: "", keywords: "", published: true });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        excerpt: form.excerpt || null,
        content: form.content || null,
        category: form.category || null,
        meta_description: form.meta_description || null,
        keywords: form.keywords ? form.keywords.split(",").map((k) => k.trim()) : null,
        published: form.published,
      };
      if (editId) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: editId ? "Post updated" : "Post created" });
      qc.invalidateQueries({ queryKey: ["admin-blogs"] });
      resetForm();
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast({ title: "Post deleted" }); qc.invalidateQueries({ queryKey: ["admin-blogs"] }); },
  });

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", category: "", meta_description: "", keywords: "", published: true });
    setEditId(null);
    setShowForm(false);
  };

  const startEdit = (p: any) => {
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content || "",
      category: p.category || "",
      meta_description: p.meta_description || "",
      keywords: p.keywords?.join(", ") || "",
      published: p.published,
    });
    setEditId(p.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Blog Posts</h1>
        <Button onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? <><X size={14} className="mr-1" /> Cancel</> : <><Plus size={14} className="mr-1" /> New Post</>}
        </Button>
      </div>

      {showForm && (
        <div className="p-6 rounded-xl border border-border bg-card mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Slug (auto-generated)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input placeholder="Keywords (comma separated)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          </div>
          <Input placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <Input placeholder="Meta Description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
          <Textarea placeholder="Content (supports markdown-style text)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Published
            </label>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending}>
              <Check size={14} className="mr-1" /> {editId ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-3">
          {posts?.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.category} • {p.published ? "Published" : "Draft"} • {new Date(p.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(p)}><Edit2 size={14} /></Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(p.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
          {posts?.length === 0 && <p className="text-muted-foreground text-center py-8">No blog posts yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
