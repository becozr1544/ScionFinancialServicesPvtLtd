import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// In a real-world app, the keyframes for the animation
// would be in a global CSS file (e.g., index.css).
const animationStyle = `
  @keyframes move-bg {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate("/admin/dashboard");
    }
  }, [session, loading, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "You must accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    if (isLoginView) {
      // Login logic
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Invalid Credentials",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting you to the dashboard.",
        });
        navigate("/admin/dashboard");
      }
    } else {
      // Registration logic
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Please check your email to confirm your account.",
        });
        setIsLoginView(true); // Switch to login view after successful registration
      }
    }
  };

  return (
    <>
      <style>{animationStyle}</style>
      <div
        className="flex min-h-screen items-center justify-center p-4"
        style={{
          background:
            "linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569)",
          backgroundSize: "400% 400%",
          animation: "move-bg 15s ease infinite",
        }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="transform-gpu rounded-2xl border border-slate-200/10 bg-slate-800/50 p-8 shadow-2xl shadow-slate-900/50 backdrop-blur-xl transition-all duration-500 hover:shadow-cyan-400/20">
            <div className="text-center">
            <img src="../../assets/logo2.png" alt="scion-Logo" className="mx-auto h-12 w-auto" />
              <h1 className="text-4xl font-bold tracking-tight text-slate-50">
                {isLoginView ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="mt-2 text-slate-400">
                {isLoginView
                  ? "Login to access your Scion Financial dashboard."
                  : "Fill in the details to create your account."}
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email Field */}
                <div className="relative">
                  <Label
                    htmlFor="email"
                    className="absolute -top-2 left-4 inline-block bg-slate-800/50 px-1 text-xs font-medium text-slate-400 backdrop-blur-sm"
                  >
                    Email ID
                  </Label>
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="block w-full rounded-lg border border-slate-600 bg-transparent py-3 pl-12 pr-4 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Label
                    htmlFor="password"
                    className="absolute -top-2 left-4 inline-block bg-slate-800/50 px-1 text-xs font-medium text-slate-400 backdrop-blur-sm"
                  >
                    Password
                  </Label>
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-slate-600 bg-transparent py-3 pl-12 pr-4 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center">
                <Checkbox
                  id="terms"
                  className="h-4 w-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-600"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-slate-400"
                >
                  I accept the{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    terms and conditions
                  </Link>{" "}
                  by Scion Financials Services Pvt Ltd.
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg border border-transparent bg-cyan-500 py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-600 hover:shadow-xl hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  {isLoginView ? "Login" : "Create Account"}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                {isLoginView
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}