import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import logoImg from "@/assets/logo.png";

// After login, admins go to /admin, others go to /

const Login = () => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      const isInvalidCreds = error.message?.toLowerCase?.().includes("invalid login credentials");
      toast({
        title: isInvalidCreds ? "Login failed" : error.message,
        description: isInvalidCreds
          ? "Ya to password galat hai ya email verify nahi hui. Signup ke baad verification mail confirm karo."
          : undefined,
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      toast({ title: "Welcome back!" });
      navigate(isAdmin ? "/admin" : "/");
      return;
    }

    navigate("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding bg-surface">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img src={logoImg} alt="PerformanceAura" className="h-10 w-auto mx-auto" />
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your PerformanceAura account</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border bg-card space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={128} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={async () => {
              if (!email) {
                toast({ title: "Pehle email enter kijiye", variant: "destructive" });
                return;
              }
              const { error } = await resendVerification(email);
              if (error) {
                toast({ title: "Verification mail resend failed", description: error.message, variant: "destructive" });
              } else {
                toast({ title: "Verification email sent", description: "Inbox/spam check kijiye." });
              }
            }}
          >
            Resend Verification Email
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
