"use client";
import Link from "next/link";
import { Brain } from "lucide-react";
import FloatingShapes from "@/components/ui/FloatingShapes";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-500 to-primary-700 flex-col items-center justify-center p-12 overflow-hidden">
        <FloatingShapes />
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black text-white">InterviewAI</span>
          </Link>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your AI-powered path to your dream job
            </h2>
            <p className="text-primary-100 text-lg leading-relaxed">
              Practice with a real AI interviewer. Get instant feedback. Land the offer.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "50K+", label: "Interviews" },
              { val: "94%", label: "Offer Rate" },
              { val: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-white">{s.val}</p>
                <p className="text-primary-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 text-left">
            <p className="text-white text-sm leading-relaxed italic">
              "InterviewAI felt like a real interview. Got my Amazon SDE offer after 2 weeks of practice!"
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">PS</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Priya Sharma</p>
                <p className="text-primary-200 text-xs">SDE at Amazon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-white dark:bg-slate-950 overflow-y-auto">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">InterviewAI</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
