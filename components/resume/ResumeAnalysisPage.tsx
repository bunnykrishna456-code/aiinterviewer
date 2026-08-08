"use client";
import { useState, useCallback } from "react";
import {
  Upload, FileText, CheckCircle, AlertCircle, TrendingUp,
  Star, Code2, Briefcase, Award, BookOpen, ChevronRight,
  Download, RefreshCw, Target, Zap, Brain, X,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const mockResumeData = {
  name: "Arjun Kumar",
  email: "arjun@email.com",
  phone: "+91 9876543210",
  score: 82,
  readinessScore: 78,
  jobMatchPercent: 74,
  skills: ["React", "TypeScript", "Node.js", "Spring Boot", "SQL", "Docker", "Git"],
  programmingLanguages: ["JavaScript", "TypeScript", "Java", "Python", "SQL"],
  frameworks: ["React", "Next.js", "Spring Boot", "Express.js", "Tailwind CSS"],
  projects: [
    { name: "E-Commerce Platform", tech: ["React", "Node.js", "MongoDB"], desc: "Full-stack shopping app with payment gateway" },
    { name: "Chat Application", tech: ["Socket.io", "Express", "Redis"], desc: "Real-time messaging with 500+ concurrent users" },
    { name: "ML Price Predictor", tech: ["Python", "Scikit-learn", "Flask"], desc: "Housing price prediction with 92% accuracy" },
  ],
  education: [{ degree: "B.Tech CSE", institution: "VIT University", year: "2024", gpa: "8.7" }],
  certifications: ["AWS Solutions Architect", "Google Cloud Associate", "Meta React Developer"],
  experience: [{ title: "SDE Intern", company: "Zoho Corp", duration: "6 months", description: "Built microservices using Spring Boot" }],
  strengths: [
    "Strong full-stack development skills",
    "Good project portfolio with measurable impact",
    "Multiple industry certifications",
    "Experience with modern frameworks",
  ],
  weaknesses: [
    "No system design experience listed",
    "Missing contribution to open source",
    "No DSA competitive programming profile",
  ],
  missingSkills: ["Kubernetes", "GraphQL", "Redis", "System Design", "Microservices Architecture"],
};

const skillScores = [
  { skill: "React/Next.js", score: 88 },
  { skill: "Java/Spring", score: 72 },
  { skill: "Node.js", score: 80 },
  { skill: "SQL/DB", score: 84 },
  { skill: "DSA", score: 62 },
  { skill: "System Design", score: 45 },
];

const radarData = [
  { subject: "Frontend", score: 88 },
  { subject: "Backend", score: 75 },
  { subject: "Database", score: 84 },
  { subject: "DevOps", score: 60 },
  { subject: "DSA", score: 62 },
  { subject: "Soft Skills", score: 78 },
];

export default function ResumeAnalysisPage() {
  const [stage, setStage] = useState<"upload" | "analyzing" | "result">("upload");
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<"overview" | "skills" | "jd">("overview");
  const [jdText, setJdText] = useState("");
  const [jdAnalyzed, setJdAnalyzed] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === "application/pdf" || f.name.endsWith(".docx"))) {
      setFile(f);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setStage("analyzing");
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }
    setStage("result");
  };

  const handleJDAnalyze = async () => {
    if (!jdText.trim()) return;
    await new Promise((r) => setTimeout(r, 1000));
    setJdAnalyzed(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Resume Analysis</h1>
            <p className="text-slate-500 mt-1">Upload your resume for AI-powered analysis and personalized interview prep</p>
          </div>
          {stage === "result" && (
            <button onClick={() => { setStage("upload"); setFile(null); setProgress(0); }}
              className="btn-secondary flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4" /> Re-upload
            </button>
          )}
        </div>

        {/* Upload Stage */}
        {stage === "upload" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer
                  ${dragOver ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
              >
                <input type="file" accept=".pdf,.docx" onChange={handleFileInput} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary-600" />
                </div>
                {file ? (
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{file.name}</p>
                    <p className="text-sm text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Drop your resume here</p>
                    <p className="text-slate-500 text-sm mt-1">or click to browse</p>
                    <p className="text-xs text-slate-400 mt-2">Supports PDF and DOCX up to 10MB</p>
                  </div>
                )}
              </div>
              {file && (
                <button onClick={handleAnalyze} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  <Brain className="w-5 h-5" /> Analyze Resume with AI
                </button>
              )}
            </div>
            <div className="card p-6 space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">What we extract</h3>
              {[
                { icon: "👤", label: "Personal Info", items: "Name, Email, Phone, Location" },
                { icon: "🎓", label: "Education", items: "Degree, Institution, GPA, Year" },
                { icon: "💻", label: "Technical Skills", items: "Languages, Frameworks, Tools" },
                { icon: "🚀", label: "Projects", items: "Title, Tech Stack, Impact" },
                { icon: "💼", label: "Experience", items: "Role, Company, Duration" },
                { icon: "🏆", label: "Certifications", items: "Name, Issuer, Date" },
                { icon: "🤝", label: "Soft Skills", items: "Communication, Leadership, etc." },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analyzing Stage */}
        {stage === "analyzing" && (
          <div className="card p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Analyzing your resume...</h3>
            <p className="text-slate-500 mb-6">AI is extracting skills, projects, and experience</p>
            <div className="space-y-3 text-left">
              {[
                { label: "Extracting personal information", done: progress > 20 },
                { label: "Analyzing skills & technologies", done: progress > 40 },
                { label: "Parsing projects & experience", done: progress > 60 },
                { label: "Generating skill graph", done: progress > 80 },
                { label: "Building interview question bank", done: progress >= 100 },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${step.done ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`}>
                    {step.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm ${step.done ? "text-slate-600 dark:text-slate-400" : "text-slate-400"}`}>{step.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span><span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-100" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Result Stage */}
        {stage === "result" && (
          <div className="space-y-6">
            {/* Score Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Resume Score", score: mockResumeData.score, color: "#4FA3FF" },
                { label: "Readiness", score: mockResumeData.readinessScore, color: "#22c55e" },
                { label: "Job Match", score: mockResumeData.jobMatchPercent, color: "#a855f7" },
                { label: "Skill Coverage", score: 71, color: "#f59e0b" },
              ].map((s) => (
                <div key={s.label} className="card p-5 flex flex-col items-center gap-2">
                  <ScoreRing score={s.score} size={90} strokeWidth={9} color={s.color} />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-fit">
              {(["overview", "skills", "jd"] as const).map((t) => (
                <button key={t} onClick={() => setActiveSection(t)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ${activeSection === t ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}>
                  {t === "jd" ? "JD Match" : t}
                </button>
              ))}
            </div>

            {activeSection === "overview" && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* Extracted Info */}
                  <div className="card p-6">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Extracted Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><p className="text-xs text-slate-400 uppercase tracking-wide">Name</p><p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{mockResumeData.name}</p></div>
                      <div><p className="text-xs text-slate-400 uppercase tracking-wide">Email</p><p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{mockResumeData.email}</p></div>
                      <div><p className="text-xs text-slate-400 uppercase tracking-wide">Education</p><p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{mockResumeData.education[0].degree} · {mockResumeData.education[0].institution}</p></div>
                      <div><p className="text-xs text-slate-400 uppercase tracking-wide">Experience</p><p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{mockResumeData.experience[0].title} @ {mockResumeData.experience[0].company}</p></div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Skills Detected</p>
                      <div className="flex flex-wrap gap-2">
                        {mockResumeData.skills.map((s) => <span key={s} className="badge-primary">{s}</span>)}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {mockResumeData.certifications.map((c) => <span key={c} className="badge bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">{c}</span>)}
                      </div>
                    </div>
                  </div>
                  {/* Projects */}
                  <div className="card p-6">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Projects Found</h3>
                    <div className="space-y-3">
                      {mockResumeData.projects.map((p) => (
                        <div key={p.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                          <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{p.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                          <div className="flex flex-wrap gap-1 mt-2">{p.tech.map((t) => <span key={t} className="badge-primary text-xs">{t}</span>)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Strengths */}
                  <div className="card p-5">
                    <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Strengths</h3>
                    <ul className="space-y-2">
                      {mockResumeData.strengths.map((s) => <li key={s} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />{s}</li>)}
                    </ul>
                  </div>
                  {/* Weaknesses */}
                  <div className="card p-5">
                    <h3 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Weaknesses</h3>
                    <ul className="space-y-2">
                      {mockResumeData.weaknesses.map((w) => <li key={w} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />{w}</li>)}
                    </ul>
                  </div>
                  {/* Missing Skills */}
                  <div className="card p-5">
                    <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockResumeData.missingSkills.map((s) => <span key={s} className="badge-warning">{s}</span>)}
                    </div>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Target className="w-4 h-4" /> Start Interview
                  </button>
                </div>
              </div>
            )}

            {activeSection === "skills" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Skill Radar</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <Radar name="Score" dataKey="score" stroke="#4FA3FF" fill="#4FA3FF" fillOpacity={0.25} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card p-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Skill Scores</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={skillScores} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <YAxis type="category" dataKey="skill" tick={{ fontSize: 11 }} width={90} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                      <Bar dataKey="score" fill="#4FA3FF" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeSection === "jd" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Paste Job Description</h3>
                  <textarea value={jdText} onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="input resize-none h-48 font-mono text-sm" />
                  <button onClick={handleJDAnalyze} className="btn-primary w-full mt-3 flex items-center justify-center gap-2">
                    <Brain className="w-4 h-4" /> Compare with Resume
                  </button>
                </div>
                {jdAnalyzed && (
                  <div className="space-y-4">
                    <div className="card p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Match Analysis</h4>
                        <ScoreRing score={74} size={64} strokeWidth={7} color="#a855f7" />
                      </div>
                      <div className="space-y-2">
                        {[{ label: "Matched Skills", val: "8/12", color: "text-green-600" }, { label: "Missing Skills", val: "4", color: "text-red-600" }, { label: "Expected Difficulty", val: "Hard", color: "text-orange-600" }].map((m) => (
                          <div key={m.label} className="flex justify-between text-sm">
                            <span className="text-slate-500">{m.label}</span>
                            <span className={`font-semibold ${m.color}`}>{m.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card p-5">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3">Expected Questions</h4>
                      <ul className="space-y-2">
                        {["Explain microservices architecture", "Design a scalable REST API", "How do you handle database transactions?", "Describe your CI/CD experience"].map((q) => (
                          <li key={q} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />{q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
