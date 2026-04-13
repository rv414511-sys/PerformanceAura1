import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Star, Users, BookOpen, MessageSquare, CreditCard, Download } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [leads, blogs, reviews, courses, resources, payments, users, pageViews] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("payments").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("analytics_events").select("id", { count: "exact", head: true }),
      ]);
      return {
        leads: leads.count || 0, blogs: blogs.count || 0, reviews: reviews.count || 0,
        courses: courses.count || 0, resources: resources.count || 0, payments: payments.count || 0,
        users: users.count || 0, pageViews: pageViews.count || 0,
      };
    },
  });

  const { data: recentViews } = useQuery({
    queryKey: ["admin-recent-page-views"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_events")
        .select("id, event_type, path, created_at, user_id")
        .eq("event_type", "page_view")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data || [];
    },
  });

  const cards = [
    { label: "Leads", count: stats?.leads, icon: MessageSquare, color: "bg-blue-500", to: "/admin/leads" },
    { label: "Blog Posts", count: stats?.blogs, icon: FileText, color: "bg-green-500", to: "/admin/blogs" },
    { label: "Reviews", count: stats?.reviews, icon: Star, color: "bg-yellow-500", to: "/admin/reviews" },
    { label: "Courses", count: stats?.courses, icon: BookOpen, color: "bg-purple-500", to: "/admin/courses" },
    { label: "Resources", count: stats?.resources, icon: Download, color: "bg-orange-500", to: "/admin/resources" },
    { label: "Payments", count: stats?.payments, icon: CreditCard, color: "bg-red-500", to: "/admin/payments" },
    { label: "Users", count: stats?.users, icon: Users, color: "bg-slate-600", to: "/admin/users" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">🎯 Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Yahan se apni puri website control karein — blogs, reviews, courses, images sab kuchh!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center`}>
                <c.icon size={22} className="text-white" />
              </div>
              <span className="font-display text-3xl font-bold text-foreground">{c.count ?? "—"}</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-border bg-card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-foreground">📈 Recent Page Views</h2>
          <div className="text-xs text-muted-foreground">Total: {stats?.pageViews ?? "—"}</div>
        </div>
        <div className="space-y-2">
          {recentViews?.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{e.path || "/"}</div>
                <div className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString()}</div>
              </div>
              <div className="text-xs text-muted-foreground shrink-0">{e.user_id ? "Logged-in" : "Guest"}</div>
            </div>
          ))}
          {recentViews?.length === 0 && <p className="text-sm text-muted-foreground">No page views yet.</p>}
        </div>
      </div>

      {/* Quick guide */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="font-display text-lg font-bold text-foreground mb-4">🚀 Quick Guide — Kaise use karein?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <span className="text-lg">📝</span>
            <div><strong className="text-foreground">Blog Posts</strong> — Naye blog likhein, SEO keywords add karein, publish/unpublish karein</div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">⭐</span>
            <div><strong className="text-foreground">Reviews</strong> — Client reviews add karein jo homepage par dikhenge</div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">📚</span>
            <div><strong className="text-foreground">Courses</strong> — Courses add/edit karein, price set karein</div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">📥</span>
            <div><strong className="text-foreground">Resources</strong> — PDFs/guides upload karein, users signup ke baad download karenge</div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">💬</span>
            <div><strong className="text-foreground">Leads</strong> — Contact form submissions dekhein aur manage karein</div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">⚙️</span>
            <div><strong className="text-foreground">Settings</strong> — Hero section, stats, founder info — sab yahan se change karein</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
