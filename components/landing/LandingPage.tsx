"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain, ArrowRight, Play, FileText, Mic, Code2, Shield, BarChart2,
  Trophy, Download, History, Zap, MessageSquare, Users, Star,
  CheckCircle, ChevronRight, Sparkles, Target, TrendingUp,
  Github, Chrome, Mail,
} from "lucide-react";
import FloatingShapes from "@/components/ui/FloatingShapes";
import AIAvatar from "@/components/ui/AIAvatar";
import ScoreRing from "@/components/ui/ScoreRing";

const features = [
  { icon: FileText, title: "AI Resume Analysis", desc: "Upload your resume and get instant analysis, skill extraction, and a personalized interview plan.", color: "from-blue-400 to-blue-600" },
  { icon: MessageSquare, title: "Personalized Questions", desc: "Questions dynamically generated from your resume — never generic, always relevant.", color: "from-purple-400 to-purple-600" },
  { icon: Mic, title: "Live AI Voice Interview", desc: "Real-time voice interaction with an AI that speaks, listens, and responds naturally.", color: "from-green-400 to-green-600" },
  { icon: Code2, title: "Coding Interview", desc: "Integrated code editor with test cases, AI code review, and complexity analysis.", color: "from-orange-400 to-orange-600" },
  { icon: Shield, title: "Anti-Cheating System", desc: "Camera monitoring, tab-switch detection, and integrity scoring for fair assessments.", color: "from-red-400 to-red-600" },
  { icon: BarChart2, title: "AI Communication Analysis", desc: "Measure confidence, fluency, grammar, vocabulary, and speaking clarity in real time.", color: "from-teal-400 to-teal-600" },
  { icon: Users, title: "Recruiter Dashboard", desc: "Invite candidates, compare scores, view detailed reports, and export CSV data.", color: "from-indigo-400 to-indigo-600" },
  { icon: Download, title: "Downloadable Reports", desc: "Generate professional PDF reports with scores, feedback, and improvement plans.", color: "from-pink-400 to-pink-600" },
  { icon: History, title: "Interview History", desc: "Track all past interviews, review answers, and monitor your progress over time.", color: "from-yellow-400 to-yellow-600" },
  { icon: Zap, title: "Adaptive Difficulty", desc: "AI adjusts question difficulty dynamically based on your performance.", color: "from-cyan-400 to-cyan-600" },
  { icon: Target, title: "Career Recommendations", desc: "Get personalized course and project recommendations to close your skill gaps.", color: "from-violet-400 to-violet-600" },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Skill radar charts, weekly progress, confidence trends, and leaderboards.", color: "from-emerald-400 to-emerald-600" },
];

const testimonials = [
  { name: "Priya Sharma", role: "SDE at Amazon", avatar: "PS", score: 92, review: "InterviewAI felt like a real interview. The AI asked deep follow-up questions and caught me on topics I thought I knew. I got the Amazon offer after just 2 weeks of practice here." },
  { name: "Rahul Mehta", role: "Frontend Dev at Google", avatar: "RM", score: 88, review: "The resume-based questions were spot on. It asked about every project I listed and challenged me with follow-ups. Best interview prep I've found." },
  { name: "Ananya Patel", role: "Data Scientist at Microsoft", avatar: "AP", score: 95, review: "The communication analysis helped me understand I was using too many filler words. After fixing that, my interview confidence went through the roof." },
  { name: "Vikram Singh", role: "Backend Dev at Flipkart", avatar: "VS", score: 79, review: "The coding interview section is incredible. Real-time AI code review, complexity analysis — it's like having a senior engineer reviewing your code live." },
];

const steps = [
  { num: "01", title: "Upload Your Resume", desc: "AI analyzes your skills, projects, and experience in seconds." },
  { num: "02", title: "Configure Interview", desc: "Choose company, role, type, difficulty, and language." },
  { num: "03", title: "Interview with AI", desc: "Speak naturally. AI asks, listens, evaluates, and adapts." },
  { num: "04", title: "Get Your Report", desc: "Download a detailed report with scores and improvement plan." },
];

const TYPEWRITER_WORDS = ["AI Interviewer", "AI Interviewer", "AI Interviewer"];

export default function LandingPage() {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % TYPEWRITER_WORDS.length);
    }

    setDisplayed(currentWord.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">InterviewAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-primary-600 transition-colors">Reviews</a>
            <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4 hidden sm:flex">Sign In</Link>
            <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent/20 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/30" />
        <FloatingShapes />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8 animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 border border-primary-200 dark:border-primary-800">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Powered by GPT-4 & Real-time AI</span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-slate-900 dark:text-white">
                Meet Your
                <span className="block gradient-text">
                  {displayed}
                  <span className="inline-block w-1 h-14 bg-primary-500 ml-1 animate-pulse align-middle" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Practice realistic interviews with an AI that analyzes your resume, adapts questions in real time, evaluates your responses, and helps you become interview-ready. No coaching needed — just you and the AI.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { val: "50K+", label: "Interviews Conducted" },
                  { val: "94%", label: "Offer Rate" },
                  { val: "4.9★", label: "User Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-primary-600">{s.val}</p>
                    <p className="text-sm text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/signup" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                  Start Free Interview
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Demo
                </button>
              </div>

              {/* Auth options */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>Sign up with:</span>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 transition-colors">
                  <Chrome className="w-4 h-4" /> Google
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </button>
              </div>
            </div>

            {/* Right — Hero Visual */}
            <div className="relative flex flex-col items-center gap-6 animate-fade-in">
              {/* AI Avatar card */}
              <div className="glass rounded-3xl p-8 w-full max-w-sm shadow-2xl shadow-primary-500/10">
                <AIAvatar speaking size="lg" name="Alex — AI Interviewer" />
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">💬 Current Question</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    "You mentioned Spring Boot in your resume. Can you explain the Bean lifecycle and how dependency injection works under the hood?"
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse" />
                  </div>
                  <span className="text-xs text-slate-500">Round 2/4</span>
                </div>
              </div>

              {/* Score preview */}
              <div className="glass rounded-2xl p-4 flex items-center gap-4 w-full max-w-sm">
                <ScoreRing score={84} size={70} strokeWidth={7} label="Score" />
                <div className="flex-1 space-y-2">
                  {[
                    { label: "Technical", val: 88 },
                    { label: "Communication", val: 79 },
                    { label: "Confidence", val: 85 },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-24">{m.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600" style={{ width: `${m.val}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume upload preview */}
              <div className="glass rounded-2xl p-4 w-full max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Resume Analyzed ✓</p>
                    <p className="text-xs text-slate-500">12 skills · 3 projects · 2 internships</p>
                  </div>
                  <span className="badge-success">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="badge-primary mb-4">Features</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-2">
              Everything you need to
              <span className="gradient-text"> ace your interview</span>
            </h2>
            <p className="text-xl text-slate-500 mt-4 max-w-2xl mx-auto">
              From resume analysis to coding rounds, we cover the full interview journey with AI-powered precision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card-hover p-6 group cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="section">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="badge-primary mb-4">Process</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-2">
              How it <span className="gradient-text">works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-primary-300 to-transparent" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-500/30">
                  <span className="text-white text-xl font-black">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="section bg-slate-50 dark:bg-slate-900/50">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="badge-primary mb-4">Reviews</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mt-2">
              Loved by <span className="gradient-text">candidates</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{t.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                  <ScoreRing score={t.score} size={56} strokeWidth={6} />
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">"{t.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERVIEW TYPES ── */}
      <section className="section">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="badge-primary">Interview Types</span>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                Every interview type,
                <span className="gradient-text"> covered</span>
              </h2>
              <div className="space-y-4">
                {[
                  { title: "HR Interview", desc: "Behavioral, culture fit, and situational questions", icon: "👔" },
                  { title: "Technical Interview", desc: "Deep-dive into your tech stack from your resume", icon: "⚙️" },
                  { title: "Coding Interview", desc: "Real-time coding with AI review and test cases", icon: "💻" },
                  { title: "System Design", desc: "Architecture, scalability, and design questions", icon: "🏗️" },
                  { title: "Behavioral Interview", desc: "STAR method responses with AI coaching", icon: "🧠" },
                  { title: "Mixed Interview", desc: "Full end-to-end interview simulation", icon: "🎯" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer group">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 transition-colors">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 ml-auto transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Sample Evaluation</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Technical", score: 88 },
                  { label: "Communication", score: 79 },
                  { label: "Confidence", score: 85 },
                  { label: "Problem Solving", score: 91 },
                ].map((m) => (
                  <div key={m.label} className="card p-4 text-center">
                    <ScoreRing score={m.score} size={80} strokeWidth={8} />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-2">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-700 dark:text-green-400">Hiring Recommendation</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">Highly Recommended ⭐</p>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">Overall Score: 86/100</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
        <FloatingShapes />
        <div className="relative z-10 container-max text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Ready to ace your next interview?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join 50,000+ candidates who used InterviewAI to land their dream jobs. Start practicing for free today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-xl">
              Start Free — No Credit Card
            </Link>
            <Link href="/auth/login" className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105">
              I Already Have an Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold">InterviewAI</span>
            </div>
            <p className="text-sm">Your personal AI interviewer for landing dream jobs.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "How It Works", "Pricing", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm hover:text-primary-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-sm">
          © 2026 InterviewAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
