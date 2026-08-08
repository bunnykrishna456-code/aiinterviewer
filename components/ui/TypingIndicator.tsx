"use client";
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm shadow-sm w-fit">
      <span className="text-xs text-slate-500 mr-1">AI is thinking</span>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary-400"
          style={{
            animation: "typing 1.5s steps(3) infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
