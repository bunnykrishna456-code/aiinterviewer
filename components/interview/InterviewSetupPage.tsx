"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, Briefcase, BarChart, Mic, Globe, ArrowRight,
  ArrowLeft, CheckCircle, Clock, Brain, Code2, Users,
  MessageSquare, Settings, Layers,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const companies = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Flipkart", "Infosys", "TCS", "Wipro", "Zoho", "Swiggy", "Zomato", "Razorpay", "PhonePe", "Other"];
const roles = ["Software Engineer", "Senior SDE", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer", "Product Manager", "System Architect", "Mobile Developer"];
const expLevels = [
  { label: "Fresher", sub: "0–1 years", icon: "🌱" },
  { label: "Junior", sub: "1–3 years", icon: "💡" },
  { label: "Mid Level", sub: "3–5 years", icon: "⚡" },
  { label: "Senior", sub: "5–8 years", icon: "🔥" },
  { label: "Lead/Staff", sub: "8+ years", icon: "🚀" },
];
const interviewTypes = [
  { id: "hr", label: "HR Interview", icon: Users, desc: "Behavioral, culture fit, salary" },
  { id: "technical", label: "Technical", icon: Settings, desc: "Deep-dive into your tech stack" },
  { id: "coding", label: "Coding", icon: Code2, desc: "DSA, algorithms, problem solving" },
  { id: "behavioral", label: "Behavioral", icon: MessageSquare, desc: "STAR method & leadership" },
  { id: "system-design", label: "System Design", icon: Layers, desc: "Architecture & scalability" },
  { id: "mixed", label: "Mixed", icon: Brain, desc: "Full end-to-end simulation" },
];
const difficulties = [
  { id: "easy", label: "Easy", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800", desc: "Entry-level questions, hints available" },
  { id: "medium", label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800", desc: "Mid-level depth, moderate complexity" },
  { id: "hard", label: "Hard", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800", desc: "Senior-level, no hints, time pressure" },
  { id: "expert", label: "Expert", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800", desc: "FAANG-level, maximum challenge" },
];
const languages = ["English", "Hindi", "Telugu", "Tamil", "Kannada"];
const voices = ["Alex (Male, US)", "Sarah (Female, US)", "Priya (Female, IN)", "Arjun (Male, IN)", "Emma (Female, UK)"];
const durations = [15, 30, 45, 60, 90];

export default function InterviewSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    company: "", role: "", experienceLevel: "Fresher",
    type: "technical", difficulty: "medium",
    language: "English", voice: "Alex (Male, US)",
    duration: 45, practiceMode: false,
  });

  const set = (k: string, v: string | number | boolean) => setConfig((c) => ({ ...c, [k]: v }));
  const totalSteps = 4;

  const stepTitles = ["Company & Role", "Interview Type", "Difficulty & Settings", "Review & Start"];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Configure Your Interview</h1>
          <p className="text-slate-500 mt-1">Set up a personalized AI interview session</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {stepTitles.map((title, i) => (
            <div key={title} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  i + 1 < step ? "bg-green-500 text-white" :
                  i + 1 === step ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" :
                  "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}>
                  {i + 1 < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={cn("text-xs mt-1 text-center hidden sm:block", i + 1 === step ? "text-primary-600 font-medium" : "text-slate-400")}>{title}</span>
              </div>
              {i < stepTitles.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-2 transition-all", i + 1 < step ? "bg-green-400" : "bg-slate-200 dark:bg-slate-700")} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="card p-8">
          {/* Step 1: Company & Role */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Company & Role</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Company</label>
                <div className="flex flex-wrap gap-2">
                  {companies.map((c) => (
                    <button key={c} onClick={() => set("company", c)}
                      className={cn("px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                        config.company === c ? "bg-primary-500 text-white border-primary-500" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400")}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Role</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button key={r} onClick={() => set("role", r)}
                      className={cn("px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                        config.role === r ? "bg-primary-500 text-white border-primary-500" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400")}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Experience Level</label>
                <div className="grid grid-cols-5 gap-3">
                  {expLevels.map((e) => (
                    <button key={e.label} onClick={() => set("experienceLevel", e.label)}
                      className={cn("flex flex-col items-center p-3 rounded-2xl border text-center transition-all",
                        config.experienceLevel === e.label ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30" : "border-slate-200 dark:border-slate-700 hover:border-primary-300")}>
                      <span className="text-2xl mb-1">{e.icon}</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{e.label}</span>
                      <span className="text-xs text-slate-400">{e.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interview Type */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Interview Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interviewTypes.map((t) => (
                  <button key={t.id} onClick={() => set("type", t.id)}
                    className={cn("flex items-center gap-4 p-5 rounded-2xl border text-left transition-all",
                      config.type === t.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30" : "border-slate-200 dark:border-slate-700 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-800")}>
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                      config.type === t.id ? "bg-primary-500" : "bg-slate-100 dark:bg-slate-700")}>
                      <t.icon className={cn("w-6 h-6", config.type === t.id ? "text-white" : "text-slate-500")} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{t.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{t.desc}</p>
                    </div>
                    {config.type === t.id && <CheckCircle className="w-5 h-5 text-primary-500 ml-auto flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Difficulty & Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Difficulty & Settings</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Difficulty Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {difficulties.map((d) => (
                    <button key={d.id} onClick={() => set("difficulty", d.id)}
                      className={cn("p-4 rounded-2xl border text-center transition-all", d.bg,
                        config.difficulty === d.id ? "border-current ring-2 ring-offset-2 ring-current" : "hover:scale-105")}>
                      <p className={`text-lg font-black ${d.color}`}>{d.label}</p>
                      <p className="text-xs text-slate-500 mt-1">{d.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Language</label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((l) => (
                      <button key={l} onClick={() => set("language", l)}
                        className={cn("px-3 py-1.5 rounded-lg border text-sm transition-all",
                          config.language === l ? "bg-primary-500 text-white border-primary-500" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400")}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">AI Voice</label>
                  <select value={config.voice} onChange={(e) => set("voice", e.target.value)} className="input">
                    {voices.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Duration</label>
                <div className="flex flex-wrap gap-2">
                  {durations.map((d) => (
                    <button key={d} onClick={() => set("duration", d)}
                      className={cn("px-4 py-2 rounded-xl border text-sm font-medium transition-all flex items-center gap-1",
                        config.duration === d ? "bg-primary-500 text-white border-primary-500" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400")}>
                      <Clock className="w-3 h-3" /> {d} min
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Practice Mode</p>
                  <p className="text-xs text-slate-500">Show hints, suggested answers, and learning resources during interview</p>
                </div>
                <button onClick={() => set("practiceMode", !config.practiceMode)}
                  className={cn("w-12 h-6 rounded-full transition-all relative", config.practiceMode ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-600")}>
                  <div className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all", config.practiceMode ? "left-6" : "left-0.5")} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Review & Start</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: "Company", val: config.company || "Not selected" },
                  { icon: Briefcase, label: "Role", val: config.role || "Not selected" },
                  { icon: BarChart, label: "Experience", val: config.experienceLevel },
                  { icon: Brain, label: "Interview Type", val: config.type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()) },
                  { icon: BarChart, label: "Difficulty", val: config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1) },
                  { icon: Globe, label: "Language", val: config.language },
                  { icon: Mic, label: "AI Voice", val: config.voice },
                  { icon: Clock, label: "Duration", val: `${config.duration} minutes` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                    <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm capitalize">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <p className="text-sm text-primary-700 dark:text-primary-400 font-medium mb-1">📋 Before you start:</p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Camera and microphone access will be requested</li>
                  <li>• Find a quiet place with good lighting</li>
                  <li>• Keep your resume nearby for reference</li>
                  <li>• Integrity monitoring will be active throughout</li>
                </ul>
              </div>
              <button onClick={() => router.push("/interview/live")}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg">
                <Mic className="w-5 h-5" /> Start Interview Now
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
              className={cn("btn-secondary flex items-center gap-2", step === 1 && "opacity-0 pointer-events-none")}>
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < totalSteps && (
              <button onClick={() => setStep((s) => s + 1)} className="btn-primary flex items-center gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
