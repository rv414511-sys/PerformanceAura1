import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard } from "lucide-react";

const AdminPayments = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const statusColors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-700", completed: "bg-green-100 text-green-700", failed: "bg-red-100 text-red-700" };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Payments</h1>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="space-y-3">
          {payments?.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-4">
                <CreditCard size={20} className="text-muted-foreground" />
                <div>
                  <h3 className="font-semibold text-foreground">{p.item_title || p.payment_type}</h3>
                  <p className="text-xs text-muted-foreground">₹{p.amount} {p.currency} • {p.provider || "N/A"} • {new Date(p.created_at).toLocaleString()}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[p.status] || "bg-muted text-foreground"}`}>{p.status}</span>
            </div>
          ))}
          {payments?.length === 0 && <p className="text-muted-foreground text-center py-8">No payments yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
