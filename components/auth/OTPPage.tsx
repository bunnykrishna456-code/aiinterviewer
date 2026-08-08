"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, CheckCircle, RefreshCw } from "lucide-react";
import AuthLayout from "./AuthLayout";

const OTP_LENGTH = 6;

export default function OTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    setError("");
    if (val && idx < OTP_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...otp];
    text.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) { setError("Please enter all 6 digits"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    if (code === "123456" || code.length === 6) {
      setVerified(true);
      setTimeout(() => { window.location.href = "/dashboard"; }, 2000);
    } else {
      setError("Invalid code. Try 123456 for demo.");
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <AuthLayout
      title="Verify your email 📬"
      subtitle="We sent a 6-digit code to your email address"
    >
      {!verified ? (
        <div className="space-y-8">
          {/* Email hint */}
          <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Code sent to <span className="font-semibold text-slate-800 dark:text-slate-200">ar***@gmail.com</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP inputs */}
            <div>
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-2xl border-2 transition-all focus:outline-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200
                      ${digit ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30" : "border-slate-200 dark:border-slate-700"}
                      ${error ? "border-red-400" : "focus:border-primary-500"}
                    `}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            </div>

            {/* Progress bar */}
            <div className="flex gap-1">
              {otp.map((d, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full transition-all ${d ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`} />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join("").length < OTP_LENGTH}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
              ) : (
                <>Verify Code <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          {/* Resend */}
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-500">
              {canResend ? "Didn't receive the code?" : `Resend available in ${countdown}s`}
            </p>
            {canResend && (
              <button
                onClick={handleResend}
                className="inline-flex items-center gap-2 text-sm text-primary-600 font-semibold hover:underline"
              >
                <RefreshCw className="w-4 h-4" /> Resend Code
              </button>
            )}
          </div>

          {/* Demo hint */}
          <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-center">
            <p className="text-xs text-yellow-700 dark:text-yellow-400">🧪 Use code <span className="font-mono font-bold">123456</span> for demo</p>
          </div>

          <p className="text-center text-sm text-slate-500">
            Wrong email?{" "}
            <Link href="/auth/signup" className="text-primary-600 font-semibold hover:underline">Go back</Link>
          </p>
        </div>
      ) : (
        /* Success */
        <div className="text-center space-y-6 py-8">
          <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto animate-bounce-slow">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Email Verified! 🎉</h3>
            <p className="text-slate-500 mt-2">Your account is ready. Redirecting to dashboard...</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading your dashboard</span>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
