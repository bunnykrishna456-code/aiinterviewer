"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain, Bell, Menu, X, Sun, Moon, ChevronDown,
  User, Settings, LogOut, BarChart2, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Resume", href: "/resume" },
  { label: "Interview", href: "/interview/setup" },
  { label: "Analytics", href: "/analytics" },
  { label: "Reports", href: "/reports" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-primary-500/5 border-b border-slate-200/60 dark:border-slate-700/60"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">InterviewAI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === l.href
                    ? "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode */}
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-slate-600 dark:text-slate-400 hover:text-primary-600"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-slate-600 dark:text-slate-400 hover:text-primary-600 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 card shadow-2xl z-50 p-4 animate-slide-up">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Notifications</h3>
                  {[
                    { title: "Interview Scheduled", msg: "Your technical interview starts in 30 mins", time: "Just now", dot: "bg-blue-500" },
                    { title: "Report Ready", msg: "Your HR interview report is available", time: "2h ago", dot: "bg-green-500" },
                    { title: "Resume Analyzed", msg: "Resume analysis complete — Score: 82%", time: "Yesterday", dot: "bg-purple-500" },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-xs text-slate-500">{n.msg}</p>
                        <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AK</span>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Arjun K.</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 card shadow-2xl z-50 p-2 animate-slide-up">
                  {[
                    { icon: User, label: "My Profile", href: "/profile" },
                    { icon: BarChart2, label: "Analytics", href: "/analytics" },
                    { icon: FileText, label: "Reports", href: "/reports" },
                    { icon: Settings, label: "Settings", href: "/settings" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                  <hr className="my-1 border-slate-200 dark:border-slate-700" />
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Start Interview CTA */}
            <Link href="/interview/setup" className="hidden md:flex btn-primary text-sm py-2">
              Start Interview
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-4 space-y-1 animate-slide-up">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                pathname === l.href
                  ? "bg-primary-100 dark:bg-primary-900/40 text-primary-600"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/interview/setup" className="block btn-primary text-center mt-3">
            Start Interview
          </Link>
        </div>
      )}
    </nav>
  );
}
