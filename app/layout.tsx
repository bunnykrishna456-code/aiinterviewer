import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "InterviewAI — Your Personal AI Interviewer",
  description:
    "Practice realistic interviews with an AI that analyzes your resume, adapts questions in real time, evaluates your responses, and helps you become interview-ready.",
  keywords: ["AI Interview", "Interview Practice", "Resume Analysis", "Coding Interview", "Technical Interview"],
  openGraph: {
    title: "InterviewAI — Your Personal AI Interviewer",
    description: "Practice realistic interviews powered by AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              borderRadius: "12px",
              border: "1px solid #334155",
            },
          }}
        />
      </body>
    </html>
  );
}
