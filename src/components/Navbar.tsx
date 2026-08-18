"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  FileText,
  BarChart2,
  User,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Loader2,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: FileText },
    { href: "/resumes/builder", label: "AI Builder", icon: Sparkles },
    { href: "/ats-checker", label: "ATS Analyzer", icon: BarChart2 },
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#030C0A]/85 border-b border-[#0C4137]/40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0C4137] to-[#06D6A0] p-0.5 shadow-lg group-hover:shadow-[0_0_20px_rgba(6,214,160,0.4)] transition-all">
            <div className="w-full h-full bg-[#030C0A] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#06D6A0] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#E6FBF6] group-hover:text-white">
              Type<span className="text-[#06D6A0] glow-text-emerald">Cast</span>
            </span>
            <span className="text-[9px] tracking-widest text-[#06D6A0]/80 uppercase font-mono font-semibold">
              AI Engineering Platform
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
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#0C4137] text-[#06D6A0] shadow-sm border border-[#06D6A0]/30"
                    : "text-[#E6FBF6]/70 hover:text-[#E6FBF6] hover:bg-[#0C4137]/30"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#06D6A0]" : "text-[#E6FBF6]/60"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth User Session Menu */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-[#06D6A0] animate-spin" />
            </div>
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#061814] border border-[#0C4137] hover:border-[#06D6A0]/40 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#0C4137] text-[#06D6A0] flex items-center justify-center font-bold text-xs border border-[#06D6A0]/30">
                  {getInitials(user.name)}
                </div>
                <span className="text-xs font-semibold text-[#E6FBF6] hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#E6FBF6]/60" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl border border-[#0C4137] shadow-2xl py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-[#0C4137]/60">
                    <p className="text-xs font-bold text-[#E6FBF6] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#E6FBF6]/60 truncate font-mono">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#E6FBF6] hover:bg-[#0C4137]/50 hover:text-[#06D6A0] transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#06D6A0]" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/resumes/builder"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#E6FBF6] hover:bg-[#0C4137]/50 hover:text-[#06D6A0] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#06D6A0]" />
                    <span>Resume Studio</span>
                  </Link>

                  <div className="pt-1 mt-1 border-t border-[#0C4137]/60">
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
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#E6FBF6] hover:bg-[#0C4137]/40 border border-[#0C4137]/60 transition-all hover:border-[#06D6A0]/40"
              >
                <LogIn className="w-3.5 h-3.5 text-[#06D6A0]" />
                <span>Log In</span>
              </Link>

              <Link
                href="/auth/register"
                className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-[#030C0A] bg-[#06D6A0] hover:bg-[#05b88a] shadow-[0_0_15px_rgba(6,214,160,0.3)] transition-all hover:scale-105"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
