"use client";

import { useEffect, useState, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "3h", label: "para publicar o primeiro site" },
  { value: "R$0", label: "custo de hospedagem" },
  { value: "1.000+", label: "sites entregues pelo método" },
];

export function VslSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
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
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden bg-black">

      {/* Background glows */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px] opacity-[0.05] pointer-events-none animate-pulse-glow ${
          isProgrammer ? "bg-orange-500" : "bg-[#3B82F6]"
        }`} 
      />
      <div 
        className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.04] pointer-events-none ${
          isProgrammer ? "bg-amber-500" : "bg-[#60A5FA]"
        }`} 
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className={`text-center mb-10 lg:mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {isProgrammer ? (
            <>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-orange-500 mb-6 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-widest">
                [02] DEMO // COMPILAÇÃO AO VIVO
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono tracking-tight leading-[1.1] text-white">
                Prompt-to-Prod <span className="text-orange-500">sem fricção.</span>
                <br />
                <span className="text-muted-foreground text-xl lg:text-2xl block mt-3 font-mono font-normal tracking-wide">// Em menos de 3h e infra de custo zero</span>
              </h2>
              <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
                Assista Daniel Marques codificar e publicar uma aplicação profissional em tempo real. Veja na prática como a IA Generativa combinada com infraestrutura moderna elimina a necessidade de configurações manuais de servidor.
              </p>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-[#3B82F6] mb-6">
                <span className="w-8 h-px bg-[#3B82F6]/40" />
                VEJA O MÉTODO AO VIVO
                <span className="w-8 h-px bg-[#3B82F6]/40" />
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.05] text-white">
                Do prompt ao site no ar.
                <br />
                <span className="text-muted-foreground">Em menos de 3 horas.</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Assista Daniel Marques construir um site profissional ao vivo — do zero, sem código, sem edições.
                O que você vai ver aqui é exatamente o que acontece na tela de um cliente pagante.
              </p>
            </>
          )}
        </div>

        {/* Video player */}
        <div className={`relative mx-auto max-w-4xl transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>

          {/* Glow behind video */}
          <div 
            className={`absolute -inset-4 rounded-full blur-[80px] opacity-[0.08] pointer-events-none animate-pulse-glow ${
              isProgrammer ? "bg-orange-500" : "bg-[#3B82F6]"
            }`} 
          />

          {/* Video container */}
          <div className={`relative aspect-video border rounded-3xl overflow-hidden bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ${
            isProgrammer ? "border-orange-500/20" : "border-white/10"
          }`}>

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
                  {isProgrammer ? (
                    <>
                      <p className="text-[10px] font-mono text-orange-500 tracking-widest uppercase mb-4">danielmarques.dino // system_architect</p>
                      <h3 className="text-3xl lg:text-5xl font-mono text-white leading-tight mb-2">
                        deploy_app.sh
                      </h3>
                      <p className="text-lg text-white/40 font-mono">./compile_and_run --with-ai</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase mb-4">Daniel Marques · O Dino</p>
                      <h3 className="text-3xl lg:text-5xl font-display text-white leading-tight mb-2">
                        Criar Sites com IA
                      </h3>
                      <p className="text-lg text-white/40 font-mono">Do Zero ao Ar no Mesmo Dia</p>
                    </>
                  )}
                </div>

                {/* Play button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  aria-label="Reproduzir vídeo"
                >
                  <div className="relative">
                    {/* Pulse rings */}
                    <div className={`absolute -inset-6 rounded-full border animate-ping opacity-60 ${
                      isProgrammer ? "border-orange-500/20" : "border-[#3B82F6]/20"
                    }`} />
                    <div className={`absolute -inset-12 rounded-full border animate-ping opacity-30 ${
                      isProgrammer ? "border-orange-500/10" : "border-[#3B82F6]/10"
                    }`} style={{ animationDelay: "0.4s" }} />

                    {/* Button */}
                    <div className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-cta-pulse ${
                      isProgrammer 
                        ? "bg-orange-500 text-white shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:bg-orange-600" 
                        : "bg-white text-black shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                    }`}>
                      <Play className={`w-8 h-8 lg:w-10 lg:h-10 fill-current ml-1 ${isProgrammer ? "text-white" : "text-black"}`} />
                    </div>
                  </div>
                </button>

                {/* Duration badge */}
                <div className={`absolute bottom-6 right-6 flex items-center gap-2 bg-black/80 px-3 py-1.5 backdrop-blur-sm rounded-full border ${
                  isProgrammer ? "border-orange-500/20" : "border-white/10"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isProgrammer ? "bg-orange-500" : "bg-[#3B82F6]"
                  }`} />
                  <span className="text-xs font-mono text-white/70">
                    {isProgrammer ? "free_preview.sh · 08:24" : "Prévia gratuita · ~8 min"}
                  </span>
                </div>
              </div>
            ) : (
              /* Aqui vai o embed do YouTube/Vimeo quando tiver o vídeo */
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="VSL — Método 3h"
              />
            )}
          </div>
        </div>

        {/* Stats below video */}
        <div className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center p-6 glass-card rounded-2xl border ${
                isProgrammer ? "border-orange-500/10 hover:border-orange-500/25 transition-all duration-300" : "border-white/5"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="block text-3xl lg:text-4xl font-mono text-white mb-2" style={{ color: i === 0 ? (isProgrammer ? "#F97316" : "#3B82F6") : "white" }}>
                {stat.value}
              </span>
              <span className="text-xs lg:text-sm text-muted-foreground font-mono leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 flex justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Button
            asChild
            size="lg"
            className={`px-10 h-14 text-base rounded-full group cursor-pointer animate-cta-pulse font-mono ${
              isProgrammer 
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_32px_rgba(249,115,22,0.3)] hover:shadow-[0_0_32px_rgba(249,115,22,0.5)]" 
                : "bg-white hover:bg-white/90 text-black shadow-lg"
            }`}
          >
            <a href="#inscricao">
              {isProgrammer ? "./acessar_metodo_3h.sh" : "Quero aprender esse método"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
