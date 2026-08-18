"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  FileText,
  BarChart2,
  LogIn,
  LogOut,
  ChevronDown,
  Loader2,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard", icon: FileText },
        { href: "/resumes/builder", label: "AI Builder", icon: Sparkles },
        { href: "/ats-checker", label: "ATS Analyzer", icon: BarChart2 },
      ]
    : [
        { href: "#features", label: "Features" },
        { href: "/ats-checker", label: "ATS Engine" },
        { href: "#pricing", label: "Pricing" },
        { href: "#docs", label: "Docs" },
      ];

  const handleLogoutClick = async () => {
    setDropdownOpen(false);
    await logout();
    router.push("/");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0E14]/90 border-b border-[#1E293B] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#10B981] p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
            <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#10B981] transition-colors">
              Type<span className="text-[#10B981]">Cast</span>
            </span>
          </div>
        </Link>

        {/* Center Pill Navigation Container - Exact Image Match */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#161F2E]/90 p-1.5 rounded-full border border-[#1E293B] shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all ${
                  isActive
                    ? "bg-[#10B981] text-[#0B0E14] shadow-sm font-bold"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-[#10B981] animate-spin" />
            </div>
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#161F2E] border border-[#1E293B] hover:border-[#10B981]/40 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#064E3B] text-[#10B981] flex items-center justify-center font-bold text-xs border border-[#10B981]/30">
                  {getInitials(user.name)}
                </div>
                <span className="text-xs font-semibold text-[#E2E8F0] hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#161F2E] rounded-2xl border border-[#1E293B] shadow-2xl py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-[#1E293B]">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-[#94A3B8] truncate font-mono">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#E2E8F0] hover:bg-[#1E293B] hover:text-[#10B981] transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/resumes/builder"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#E2E8F0] hover:bg-[#1E293B] hover:text-[#10B981] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Resume Studio</span>
                  </Link>

                  <div className="pt-1 mt-1 border-t border-[#1E293B]">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#E2E8F0] hover:text-white hover:bg-[#161F2E] transition-all"
              >
                Login
              </Link>

              <Link
                href="/resumes/builder"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#0B0E14] bg-[#10B981] hover:bg-[#059669] shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
              >
                <span>Launch AI Resume Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
