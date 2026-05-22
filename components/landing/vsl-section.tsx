"use client";

import { useEffect, useState, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "3h", label: "para publicar o primeiro site" },
  { value: "R$0", label: "custo de hospedagem" },
  { value: "1.000+", label: "sites entregues pelo método" },
];

export function VslSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden bg-[oklch(0.07_0.008_260)]">

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#3B82F6] rounded-full blur-[200px] opacity-[0.04] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#60A5FA] rounded-full blur-[180px] opacity-[0.04] pointer-events-none" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className={`text-center mb-8 lg:mb-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-[#3B82F6] mb-6">
            <span className="w-8 h-px bg-[#3B82F6]/40" />
            VEJA O MÉTODO AO VIVO
            <span className="w-8 h-px bg-[#3B82F6]/40" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] text-white">
            Do prompt ao site no ar.
            <br />
            <span className="text-muted-foreground">Em menos de 3 horas.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Assista Daniel Marques construir um site profissional ao vivo — do zero, sem código, sem edições.
            O que você vai ver aqui é exatamente o que acontece na tela de um cliente pagante.
          </p>
        </div>

        {/* Video player */}
        <div className={`relative mx-auto max-w-4xl transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>

          {/* Glow behind video */}
          <div className="absolute -inset-4 bg-[#3B82F6] rounded-full blur-[80px] opacity-[0.08] pointer-events-none animate-pulse-glow" />

          {/* Video container */}
          <div className="relative aspect-video border border-white/10 rounded-3xl overflow-hidden bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">

            {/* Thumbnail / placeholder */}
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                {/* Grid lines background */}
                <div className="absolute inset-0 opacity-[0.04]">
                  {[...Array(8)].map((_, i) => (
                    <div key={`h${i}`} className="absolute h-px bg-white" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <div key={`v${i}`} className="absolute w-px bg-white" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
                  ))}
                </div>

                {/* Thumbnail text */}
                <div className="relative text-center px-8 select-none">
                  <p className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase mb-4">Daniel Marques · O Dino</p>
                  <h3 className="text-3xl lg:text-5xl font-display text-white leading-tight mb-2">
                    Criar Sites com IA
                  </h3>
                  <p className="text-lg text-white/40 font-mono">Do Zero ao Ar no Mesmo Dia</p>
                </div>

                {/* Play button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  aria-label="Reproduzir vídeo"
                >
                  <div className="relative">
                    {/* Pulse rings */}
                    <div className="absolute -inset-6 rounded-full border border-[#3B82F6]/20 animate-ping opacity-60" />
                    <div className="absolute -inset-12 rounded-full border border-[#3B82F6]/10 animate-ping opacity-30" style={{ animationDelay: "0.4s" }} />

                    {/* Button */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(59,130,246,0.4)] animate-cta-pulse">
                      <Play className="w-8 h-8 lg:w-10 lg:h-10 text-black fill-black ml-1" />
                    </div>
                  </div>
                </button>

                {/* Duration badge */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/60 border border-white/10 px-3 py-1.5 backdrop-blur-sm rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                  <span className="text-xs font-mono text-white/70">Prévia gratuita · ~8 min</span>
                </div>
              </div>
            ) : (
              /* Aqui vai o embed do YouTube/Vimeo quando tiver o vídeo */
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="VSL — Site Dino"
              />
            )}
          </div>
        </div>

        {/* Stats below video */}
        <div className={`mt-8 grid grid-cols-3 gap-4 lg:gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-6 glass-card glass-card-hover rounded-2xl"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="block text-3xl lg:text-4xl font-display text-white mb-2" style={{ color: i === 0 ? "#3B82F6" : "white" }}>
                {stat.value}
              </span>
              <span className="text-xs lg:text-sm text-muted-foreground font-mono leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-6 flex justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Button
            asChild
            size="lg"
            className="bg-white hover:bg-white/90 text-black px-10 h-14 text-base rounded-full group cursor-pointer animate-cta-pulse"
          >
            <a href="#inscricao">
              Quero aprender esse método
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
