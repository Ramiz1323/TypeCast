"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Cpu,
  ListFilter,
  Download,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] relative overflow-hidden font-sans">
      
      {/* Subtle Background Radial Glow matching Obsidian Emerald */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#10B981]/10 via-[#064E3B]/10 to-transparent blur-3xl pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        
        {/* Top Developer Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161F2E] border border-[#10B981]/40 text-xs font-mono text-[#10B981] uppercase tracking-wider">
            <span>&lt;&gt; DEVELOPER RESUME ENGINEERING PLATFORM</span>
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Build ATS-Optimized <br />
            Resumes <br />
            <span className="text-[#10B981]">Designed for Engineers</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto font-normal">
            TypeCast combines Gemini 3.6 AI Engine precision with developer-first ATS templates to generate high-impact bullet points, technical skills matrices, and project breakdowns.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/resumes/builder"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[#0B0E14] bg-[#10B981] hover:bg-[#059669] shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-[#0B0E14]" />
              <span>Launch AI Resume Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ats-checker"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-[#E2E8F0] bg-[#161F2E] hover:bg-[#1E293B] border border-[#1E293B] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-[#10B981]" />
              <span>Analyze ATS Score</span>
            </Link>
          </div>

          {/* Features Checklists below buttons */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>ATS Parser Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Instant PDF Export</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Gemini 3.6 AI Engine</span>
            </div>
          </div>
        </div>

        {/* CODE EDITOR WORKSPACE MOCKUP (resume-studio.config.ts) */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-[#161F2E] rounded-2xl border border-[#1E293B] p-6 shadow-2xl text-left">
            
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="ml-3 text-xs font-mono text-[#94A3B8]">resume-studio.config.ts</span>
              </div>
              
              <span className="text-[11px] font-mono text-[#10B981] bg-[#064E3B]/50 px-3 py-1 rounded-md border border-[#10B981]/30">
                ATS Compatibility: 96%
              </span>
            </div>

            {/* Inner Content Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Side */}
              <div className="space-y-4 md:border-r border-[#1E293B] md:pr-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Alex Mercer</h3>
                  <p className="text-xs text-[#10B981] font-mono mt-0.5">Full Stack Software Engineer</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider block">
                    CORE TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["TypeScript", "React", "Next.js 14", "Node.js", "MongoDB", "Docker"].map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded bg-[#0B0E14] text-[10px] font-mono text-[#E2E8F0] border border-[#1E293B]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="md:col-span-2 space-y-4">
                <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E293B] space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
                    <span>&lt;&gt; AI ENHANCED EXECUTIVE SUMMARY</span>
                  </div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-sans">
                    Architected high-scale web platforms processing over 50,000 requests/sec. Reduced API latency by 45% using Node.js microservices and MongoDB indexing.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* FEATURE GRID SECTION */}
      <section className="py-20 border-t border-[#1E293B] bg-[#0E141F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built for <span className="text-[#10B981]">Modern Engineering Teams</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              High-caliber resume creation tailored specifically for software engineers, tech leads, and developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1 */}
            <div className="bg-[#161F2E] p-8 rounded-2xl border border-[#1E293B] space-y-4 hover:border-[#10B981]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0B0E14] border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Bullet Optimizer</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Transforms generic job descriptions into quantifiable engineering metrics with action-oriented keywords.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#161F2E] p-8 rounded-2xl border border-[#1E293B] space-y-4 hover:border-[#10B981]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0B0E14] border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                <ListFilter className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">ATS System Parser</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Analyzes resume layout structure against top enterprise ATS parsers to prevent automated rejection.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#161F2E] p-8 rounded-2xl border border-[#1E293B] space-y-4 hover:border-[#10B981]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0B0E14] border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Instant PDF Export</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Generates clean, single-page or multi-page PDF documents formatted directly for tech applications.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}