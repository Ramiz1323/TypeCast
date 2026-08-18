"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerApi, loginApi } from "@/apis/auth.api";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, User, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registerApi(form);
      await loginApi({ email: form.email, password: form.password });
      await checkAuth();
      setSuccess("Account created successfully! Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Registration failed. Email may already be in use."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-obsidian">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#06D6A0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0C4137]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Register Card */}
      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-[#0C4137] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0C4137] to-[#06D6A0] p-0.5 shadow-lg shadow-[#06D6A0]/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#030D0B] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#06D6A0]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E6FBF6] tracking-tight">
            Create Your Account
          </h1>
          <p className="text-sm text-[#E6FBF6]/60 mt-1">
            Join TypeCast to build AI-enhanced engineering resumes
          </p>
        </div>

        {/* Feedback Banners */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-sm flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-[#0C4137]/60 border border-[#06D6A0]/50 text-[#06D6A0] text-sm flex items-start gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#E6FBF6]/80 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#06D6A0]/60" />
              <input
                type="text"
                name="name"
                placeholder="Alex Mercer"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#061814] border border-[#0C4137] text-[#E6FBF6] placeholder-[#E6FBF6]/30 focus:outline-none focus:border-[#06D6A0] focus:ring-1 focus:ring-[#06D6A0] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E6FBF6]/80 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#06D6A0]/60" />
              <input
                type="email"
                name="email"
                placeholder="alex@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#061814] border border-[#0C4137] text-[#E6FBF6] placeholder-[#E6FBF6]/30 focus:outline-none focus:border-[#06D6A0] focus:ring-1 focus:ring-[#06D6A0] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E6FBF6]/80 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#06D6A0]/60" />
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#061814] border border-[#0C4137] text-[#E6FBF6] placeholder-[#E6FBF6]/30 focus:outline-none focus:border-[#06D6A0] focus:ring-1 focus:ring-[#06D6A0] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 mt-2 rounded-xl font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_25px_rgba(6,214,160,0.35)] hover:shadow-[0_0_35px_rgba(6,214,160,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-[#0C4137]/40 text-center">
          <p className="text-sm text-[#E6FBF6]/60">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#06D6A0] font-semibold hover:underline inline-flex items-center gap-1"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
