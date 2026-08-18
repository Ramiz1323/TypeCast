"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, FileText, BarChart2, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: FileText },
    { href: "/resumes/builder", label: "AI Builder", icon: Sparkles },
    { href: "/ats-checker", label: "ATS Score Analyzer", icon: BarChart2 },
  ];

  return (
    <header className="header-navbar no-print">
      <div className="app-container navbar-inner">
        
        {/* Brand Logo */}
        <Link href="/" className="nav-logo">
          <div className="logo-icon-wrapper">
            <Sparkles className="w-5 h-5 text-emerald" />
          </div>
          <div className="flex flex-col">
            <span className="text-polar font-bold">
              Type<span className="text-emerald glow-text-emerald">Cast</span>
            </span>
            <span className="brand-subtitle">AI Resume Studio</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-menu">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Auth CTA Actions */}
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="btn btn-outline">
            <LogIn className="w-4 h-4 text-emerald" />
            <span>Login</span>
          </Link>

          <Link href="/auth/register" className="btn btn-emerald">
            <UserPlus className="w-4 h-4" />
            <span>Get Started</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
