import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Star, Users, BookOpen, MessageSquare, CreditCard, Download } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [leads, blogs, reviews, courses, resources, payments] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("payments").select("id", { count: "exact", head: true }),
      ]);
      return {
        leads: leads.count || 0,
        blogs: blogs.count || 0,
        reviews: reviews.count || 0,
        courses: courses.count || 0,
        resources: resources.count || 0,
        payments: payments.count || 0,
      };
    },
  });

  const cards = [
    { label: "Leads", count: stats?.leads, icon: MessageSquare, color: "text-blue-600" },
    { label: "Blog Posts", count: stats?.blogs, icon: FileText, color: "text-green-600" },
    { label: "Reviews", count: stats?.reviews, icon: Star, color: "text-yellow-600" },
    { label: "Courses", count: stats?.courses, icon: BookOpen, color: "text-purple-600" },
    { label: "Resources", count: stats?.resources, icon: Download, color: "text-orange-600" },
    { label: "Payments", count: stats?.payments, icon: CreditCard, color: "text-red-600" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <c.icon size={24} className={c.color} />
              <span className="font-display text-3xl font-bold text-foreground">{c.count ?? "—"}</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
