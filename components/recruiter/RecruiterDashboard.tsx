"use client";
import { useState } from "react";
import {
  Users, Plus, Search, Filter, Download, Mail, BarChart2,
  CheckCircle, Clock, XCircle, ChevronRight, Eye, Trash2,
  Briefcase, Star, TrendingUp, CalendarDays, Send, FileText,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreRing from "@/components/ui/ScoreRing";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from "recharts";

const candidates = [
  { id: 1, name: "Arjun Kumar", email: "arjun@email.com", role: "Software Engineer", score: 82, status: "completed", date: "Aug 7, 2026", recommendation: "Recommended", skills: ["React", "Java", "SQL"], avatar: "AK" },
  { id: 2, name: "Priya Sharma", email: "priya@email.com", role: "Frontend Dev", score: 91, status: "completed", date: "Aug 6, 2026", recommendation: "Highly Recommended", skills: ["React", "TypeScript", "CSS"], avatar: "PS" },
  { id: 3, name: "Rahul Mehta", email: "rahul@email.com", role: "Backend Dev", score: 74, status: "completed", date: "Aug 5, 2026", recommendation: "Needs Improvement", skills: ["Node.js", "MongoDB", "Docker"], avatar: "RM" },
  { id: 4, name: "Sneha Patel", email: "sneha@email.com", role: "Full Stack Dev", score: 0, status: "invited", date: "Aug 10, 2026", recommendation: "Pending", skills: ["Vue", "Python", "AWS"], avatar: "SP" },
  { id: 5, name: "Vikram Singh", email: "vikram@email.com", role: "DevOps Eng", score: 88, status: "completed", date: "Aug 4, 2026", recommendation: "Highly Recommended", skills: ["Kubernetes", "Terraform", "CI/CD"], avatar: "VS" },
  { id: 6, name: "Ananya Reddy", email: "ananya@email.com", role: "Data Scientist", score: 0, status: "pending", date: "Aug 11, 2026", recommendation: "Pending", skills: ["Python", "ML", "TensorFlow"], avatar: "AR" },
];

const jobRoles = [
  { title: "Software Engineer", openings: 3, applicants: 24, avgScore: 78, status: "active" },
  { title: "Frontend Developer", openings: 2, applicants: 18, avgScore: 82, status: "active" },
  { title: "DevOps Engineer", openings: 1, applicants: 9, avgScore: 71, status: "active" },
  { title: "Data Scientist", openings: 2, applicants: 15, avgScore: 75, status: "paused" },
];

const scoreDistribution = [
  { range: "90-100", count: 5 },
  { range: "80-89", count: 12 },
  { range: "70-79", count: 18 },
  { range: "60-69", count: 8 },
  { range: "<60", count: 3 },
];

const weeklyActivity = [
  { day: "Mon", interviews: 4 },
  { day: "Tue", interviews: 7 },
  { day: "Wed", interviews: 5 },
  { day: "Thu", interviews: 9 },
  { day: "Fri", interviews: 6 },
  { day: "Sat", interviews: 2 },
  { day: "Sun", interviews: 1 },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<"candidates" | "roles" | "analytics">("candidates");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Software Engineer");

  const filtered = candidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: number) => setSelectedCandidates((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const statusBadge = (status: string) => {
    if (status === "completed") return <span className="badge-success">Completed</span>;
    if (status === "invited") return <span className="badge-primary">Invited</span>;
    return <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">Pending</span>;
  };

  const recBadge = (rec: string) => {
    if (rec === "Highly Recommended") return <span className="badge-success text-xs">{rec}</span>;
    if (rec === "Recommended") return <span className="badge-primary text-xs">{rec}</span>;
    if (rec === "Needs Improvement") return <span className="badge-warning text-xs">{rec}</span>;
    return <span className="badge bg-slate-100 text-slate-500 text-xs">Pending</span>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Recruiter Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage candidates, job roles, and interview analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2 text-sm"><Download className="w-4 h-4" /> Export CSV</button>
            <button onClick={() => setShowInviteModal(true)} className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Invite Candidate</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Candidates", val: candidates.length, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
            { label: "Interviews Done", val: candidates.filter((c) => c.status === "completed").length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
            { label: "Avg Score", val: Math.round(candidates.filter((c) => c.score > 0).reduce((a, b) => a + b.score, 0) / candidates.filter((c) => c.score > 0).length), icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
            { label: "Open Roles", val: jobRoles.filter((r) => r.status === "active").length, icon: Briefcase, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{s.val}</p>
              <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit">
          {(["candidates", "roles", "analytics"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={cn("px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all",
                activeTab === t ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}>
              {t}
            </button>
          ))}
        </div>

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search candidates by name or role..."
                  className="input pl-10" />
              </div>
              <div className="flex gap-2">
                {["all", "completed", "invited", "pending"].map((s) => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={cn("px-4 py-2 rounded-xl border text-sm font-medium capitalize transition-all",
                      filterStatus === s ? "bg-primary-500 text-white border-primary-500" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400")}>
                    {s}
                  </button>
                ))}
              </div>
              {selectedCandidates.length > 0 && (
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 text-sm border border-primary-200">
                    <Mail className="w-4 h-4" /> Email ({selectedCandidates.length})
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-sm border border-red-200">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700">
                      <th className="p-4 text-left">
                        <input type="checkbox" className="w-4 h-4 rounded text-primary-600"
                          checked={selectedCandidates.length === filtered.length}
                          onChange={() => setSelectedCandidates(selectedCandidates.length === filtered.length ? [] : filtered.map((c) => c.id))} />
                      </th>
                      {["Candidate", "Role", "Score", "Status", "Recommendation", "Date", "Actions"].map((h) => (
                        <th key={h} className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {filtered.map((c) => (
                      <tr key={c.id} className={cn("hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", selectedCandidates.includes(c.id) && "bg-primary-50/50 dark:bg-primary-900/10")}>
                        <td className="p-4">
                          <input type="checkbox" className="w-4 h-4 rounded text-primary-600"
                            checked={selectedCandidates.includes(c.id)}
                            onChange={() => toggleSelect(c.id)} />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">{c.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{c.name}</p>
                              <p className="text-xs text-slate-400">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{c.role}</td>
                        <td className="p-4">
                          {c.score > 0 ? <ScoreRing score={c.score} size={44} strokeWidth={5} /> : <span className="text-slate-400 text-sm">—</span>}
                        </td>
                        <td className="p-4">{statusBadge(c.status)}</td>
                        <td className="p-4">{recBadge(c.recommendation)}</td>
                        <td className="p-4 text-sm text-slate-500">{c.date}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <button className="w-8 h-8 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 flex items-center justify-center text-slate-400 hover:text-primary-600 transition-colors" title="View Report">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors" title="Email">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center justify-center text-slate-400 hover:text-green-600 transition-colors" title="Compare">
                              <BarChart2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === "roles" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Create Job Role</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {jobRoles.map((role) => (
                <div key={role.title} className="card p-6 hover:shadow-xl transition-all hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200">{role.title}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{role.openings} opening{role.openings > 1 ? "s" : ""}</p>
                    </div>
                    <span className={cn("badge text-xs", role.status === "active" ? "badge-success" : "badge-warning")}>{role.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{role.applicants}</p>
                      <p className="text-xs text-slate-400">Applicants</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{role.avgScore}</p>
                      <p className="text-xs text-slate-400">Avg Score</p>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{role.openings}</p>
                      <p className="text-xs text-slate-400">Openings</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-1"><Eye className="w-4 h-4" /> View</button>
                    <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1"><Send className="w-4 h-4" /> Invite</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Score Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  <Bar dataKey="count" fill="#4FA3FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Weekly Interview Activity</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  <Line type="monotone" dataKey="interviews" stroke="#4FA3FF" strokeWidth={3} dot={{ fill: "#4FA3FF", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:col-span-2 card p-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Top Candidates Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700">
                      {["Rank", "Candidate", "Role", "Technical", "Communication", "Coding", "Overall", "Recommendation"].map((h) => (
                        <th key={h} className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {candidates.filter((c) => c.score > 0).sort((a, b) => b.score - a.score).slice(0, 4).map((c, i) => (
                      <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-3 pr-4">
                          <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold", i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-slate-300 text-slate-700" : "bg-orange-400/30 text-orange-700")}>
                            {i + 1}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">{c.avatar}</span>
                            </div>
                            <span className="font-medium text-slate-800 dark:text-slate-200">{c.name}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-slate-500">{c.role}</td>
                        <td className="py-3 pr-4"><span className="font-semibold text-slate-700 dark:text-slate-300">{c.score - 2}</span></td>
                        <td className="py-3 pr-4"><span className="font-semibold text-slate-700 dark:text-slate-300">{c.score - 5}</span></td>
                        <td className="py-3 pr-4"><span className="font-semibold text-slate-700 dark:text-slate-300">{c.score - 4}</span></td>
                        <td className="py-3 pr-4"><ScoreRing score={c.score} size={40} strokeWidth={4} /></td>
                        <td className="py-3">
                          {c.recommendation === "Highly Recommended" ? <span className="badge-success text-xs">{c.recommendation}</span> : <span className="badge-primary text-xs">{c.recommendation}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card p-6 w-full max-w-md animate-slide-up">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-5">Invite Candidate</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Candidate Email</label>
                <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} type="email" placeholder="candidate@email.com" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Job Role</label>
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="input">
                  {jobRoles.map((r) => <option key={r.title}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Interview Date</label>
                <input type="datetime-local" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Personal Message (optional)</label>
                <textarea placeholder="Hi, you've been invited to interview for..." className="input resize-none h-20 text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowInviteModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => setShowInviteModal(false)} className="btn-primary flex-1 flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
