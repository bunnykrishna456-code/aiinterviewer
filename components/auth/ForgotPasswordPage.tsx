"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import AuthLayout from "./AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout
      title="Reset your password 🔐"
      subtitle="Enter your email and we'll send you a reset link"
    >
      {!sent ? (
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  className={`input pl-10 ${error ? "border-red-400" : ""}`}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
              ) : (
                <>Send Reset Link <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      ) : (
        /* Success state */
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Check your inbox!</h3>
            <p className="text-slate-500 mt-2">
              We sent a password reset link to <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-sm text-slate-600 dark:text-slate-400">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <button onClick={() => setSent(false)} className="text-primary-600 font-semibold hover:underline">
              try again
            </button>
          </div>
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
