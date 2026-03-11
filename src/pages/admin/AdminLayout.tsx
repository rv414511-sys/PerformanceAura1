import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, FileText, Star, Users, BookOpen, Download, CreditCard, MessageSquare, LogOut, Home, Settings, Menu, X, FileEdit, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Pages", to: "/admin/pages", icon: FileEdit },
  { label: "Blog Posts", to: "/admin/blogs", icon: FileText },
  { label: "Reviews", to: "/admin/reviews", icon: Star },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Leads", to: "/admin/leads", icon: MessageSquare },
  { label: "Resources", to: "/admin/resources", icon: Download },
  { label: "Payments", to: "/admin/payments", icon: CreditCard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile menu button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static z-40 h-full w-64 bg-card border-r border-border p-6 flex flex-col shrink-0 transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Link to="/" className="font-display text-xl font-bold text-primary mb-8">PerformanceAura</Link>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                (item.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.to))
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

      <main className="flex-1 p-4 md:p-8 overflow-auto md:ml-0 mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
