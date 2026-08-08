"use client";
import { useState, useEffect, useRef } from "react";
import {
  Mic, MicOff, Video, VideoOff, Shield, Clock, ChevronRight,
  AlertTriangle, CheckCircle, X, Maximize2, Volume2, VolumeX,
  Brain, Wifi, WifiOff, BarChart2, MessageSquare, Eye,
} from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import AIAvatar from "@/components/ui/AIAvatar";
import WaveIndicator from "@/components/ui/WaveIndicator";
import TypingIndicator from "@/components/ui/TypingIndicator";
import ScoreRing from "@/components/ui/ScoreRing";

const questions = [
  { id: "q1", text: "Tell me about yourself and walk me through your technical background.", topic: "Introduction", round: 1 },
  { id: "q2", text: "You have Spring Boot in your resume. Can you explain the Bean lifecycle and how dependency injection works internally?", topic: "Spring Boot", round: 1 },
  { id: "q3", text: "What is the difference between @Component, @Service, and @Repository annotations?", topic: "Spring Boot", round: 1 },
  { id: "q4", text: "Explain the Virtual DOM in React and how React's reconciliation algorithm works.", topic: "React", round: 2 },
  { id: "q5", text: "What's the difference between useEffect and useMemo? When would you use each?", topic: "React Hooks", round: 2 },
  { id: "q6", text: "Design a system for a URL shortener like bit.ly. Walk me through your approach.", topic: "System Design", round: 3 },
];

const integrityEvents = [
  { type: "warning", text: "Tab switch detected", time: "02:15" },
  { type: "info", text: "Camera feed stable", time: "05:30" },
  { type: "warning", text: "Looking away", time: "08:42" },
];

const transcript = [
  { speaker: "AI", text: "Hello! I'm Alex, your AI interviewer today. We'll be conducting a technical interview for the Software Engineer position. Are you ready to begin?", time: "00:00" },
  { speaker: "User", text: "Yes, I'm ready. Thank you for having me.", time: "00:08" },
  { speaker: "AI", text: "Great! Let's start. Tell me about yourself and walk me through your technical background.", time: "00:12" },
  { speaker: "User", text: "Sure. I'm Arjun Kumar, a final year B.Tech CSE student from VIT University. I've been working with React and Spring Boot for about 2 years now...", time: "00:18" },
];

export default function LiveInterviewPage() {
  const [elapsed, setElapsed] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [showIntegrity, setShowIntegrity] = useState(false);
  const [showEval, setShowEval] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [integrityScore, setIntegrityScore] = useState(94);
  const [currentScore, setCurrentScore] = useState(76);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Timer
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [isPaused]);

  // Simulate AI speaking
  useEffect(() => {
    const t = setTimeout(() => setAiSpeaking(true), 500);
    const t2 = setTimeout(() => setAiSpeaking(false), 4000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [currentQ]);

  // Camera
  useEffect(() => {
    if (camOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(() => setCamOn(false));
    }
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, [camOn]);

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">InterviewAI</span>
          <span className="badge bg-green-500/20 text-green-400 border border-green-500/30">Live</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono font-semibold text-white">{formatTime(elapsed)}</span>
            <span className="text-slate-600">/</span>
            <span>45:00</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-400">Monitoring Active</span>
          </div>
          <button onClick={() => setShowIntegrity(!showIntegrity)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold">{integrityScore}%</span>
          </button>
          <button className="px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium border border-red-500/30 transition-colors flex items-center gap-1.5">
            <X className="w-4 h-4" /> End Interview
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-80 flex-shrink-0 flex flex-col bg-slate-900 border-r border-slate-800 overflow-y-auto">
          {/* AI Avatar */}
          <div className="p-6 border-b border-slate-800">
            <AIAvatar speaking={aiSpeaking} size="md" name="Alex — AI Interviewer" className="text-slate-300" />
          </div>
          {/* Question */}
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Current Question</span>
              <span className="badge bg-primary-500/20 text-primary-400 border border-primary-500/30 text-xs">{currentQ + 1}/{questions.length}</span>
            </div>
            {aiSpeaking ? (
              <TypingIndicator />
            ) : (
              <p className="text-sm text-slate-300 leading-relaxed">{q.text}</p>
            )}
            <div className="flex items-center gap-2 mt-3">
              <span className="badge bg-slate-700 text-slate-400 text-xs">{q.topic}</span>
              <span className="badge bg-slate-700 text-slate-400 text-xs">Round {q.round}</span>
            </div>
          </div>
          {/* Score */}
          <div className="p-5 border-b border-slate-800">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">Live Score</p>
            <div className="flex items-center gap-4">
              <ScoreRing score={currentScore} size={70} strokeWidth={7} />
              <div className="flex-1 space-y-2">
                {[{ l: "Technical", v: 78 }, { l: "Clarity", v: 72 }, { l: "Confidence", v: 80 }].map((m) => (
                  <div key={m.l}>
                    <div className="flex justify-between text-xs text-slate-500 mb-0.5"><span>{m.l}</span><span>{m.v}</span></div>
                    <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${m.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Progress */}
          <div className="p-5">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">Interview Progress</p>
            <div className="space-y-2">
              {questions.map((q2, i) => (
                <div key={q2.id} className={cn("flex items-center gap-2 p-2 rounded-lg text-xs transition-colors",
                  i === currentQ ? "bg-primary-500/20 text-primary-400" :
                  i < currentQ ? "text-green-400" : "text-slate-600")}>
                  <div className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                    i < currentQ ? "bg-green-500" : i === currentQ ? "bg-primary-500 animate-pulse" : "bg-slate-700")}>
                    {i < currentQ && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className="truncate">{q2.topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center — Camera */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-slate-950 flex items-center justify-center">
            {camOn ? (
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-4 text-slate-500">
                <VideoOff className="w-16 h-16" />
                <p className="text-lg">Camera is off</p>
                <button onClick={() => setCamOn(true)} className="btn-primary text-sm">Enable Camera</button>
              </div>
            )}
            {/* Speaking indicator overlay */}
            {userSpeaking && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur px-5 py-3 rounded-2xl border border-primary-500/30">
                <WaveIndicator active bars={7} />
                <span className="text-sm text-white">You are speaking...</span>
              </div>
            )}
            {/* Warning overlay */}
            {!camOn && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/20 border border-red-500/40 backdrop-blur px-4 py-2 rounded-xl text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" /> Camera disabled — Integrity affected
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="bg-slate-900 border-t border-slate-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => setMicOn(!micOn)} className={cn("w-11 h-11 rounded-2xl flex items-center justify-center transition-all", micOn ? "bg-slate-700 hover:bg-slate-600" : "bg-red-500/20 hover:bg-red-500/30 border border-red-500/40")}>
                  {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-red-400" />}
                </button>
                <button onClick={() => setCamOn(!camOn)} className={cn("w-11 h-11 rounded-2xl flex items-center justify-center transition-all", camOn ? "bg-slate-700 hover:bg-slate-600" : "bg-red-500/20 hover:bg-red-500/30 border border-red-500/40")}>
                  {camOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-red-400" />}
                </button>
                <button onClick={() => setSpeakerOn(!speakerOn)} className="w-11 h-11 rounded-2xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all">
                  {speakerOn ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-red-400" />}
                </button>
              </div>
              <div className="flex items-center gap-3">
                {userSpeaking ? (
                  <button onClick={() => { setUserSpeaking(false); setCurrentScore((s) => Math.min(100, s + 2)); }}
                    className="px-6 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm flex items-center gap-2 transition-all">
                    <CheckCircle className="w-4 h-4" /> Submit Answer
                  </button>
                ) : (
                  <button onClick={() => setUserSpeaking(true)}
                    className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm flex items-center gap-2 transition-all animate-pulse">
                    <Mic className="w-4 h-4" /> Hold to Speak
                  </button>
                )}
                <button onClick={() => { setCurrentQ((q) => Math.min(questions.length - 1, q + 1)); setShowEval(true); setTimeout(() => setShowEval(false), 3000); }}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm flex items-center gap-2 transition-all">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowEval(!showEval)} className="w-11 h-11 rounded-2xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-white" />
                </button>
                <button className="w-11 h-11 rounded-2xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-72 flex-shrink-0 flex flex-col bg-slate-900 border-l border-slate-800 overflow-y-auto">
          {/* Integrity Events */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Integrity Monitor</p>
              <Shield className={cn("w-4 h-4", integrityScore > 80 ? "text-green-400" : "text-red-400")} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${integrityScore}%` }} />
              </div>
              <span className="text-xs font-semibold text-green-400">{integrityScore}%</span>
            </div>
            <div className="space-y-2">
              {integrityEvents.map((ev, i) => (
                <div key={i} className={cn("flex items-start gap-2 p-2 rounded-lg text-xs", ev.type === "warning" ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-green-500/10 border border-green-500/20")}>
                  {ev.type === "warning" ? <AlertTriangle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" /> : <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className={ev.type === "warning" ? "text-yellow-300" : "text-green-300"}>{ev.text}</p>
                    <p className="text-slate-500 font-mono">{ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Live Transcript */}
          <div className="p-4 flex-1">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">Live Transcript</p>
            <div className="space-y-3">
              {transcript.map((t, i) => (
                <div key={i} className={cn("", t.speaker === "AI" ? "" : "flex flex-col items-end")}>
                  <div className={cn("max-w-full p-3 rounded-2xl text-xs leading-relaxed",
                    t.speaker === "AI" ? "bg-slate-800 text-slate-300 rounded-bl-sm" : "bg-primary-500/20 text-primary-300 rounded-br-sm border border-primary-500/20")}>
                    <p className={cn("font-semibold mb-1 text-xs", t.speaker === "AI" ? "text-slate-500" : "text-primary-400")}>{t.speaker}</p>
                    {t.text}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 px-1 font-mono">{t.time}</p>
                </div>
              ))}
              {aiSpeaking && <TypingIndicator />}
            </div>
          </div>
        </div>
      </div>

      {/* Live Eval Popup */}
      {showEval && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-4 animate-slide-up">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Answer evaluated</p>
            <p className="text-xs text-slate-400">Score: 78/100 · Good explanation, add more examples</p>
          </div>
        </div>
      )}

      {/* Integrity panel */}
      {showIntegrity && (
        <div className="fixed top-16 right-4 w-72 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-2xl z-50 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-white">Integrity Report</p>
            <button onClick={() => setShowIntegrity(false)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          {[
            { label: "Face Visible", ok: true },
            { label: "Single Person", ok: true },
            { label: "Tab Switches", ok: false, count: 1 },
            { label: "Camera Active", ok: camOn },
            { label: "Microphone Active", ok: micOn },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
              <span className="text-sm text-slate-400">{item.label}</span>
              <span className={cn("text-xs font-semibold", item.ok ? "text-green-400" : "text-red-400")}>
                {item.ok ? "✓ OK" : `✗ ${item.count ?? "Issue"}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
