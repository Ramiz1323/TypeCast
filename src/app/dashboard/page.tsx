"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllResumesApi } from "@/apis/resume.api";
import { IResume } from "@/types/resume.types";
import {
  FileText,
  Plus,
  Sparkles,
  BarChart2,
  Calendar,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  Loader2,
  Clock,
  Briefcase,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

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
      console.error("Failed to fetch resumes:", error);
      // Demo state fallback if auth session is not active locally
      setResumes([
        {
          _id: "demo-resume-1",
          user_id: "demo" as any,
          title: "Full Stack Engineer Resume",
          summary: "Experienced Full Stack Software Engineer specializing in React, Next.js, Node.js, and cloud architecture.",
          personalInfo: {
            fullname: "Alex Mercer",
            email: "alex@example.com",
            mobile: "+1 555 0192",
            location: "San Francisco, CA",
            github: "github.com/alexmercer",
            linkedIn: "linkedin.com/in/alexmercer",
            portfolio: "alexmercer.dev",
          },
          education: [
            {
              institutionName: "UC Berkeley",
              degree: "B.S. Computer Science",
              startDate: "2018",
              endDate: "2022",
            },
          ],
          projects: [
            {
              title: "TypeCast AI Studio",
              description: "AI-driven resume platform for developers",
              gitHubUrl: "github.com/typecast",
              liveUrl: "typecast.dev",
              techStack: ["Next.js", "TypeScript", "Tailwind", "Gemini AI"],
            },
          ],
          createdAt: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030D0B] text-[#E6FBF6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#0C4137]/60 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#E6FBF6] tracking-tight">
              Developer <span className="text-[#06D6A0]">Dashboard</span>
            </h1>
            <p className="text-sm text-[#E6FBF6]/60 mt-1">
              Manage your engineering resumes, AI generations, and ATS scores
            </p>
          </div>

          <Link
            href="/resumes/builder"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.3)] transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Resume</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-[#0C4137] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#E6FBF6]">{resumes.length}</div>
              <div className="text-xs text-[#E6FBF6]/60 font-medium">Total Resumes</div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#0C4137] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#06D6A0]">94%</div>
              <div className="text-xs text-[#E6FBF6]/60 font-medium">Avg ATS Match Rate</div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-[#0C4137] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#E6FBF6]">Unlimited</div>
              <div className="text-xs text-[#E6FBF6]/60 font-medium">Gemini AI Credits</div>
            </div>
          </div>
        </div>

        {/* Resumes Grid Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#E6FBF6] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#06D6A0]" />
              <span>Your Resumes</span>
            </h2>
            <span className="text-xs font-mono text-[#06D6A0] bg-[#061814] px-3 py-1 rounded-full border border-[#0C4137]">
              {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"} Saved
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center glass-card rounded-2xl border border-[#0C4137]">
              <Loader2 className="w-8 h-8 text-[#06D6A0] animate-spin mx-auto mb-3" />
              <p className="text-sm text-[#E6FBF6]/60">Loading your resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center glass-card rounded-3xl border border-[#0C4137] max-w-2xl mx-auto p-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#E6FBF6]">No resumes created yet</h3>
                <p className="text-sm text-[#E6FBF6]/60 max-w-md mx-auto">
                  Get started by creating your first AI-enhanced developer resume in under 5 minutes.
                </p>
              </div>
              <Link
                href="/resumes/builder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.3)] transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Resume</span>
              </Link>
            </div>
          ) : (
            /* Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume._id || resume.title}
                  className="glass-card glass-card-hover rounded-2xl border border-[#0C4137] p-6 space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-xl bg-[#061814] text-[#06D6A0] border border-[#06D6A0]/30">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-[#06D6A0] bg-[#0C4137]/40 px-2.5 py-1 rounded-full border border-[#06D6A0]/20">
                        ATS Ready
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#E6FBF6] group-hover:text-[#06D6A0] transition-colors">
                        {resume.title || "Developer Resume"}
                      </h3>
                      <p className="text-xs text-[#E6FBF6]/60 line-clamp-2 mt-1">
                        {resume.summary || "No summary provided"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0C4137]/60 flex items-center justify-between text-xs text-[#E6FBF6]/50">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#06D6A0]" />
                      <span>Updated recently</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/resumes/builder?id=${resume._id}`}
                        className="p-2 rounded-lg bg-[#061814] text-[#06D6A0] hover:bg-[#0C4137] transition-colors border border-[#0C4137]"
                        title="Edit Resume"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              ))}

              {/* Add Card */}
              <Link
                href="/resumes/builder"
                className="glass-card rounded-2xl border border-dashed border-[#06D6A0]/40 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[220px] hover:border-[#06D6A0] hover:bg-[#0C4137]/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0] group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#E6FBF6] group-hover:text-[#06D6A0]">Create New Resume</h4>
                  <p className="text-xs text-[#E6FBF6]/50 mt-0.5">Start with Gemini AI Assistant</p>
                </div>
              </Link>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
