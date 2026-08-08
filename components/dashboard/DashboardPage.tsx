"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mic, FileText, TrendingUp, Trophy, Calendar, Clock,
  ArrowRight, Target, Zap, CheckCircle, AlertCircle,
  BarChart2, BookOpen, Star, ChevronRight, Play,
  Brain, Code2, Users,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from "recharts";

const skillData = [
  { skill: "DSA", score: 78 },
  { skill: "System Design", score: 62 },
  { skill: "React", score: 88 },
  { skill: "Java", score: 71 },
  { skill: "SQL", score: 84 },
  { skill: "Communication", score: 75 },
];

const progressData = [
  { week: "W1", score: 52 },
  { week: "W2", score: 58 },
  { week: "W3", score: 65 },
  { week: "W4", score: 61 },
  { week: "W5", score: 72 },
  { week: "W6", score: 79 },
  { week: "W7", score: 84 },
];

const upcomingInterviews = [
  { company: "Google", role: "SDE II", type: "Technical", date: "Aug 10, 2026", time: "10:00 AM", difficulty: "Hard" },
  { company: "Amazon", role: "Backend Dev", type: "System Design", date: "Aug 12, 2026", time: "2:00 PM", difficulty: "Expert" },
  { company: "Flipkart", role: "Frontend Dev", type: "Coding", date: "Aug 15, 2026", time: "11:30 AM", difficulty: "Medium" },
];

const recentReports = [
  { company: "Microsoft", role: "SDE", type: "Mixed", score: 82, date: "Aug 5, 2026", recommendation: "Recommended" },
  { company: "Infosys", role: "Developer", type: "HR", score: 91, date: "Aug 3, 2026", recommendation: "Highly Recommended" },
  { company: "TCS", role: "Full Stack", type: "Technical", score: 68, date: "Aug 1, 2026", recommendation: "Needs Improvement" },
];

const achievements = [
  { icon: "🏆", title: "First Interview", desc: "Completed first AI interview", earned: true },
  { icon: "🔥", title: "7-Day Streak", desc: "Practiced 7 days in a row", earned: true },
  { icon: "💡", title: "Code Master", desc: "Solved 10 coding problems", earned: true },
  { icon: "⭐", title: "90+ Score", desc: "Scored above 90 in any interview", earned: false },
  { icon: "🎯", title: "Perfect Integrity", desc: "100% integrity in 3 interviews", earned: false },
  { icon: "🚀", title: "Speed Coder", desc: "Solved hard problem in < 15 mins", earned: false },
];

const weakSkills = [
  { skill: "System Design", score: 62, tip: "Practice designing distributed systems" },
  { skill: "Dynamic Programming", score: 55, tip: "Start with classic DP problems" },
  { skill: "OS Concepts", score: 58, tip: "Review process scheduling and memory management" },
];

const recommendedTopics = [
  { title: "LRU Cache Implementation", type: "Coding", time: "45 min", difficulty: "Medium" },
  { title: "Design a URL Shortener", type: "System Design", time: "60 min", difficulty: "Hard" },
  { title: "SOLID Principles Deep Dive", type: "Technical", time: "30 min", difficulty: "Easy" },
  { title: "Behavioral: Leadership Examples", type: "HR", time: "20 min", difficulty: "Easy" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "history">("overview");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-primary-200 text-sm font-medium">Good morning 👋</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Welcome back, Arjun!</h1>
              <p className="text-primary-100 mt-2 max-w-md">
                You have <span className="font-bold text-white">2 interviews</span> scheduled this week. Keep up the great work!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/interview/setup" className="bg-white text-primary-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-50 transition-all hover:scale-105 flex items-center gap-2 text-sm whitespace-nowrap">
                <Play className="w-4 h-4 fill-current" /> Start Interview
              </Link>
              <Link href="/resume" className="bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 text-sm whitespace-nowrap border border-white/30">
                <FileText className="w-4 h-4" /> Update Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Target, label: "Readiness Score", value: "84%", sub: "+5% from last week", color: "text-primary-600", bg: "bg-primary-100 dark:bg-primary-900/30", trend: "up" },
            { icon: Mic, label: "Interviews Done", value: "12", sub: "3 this week", color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", trend: "up" },
            { icon: TrendingUp, label: "Avg Score", value: "79", sub: "Last 5 interviews", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", trend: "up" },
            { icon: Trophy, label: "Achievements", value: "8/20", sub: "2 newly earned", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30", trend: "neutral" },
          ].map((stat) => (
            <div key={stat.label} className="card p-5 hover:shadow-xl transition-all hover:-translate-y-0.5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit">
          {(["overview", "skills", "history"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Chart */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Performance Trend</h2>
                <span className="badge-primary">Last 7 weeks</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FA3FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4FA3FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                  <Area type="monotone" dataKey="score" stroke="#4FA3FF" strokeWidth={3} fill="url(#scoreGrad)" dot={{ fill: "#4FA3FF", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Readiness Ring */}
            <div className="card p-6 flex flex-col items-center justify-center gap-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 self-start">Interview Readiness</h2>
              <ScoreRing score={84} size={150} strokeWidth={14} label="Readiness" sublabel="/ 100" />
              <div className="w-full space-y-2">
                {[
                  { label: "Technical", score: 82 },
                  { label: "Communication", score: 79 },
                  { label: "Problem Solving", score: 88 },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-28">{m.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all" style={{ width: `${m.score}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-8 text-right">{m.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Upcoming Interviews</h2>
                <Link href="/schedule" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingInterviews.map((iv) => (
                  <div key={iv.company} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{iv.company[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{iv.company} — {iv.role}</p>
                      <p className="text-xs text-slate-500">{iv.type} · {iv.date} · {iv.time}</p>
                    </div>
                    <span className={`badge ${
                      iv.difficulty === "Hard" || iv.difficulty === "Expert"
                        ? "badge-danger"
                        : "badge-warning"
                    }`}>{iv.difficulty}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Goal */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Today's Goal</h2>
              <div className="space-y-3">
                {[
                  { task: "Complete 1 mock interview", done: true },
                  { task: "Solve 2 coding problems", done: true },
                  { task: "Review system design notes", done: false },
                  { task: "Practice STAR answers", done: false },
                ].map((g) => (
                  <div key={g.task} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${g.done ? "bg-green-500" : "border-2 border-slate-200 dark:border-slate-600"}`}>
                      {g.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm ${g.done ? "line-through text-slate-400" : "text-slate-600 dark:text-slate-400"}`}>{g.task}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Daily Progress</span><span>2/4</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skill Radar */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Skill Radar</h2>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={skillData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                  <Radar name="Score" dataKey="score" stroke="#4FA3FF" fill="#4FA3FF" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Weak Skills */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Areas to Improve</h2>
              <div className="space-y-4">
                {weakSkills.map((w) => (
                  <div key={w.skill} className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{w.skill}</span>
                      <span className="badge-danger">{w.score}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-red-200 dark:bg-red-900/40 overflow-hidden mb-2">
                      <div className="h-full rounded-full bg-red-500" style={{ width: `${w.score}%` }} />
                    </div>
                    <p className="text-xs text-slate-500 flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-red-400" />{w.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Topics */}
            <div className="lg:col-span-2 card p-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Recommended Practice</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {recommendedTopics.map((t) => (
                  <div key={t.title} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                      {t.type === "Coding" ? <Code2 className="w-5 h-5 text-primary-600" /> :
                       t.type === "System Design" ? <Brain className="w-5 h-5 text-primary-600" /> :
                       t.type === "HR" ? <Users className="w-5 h-5 text-primary-600" /> :
                       <BookOpen className="w-5 h-5 text-primary-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{t.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge-primary text-xs">{t.type}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">{t.time}</span>
                        <span className={`text-xs font-medium ${t.difficulty === "Hard" ? "text-red-500" : t.difficulty === "Medium" ? "text-yellow-500" : "text-green-500"}`}>{t.difficulty}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            {/* Recent Reports */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Recent Reports</h2>
                <Link href="/reports" className="text-sm text-primary-600 hover:underline">View All</Link>
              </div>
              <div className="space-y-3">
                {recentReports.map((r) => (
                  <div key={r.company} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{r.company[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{r.company} — {r.role}</p>
                      <p className="text-xs text-slate-500">{r.type} · {r.date}</p>
                    </div>
                    <ScoreRing score={r.score} size={48} strokeWidth={5} />
                    <span className={`badge text-xs hidden sm:inline-flex ${
                      r.recommendation === "Highly Recommended" ? "badge-success" :
                      r.recommendation === "Recommended" ? "badge-primary" :
                      "badge-warning"
                    }`}>{r.recommendation}</span>
                    <BarChart2 className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Achievements</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((a) => (
                  <div key={a.title} className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                    a.earned
                      ? "border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800"
                      : "border-slate-100 dark:border-slate-800 opacity-50 grayscale"
                  }`}>
                    <span className="text-3xl mb-2">{a.icon}</span>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{a.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{a.desc}</p>
                    {a.earned && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mt-2" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
