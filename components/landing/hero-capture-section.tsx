"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowRight, Play, Clock, VolumeX, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const words = [
  "sites de R$ 3.000",
  "sistemas em minutos",
  "o superpoder da IA",
  "liberdade sem programar"
];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;
  const DURATION = 500;
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const gradientColors = ["#3B82F6", "#60A5FA", "#38BDF8", "#93C5FD", "#3B82F6"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </>
  );
}

export function HeroCaptureSection({ settings }: { settings?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // VSL player states
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Delay loading the heavy YouTube iframe until after the initial render/hydration for maximum page speed
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const [isFloating, setIsFloating] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;
      const rect = sentinel.getBoundingClientRect();
      // Trigger floating window as soon as the top of the video container starts leaving the viewport
      if (rect.top < 80) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
        setIsClosed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
          return prev + Math.random() * 4 + 2;
        } else if (prev < 75) {
          return prev + 0.08 + Math.random() * 0.05;
        } else if (prev < 98) {
          return prev + 0.01 + Math.random() * 0.01;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleUnmute = () => {
    setIsMuted(false);
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
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}', 
        '*'
      );
      setIsPlaying(false);
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}', 
        '*'
      );
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-stretch overflow-hidden bg-black pt-[140px] sm:pt-[180px] lg:pt-32 pb-12 lg:pb-16">
      {/* Background video / overlay layout from standard azul theme */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-70"
          style={{ filter: "hue-rotate(200deg) saturate(1.4) brightness(0.85)" }}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/70" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-6 gap-x-12 lg:gap-x-16 items-center pt-8">
        {/* 1. Intro Group (Eyebrow, Headline, Subheadline) */}
        <div className="lg:col-start-1 lg:row-start-1 flex flex-col justify-end self-end w-full">
          {/* Eyebrow */}
          <div 
            className={`mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-blue-400 uppercase tracking-widest">
              <span className="w-8 h-px bg-blue-500/50" />
              Aula Prática Gravada · 100% Gratuita
            </span>
          </div>

          {/* Main headline */}
          <div className="mb-6">
            <h1 
              className={`text-left text-[clamp(1.8rem,5vw,3.2rem)] font-display leading-[1.1] tracking-tight text-white transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">Destrave o segredo para criar e faturar com</span>
              <span className="block text-white/50 mt-1">
                <span className="relative inline-block text-white min-w-[3ch]">
                  <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                </span>
                <span className="text-white/40">.</span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className={`text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-2 lg:mb-6 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Descubra os bastidores da metodologia que permite colocar estruturas profissionais no ar em tempo recorde usando Inteligência Artificial. Aprenda a faturar de R$ 1.500 a R$ 3.500 por projeto, <span className="text-white font-medium">sem precisar programar e com custo zero de hospedagem</span>.
          </p>
        </div>

        {/* 2. VSL Player + Progress Bar wrapper */}
        <div className={cn(
          "w-full lg:col-start-2 lg:row-start-1 lg:row-span-3 self-center transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0",
          !isFloating && (isVisible ? "scale-100" : "scale-95")
        )}>
          <div 
            ref={sentinelRef}
            className="w-full aspect-video relative"
          >
            <div 
              ref={playerRef}
              className={cn(
                "overflow-hidden bg-black",
                isFloating && !isClosed
                  ? "fixed z-[9999] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-blue-500/30 aspect-video"
                  : "absolute inset-0 border border-white/10 rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
              )}
              style={isFloating && !isClosed ? {
                bottom: '16px',
                right: '16px',
                top: 'auto',
                left: 'auto',
                width: 'min(45vw, 320px)',
              } : undefined}
            >
            {isFloating && !isClosed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsClosed(true);
                }}
                className="absolute top-3 right-3 z-50 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 border border-white/15 hover:border-white/25 active:scale-90 transition-all pointer-events-auto shadow-lg"
                title="Fechar mini player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

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
                  <p className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase mb-4">Daniel Marques · O Dino</p>
                  <h3 className="text-3xl font-display text-white leading-tight mb-2">
                    Criar Sites com IA
                  </h3>
                  <p className="text-lg text-white/40 font-mono">Do Zero ao Ar no Mesmo Dia</p>
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
                    <div className="absolute -inset-6 rounded-full border border-[#3B82F6]/20 animate-ping opacity-60" />
                    <div className="absolute -inset-12 rounded-full border border-[#3B82F6]/10 animate-ping opacity-30" style={{ animationDelay: "0.4s" }} />

                    {/* Button */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 bg-white text-black shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                      <Play className="w-8 h-8 lg:w-10 lg:h-10 fill-current ml-1 text-black" />
                    </div>
                  </div>
                </button>

                {/* Duration badge */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/80 px-3 py-1.5 backdrop-blur-sm rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#3B82F6]" />
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

                {/* Premium un-mute overlay */}
                {isMuted && (
                  <div 
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                    onClick={handleUnmute}
                  >
                    <div className={cn(
                      "bg-[#0073e6] border border-blue-400/30 text-white rounded-3xl text-center shadow-[0_20px_50px_rgba(0,115,230,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 animate-bounce-gentle",
                      isFloating 
                        ? "w-[180px] p-3 space-y-2 rounded-xl shadow-md" 
                        : "w-[280px] sm:w-[320px] p-6 space-y-4 rounded-3xl"
                    )}>
                      <h4 className={cn("font-bold tracking-tight leading-snug", isFloating ? "text-xs" : "text-base sm:text-lg")}>
                        {isFloating ? "Ativar Som" : "Dê o play para ativar o som"}
                      </h4>
                      <div className={cn("relative mx-auto bg-white/10 rounded-full flex items-center justify-center border border-white/20", isFloating ? "w-8 h-8" : "w-16 h-16")}>
                        <div className="absolute -inset-2 rounded-full border border-white/10 animate-ping opacity-75" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={cn("animate-pulse text-white", isFloating ? "w-4 h-4" : "w-8 h-8")}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l2.25 2.25V8.25z" />
                        </svg>
                      </div>
                      {!isFloating && <p className="text-xs uppercase tracking-widest font-mono font-bold text-blue-200">O vídeo já começou</p>}
                    </div>
                  </div>
                )}

                {/* Semi-transparent blur overlay when paused */}
                {!isPlaying && !isMuted && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center transition-all duration-300">
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 w-full h-full flex items-center justify-center group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-6 rounded-full border border-[#3B82F6]/20 animate-ping opacity-60" />
                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 bg-white text-black shadow-[0_0_40px_rgba(59,130,246,0.4)]">
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
          </div>

          {/* Premium Progress Bar Dashboard Panel below the Video Container */}
          {isStarted && (
            <div className="mt-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl space-y-2 max-w-2xl mx-auto shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Transmissão em Andamento
                </span>
                <span className="text-white font-medium">{Math.floor(progress)}% Concluído</span>
              </div>
              <div className="h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                  style={{ width: `${progress}%` }}
                />
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

        {/* 3. Features Checklist Group — after CTA on mobile, under Subheadline on desktop */}
        <div className="lg:col-start-1 lg:row-start-2 flex flex-col justify-start self-start w-full order-2 lg:order-none">
          {/* Features checkmarks */}
          <div className={`space-y-3 mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {[
              "Ganhos Acelerados: Crie e entregue sites profissionais cobrando de R$ 1.500 a R$ 3.500 por projeto.",
              "Custo Operacional Zero: Aprenda a hospedar todos os seus projetos de graça com velocidade máxima.",
              "Sem Barreira Técnica: Descubra o atalho para construir qualquer layout premium sem digitar código."
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm sm:text-base text-white/80">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CTA Group — comes before features on mobile */}
        <div className="lg:col-start-1 lg:row-start-3 flex flex-col justify-start self-start w-full order-1 lg:order-none">
          {/* High-Impact CTA to go to bottom registration form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <ShinyButton
              theme="blue"
              variant="solid"
              href="#inscricao"
              className="w-full sm:w-auto flex items-center justify-center h-14 font-bold"
            >
              Reservar Minha Vaga & Acessar Aulas
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </ShinyButton>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div 
        className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1000px] mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 px-10 shadow-2xl flex items-center justify-between gap-6 md:gap-12 flex-wrap">
          {[
            { value: "1.000+", label: "sites entregues" },
            { value: "100% Grátis", label: "aula gravada" },
            { value: "R$0", label: "custo de hospedagem" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 md:flex-1 md:text-center">
              <span className="text-xl lg:text-2xl font-display text-white">{stat.value}</span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#3B82F6] leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
