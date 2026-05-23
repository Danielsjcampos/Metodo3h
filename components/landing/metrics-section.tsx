"use client";

import { useEffect, useState, useRef } from "react";

export function MetricsSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-14 overflow-hidden bg-foreground/[0.02]">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Quote */}
        <div className={`flex flex-col items-center text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className={`relative w-24 h-24 rounded-full overflow-hidden border-2 shadow-2xl mb-4 hover:scale-105 transition-transform duration-500 ${
            isProgrammer ? "border-orange-500/30 shadow-orange-500/10" : "border-[#3B82F6]/30 shadow-purple-500/10"
          }`}>
            <img 
              src="/images/dino/dino3.jpg" 
              alt="Daniel Marques - O Dino" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <blockquote className={`text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight max-w-4xl mx-auto ${
            isProgrammer ? "font-mono text-white" : "font-display"
          }`}>
            &ldquo;O que eu ensino aqui levou <span className={isProgrammer ? "text-orange-500 font-bold" : "text-[#3B82F6]"}>30 anos</span> para eu aprender.
            <br />
            Você vai {isProgrammer ? "dominar" : "aprender"} em um <span className="text-muted-foreground">final de semana</span>.&rdquo;
          </blockquote>
          <p className="mt-4 text-lg font-mono text-muted-foreground">
            — Daniel Marques, O Dino
          </p>
        </div>
      </div>
    </section>
  );
}
