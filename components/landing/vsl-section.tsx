"use client";

import { useEffect, useState, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";

const stats = [
  { value: "3h", label: "para publicar o primeiro site" },
  { value: "R$0", label: "custo de hospedagem" },
  { value: "1.000+", label: "sites entregues pelo método" },
];

export function VslSection({ settings, isProgrammer = false }: { settings?: any; isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Helper to parse YouTube Video ID
  const getYouTubeId = (url: string): string => {
    if (!url) return "dQw4w9WgXcQ";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const hasVideo = !!settings?.vslVideoUrl && settings.vslVideoUrl.trim() !== "";
  const videoId = getYouTubeId(settings?.vslVideoUrl || "dQw4w9WgXcQ");

  // Fake Progress Bar Simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 35) {
          // Rapid progress at the beginning (0% - 35%)
          return prev + Math.random() * 4 + 2;
        } else if (prev < 75) {
          // Slow down in the middle (35% - 75%)
          return prev + 0.08 + Math.random() * 0.05;
        } else if (prev < 98) {
          // Extremely slow crawling at the end (75% - 98%)
          return prev + 0.01 + Math.random() * 0.01;
        }
        return prev; // Lock just below 100%
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleUnmute = () => {
    setIsMuted(false);
    // Unmute and play using postMessage
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"unMute","args":""}', 
      '*'
    );
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}', 
      '*'
    );
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isMuted) {
      handleUnmute();
      return;
    }

    if (isPlaying) {
      // Pause command to YouTube iframe via postMessage
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}', 
        '*'
      );
      setIsPlaying(false);
    } else {
      // Play command to YouTube iframe via postMessage
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}', 
        '*'
      );
      setIsPlaying(true);
    }
  };

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
          <span className={cn(
            "inline-flex items-center gap-3 text-sm font-mono mb-6",
            isProgrammer ? "text-orange-500" : "text-[#3B82F6]"
          )}>
            <span className={cn("w-8 h-px", isProgrammer ? "bg-orange-500/40" : "bg-[#3B82F6]/40")} />
            VEJA O MÉTODO AO VIVO
            <span className={cn("w-8 h-px", isProgrammer ? "bg-orange-500/40" : "bg-[#3B82F6]/40")} />
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05] text-white",
            isProgrammer ? "font-mono" : "font-display"
          )}>
            Do prompt ao site no ar.
            <br />
            <span className={isProgrammer ? "text-orange-500" : "text-muted-foreground"}>Em menos de 3 horas.</span>
          </h2>
          <p className={cn(
            "mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed",
            isProgrammer ? "font-mono text-sm md:text-base" : ""
          )}>
            Assista Daniel Marques construir um site profissional ao vivo — do zero, sem código, sem edições.
            O que você vai ver aqui é exatamente o que acontece na tela de um cliente pagante.
          </p>
        </div>

        {/* Video player */}
        {hasVideo && (
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
              {!isStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] z-30">
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
                        <p className="text-[10px] font-mono text-orange-500 tracking-widest uppercase mb-4">Daniel Marques · O Dino</p>
                        <h3 className="text-3xl lg:text-5xl font-mono text-white leading-tight mb-2">
                          Criar Sites com IA
                        </h3>
                        <p className="text-lg text-white/40 font-mono">Do Zero ao Ar no Mesmo Dia</p>
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
                    onClick={() => {
                      setIsStarted(true);
                      setIsPlaying(true);
                    }}
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
                      Prévia gratuita · ~8 min
                    </span>
                  </div>
                </div>
              )}

              {isStarted && (
                <>
                  {/* Transparent click-lock overlay that sits ABOVE the YouTube player */}
                  <div 
                    className="absolute inset-0 z-20 cursor-pointer" 
                    onClick={togglePlay}
                  />

                  {/* Sleek Dê o play para ativar o som Overlay (Pedro Sobral style) */}
                  {isMuted && (
                    <div 
                      className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                      onClick={handleUnmute}
                    >
                      <div className="w-[300px] md:w-[320px] bg-[#0073e6] border border-blue-400/30 text-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,115,230,0.4)] text-center space-y-4 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 animate-bounce-gentle">
                        <h4 className="text-lg font-bold tracking-tight leading-snug">Dê o play para ativar o som</h4>
                        <div className="relative w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                          <div className="absolute -inset-2 rounded-full border border-white/10 animate-ping opacity-75" />
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 animate-pulse text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l2.25 2.25V8.25z" />
                          </svg>
                        </div>
                        <p className="text-xs uppercase tracking-widest font-mono font-bold text-blue-200">O vídeo já começou</p>
                      </div>
                    </div>
                  )}

                  {/* Semi-transparent blur overlay when paused (only shows when NOT muted) */}
                  {!isPlaying && !isMuted && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center transition-all duration-300">
                      <button
                        onClick={togglePlay}
                        className="absolute inset-0 w-full h-full flex items-center justify-center group"
                      >
                        <div className="relative">
                          {/* Pulse rings */}
                          <div className={`absolute -inset-6 rounded-full border animate-ping opacity-60 ${
                            isProgrammer ? "border-orange-500/20" : "border-[#3B82F6]/20"
                          }`} />

                          {/* Button */}
                          <div className={`relative w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                            isProgrammer 
                              ? "bg-orange-500 text-white shadow-[0_0_40px_rgba(249,115,22,0.5)]" 
                              : "bg-white text-black shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                          }`}>
                            <Play className="w-8 h-8 fill-current ml-1" />
                          </div>
                        </div>
                      </button>
                    </div>
                  )}

                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
                    className="w-full h-full pointer-events-none scale-[1.01]"
                    allow="autoplay; encrypted-media"
                    title="VSL — Método 3h"
                  />
                </>
              )}
            </div>

            {/* Premium Progress Bar Dashboard Panel below the Video Container */}
            {isStarted && (
              <div className="mt-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl space-y-2 max-w-4xl mx-auto shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Transmissão em Andamento
                  </span>
                  <span className="text-white font-medium">{Math.floor(progress)}% Concluído</span>
                </div>
                <div className="h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                  <div 
                    className={cn(
                      "h-full bg-gradient-to-r rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(59,130,246,0.3)]",
                      isProgrammer 
                        ? "from-orange-600 to-amber-500" 
                        : "from-[#3B82F6] to-[#60A5FA]"
                    )}
                    style={{ width: `${progress}%` }}
                  />
                  {/* Glowing swipe reflect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-shine pointer-events-none"
                    style={{ animationDuration: "3s" }}
                  />
                </div>
                <p className="text-[10px] text-center text-muted-foreground font-mono">
                  A barra de reprodução avança de acordo com os principais pontos práticos apresentados.
                </p>
              </div>
            )}
          </div>
        )}

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
          <ShinyButton
            asChild
            theme={isProgrammer ? "orange" : "blue"}
            variant="solid"
            className="w-full sm:w-auto h-14 font-bold"
          >
            <a href="#inscricao">
              {isProgrammer ? "Quero aprender esse método" : "Quero aprender esse método"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </ShinyButton>
        </div>

      </div>
    </section>
  );
}
