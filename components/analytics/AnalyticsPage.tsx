"use client";
import { useState } from "react";
import { Trophy, TrendingUp, Target, Award, ChevronUp, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreRing from "@/components/ui/ScoreRing";
import { cn } from "@/lib/utils";
import {
  LineChart, Line, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const weeklyProgress = [
  { week: "Week 1", score: 52, technical: 48, communication: 55, confidence: 50 },
  { week: "Week 2", score: 58, technical: 55, communication: 60, confidence: 56 },
  { week: "Week 3", score: 65, technical: 62, communication: 65, confidence: 64 },
  { week: "Week 4", score: 61, technical: 58, communication: 63, confidence: 59 },
  { week: "Week 5", score: 72, technical: 70, communication: 73, confidence: 70 },
  { week: "Week 6", score: 79, technical: 77, communication: 80, confidence: 78 },
  { week: "Week 7", score: 84, technical: 82, communication: 85, confidence: 83 },
];

const monthlyData = [
  { month: "Jan", interviews: 2, avgScore: 55 },
  { month: "Feb", interviews: 3, avgScore: 61 },
  { month: "Mar", interviews: 4, avgScore: 68 },
  { month: "Apr", interviews: 5, avgScore: 72 },
  { month: "May", interviews: 6, avgScore: 75 },
  { month: "Jun", interviews: 4, avgScore: 78 },
  { month: "Jul", interviews: 7, avgScore: 81 },
  { month: "Aug", interviews: 5, avgScore: 84 },
];

const skillProgress = [
  { skill: "React/Next.js", start: 65, current: 88, change: 23 },
  { skill: "Java/Spring Boot", start: 50, current: 72, change: 22 },
  { skill: "System Design", start: 30, current: 62, change: 32 },
  { skill: "DSA/Algorithms", start: 40, current: 65, change: 25 },
  { skill: "SQL/Databases", start: 70, current: 84, change: 14 },
  { skill: "Communication", start: 60, current: 79, change: 19 },
];

const radarCurrent = [
  { subject: "Technical", score: 82 },
  { subject: "Communication", score: 79 },
  { subject: "Problem Solving", score: 85 },
  { subject: "Confidence", score: 77 },
  { subject: "Coding", score: 78 },
  { subject: "HR/Soft Skills", score: 88 },
];

const confidenceTrend = [
  { week: "W1", confidence: 45, fluency: 50, grammar: 60 },
  { week: "W2", confidence: 52, fluency: 55, grammar: 63 },
  { week: "W3", confidence: 60, fluency: 62, grammar: 67 },
  { week: "W4", confidence: 58, fluency: 60, grammar: 65 },
  { week: "W5", confidence: 68, fluency: 70, grammar: 72 },
  { week: "W6", confidence: 75, fluency: 76, grammar: 78 },
  { week: "W7", confidence: 80, fluency: 82, grammar: 84 },
];

const leaderboard = [
  { rank: 1, name: "Kavya Nair", score: 96, interviews: 18, badge: "🥇" },
  { rank: 2, name: "Ravi Krishnan", score: 94, interviews: 15, badge: "🥈" },
  { rank: 3, name: "Meera Joshi", score: 92, interviews: 21, badge: "🥉" },
  { rank: 4, name: "You (Arjun K.)", score: 84, interviews: 12, badge: "⭐", isYou: true },
  { rank: 5, name: "Dilip Kumar", score: 82, interviews: 9, badge: "" },
  { rank: 6, name: "Sanjana Rao", score: 79, interviews: 14, badge: "" },
];

const interviewTimeline = [
  { date: "Aug 7", company: "Google", type: "Technical", score: 82 },
  { date: "Aug 5", company: "Microsoft", type: "Mixed", score: 79 },
  { date: "Aug 3", company: "Infosys", type: "HR", score: 91 },
  { date: "Aug 1", company: "TCS", type: "Coding", score: 68 },
  { date: "Jul 28", company: "Zoho", type: "System Design", score: 74 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [activeTab, setActiveTab] = useState<"progress" | "communication" | "leaderboard" | "timeline">("progress");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Analytics</h1>
            <p className="text-slate-500 mt-1">Track your interview performance and growth over time</p>
          </div>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
            {(["weekly", "monthly"] as const).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={cn("px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all",
                  period === p ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Best Score", val: 91, sub: "HR Interview @ Infosys", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
            { label: "Avg Score", val: 79, sub: "Last 12 interviews", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Interviews", val: 12, sub: "+3 this week", icon: Target, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "Rank", val: "#4", sub: "Top 10% globally", icon: Award, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{s.val}</p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{s.label}</p>
              <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit flex-wrap">
          {(["progress", "communication", "leaderboard", "timeline"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all",
                activeTab === t ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}>
              {t}
            </button>
          ))}
        </div>

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Overall Score Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={period === "weekly" ? weeklyProgress : monthlyData}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FA3FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4FA3FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey={period === "weekly" ? "week" : "month"} tick={{ fontSize: 11 }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  <Area type="monotone" dataKey="score" stroke="#4FA3FF" strokeWidth={3} fill="url(#grad1)" dot={{ fill: "#4FA3FF", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Multi-Metric Progress</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  <Legend />
                  <Line type="monotone" dataKey="technical" stroke="#4FA3FF" strokeWidth={2} dot={false} name="Technical" />
                  <Line type="monotone" dataKey="communication" stroke="#22c55e" strokeWidth={2} dot={false} name="Communication" />
                  <Line type="monotone" dataKey="confidence" stroke="#a855f7" strokeWidth={2} dot={false} name="Confidence" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Skill Radar</h3>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarCurrent}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke="#4FA3FF" fill="#4FA3FF" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Skill Improvement</h3>
              <div className="space-y-4">
                {skillProgress.map((s) => (
                  <div key={s.skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{s.start} → {s.current}</span>
                        <span className={cn("flex items-center text-xs font-semibold", s.change > 0 ? "text-green-600" : "text-red-500")}>
                          <ChevronUp className="w-3 h-3" />+{s.change}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden relative">
                      <div className="absolute h-full rounded-full bg-slate-300 dark:bg-slate-600" style={{ width: `${s.start}%` }} />
                      <div className="absolute h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all" style={{ width: `${s.current}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === "communication" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Communication Trend</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={confidenceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis domain={[30, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  <Legend />
                  <Line type="monotone" dataKey="confidence" stroke="#4FA3FF" strokeWidth={2} name="Confidence" />
                  <Line type="monotone" dataKey="fluency" stroke="#22c55e" strokeWidth={2} name="Fluency" />
                  <Line type="monotone" dataKey="grammar" stroke="#a855f7" strokeWidth={2} name="Grammar" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Communication Scores</h3>
              <div className="space-y-4">
                {[
                  { label: "Speaking Speed", score: 82, note: "Good pace — clear delivery" },
                  { label: "Confidence", score: 77, note: "Slightly hesitant on hard questions" },
                  { label: "Grammar & Vocabulary", score: 84, note: "Strong professional language" },
                  { label: "Filler Words", score: 71, note: "Reduce 'umm', 'like', 'you know'" },
                  { label: "Eye Contact (est.)", score: 80, note: "Consistent camera focus" },
                  { label: "Logical Thinking", score: 85, note: "Well-structured answers" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                      <span className={cn("text-sm font-bold", item.score >= 80 ? "text-green-600" : item.score >= 60 ? "text-yellow-600" : "text-red-600")}>{item.score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", item.score >= 80 ? "bg-green-500" : item.score >= 60 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${item.score}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Global Leaderboard</h3>
              <p className="text-sm text-slate-500 mt-1">Top performers this week</p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className={cn("flex items-center gap-4 p-5 transition-colors",
                  entry.isYou ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/50")}>
                  <div className="w-10 h-10 flex items-center justify-center text-2xl flex-shrink-0">
                    {entry.badge || <span className="text-base font-bold text-slate-500">#{entry.rank}</span>}
                  </div>
                  <div className="flex-1">
                    <p className={cn("font-semibold text-sm", entry.isYou ? "text-primary-600" : "text-slate-800 dark:text-slate-200")}>
                      {entry.name} {entry.isYou && <span className="badge-primary text-xs ml-1">You</span>}
                    </p>
                    <p className="text-xs text-slate-500">{entry.interviews} interviews completed</p>
                  </div>
                  <ScoreRing score={entry.score} size={52} strokeWidth={6} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="card p-6">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-6">Interview Timeline</h3>
            <div className="space-y-4">
              {interviewTimeline.map((iv, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{iv.company[0]}</span>
                    </div>
                    {i < interviewTimeline.length - 1 && <div className="flex-1 w-px bg-primary-200 dark:bg-primary-800 mt-2" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{iv.company}</p>
                        <p className="text-sm text-slate-500">{iv.type} · {iv.date}</p>
                      </div>
                      <ScoreRing score={iv.score} size={52} strokeWidth={6} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
