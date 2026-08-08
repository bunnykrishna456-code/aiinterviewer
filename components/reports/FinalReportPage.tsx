"use client";
import { useState } from "react";
import {
  Download, Share2, Mail, Star, CheckCircle, AlertCircle,
  TrendingUp, Trophy, BookOpen, Code2, Mic, Shield,
  ChevronDown, ChevronUp, Brain, Target, Zap, Calendar,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreRing from "@/components/ui/ScoreRing";
import { getHiringLabel } from "@/lib/utils";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from "recharts";

const reportData = {
  id: "RPT-2026-001",
  candidate: "Arjun Kumar",
  company: "Google",
  role: "Software Engineer",
  date: "August 7, 2026",
  duration: "52 min",
  overallScore: 82,
  resumeScore: 85,
  technicalScore: 80,
  codingScore: 78,
  hrScore: 88,
  behaviorScore: 84,
  communicationScore: 79,
  integrityScore: 96,
  hiringRecommendation: 82,
};

const radarData = [
  { subject: "Technical", score: 80 },
  { subject: "Communication", score: 79 },
  { subject: "Coding", score: 78 },
  { subject: "HR/Behavior", score: 86 },
  { subject: "Problem Solving", score: 82 },
  { subject: "Confidence", score: 77 },
];

const timelineData = [
  { round: "Intro", score: 88 },
  { round: "Spring Boot", score: 76 },
  { round: "React", score: 82 },
  { round: "SQL", score: 85 },
  { round: "System Design", score: 71 },
  { round: "Coding", score: 78 },
  { round: "HR", score: 90 },
];

const qaEvaluation = [
  { q: "Tell me about yourself", score: 88, strength: "Clear structure, good delivery", weakness: "Could add more quantifiable achievements", topic: "Introduction" },
  { q: "Explain Bean Lifecycle in Spring Boot", score: 75, strength: "Covered key phases correctly", weakness: "Missed BeanPostProcessor details", topic: "Spring Boot" },
  { q: "Explain Virtual DOM in React", score: 82, strength: "Good analogy used, accurate explanation", weakness: "Didn't mention reconciliation key optimizations", topic: "React" },
  { q: "Design a URL Shortener", score: 70, strength: "Good database schema", weakness: "Didn't address caching layer or rate limiting", topic: "System Design" },
  { q: "Two Sum implementation", score: 78, strength: "Optimal O(n) solution", weakness: "No discussion of edge cases", topic: "Coding" },
];

const courses = [
  { title: "System Design Interview", platform: "Educative", url: "#", priority: "High" },
  { title: "Dynamic Programming Patterns", platform: "LeetCode", url: "#", priority: "High" },
  { title: "Spring Boot Microservices", platform: "Udemy", url: "#", priority: "Medium" },
  { title: "Grokking Modern System Design", platform: "Coursera", url: "#", priority: "Medium" },
];

const improvementPlan = [
  { week: "Week 1–2", focus: "System Design Fundamentals", tasks: ["Study distributed systems basics", "Practice 3 system design problems", "Learn about CAP theorem"] },
  { week: "Week 2–3", focus: "DSA — Dynamic Programming", tasks: ["Solve 20 DP problems on LeetCode", "Master memoization vs tabulation", "Practice contest-style problems"] },
  { week: "Week 3–4", focus: "Communication & Mock Interviews", tasks: ["Record yourself answering questions", "Practice STAR method answers", "Conduct 3 mock interviews"] },
];

export default function FinalReportPage() {
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "qa" | "plan">("overview");
  const { label: hiringLabel, color: hiringColor } = getHiringLabel(reportData.hiringRecommendation);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Interview Report</h1>
            <p className="text-slate-500 mt-1">{reportData.company} — {reportData.role} · {reportData.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2 text-sm"><Share2 className="w-4 h-4" /> Share</button>
            <button className="btn-secondary flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /> Email</button>
            <button className="btn-primary flex items-center gap-2 text-sm"><Download className="w-4 h-4" /> Download PDF</button>
          </div>
        </div>

        {/* Hiring Recommendation Banner */}
        <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 ${reportData.overallScore >= 80 ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-yellow-500 to-orange-500"}`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <ScoreRing score={reportData.overallScore} size={120} strokeWidth={12} color="white" />
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-sm font-medium">Overall Score</p>
              <h2 className="text-4xl font-black text-white">{reportData.overallScore}/100</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => <Star key={i} className={`w-5 h-5 ${i <= 4 ? "fill-yellow-300 text-yellow-300" : "text-white/30"}`} />)}
                </div>
              </div>
              <p className={`text-2xl font-bold mt-1 ${reportData.overallScore >= 80 ? "text-white" : "text-white"}`}>
                {hiringLabel}
              </p>
            </div>
            <div className="sm:ml-auto grid grid-cols-2 gap-3">
              {[
                { label: "Duration", val: reportData.duration, icon: "⏱️" },
                { label: "Questions", val: "12", icon: "❓" },
                { label: "Integrity", val: `${reportData.integrityScore}%`, icon: "🛡️" },
                { label: "Report ID", val: reportData.id, icon: "📄" },
              ].map((item) => (
                <div key={item.label} className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <p className="text-white/70 text-xs">{item.icon} {item.label}</p>
                  <p className="text-white font-bold text-sm">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Technical", score: reportData.technicalScore, icon: Brain, color: "#4FA3FF" },
            { label: "Communication", score: reportData.communicationScore, icon: Mic, color: "#a855f7" },
            { label: "Coding", score: reportData.codingScore, icon: Code2, color: "#f59e0b" },
            { label: "HR/Behavior", score: reportData.hrScore, icon: Trophy, color: "#22c55e" },
            { label: "Resume", score: reportData.resumeScore, icon: BookOpen, color: "#06b6d4" },
            { label: "Problem Solving", score: 82, icon: Target, color: "#ec4899" },
            { label: "Confidence", score: 77, icon: Zap, color: "#8b5cf6" },
            { label: "Integrity", score: reportData.integrityScore, icon: Shield, color: "#10b981" },
          ].map((s) => (
            <div key={s.label} className="card p-4 flex items-center gap-3">
              <ScoreRing score={s.score} size={56} strokeWidth={6} color={s.color} />
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">{s.score}/100</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit">
          {(["overview", "qa", "plan"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === t ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}>
              {t === "qa" ? "Q&A Breakdown" : t === "plan" ? "Improvement Plan" : "Overview"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Skill Radar</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke="#4FA3FF" fill="#4FA3FF" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {/* Timeline */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Performance Timeline</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FA3FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4FA3FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="round" tick={{ fontSize: 10 }} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  <Area type="monotone" dataKey="score" stroke="#4FA3FF" strokeWidth={3} fill="url(#tGrad)" dot={{ fill: "#4FA3FF", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Strengths */}
            <div className="card p-6">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Key Strengths</h3>
              <ul className="space-y-2">
                {["Strong React and frontend knowledge", "Clear communication and logical thinking", "Good problem decomposition skills", "Professional attitude throughout", "Excellent HR and behavioral responses"].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
            {/* Weak Areas */}
            <div className="card p-6">
              <h3 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Areas to Improve</h3>
              <ul className="space-y-2">
                {["System design depth — caching, rate limiting", "Dynamic programming fluency", "Spring Boot internals (BeanPostProcessor)", "Handling edge cases in coding problems", "Speaking speed — slightly rushed at times"].map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />{w}
                  </li>
                ))}
              </ul>
            </div>
            {/* Recommended Courses */}
            <div className="lg:col-span-2 card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary-500" /> Recommended Courses</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {courses.map((c) => (
                  <div key={c.title} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{c.title}</p>
                      <p className="text-xs text-slate-500">{c.platform}</p>
                    </div>
                    <span className={`badge text-xs ${c.priority === "High" ? "badge-danger" : "badge-warning"}`}>{c.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "qa" && (
          <div className="space-y-4">
            {qaEvaluation.map((item, i) => (
              <div key={i} className="card overflow-hidden">
                <button className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  onClick={() => setExpandedQ(expandedQ === i ? null : i)}>
                  <span className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-sm font-bold text-primary-600 flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{item.q}</p>
                    <span className="badge-primary text-xs mt-1">{item.topic}</span>
                  </div>
                  <ScoreRing score={item.score} size={48} strokeWidth={5} />
                  {expandedQ === i ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                {expandedQ === i && (
                  <div className="px-5 pb-5 space-y-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                      <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">✅ Strength</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.strength}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">⚠️ Weakness</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.weakness}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "plan" && (
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary-500" /> 30-Day Improvement Plan</h3>
              <p className="text-slate-500 text-sm mb-6">Personalized roadmap based on your interview performance</p>
              <div className="space-y-4">
                {improvementPlan.map((plan, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{i + 1}</div>
                      {i < improvementPlan.length - 1 && <div className="flex-1 w-px bg-primary-200 dark:bg-primary-800 mt-2" />}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{plan.focus}</span>
                        <span className="badge-primary text-xs">{plan.week}</span>
                      </div>
                      <ul className="space-y-1">
                        {plan.tasks.map((task) => (
                          <li key={task} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
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
