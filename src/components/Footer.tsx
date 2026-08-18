import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030D0B] border-t border-[#0C4137]/40 text-[#E6FBF6]/70 mt-auto no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0C4137] to-[#06D6A0] p-0.5">
                <div className="w-full h-full bg-[#030D0B] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#06D6A0]" />
                </div>
              </div>
              <span className="text-lg font-bold text-[#E6FBF6]">
                Type<span className="text-[#06D6A0]">Cast</span>
              </span>
            </Link>
            <p className="text-xs text-[#E6FBF6]/60 leading-relaxed">
              Empowering engineers and developers to build high-impact, ATS-optimized resumes with Gemini AI precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#E6FBF6] mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resumes/builder" className="hover:text-[#06D6A0] transition-colors">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ats-checker" className="hover:text-[#06D6A0] transition-colors">
                  ATS Score Analyzer
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#06D6A0] transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-[#E6FBF6] mb-4 uppercase tracking-wider">AI Capabilities</h4>
            <ul className="space-y-2 text-sm text-[#E6FBF6]/60">
              <li>Smart Summary Generator</li>
              <li>Bullet Point Enhancer</li>
              <li>Skill Matrix Suggester</li>
              <li>Real-time Keyword Matcher</li>
            </ul>
          </div>

          {/* Palette Badge */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#E6FBF6] uppercase tracking-wider">Theme Palette</h4>
            <div className="p-3 rounded-xl bg-[#061814] border border-[#0C4137]/60 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#0C4137] border border-[#06D6A0]/40" title="Brunswick Green" />
              <div className="w-4 h-4 rounded-full bg-[#06D6A0]" title="Emerald" />
              <div className="w-4 h-4 rounded-full bg-[#E6FBF6]" title="Polar" />
              <span className="text-xs font-mono text-[#06D6A0]">Monestra Theme</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#0C4137]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E6FBF6]/50 gap-4">
          <p>© {new Date().getFullYear()} TypeCast AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#06D6A0] fill-[#06D6A0]" />
            <span>using Monestra Emerald Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
