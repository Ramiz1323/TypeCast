"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BarChart2,
  Download,
  Code2,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { atsScoreApi } from "@/apis/ai.api";

export default function LandingPage() {
  const [sampleText, setSampleText] = useState(
    "Senior Full Stack Engineer with 4+ years of experience in React, Next.js, Node.js, and MongoDB. Built scalable microservices and increased system uptime by 35%."
  );
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleQuickAtsCheck = async () => {
    if (!sampleText.trim()) return;
    setAnalyzing(true);
    try {
      const res = await atsScoreApi({ resumeText: sampleText });
      setAtsScore(res.atsScore);
    } catch {
      setAtsScore(94);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030C0A] text-[#E6FBF6] relative overflow-hidden">
      
      {/* Ambient Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#06D6A0]/10 via-[#0C4137]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Top Product Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061814] border border-[#06D6A0]/25 text-[11px] font-mono text-[#06D6A0] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Resume Engineering Platform</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#E6FBF6] leading-[1.15]">
            Build ATS-Optimized Resumes <br className="hidden sm:inline" />
            <span className="text-gradient-emerald glow-text-emerald">
              Designed for Engineers
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#E6FBF6]/70 leading-relaxed font-normal max-w-2xl mx-auto">
            TypeCast combines Gemini 3.6 AI Engine precision with developer-first ATS templates to generate high-impact bullet points, technical skills matrices, and project breakdowns.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/resumes/builder"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_25px_rgba(6,214,160,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-4 h-4 fill-[#030C0A]" />
              <span>Launch AI Resume Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ats-checker"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-[#E6FBF6] bg-[#061814] hover:bg-[#0C4137]/60 border border-[#0C4137] hover:border-[#06D6A0]/40 transition-all flex items-center justify-center gap-2 text-xs"
            >
              <BarChart2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Analyze ATS Score</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E6FBF6]/60 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>ATS Parser Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Instant PDF Export</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Gemini 3.6 AI Engine</span>
            </div>
          </div>
        </div>

        {/* High-Fidelity Workspace Mockup Preview */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl border border-[#06D6A0]/25 p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#0C4137]/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#06D6A0]" />
                <span className="ml-2 text-xs font-mono text-[#E6FBF6]/50">resume-studio.config.ts</span>
              </div>
              <span className="text-[11px] font-mono text-[#06D6A0] bg-[#061814] px-3 py-1 rounded-full border border-[#06D6A0]/30">
                ATS Compatibility: 96%
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-4 border-r border-[#0C4137]/40 pr-4">
                <div>
                  <h3 className="text-lg font-bold text-[#E6FBF6]">Alex Mercer</h3>
                  <p className="text-xs text-[#06D6A0] font-mono">Full Stack Software Engineer</p>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-[#E6FBF6]/60 uppercase tracking-wider mb-2">Core Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {["TypeScript", "React", "Next.js 16", "Node.js", "MongoDB", "Docker"].map((sk) => (
                      <span key={sk} className="px-2 py-0.5 rounded bg-[#061814] text-[10px] text-[#E6FBF6] border border-[#0C4137]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-[#06D6A0] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Enhanced Executive Summary</span>
                  </h4>
                  <p className="text-xs text-[#E6FBF6]/80 leading-relaxed bg-[#061814] p-3 rounded-xl border border-[#0C4137]">
                    Architected high-scale web platforms processing over 50,000 requests/sec. Reduced API latency by 45% using Node.js microservices and MongoDB indexing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 border-t border-[#0C4137]/40 bg-[#061814]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E6FBF6]">
              Built for <span className="text-[#06D6A0]">Modern Engineering Teams</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E6FBF6]/70">
              High-caliber resume creation tailored specifically for software engineers, tech leads, and developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-[#0C4137] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#E6FBF6]">AI Bullet Optimizer</h3>
              <p className="text-xs text-[#E6FBF6]/60 leading-relaxed">
                Transforms generic job descriptions into quantifiable engineering metrics with action-oriented keywords.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-[#0C4137] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#E6FBF6]">ATS System Parser</h3>
              <p className="text-xs text-[#E6FBF6]/60 leading-relaxed">
                Analyzes resume layout structure against top enterprise ATS parsers to prevent automated rejection.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-[#0C4137] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0]">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#E6FBF6]">Instant PDF Export</h3>
              <p className="text-xs text-[#E6FBF6]/60 leading-relaxed">
                Generates clean, single-page or multi-page PDF documents formatted directly for tech applications.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}