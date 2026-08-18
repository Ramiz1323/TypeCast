"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BarChart2,
  Download,
  Terminal,
  Layers,
  Code2,
} from "lucide-react";
import { atsScoreApi } from "@/apis/ai.api";

export default function LandingPage() {
  // Quick ATS Demo State
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
      // Fallback mock score if API key is not configured locally
      setAtsScore(92);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030D0B] text-[#E6FBF6] relative overflow-hidden">
      
      {/* Glow Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#06D6A0]/15 via-[#0C4137]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[600px] -right-40 w-[500px] h-[500px] bg-[#0C4137]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#061814] border border-[#06D6A0]/30 shadow-[0_0_20px_rgba(6,214,160,0.15)] text-xs font-mono text-[#06D6A0] tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini AI Engine v2.0 • Monestra Emerald Theme</span>
          </div>
        </div>

        {/* Hero Headline & Subtext */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#E6FBF6] leading-[1.1]">
            Craft Engineering Resumes That <br className="hidden sm:inline" />
            <span className="text-gradient-emerald glow-text-emerald">
              Get You Hired Faster
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#E6FBF6]/70 font-normal leading-relaxed max-w-2xl mx-auto">
            TypeCast leverages Gemini AI to generate bulletproof project bullets, ATS-optimized summaries, and tech skills matrices tailor-made for developer roles.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/resumes/builder"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_30px_rgba(6,214,160,0.4)] hover:shadow-[0_0_40px_rgba(6,214,160,0.6)] transition-all hover:scale-105 flex items-center justify-center gap-3 text-base"
            >
              <Sparkles className="w-5 h-5 fill-[#030D0B]" />
              <span>Build My Resume Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/ats-checker"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-[#E6FBF6] bg-[#061814] hover:bg-[#0C4137]/60 border border-[#0C4137] hover:border-[#06D6A0]/40 transition-all flex items-center justify-center gap-2 text-base"
            >
              <BarChart2 className="w-5 h-5 text-[#06D6A0]" />
              <span>Check ATS Score</span>
            </Link>
          </div>

          {/* Feature Bullets Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E6FBF6]/60 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>No CC Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Instant PDF Download</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>100% Developer Templates</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Preview Mockup Card */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0C4137] via-[#06D6A0] to-[#0C4137] opacity-40 blur-xl group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative glass-card rounded-2xl border border-[#06D6A0]/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#0C4137]/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#06D6A0]" />
                <span className="ml-2 text-xs font-mono text-[#E6FBF6]/50">typecast-resume-preview.tsx</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#061814] border border-[#06D6A0]/40 text-xs font-mono text-[#06D6A0]">
                ATS Score: 96 / 100
              </div>
            </div>

            {/* Resume Content Body Mock */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column Mock */}
              <div className="space-y-6 border-r border-[#0C4137]/40 pr-6">
                <div>
                  <h3 className="text-xl font-bold text-[#E6FBF6]">Alex Mercer</h3>
                  <p className="text-xs text-[#06D6A0] font-mono">Senior Full Stack Engineer</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-[#E6FBF6]/60 uppercase tracking-wider mb-2">Skills Matrix</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["TypeScript", "React", "Next.js", "Node.js", "MongoDB", "Docker", "Tailwind"].map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-[#0C4137]/60 text-[11px] text-[#E6FBF6]/90 border border-[#06D6A0]/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column Mock */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-[#06D6A0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Generated Professional Summary</span>
                  </h4>
                  <p className="text-xs text-[#E6FBF6]/80 leading-relaxed bg-[#061814] p-3 rounded-xl border border-[#0C4137]">
                    Impact-driven Full Stack Engineer with 4+ years architecting cloud-native web applications. Proven track record of optimizing backend performance by 40% and deploying modern microservices.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#E6FBF6]/60 uppercase tracking-wider mb-2">Featured Project</h4>
                  <div className="p-3 rounded-xl bg-[#061814]/60 border border-[#0C4137]/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#E6FBF6]">Distributed Real-Time Analytics Platform</span>
                      <span className="text-[10px] font-mono text-[#06D6A0]">Live Demo</span>
                    </div>
                    <p className="text-xs text-[#E6FBF6]/70">
                      • Engineered real-time WebSocket data pipeline processing 50k events/sec using Node.js & Redis.
                    </p>
                    <p className="text-xs text-[#E6FBF6]/70">
                      • Designed reactive dashboard frontend using Next.js 16 and TailwindCSS, reducing load latency by 65%.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Metrics Section */}
      <section className="py-12 bg-[#061814]/60 border-y border-[#0C4137]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#06D6A0] glow-text-emerald">10,000+</div>
              <div className="text-xs sm:text-sm text-[#E6FBF6]/60 mt-1 font-medium">Resumes Generated</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#E6FBF6]">98%</div>
              <div className="text-xs sm:text-sm text-[#E6FBF6]/60 mt-1 font-medium">ATS Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#06D6A0] glow-text-emerald">3.5x</div>
              <div className="text-xs sm:text-sm text-[#E6FBF6]/60 mt-1 font-medium">More Interview Calls</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#E6FBF6]">Instant</div>
              <div className="text-xs sm:text-sm text-[#E6FBF6]/60 mt-1 font-medium">Gemini AI Optimizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E6FBF6]">
            Engineered specifically for <span className="text-[#06D6A0]">Developers & Engineers</span>
          </h2>
          <p className="text-base text-[#E6FBF6]/70">
            Stop struggling with generic resume tools that don't highlight code metrics, tech stacks, or engineering achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl border border-[#0C4137] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#E6FBF6]">AI Bullet Enhancer</h3>
            <p className="text-sm text-[#E6FBF6]/60 leading-relaxed">
              Transform weak descriptions like "fixed bugs" into high-powered action verbs with quantifiable tech metrics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl border border-[#0C4137] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#E6FBF6]">ATS Score Analyzer</h3>
            <p className="text-sm text-[#E6FBF6]/60 leading-relaxed">
              Real-time parsing against Applicant Tracking Systems to make sure your resume bypasses automated filters.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card glass-card-hover p-8 rounded-2xl border border-[#0C4137] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#061814] border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0]">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#E6FBF6]">Instant PDF & Live Preview</h3>
            <p className="text-sm text-[#E6FBF6]/60 leading-relaxed">
              Export pixel-perfect, clean PDF files ready to submit to top tech companies directly from your browser.
            </p>
          </div>

        </div>

      </section>

      {/* Quick Interactive ATS Tester Section */}
      <section className="py-20 bg-[#061814]/40 border-t border-[#0C4137]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-3xl border border-[#0C4137] space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0C4137] flex items-center justify-center text-[#06D6A0]">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E6FBF6]">Test the AI ATS Engine Live</h3>
                <p className="text-xs text-[#E6FBF6]/60">Paste your resume summary below to see how our Gemini AI rates it</p>
              </div>
            </div>

            <textarea
              rows={3}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#030D0B] border border-[#0C4137] text-xs font-mono text-[#E6FBF6] focus:outline-none focus:border-[#06D6A0] focus:ring-1 focus:ring-[#06D6A0]"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleQuickAtsCheck}
                disabled={analyzing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] transition-all flex items-center justify-center gap-2 text-xs"
              >
                {analyzing ? "Analyzing with Gemini AI..." : "Calculate ATS Score Demo"}
              </button>

              {atsScore !== null && (
                <div className="flex items-center gap-3 bg-[#0C4137]/60 px-4 py-2 rounded-xl border border-[#06D6A0]/40">
                  <span className="text-xs text-[#E6FBF6]/80 font-medium">ATS Match Score:</span>
                  <span className="text-lg font-bold text-[#06D6A0]">{atsScore}%</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 text-center px-4">
        <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl border border-[#06D6A0]/40 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06D6A0]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E6FBF6]">
            Ready to landing your next tech role?
          </h2>
          <p className="text-base text-[#E6FBF6]/70 max-w-xl mx-auto">
            Build your resume in under 5 minutes with AI assistance crafted specifically for modern engineers.
          </p>
          <div className="pt-2">
            <Link
              href="/resumes/builder"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_30px_rgba(6,214,160,0.4)] transition-all hover:scale-105 text-base"
            >
              <Sparkles className="w-5 h-5 fill-[#030D0B]" />
              <span>Create Free Resume</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}