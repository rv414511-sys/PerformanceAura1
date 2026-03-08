import { useEffect } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, FileText, Star, Users, BookOpen, Download, CreditCard, MessageSquare, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Blog Posts", to: "/admin/blogs", icon: FileText },
  { label: "Reviews", to: "/admin/reviews", icon: Star },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Leads", to: "/admin/leads", icon: MessageSquare },
  { label: "Resources", to: "/admin/resources", icon: Download },
  { label: "Payments", to: "/admin/payments", icon: CreditCard },
  { label: "Users", to: "/admin/users", icon: Users },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col shrink-0">
        <Link to="/" className="font-display text-xl font-bold text-primary mb-8">PerformanceAura</Link>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link to="/"><Home size={16} className="mr-2" /> View Site</Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive" onClick={() => { signOut(); navigate("/"); }}>
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
