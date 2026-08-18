"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllResumesApi } from "@/apis/resume.api";
import { IResume } from "@/types/resume.types";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  Plus,
  Sparkles,
  BarChart2,
  Edit3,
  Loader2,
  Clock,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  LogIn,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchResumes();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const data = await getAllResumesApi();
      if (Array.isArray(data)) {
        setResumes(data);
      } else {
        setResumes([]);
      }
    } catch (error) {
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#06D6A0] animate-spin" />
        <p className="text-xs font-mono text-[#E6FBF6]/60">Authenticating session...</p>
      </div>
    );
  }

  // Unauthenticated Guard
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-[#0C4137] text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#E6FBF6]">Authentication Required</h2>
            <p className="text-xs text-[#E6FBF6]/60 leading-relaxed">
              Please sign in to access your saved engineering resumes and AI developer tools.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="w-full py-3.5 rounded-xl font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.3)] transition-all flex items-center justify-center gap-2 text-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In to Dashboard</span>
            </Link>
            <Link
              href="/auth/register"
              className="w-full py-3.5 rounded-xl font-semibold text-[#E6FBF6] bg-[#061814] border border-[#0C4137] hover:border-[#06D6A0]/40 transition-all text-xs"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030C0A] text-[#E6FBF6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#0C4137]/50 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E6FBF6] tracking-tight">
              Developer <span className="text-[#06D6A0]">Workspace</span>
            </h1>
            <p className="text-xs text-[#E6FBF6]/60 mt-1">
              Signed in as <span className="text-[#06D6A0] font-mono font-medium">{user?.email}</span>
            </p>
          </div>

          <Link
            href="/resumes/builder"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.25)] transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Resume</span>
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="glass-card p-5 rounded-2xl border border-[#0C4137] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#E6FBF6]">{resumes.length}</div>
              <div className="text-xs text-[#E6FBF6]/60 font-medium">Saved Resumes</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#0C4137] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0]">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#06D6A0]">94%</div>
              <div className="text-xs text-[#E6FBF6]/60 font-medium">ATS Pass Probability</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#0C4137] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#E6FBF6]">Gemini 2.0</div>
              <div className="text-xs text-[#E6FBF6]/60 font-medium">Active AI Engine</div>
            </div>
          </div>
        </div>

        {/* Resumes Grid Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#E6FBF6] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#06D6A0]" />
              <span>Your Engineering Resumes</span>
            </h2>
            <span className="text-xs font-mono text-[#06D6A0] bg-[#061814] px-3 py-1 rounded-full border border-[#0C4137]">
              {resumes.length} Total
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center glass-card rounded-2xl border border-[#0C4137]">
              <Loader2 className="w-6 h-6 text-[#06D6A0] animate-spin mx-auto mb-2" />
              <p className="text-xs text-[#E6FBF6]/60">Fetching workspace resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center glass-card rounded-3xl border border-[#0C4137] max-w-xl mx-auto p-8 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#E6FBF6]">No resumes created yet</h3>
                <p className="text-xs text-[#E6FBF6]/60 max-w-md mx-auto">
                  Build your first ATS-optimized developer resume with Gemini AI assistance.
                </p>
              </div>
              <Link
                href="/resumes/builder"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.25)] transition-all text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your Resume</span>
              </Link>
            </div>
          ) : (
            /* Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resumes.map((resume) => (
                <div
                  key={resume._id || resume.title}
                  className="glass-card glass-card-hover rounded-2xl border border-[#0C4137] p-6 space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-xl bg-[#061814] text-[#06D6A0] border border-[#06D6A0]/30">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-[#06D6A0] bg-[#0C4137]/40 px-2.5 py-0.5 rounded-full border border-[#06D6A0]/20">
                        ATS Optimized
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#E6FBF6] group-hover:text-[#06D6A0] transition-colors">
                        {resume.title || "Developer Resume"}
                      </h3>
                      <p className="text-xs text-[#E6FBF6]/60 line-clamp-2 mt-1">
                        {resume.summary || "No summary added"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0C4137]/60 flex items-center justify-between text-xs text-[#E6FBF6]/50">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#06D6A0]" />
                      <span>Ready</span>
                    </div>

                    <Link
                      href={`/resumes/builder?id=${resume._id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#061814] text-[#06D6A0] hover:bg-[#0C4137] transition-all border border-[#0C4137] flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  </div>

                </div>
              ))}

              {/* Add Card */}
              <Link
                href="/resumes/builder"
                className="glass-card rounded-2xl border border-dashed border-[#06D6A0]/30 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[200px] hover:border-[#06D6A0] hover:bg-[#0C4137]/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#E6FBF6] group-hover:text-[#06D6A0]">Create New Resume</h4>
                  <p className="text-[11px] text-[#E6FBF6]/50 mt-0.5">Start with AI Studio</p>
                </div>
              </Link>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
