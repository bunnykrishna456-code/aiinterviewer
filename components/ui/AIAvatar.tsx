"use client";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import WaveIndicator from "./WaveIndicator";

interface AIAvatarProps {
  speaking?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  name?: string;
}

const sizes = {
  sm: { outer: "w-16 h-16", inner: "w-12 h-12", icon: "w-6 h-6", ring: "w-20 h-20" },
  md: { outer: "w-24 h-24", inner: "w-18 h-18", icon: "w-9 h-9", ring: "w-28 h-28" },
  lg: { outer: "w-32 h-32", inner: "w-24 h-24", icon: "w-12 h-12", ring: "w-40 h-40" },
  xl: { outer: "w-48 h-48", inner: "w-36 h-36", icon: "w-16 h-16", ring: "w-56 h-56" },
};

export default function AIAvatar({ speaking = false, size = "lg", className, name = "Alex" }: AIAvatarProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative flex items-center justify-center">
        {/* Pulse ring when speaking */}
        {speaking && (
          <>
            <div className={cn("absolute rounded-full bg-primary-400/20 animate-ping", s.ring)} />
            <div className={cn("absolute rounded-full bg-primary-400/10 animate-pulse", s.ring)} />
          </>
        )}
        {/* Avatar */}
        <div className={cn(
          "relative rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-2xl shadow-primary-500/30",
          s.outer,
          speaking ? "animate-pulse-slow" : "animate-float"
        )}>
          {/* Inner glow */}
          <div className={cn("absolute inset-2 rounded-full bg-white/10")} />
          <Brain className={cn("text-white relative z-10", s.icon)} />
        </div>
      </div>

      {/* Name + status */}
      <div className="text-center">
        <p className="font-semibold text-slate-800 dark:text-slate-200">{name}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className={cn("w-2 h-2 rounded-full", speaking ? "bg-green-500 animate-pulse" : "bg-slate-300")} />
          <span className="text-xs text-slate-500">{speaking ? "Speaking..." : "Listening"}</span>
        </div>
      </div>

      {/* Wave when speaking */}
      {speaking && <WaveIndicator active={speaking} />}
    </div>
  );
}
