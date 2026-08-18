import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-container no-print">
      <div className="app-container py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <Link href="/" className="nav-logo">
              <Sparkles className="w-5 h-5 text-emerald" />
              <span className="text-polar font-bold">
                Type<span className="text-emerald">Cast</span>
              </span>
            </Link>
            <p className="text-xs text-muted leading-relaxed">
              Empowering engineers and developers to build high-impact, ATS-optimized resumes with Gemini AI precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-list">
              <li><Link href="/resumes/builder">AI Resume Builder</Link></li>
              <li><Link href="/ats-checker">ATS Score Analyzer</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* AI Capabilities */}
          <div>
            <h4 className="footer-heading">AI Capabilities</h4>
            <ul className="footer-list text-muted">
              <li>Smart Summary Generator</li>
              <li>Bullet Point Enhancer</li>
              <li>Skill Matrix Suggester</li>
              <li>Real-time Keyword Matcher</li>
            </ul>
          </div>

          {/* Palette Badge */}
          <div>
            <h4 className="footer-heading">Theme Palette</h4>
            <div className="palette-card">
              <div className="swatch swatch-brunswick" title="Brunswick Green" />
              <div className="swatch swatch-emerald" title="Emerald" />
              <div className="swatch swatch-polar" title="Polar" />
              <span className="text-xs font-mono text-emerald">Monestra Theme</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TypeCast AI. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-emerald fill-emerald" />
            <span>using Monestra Emerald Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
