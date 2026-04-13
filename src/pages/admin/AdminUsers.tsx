import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldOff } from "lucide-react";

const AdminUsers = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: roles, error: rolesError } = await supabase.from("user_roles").select("*");
      if (rolesError) throw rolesError;
      const { data: profs, error: profsError } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (profsError) throw profsError;
      return profs.map((p) => ({
        ...p,
        role: roles?.find((r) => r.user_id === p.id)?.role || "user",
        roleId: roles?.find((r) => r.user_id === p.id)?.id,
      }));
    },
  });

  const toggleAdmin = useMutation({
    mutationFn: async ({ userId, currentRole, roleId }: { userId: string; currentRole: string; roleId?: string }) => {
      if (currentRole === "admin") {
        // Demote to user
        if (roleId) {
          const { error } = await supabase.from("user_roles").update({ role: "user" as any }).eq("id", roleId);
          if (error) throw error;
        }
      } else {
        // Promote to admin
        if (roleId) {
          const { error } = await supabase.from("user_roles").update({ role: "admin" as any }).eq("id", roleId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" as any });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => { toast({ title: "Role updated!" }); qc.invalidateQueries({ queryKey: ["admin-users"] }); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">👥 Users</h1>
        <p className="text-sm text-muted-foreground mt-1">Registered users dekhein aur admin role assign karein</p>
      </div>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {profiles?.map((u: any) => (
            <div key={u.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {u.full_name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{u.full_name || "Unnamed"}</h3>
                  {u.email && <p className="text-xs text-muted-foreground">{u.email}</p>}
                  <p className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${u.role === "admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {u.role}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAdmin.mutate({ userId: u.id, currentRole: u.role, roleId: u.roleId })}
                  title={u.role === "admin" ? "Remove admin" : "Make admin"}
                >
                  {u.role === "admin" ? <ShieldOff size={14} /> : <Shield size={14} />}
                </Button>
              </div>
            </div>
          ))}
          {profiles?.length === 0 && <p className="text-muted-foreground text-center py-8">No users yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
