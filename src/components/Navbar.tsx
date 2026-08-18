"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, FileText, BarChart2, User, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: FileText },
    { href: "/resumes/builder", label: "AI Builder", icon: Sparkles },
    { href: "/ats-checker", label: "ATS Score Analyzer", icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#030D0B]/80 border-b border-[#0C4137]/40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0C4137] to-[#06D6A0] p-0.5 shadow-lg group-hover:shadow-[0_0_20px_rgba(6,214,160,0.4)] transition-all">
            <div className="w-full h-full bg-[#030D0B] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#06D6A0] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#E6FBF6] group-hover:text-white">
              Type<span className="text-[#06D6A0] glow-text-emerald">Cast</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#06D6A0]/80 uppercase font-mono font-medium">
              AI Resume Studio
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#061814]/80 p-1.5 rounded-full border border-[#0C4137]/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#0C4137] text-[#06D6A0] shadow-sm border border-[#06D6A0]/30"
                    : "text-[#E6FBF6]/70 hover:text-[#E6FBF6] hover:bg-[#0C4137]/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#06D6A0]" : "text-[#E6FBF6]/60"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#E6FBF6] hover:bg-[#0C4137]/40 border border-[#0C4137]/60 transition-all hover:border-[#06D6A0]/40"
          >
            <LogIn className="w-4 h-4 text-[#06D6A0]" />
            <span>Login</span>
          </Link>

          <Link
            href="/auth/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#030D0B] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_20px_rgba(6,214,160,0.3)] hover:shadow-[0_0_25px_rgba(6,214,160,0.5)] transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>Get Started</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
