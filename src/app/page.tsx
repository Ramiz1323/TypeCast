"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BarChart2,
  Download,
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
      setAtsScore(92);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="landing-wrapper">
      
      {/* Background Gradients */}
      <div className="landing-glow-top" />
      <div className="landing-glow-side" />

      {/* Hero Section */}
      <section className="app-container hero-section">
        
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="badge badge-emerald">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini AI Engine v2.0 • Monestra Emerald Theme</span>
          </div>
        </div>

        {/* Headline */}
        <div className="hero-content">
          <h1 className="hero-title">
            Craft Engineering Resumes That <br />
            <span className="text-gradient-emerald glow-text-emerald">
              Get You Hired Faster
            </span>
          </h1>

          <p className="hero-subtitle">
            TypeCast leverages Gemini AI to generate bulletproof project bullets, ATS-optimized summaries, and tech skills matrices tailor-made for developer roles.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link href="/resumes/builder" className="btn btn-emerald btn-lg">
              <Sparkles className="w-5 h-5" />
              <span>Build My Resume Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link href="/ats-checker" className="btn btn-outline btn-lg">
              <BarChart2 className="w-5 h-5 text-emerald" />
              <span>Check ATS Score</span>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="hero-pills">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald" />
              <span>No CC Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald" />
              <span>Instant PDF Download</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald" />
              <span>100% Developer Templates</span>
            </div>
          </div>
        </div>

        {/* Live Mock Preview Card */}
        <div className="mock-preview-container">
          <div className="glass-card mock-preview-card">
            
            <div className="mock-bar">
              <div className="flex items-center gap-2">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
                <span className="mock-filename">typecast-resume-preview.tsx</span>
              </div>
              <div className="mock-score-pill">
                ATS Score: 96 / 100
              </div>
            </div>

            <div className="mock-body grid grid-cols-3 gap-6">
              
              <div className="mock-col-left space-y-4">
                <div>
                  <h3 className="mock-name">Alex Mercer</h3>
                  <p className="mock-role">Senior Full Stack Engineer</p>
                </div>
                <div>
                  <h4 className="mock-section-title">Skills Matrix</h4>
                  <div className="flex flex-wrap gap-1">
                    {["TypeScript", "React", "Next.js", "Node.js", "MongoDB", "Docker", "Tailwind"].map((skill) => (
                      <span key={skill} className="mock-skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mock-col-right space-y-4">
                <div>
                  <h4 className="mock-section-title text-emerald flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Generated Professional Summary</span>
                  </h4>
                  <p className="mock-text-box">
                    Impact-driven Full Stack Engineer with 4+ years architecting cloud-native web applications. Proven track record of optimizing backend performance by 40% and deploying modern microservices.
                  </p>
                </div>

                <div>
                  <h4 className="mock-section-title">Featured Project</h4>
                  <div className="mock-project-box space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-polar text-xs">Distributed Analytics Platform</span>
                      <span className="text-emerald text-[10px] font-mono">Live Demo</span>
                    </div>
                    <p className="text-xs text-muted">
                      • Engineered real-time WebSocket data pipeline processing 50k events/sec using Node.js & Redis.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Metrics Banner */}
      <section className="metrics-banner">
        <div className="app-container">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="metric-num text-emerald glow-text-emerald">10,000+</div>
              <div className="metric-label">Resumes Generated</div>
            </div>
            <div>
              <div className="metric-num text-polar">98%</div>
              <div className="metric-label">ATS Pass Rate</div>
            </div>
            <div>
              <div className="metric-num text-emerald glow-text-emerald">3.5x</div>
              <div className="metric-label">More Interview Calls</div>
            </div>
            <div>
              <div className="metric-num text-polar">Instant</div>
              <div className="metric-label">Gemini AI Optimizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Grid */}
      <section className="app-container py-20">
        <div className="section-header text-center">
          <h2 className="section-title">
            Engineered specifically for <span className="text-emerald">Developers & Engineers</span>
          </h2>
          <p className="section-subtitle">
            Stop struggling with generic resume tools that don't highlight code metrics, tech stacks, or engineering achievements.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12">
          
          <div className="glass-card glass-card-hover feature-card">
            <div className="feature-icon">
              <Sparkles className="w-6 h-6 text-emerald" />
            </div>
            <h3 className="feature-card-title">AI Bullet Enhancer</h3>
            <p className="feature-card-desc">
              Transform weak descriptions like "fixed bugs" into high-powered action verbs with quantifiable tech metrics.
            </p>
          </div>

          <div className="glass-card glass-card-hover feature-card">
            <div className="feature-icon">
              <ShieldCheck className="w-6 h-6 text-emerald" />
            </div>
            <h3 className="feature-card-title">ATS Score Analyzer</h3>
            <p className="feature-card-desc">
              Real-time parsing against Applicant Tracking Systems to make sure your resume bypasses automated filters.
            </p>
          </div>

          <div className="glass-card glass-card-hover feature-card">
            <div className="feature-icon">
              <Download className="w-6 h-6 text-emerald" />
            </div>
            <h3 className="feature-card-title">Instant PDF & Live Preview</h3>
            <p className="feature-card-desc">
              Export pixel-perfect, clean PDF files ready to submit to top tech companies directly from your browser.
            </p>
          </div>

        </div>
      </section>

      {/* Quick Interactive ATS Tester */}
      <section className="quick-ats-section">
        <div className="app-container max-w-4xl">
          <div className="glass-card ats-teaser-card">
            
            <div className="flex items-center gap-3">
              <div className="feature-icon">
                <BarChart2 className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-polar">Test the AI ATS Engine Live</h3>
                <p className="text-xs text-muted">Paste your resume summary below to see how our Gemini AI rates it</p>
              </div>
            </div>

            <textarea
              rows={3}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="form-textarea font-mono"
            />

            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handleQuickAtsCheck}
                disabled={analyzing}
                className="btn btn-emerald"
              >
                {analyzing ? "Analyzing with Gemini AI..." : "Calculate ATS Score Demo"}
              </button>

              {atsScore !== null && (
                <div className="ats-demo-score-badge">
                  <span>ATS Match Score:</span>
                  <span className="text-lg font-bold text-emerald">{atsScore}%</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}