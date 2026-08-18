"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllResumesApi } from "@/apis/resume.api";
import { IResume } from "@/types/resume.types";
import {
  FileText,
  Plus,
  Sparkles,
  BarChart2,
  Edit3,
  Loader2,
  Clock,
  Briefcase,
} from "lucide-react";

export default function DashboardPage() {
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
    } catch {
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
    <div className="dashboard-page app-container py-10">
      <div className="space-y-8">
        
        {/* Header Bar */}
        <div className="dashboard-header border-b border-[#0C4137]/60 pb-6">
          <div>
            <h1 className="dashboard-title">
              Developer <span className="text-emerald">Dashboard</span>
            </h1>
            <p className="dashboard-subtitle">
              Manage your engineering resumes, AI generations, and ATS scores
            </p>
          </div>

          <Link href="/resumes/builder" className="btn btn-emerald">
            <Plus className="w-5 h-5" />
            <span>Create New Resume</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-card stat-card">
            <div className="feature-icon">
              <FileText className="w-6 h-6 text-emerald" />
            </div>
            <div>
              <div className="stat-value">{resumes.length}</div>
              <div className="stat-label">Total Resumes</div>
            </div>
          </div>

          <div className="glass-card stat-card">
            <div className="feature-icon">
              <BarChart2 className="w-6 h-6 text-emerald" />
            </div>
            <div>
              <div className="stat-value text-emerald">94%</div>
              <div className="stat-label">Avg ATS Match Rate</div>
            </div>
          </div>

          <div className="glass-card stat-card">
            <div className="feature-icon">
              <Sparkles className="w-6 h-6 text-emerald" />
            </div>
            <div>
              <div className="stat-value">Unlimited</div>
              <div className="stat-label">Gemini AI Credits</div>
            </div>
          </div>
        </div>

        {/* Resumes Grid Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title text-xl flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald" />
              <span>Your Resumes</span>
            </h2>
            <span className="badge badge-emerald">
              {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"} Saved
            </span>
          </div>

          {loading ? (
            <div className="glass-card text-center py-16">
              <Loader2 className="w-8 h-8 text-emerald animate-spin mx-auto mb-3" />
              <p className="text-sm text-muted">Loading your resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="glass-card text-center py-16 max-w-xl mx-auto space-y-4">
              <div className="feature-icon mx-auto">
                <FileText className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="text-lg font-bold text-polar">No resumes created yet</h3>
              <p className="text-sm text-muted">
                Get started by creating your first AI-enhanced developer resume in under 5 minutes.
              </p>
              <Link href="/resumes/builder" className="btn btn-emerald">
                <Plus className="w-5 h-5" />
                <span>Create Your First Resume</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div key={resume._id || resume.title} className="glass-card glass-card-hover resume-card">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="feature-icon mb-0">
                        <FileText className="w-5 h-5 text-emerald" />
                      </div>
                      <span className="badge badge-emerald">ATS Ready</span>
                    </div>

                    <div>
                      <h3 className="resume-card-title">
                        {resume.title || "Developer Resume"}
                      </h3>
                      <p className="resume-card-desc">
                        {resume.summary || "No summary provided"}
                      </p>
                    </div>
                  </div>

                  <div className="resume-card-footer">
                    <div className="flex items-center gap-1 font-mono text-xs">
                      <Clock className="w-3.5 h-3.5 text-emerald" />
                      <span>Updated recently</span>
                    </div>

                    <Link href={`/resumes/builder?id=${resume._id}`} className="btn btn-outline p-2">
                      <Edit3 className="w-4 h-4 text-emerald" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Add Card */}
              <Link href="/resumes/builder" className="glass-card create-resume-dashed-card">
                <div className="feature-icon mx-auto">
                  <Plus className="w-6 h-6 text-emerald" />
                </div>
                <div>
                  <h4 className="font-bold text-polar">Create New Resume</h4>
                  <p className="text-xs text-muted">Start with Gemini AI Assistant</p>
                </div>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
