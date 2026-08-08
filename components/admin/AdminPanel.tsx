"use client";
import { useState } from "react";
import {
  Users, Building2, Brain, Database, Activity, ShieldCheck,
  CreditCard, AlertTriangle, TrendingUp, Server, CheckCircle,
  XCircle, Eye, Trash2, Edit, Plus, BarChart2, Cpu, HardDrive,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const systemHealth = [
  { service: "API Server", status: "healthy", uptime: "99.9%", latency: "42ms", icon: Server },
  { service: "AI Engine (GPT-4)", status: "healthy", uptime: "99.7%", latency: "320ms", icon: Brain },
  { service: "Database (PostgreSQL)", status: "healthy", uptime: "100%", latency: "8ms", icon: Database },
  { service: "Media Storage (S3)", status: "degraded", uptime: "98.2%", latency: "210ms", icon: HardDrive },
  { service: "Speech-to-Text", status: "healthy", uptime: "99.5%", latency: "180ms", icon: Activity },
  { service: "TTS (ElevenLabs)", status: "healthy", uptime: "99.1%", latency: "260ms", icon: Activity },
];

const users = [
  { id: 1, name: "Arjun Kumar", email: "arjun@email.com", role: "candidate", status: "active", interviews: 12, joinDate: "Jan 2026" },
  { id: 2, name: "Priya Sharma", email: "priya@email.com", role: "candidate", status: "active", interviews: 8, joinDate: "Feb 2026" },
  { id: 3, name: "Recruiter One", email: "recruiter@google.com", role: "recruiter", status: "active", interviews: 0, joinDate: "Mar 2026" },
  { id: 4, name: "Admin User", email: "admin@interviewai.com", role: "admin", status: "active", interviews: 0, joinDate: "Dec 2025" },
  { id: 5, name: "Rahul Mehta", email: "rahul@email.com", role: "candidate", status: "suspended", interviews: 3, joinDate: "Apr 2026" },
];

const aiModels = [
  { name: "GPT-4 Turbo", provider: "OpenAI", usage: "Interview Q&A, Evaluation", status: "active", calls: "24,821", cost: "$182.40" },
  { name: "Whisper v3", provider: "OpenAI", usage: "Speech-to-Text", status: "active", calls: "18,203", cost: "$45.51" },
  { name: "ElevenLabs v2", provider: "ElevenLabs", usage: "Text-to-Speech", status: "active", calls: "12,940", cost: "$64.70" },
  { name: "Claude 3 Sonnet", provider: "Anthropic", usage: "Fallback evaluation", status: "inactive", calls: "1,204", cost: "$6.02" },
];

const revenueData = [
  { month: "Mar", revenue: 4200, users: 820 },
  { month: "Apr", revenue: 5800, users: 1100 },
  { month: "May", revenue: 7200, users: 1450 },
  { month: "Jun", revenue: 8900, users: 1820 },
  { month: "Jul", revenue: 11200, users: 2300 },
  { month: "Aug", revenue: 13800, users: 2950 },
];

const questionBank = [
  { topic: "React", count: 142, difficulty: "Mixed", lastUpdated: "Aug 1, 2026" },
  { topic: "Spring Boot", count: 98, difficulty: "Mixed", lastUpdated: "Jul 28, 2026" },
  { topic: "System Design", count: 67, difficulty: "Hard", lastUpdated: "Aug 3, 2026" },
  { topic: "DSA", count: 234, difficulty: "Mixed", lastUpdated: "Aug 5, 2026" },
  { topic: "Behavioral", count: 88, difficulty: "Easy", lastUpdated: "Jul 30, 2026" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "ai" | "questions" | "payments">("overview");

  const tabs = ["overview", "users", "ai", "questions", "payments"] as const;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Admin Panel</h1>
            <p className="text-slate-500 mt-1">Platform management and monitoring</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">All systems operational</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", val: "2,947", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Total Interviews", val: "18,420", change: "+24%", icon: BarChart2, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
            { label: "Monthly Revenue", val: "$13,800", change: "+23%", icon: CreditCard, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "Active Issues", val: "1", change: "S3 degraded", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{s.val}</p>
              <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
              <p className={cn("text-xs mt-1 font-medium", s.change.startsWith("+") ? "text-green-600" : "text-red-500")}>{s.change}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit flex-wrap">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all",
                activeTab === t ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}>
              {t === "ai" ? "AI Models" : t === "questions" ? "Question Bank" : t}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* System Health */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary-500" /> System Health
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {systemHealth.map((s) => (
                  <div key={s.service} className={cn("flex items-center gap-3 p-4 rounded-2xl border transition-all",
                    s.status === "healthy" ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      : "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20")}>
                    <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", s.status === "healthy" ? "bg-green-500 animate-pulse" : "bg-yellow-500 animate-pulse")} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">{s.service}</p>
                      <p className="text-xs text-slate-500">Uptime: {s.uptime} · {s.latency}</p>
                    </div>
                    {s.status === "healthy"
                      ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      : <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
            {/* Revenue Chart */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4FA3FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4FA3FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} formatter={(v) => [`$${v}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#4FA3FF" strokeWidth={3} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                    <Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={3} dot={{ fill: "#22c55e", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">User Management</h3>
              <button className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add User</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    {["Name", "Email", "Role", "Status", "Interviews", "Joined", "Actions"].map((h) => (
                      <th key={h} className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{u.name}</td>
                      <td className="p-4 text-slate-500">{u.email}</td>
                      <td className="p-4">
                        <span className={cn("badge text-xs capitalize",
                          u.role === "admin" ? "badge-danger" : u.role === "recruiter" ? "badge-warning" : "badge-primary")}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={cn("badge text-xs", u.status === "active" ? "badge-success" : "badge-danger")}>{u.status}</span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{u.interviews}</td>
                      <td className="p-4 text-slate-500">{u.joinDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button className="w-8 h-8 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center justify-center text-slate-400 hover:text-yellow-600 transition-colors"><Edit className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Models Tab */}
        {activeTab === "ai" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {aiModels.map((m) => (
                <div key={m.name} className="card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{m.name}</p>
                        <p className="text-xs text-slate-500">{m.provider}</p>
                      </div>
                    </div>
                    <span className={cn("badge text-xs", m.status === "active" ? "badge-success" : "bg-slate-100 text-slate-500")}>{m.status}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{m.usage}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                      <p className="text-xs text-slate-400">API Calls</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">{m.calls}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                      <p className="text-xs text-slate-400">Cost (MTD)</p>
                      <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">{m.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Bank Tab */}
        {activeTab === "questions" && (
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Question Bank</h3>
              <button className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add Questions</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    {["Topic", "Questions", "Difficulty", "Last Updated", "Actions"].map((h) => (
                      <th key={h} className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {questionBank.map((q) => (
                    <tr key={q.topic} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{q.topic}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{q.count}</td>
                      <td className="p-4">
                        <span className={cn("badge text-xs", q.difficulty === "Hard" ? "badge-danger" : q.difficulty === "Easy" ? "badge-success" : "badge-warning")}>{q.difficulty}</span>
                      </td>
                      <td className="p-4 text-slate-500">{q.lastUpdated}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <button className="w-8 h-8 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center justify-center text-slate-400 hover:text-yellow-600 transition-colors"><Edit className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { plan: "Free", users: 1840, revenue: "$0", color: "bg-slate-100 dark:bg-slate-800 text-slate-600" },
              { plan: "Pro ($29/mo)", users: 892, revenue: "$25,868", color: "bg-primary-100 dark:bg-primary-900/40 text-primary-700" },
              { plan: "Enterprise", users: 215, revenue: "$43,000", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700" },
            ].map((p) => (
              <div key={p.plan} className="card p-6 text-center">
                <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${p.color}`}>{p.plan}</div>
                <p className="text-3xl font-black text-slate-800 dark:text-slate-200">{p.users}</p>
                <p className="text-slate-500 text-sm mt-1">Active users</p>
                <p className="text-xl font-bold text-green-600 mt-3">{p.revenue}</p>
                <p className="text-slate-400 text-xs">Monthly revenue</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
