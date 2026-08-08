"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain, LayoutDashboard, FileText, Mic, Code2, BarChart2,
  Settings, Users, Shield, ChevronLeft, ChevronRight,
  Trophy, BookOpen, Calendar, Briefcase, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: FileText, label: "Resume Analysis", href: "/resume" },
      { icon: Mic, label: "Start Interview", href: "/interview/setup" },
      { icon: Code2, label: "Coding Practice", href: "/interview/coding" },
    ],
  },
  {
    label: "Progress",
    items: [
      { icon: BarChart2, label: "Analytics", href: "/analytics" },
      { icon: Trophy, label: "Achievements", href: "/achievements" },
      { icon: BookOpen, label: "Reports", href: "/reports" },
      { icon: Calendar, label: "Schedule", href: "/schedule" },
    ],
  },
  {
    label: "Tools",
    items: [
      { icon: Briefcase, label: "Recruiter", href: "/recruiter" },
      { icon: Users, label: "Admin Panel", href: "/admin" },
      { icon: Shield, label: "Security", href: "/security" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/60 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700/60", collapsed && "justify-center")}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/30">
          <Brain className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold gradient-text">InterviewAI</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        active
                          ? "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600",
                        collapsed && "justify-center"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-primary-600 dark:text-primary-400" : "")} />
                      {!collapsed && <span>{item.label}</span>}
                      {active && !collapsed && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">Arjun Kumar</p>
              <p className="text-xs text-slate-500 truncate">Candidate</p>
            </div>
          </div>
        )}
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
          collapsed && "justify-center"
        )}>
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
