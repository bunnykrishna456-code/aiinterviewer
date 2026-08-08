"use client";
import { cn } from "@/lib/utils";

interface WaveIndicatorProps {
  active?: boolean;
  bars?: number;
  className?: string;
  color?: string;
}

export default function WaveIndicator({ active = true, bars = 5, className, color = "bg-primary-400" }: WaveIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-0.5 h-8", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all",
            color,
            active ? "wave-bar" : "h-1 opacity-40"
          )}
          style={active ? {
            height: "100%",
            animation: `wave 1.5s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          } : undefined}
        />
      ))}
    </div>
  );
}
