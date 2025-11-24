"use client";

export function HeroSection() {
  return (
    <div className="relative h-[40vh] bg-gradient-to-r from-primary to-card">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Work Gallery
          </h1>
          <p className="text-lg text-white/90">
            Explore our portfolio of successful projects and innovative solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
