import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

const AdminUsers = () => {
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
      }));
    },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Users</h1>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {profiles?.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {u.full_name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{u.full_name || "Unnamed"}</h3>
                  <p className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${u.role === "admin" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {u.role}
              </span>
            </div>
          ))}
          {profiles?.length === 0 && <p className="text-muted-foreground text-center py-8">No users yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
