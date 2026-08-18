"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerApi } from "@/apis/auth.api";
import { Sparkles, User, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
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
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1200);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Registration failed. Email may already be in use."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      
      <div className="auth-glow-blob" />

      <div className="glass-card auth-card">
        
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Sparkles className="w-6 h-6 text-emerald" />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join TypeCast to build AI-enhanced engineering resumes</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="w-5 h-5 input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Alex Mercer"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="w-5 h-5 input-icon" />
              <input
                type="email"
                name="email"
                placeholder="alex@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="w-5 h-5 input-icon" />
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-emerald auth-submit-btn">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-link">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-emerald font-bold">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
