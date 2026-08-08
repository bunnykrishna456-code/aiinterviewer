"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import SocialAuthButtons from "./SocialAuthButtons";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "candidate" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (!passwordRules.every((r) => r.test(form.password))) e.password = "Password doesn't meet requirements";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    window.location.href = "/auth/otp";
  };

  return (
    <AuthLayout title="Create your account ✨" subtitle="Start practicing interviews for free — no credit card needed">
      <div className="space-y-6">
        <SocialAuthButtons mode="signup" />

        <div className="relative flex items-center">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <span className="px-4 text-sm text-slate-400">or sign up with email</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Arjun Kumar"
                className={`input pl-10 ${errors.name ? "border-red-400" : ""}`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className={`input pl-10 ${errors.email ? "border-red-400" : ""}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">I am a</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "candidate", label: "Candidate", emoji: "👨‍💻" },
                { val: "recruiter", label: "Recruiter", emoji: "🏢" },
                { val: "admin", label: "Admin", emoji: "⚙️" },
              ].map((r) => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => set("role", r.val)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    form.role === r.val
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-300"
                  }`}
                >
                  <span className="block text-xl mb-1">{r.emoji}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="••••••••"
                className={`input pl-10 pr-10 ${errors.password ? "border-red-400" : ""}`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password strength */}
            {form.password && (
              <div className="mt-2 grid grid-cols-2 gap-1">
                {passwordRules.map((r) => (
                  <div key={r.label} className="flex items-center gap-1.5">
                    <CheckCircle className={`w-3 h-3 ${r.test(form.password) ? "text-green-500" : "text-slate-300"}`} />
                    <span className={`text-xs ${r.test(form.password) ? "text-green-600" : "text-slate-400"}`}>{r.label}</span>
                  </div>
                ))}
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
                placeholder="••••••••"
                className={`input pl-10 ${errors.confirm ? "border-red-400" : ""}`}
              />
            </div>
            {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded text-primary-600 border-slate-300 focus:ring-primary-500" />
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
              I agree to the{" "}
              <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>
            ) : (
              <>Create Account <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
