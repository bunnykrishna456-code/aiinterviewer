"use client";
export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blob top-right */}
      <div className="blob w-96 h-96 bg-primary-400 top-[-10%] right-[-5%] animate-float" />
      {/* Medium blob bottom-left */}
      <div className="blob w-72 h-72 bg-accent top-[60%] left-[-8%] animate-float-slow" />
      {/* Small blob center */}
      <div className="blob w-48 h-48 bg-primary-300 top-[30%] left-[50%] animate-float-fast" />
      {/* Tiny blobs */}
      <div className="blob w-24 h-24 bg-primary-200 top-[10%] left-[20%] animate-float" style={{ animationDelay: "2s" }} />
      <div className="blob w-32 h-32 bg-accent top-[70%] right-[15%] animate-float-slow" style={{ animationDelay: "1s" }} />
    </div>
  );
}
