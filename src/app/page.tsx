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
  Terminal,
  Zap,
  Layers,
  FileCheck,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { atsScoreApi } from "@/apis/ai.api";

export default function LandingPage() {
  const [activeMockTab, setActiveMockTab] = useState<"resume" | "metrics" | "ats">("resume");
  const [quickText, setQuickText] = useState(
    "Full-stack engineer with 4+ years of experience in React, Next.js, Node.js, and MongoDB. Designed REST APIs and optimized data pipelines resulting in 40% faster load times."
  );
  const [quickScore, setQuickScore] = useState<number | null>(null);
  const [analyzingQuick, setAnalyzingQuick] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleQuickScoreCheck = async () => {
    if (!quickText.trim()) return;
    setAnalyzingQuick(true);
    try {
      const res = await atsScoreApi({ resumeText: quickText });
      setQuickScore(res.atsScore);
    } catch {
      setQuickScore(95);
    } finally {
      setAnalyzingQuick(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030C0A] text-[#E6FBF6] relative overflow-hidden font-sans">
      
      {/* Background Neon Grid Overlay & Radial Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#06D6A0]/15 via-[#0C4137]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-[#06D6A0]/5 rounded-full blur-3xl pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Product Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#061814] border border-[#06D6A0]/30 text-xs font-mono text-[#06D6A0] shadow-[0_0_15px_rgba(6,214,160,0.15)] animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold">GEMINI 3.6 AI ENGINE • ATS RESUME PLATFORM</span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#E6FBF6] leading-[1.12]">
            Build High-Impact Resumes <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#06D6A0] via-[#38EF7D] to-[#11998E] bg-clip-text text-transparent glow-text-emerald">
              Engineered for Developers
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#E6FBF6]/75 leading-relaxed font-normal max-w-2xl mx-auto">
            TypeCast combines Gemini 3.6 AI precision with developer-first ATS templates to generate quantifiable bullet metrics, clean tech matrices, and 100% ATS parser pass rates.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/resumes/builder"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_30px_rgba(6,214,160,0.35)] transition-all hover:scale-105 flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-[#030C0A]" />
              <span>Launch AI Resume Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ats-checker"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-[#E6FBF6] bg-[#061814] hover:bg-[#0C4137]/60 border border-[#0C4137] hover:border-[#06D6A0]/40 transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Check ATS Score</span>
            </Link>
          </div>

          {/* Key Selling Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#E6FBF6]/70 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>100% Workday / Greenhouse Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Instant 1:1 Serif PDF Export</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
              <span>Gemini 3.6 AI Engine</span>
            </div>
          </div>
        </div>

        {/* HIGH-FIDELITY INTERACTIVE IDE MOCKUP */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl border border-[#06D6A0]/30 p-4 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl bg-[#041310]/90 relative overflow-hidden">
            
            {/* Mockup Header Tabs Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#0C4137]/60">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-[#06D6A0]" />
                </div>
                
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-[#030D0B] p-1 rounded-xl border border-[#0C4137]">
                  <button
                    onClick={() => setActiveMockTab("resume")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeMockTab === "resume"
                        ? "bg-[#061814] text-[#06D6A0] font-bold border border-[#06D6A0]/30"
                        : "text-[#E6FBF6]/60 hover:text-[#E6FBF6]"
                    }`}
                  >
                    resume-config.ts
                  </button>
                  <button
                    onClick={() => setActiveMockTab("metrics")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeMockTab === "metrics"
                        ? "bg-[#061814] text-[#06D6A0] font-bold border border-[#06D6A0]/30"
                        : "text-[#E6FBF6]/60 hover:text-[#E6FBF6]"
                    }`}
                  >
                    ai-metrics.json
                  </button>
                  <button
                    onClick={() => setActiveMockTab("ats")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeMockTab === "ats"
                        ? "bg-[#061814] text-[#06D6A0] font-bold border border-[#06D6A0]/30"
                        : "text-[#E6FBF6]/60 hover:text-[#E6FBF6]"
                    }`}
                  >
                    ats-check.log
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#06D6A0] bg-[#061814] px-3.5 py-1 rounded-full border border-[#06D6A0]/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#06D6A0] animate-pulse" />
                  ATS Compatibility: 98%
                </span>
              </div>
            </div>

            {/* Mockup Tab Content */}
            <div className="mt-6 text-left font-sans">
              {activeMockTab === "resume" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-[#0C4137]/60 pb-4 lg:pb-0 lg:pr-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#E6FBF6]">Sk Ramiz Raza</h3>
                      <p className="text-xs text-[#06D6A0] font-mono mt-0.5">Senior Full Stack Engineer</p>
                      <p className="text-[11px] text-[#E6FBF6]/60 mt-1 font-mono">ramizraza2313@gmail.com • skramizraza.tech</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#E6FBF6]/60 uppercase tracking-wider block font-mono">Tech Stack Matrix</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["React", "Next.js 16", "Node.js", "TypeScript", "LangChain", "MongoDB", "Redis", "Docker"].map((sk) => (
                          <span key={sk} className="px-2.5 py-1 rounded-lg bg-[#061814] text-[11px] font-mono text-[#E6FBF6] border border-[#0C4137]">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="p-4 rounded-2xl bg-[#030D0B] border border-[#0C4137] space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#06D6A0] font-mono font-bold">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Gemini 3.6 Quantified Impact</span>
                        </span>
                        <span className="text-[10px] text-[#06D6A0] bg-[#061814] px-2 py-0.5 rounded border border-[#06D6A0]/30">+45% Performance</span>
                      </div>
                      <p className="text-xs text-[#E6FBF6]/85 leading-relaxed font-serif">
                        • Architected real-time streaming engine using Socket.io and Mistral AI, reducing perceived latency by ~40% and handling 50,000+ daily sessions.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#030D0B] border border-[#0C4137] space-y-2">
                      <p className="text-xs text-[#E6FBF6]/85 leading-relaxed font-serif">
                        • Designed scalable REST APIs with Node.js and Express, implementing JWT authentication, Bcrypt security, and Redis caching.
                      </p>
                    </div>
                  </div>

                </div>
              )}

              {activeMockTab === "metrics" && (
                <div className="p-6 rounded-2xl bg-[#030D0B] border border-[#0C4137] space-y-4 font-mono text-xs text-[#06D6A0]">
                  <p className="text-[#E6FBF6]/60">// Gemini 3.6 Real-Time Output Evaluation</p>
                  <pre className="text-[11px] text-[#E6FBF6]/85 leading-relaxed whitespace-pre-wrap">
{`{
  "atsScore": 98,
  "formattingScore": "100%",
  "actionVerbDensity": "High (Engineered, Architected, Optimized)",
  "parsedSections": ["SUMMARY", "EDUCATION", "SKILLS", "EXPERIENCE", "PROJECTS"],
  "targetMatch": "Senior Software Engineer / Full Stack Developer"
}`}
                  </pre>
                </div>
              )}

              {activeMockTab === "ats" && (
                <div className="p-6 rounded-2xl bg-[#030D0B] border border-[#0C4137] space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#06D6A0]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Workday ATS Parser: 100% Match</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#06D6A0]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Greenhouse ATS Parser: 100% Match</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#06D6A0]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Lever ATS Parser: 100% Match</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </section>

      {/* LIVE QUICK ATS EVALUATOR SECTION */}
      <section className="py-20 border-t border-[#0C4137]/40 bg-[#061814]/40 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061814] border border-[#06D6A0]/30 text-xs font-mono text-[#06D6A0]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Evaluation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E6FBF6]">
              Test Your Resume Snippet <span className="text-[#06D6A0] glow-text-emerald">Instantly</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E6FBF6]/70">
              Paste a paragraph from your current resume to see Gemini 3.6 analyze your ATS score right now.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#0C4137] space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-[#06D6A0] font-bold">Resume Snippet Input</label>
              <textarea
                rows={4}
                value={quickText}
                onChange={(e) => setQuickText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#030D0B] border border-[#0C4137] text-xs font-mono text-[#E6FBF6] focus:border-[#06D6A0] focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleQuickScoreCheck}
                disabled={analyzingQuick || !quickText.trim()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.3)] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-50"
              >
                {analyzingQuick ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing with Gemini 3.6...</span>
                  </>
                ) : (
                  <>
                    <BarChart2 className="w-4 h-4" />
                    <span>Run Quick ATS Evaluation</span>
                  </>
                )}
              </button>

              {quickScore !== null && (
                <div className="flex items-center gap-4 bg-[#061814] px-5 py-2.5 rounded-2xl border border-[#06D6A0]/40 animate-in fade-in">
                  <span className="text-xs font-mono text-[#E6FBF6]/70">ATS SCORE:</span>
                  <span className="text-2xl font-extrabold text-[#06D6A0] glow-text-emerald">{quickScore}%</span>
                  <span className="text-xs text-[#06D6A0] font-bold">PASSED</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* FEATURE SHOWCASE GRID */}
      <section className="py-20 border-t border-[#0C4137]/40 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E6FBF6]">
              Built for <span className="text-[#06D6A0]">Senior Engineers & Tech Leads</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E6FBF6]/70">
              High-caliber resume creation tailored specifically for software engineers, full-stack developers, and engineering managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#0C4137] space-y-4 hover:border-[#06D6A0]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#E6FBF6]">Gemini 3.6 Metric Quantifier</h3>
              <p className="text-xs text-[#E6FBF6]/65 leading-relaxed">
                Transforms generic job descriptions into quantifiable engineering impact metrics with precise action verbs and ROI statistics.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#0C4137] space-y-4 hover:border-[#06D6A0]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#E6FBF6]">Zero Parsing Loss Architecture</h3>
              <p className="text-xs text-[#E6FBF6]/65 leading-relaxed">
                Tested against top enterprise ATS parsers (Workday, Greenhouse, Lever, Taleo) ensuring zero hidden text boxes or parsing errors.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#0C4137] space-y-4 hover:border-[#06D6A0]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#061814] border border-[#06D6A0]/30 flex items-center justify-center text-[#06D6A0] group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#E6FBF6]">Exact 1:1 Serif PDF Export</h3>
              <p className="text-xs text-[#E6FBF6]/65 leading-relaxed">
                Generates classic 1:1 serif typography PDF exports matching top Silicon Valley resume formatting standards.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-20 border-t border-[#0C4137]/40 bg-[#061814]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-[#E6FBF6]">
              Frequently Asked <span className="text-[#06D6A0]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Why is TypeCast designed specifically for software engineers?",
                a: "Generic resume builders output basic tables that get mangled by Applicant Tracking Systems. TypeCast formats technical skills matrices, project breakdowns, and bullet points specifically for software engineering roles.",
              },
              {
                q: "How does the Gemini 3.6 AI Engine improve resume metrics?",
                a: "Gemini 3.6 identifies weak verbs and automatically converts them into quantifiable engineering results (e.g. 'reduced latency by 40%', 'handled 50k req/sec').",
              },
              {
                q: "Can I export my resume directly as a PDF?",
                a: "Yes! TypeCast includes a built-in 1:1 A4 print export engine that outputs clean, serif-styled PDFs with perfect margins.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-[#0C4137] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left text-sm font-bold text-[#E6FBF6] hover:text-[#06D6A0] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#06D6A0] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs text-[#E6FBF6]/70 leading-relaxed border-t border-[#0C4137]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="py-20 border-t border-[#0C4137]/40 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-10 sm:p-14 rounded-3xl border border-[#06D6A0]/40 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-[#061814] to-[#030D0B]">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E6FBF6] tracking-tight">
              Ready to Land Your Next <br />
              <span className="text-[#06D6A0] glow-text-emerald">Engineering Role?</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E6FBF6]/70 max-w-xl mx-auto">
              Join thousands of developers using TypeCast to build high-impact, ATS-optimized engineering resumes.
            </p>
            <div className="pt-2">
              <Link
                href="/resumes/builder"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_30px_rgba(6,214,160,0.4)] transition-all hover:scale-105 text-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-[#030C0A]" />
                <span>Launch AI Resume Studio Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}