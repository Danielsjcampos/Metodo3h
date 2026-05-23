"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Component as MatrixCodeRain } from "@/components/ui/matrix-code-rain";

const words = ["hoje", "agora", "grátis", "com IA"];

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

  const gradientColors = ["#F97316", "#FB923C", "#FDBA74", "#FFEDD5", "#F97316"];

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
              color: showGradient ? `rgb(${r},${g},${b})` : "#F97316",
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

export function HeroProgrammerSection({ settings }: { settings?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-stretch overflow-hidden bg-black pt-28 pb-12 lg:pt-36 lg:pb-16">
      {/* Background Matrix Rain (Falling Amber Characters) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <MatrixCodeRain color="#F97316" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Subtle brand orange grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-[#F97316]/10"
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
            className="absolute w-px bg-[#F97316]/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      {/* Main Content (Centered vertically via flex-grow) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="lg:max-w-[65%]">
          {/* Eyebrow */}
          <div 
            className={`mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
              <span className="w-8 h-px bg-[#F97316]/30" />
              Lançamento · Maio 2025 · 50 vagas
            </span>
          </div>
          
          {/* Main headline */}
          <div className="mb-6">
            <h1 
              className={`text-left text-[clamp(2.75rem,8.5vw,4.5rem)] font-display leading-[1.05] tracking-tight text-white transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">Seu site no ar</span>
              <span className="block">
                <span className="relative inline-block min-w-[3ch]">
                  <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                </span>
                <span className="text-[#F97316]/40">.</span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mb-8 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            O <span className="text-[#F97316] font-semibold">Método 3h</span> é o método definitivo para quem <span className="text-white">não sabe nada</span> de programação ou marketing digital. Aprenda de forma rápida, precisa e eficiente a colocar seu site no ar. Seja para <span className="text-[#F97316] font-semibold">faturar de R$ 1.500 a R$ 3.500 vendendo sites</span>, ou para <span className="text-white">digitalizar sua própria operação</span> reduzindo custos com agências.
          </p>

          {/* CTA */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <Button
              asChild
              size="lg"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 h-14 text-base rounded-full group cursor-pointer w-full sm:w-auto flex items-center justify-center shadow-[0_8px_32px_0_rgba(249,115,22,0.3)] transition-all duration-300 font-bold"
            >
              <a href="#inscricao">
                Garantir minha vaga por R${settings?.launchPrice || "97"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <span className="text-sm text-white/50">
              R${settings?.regularPrice || "247"} após o lançamento
            </span>
          </div>
        </div>
      </div>
      
      {/* Stats (Pushed to bottom via clean relative document flow to prevent any overlap) */}
      <div 
        className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 md:mt-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1000px] mx-auto bg-black/85 backdrop-blur-xl border border-[#F97316]/20 rounded-3xl p-6 px-10 shadow-2xl flex items-center justify-between gap-6 md:gap-12 flex-wrap">
          {[
            { value: "1.000+", label: "sites entregues" },
            { value: "30 anos", label: "no mercado" },
            { value: "R$0", label: "custo de hospedagem" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 md:flex-1 md:text-center">
              <span className="text-2xl lg:text-3xl font-display text-white">{stat.value}</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F97316] leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
