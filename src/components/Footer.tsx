import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0E14] border-t border-[#1E293B] text-[#94A3B8] mt-auto no-print font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#10B981] p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <div className="w-full h-full bg-[#0B0E14] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                Type<span className="text-[#10B981]">Cast</span>
              </span>
            </Link>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Empowering engineers and developers to build high-impact, ATS-optimized resumes with Gemini 3.6 AI Engine precision.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">PRODUCT</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resumes/builder" className="hover:text-[#10B981] transition-colors">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ats-checker" className="hover:text-[#10B981] transition-colors">
                  ATS Score Analyzer
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#10B981] transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">AI CAPABILITIES</h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>Smart Summary Generator</li>
              <li>Bullet Point Enhancer</li>
              <li>Skill Matrix Suggester</li>
              <li>Real-time Keyword Matcher</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
          <p>© {new Date().getFullYear()} TypeCast AI. Engineered for performance.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="hover:text-[#94A3B8] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#94A3B8] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#94A3B8] cursor-pointer">Changelog</span>
            <span className="hover:text-[#94A3B8] cursor-pointer">Status</span>
            <span className="hover:text-[#94A3B8] cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
