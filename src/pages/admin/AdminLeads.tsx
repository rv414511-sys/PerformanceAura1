import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Mail, Phone, Building2 } from "lucide-react";

const AdminLeads = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast({ title: "Status updated" }); qc.invalidateQueries({ queryKey: ["admin-leads"] }); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("leads").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { toast({ title: "Lead deleted" }); qc.invalidateQueries({ queryKey: ["admin-leads"] }); },
  });

  const statusColors: Record<string, string> = { new: "bg-blue-100 text-blue-700", "in progress": "bg-yellow-100 text-yellow-700", closed: "bg-green-100 text-green-700" };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Leads</h1>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {leads?.map((l) => (
            <div key={l.id} className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{l.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail size={14} /> {l.email}</span>
                    {l.phone && <span className="flex items-center gap-1"><Phone size={14} /> {l.phone}</span>}
                    {l.company && <span className="flex items-center gap-1"><Building2 size={14} /> {l.company}</span>}
                  </div>
                  {l.message && <p className="text-sm text-muted-foreground mt-2">{l.message}</p>}
                  <p className="text-xs text-muted-foreground mt-2">{new Date(l.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus.mutate({ id: l.id, status: e.target.value })}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border-0 ${statusColors[l.status] || "bg-muted text-foreground"}`}
                  >
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(l.id)}><Trash2 size={14} /></Button>
                </div>
              </div>
            </div>
          ))}
          {leads?.length === 0 && <p className="text-muted-foreground text-center py-8">No leads yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
