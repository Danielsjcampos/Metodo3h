"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TopBannerProps {
  isWaitlist?: boolean;
  isProgrammer?: boolean;
}

export function TopBanner({ isWaitlist = false, isProgrammer = false }: TopBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: "03",
    hours: "16",
    minutes: "49",
    seconds: "57",
  });

  useEffect(() => {
    // We set a target date: June 2, 2026 at 23:59:59
    const targetDate = new Date("2026-06-02T23:59:59-03:00").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      let difference = targetDate - now;

      // If the target date has passed, create a rolling 3-day countdown so the page remains active and realistic
      if (difference <= 0) {
        const fallbackTarget = new Date();
        fallbackTarget.setDate(fallbackTarget.getDate() + 3);
        fallbackTarget.setHours(23, 59, 59, 0);
        difference = fallbackTarget.getTime() - now;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToInscricao = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("inscricao");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#inscricao";
    }
  };

  return (
    <div className={cn(
      "w-full py-2 px-4 relative z-[60] flex flex-col md:flex-row items-center justify-between gap-3 text-center select-none overflow-hidden border-b",
      isProgrammer 
        ? "bg-[#f97316] text-white shadow-[0_4px_20px_rgba(249,115,22,0.25)] border-[#ea580c]/50" 
        : "bg-[#0073e6] text-white shadow-[0_4px_20px_rgba(0,115,230,0.25)] border-[#0060c0]/50"
    )}>
      {/* Visual neon light overlay */}
      <div className={cn(
        "absolute inset-0 pointer-events-none",
        isProgrammer 
          ? "bg-gradient-to-r from-orange-600/10 via-white/5 to-orange-600/10" 
          : "bg-gradient-to-r from-blue-600/10 via-white/5 to-blue-600/10"
      )} />

      {/* Main Title Content */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-semibold z-10">
        {isWaitlist ? (
          <>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_2px_8px_rgba(220,38,38,0.4)] border border-red-500 animate-pulse shrink-0">
              Fila de Espera
            </span>
            <span className="tracking-tight text-white/95">
              Garantir vaga na espera para ter acesso a uma aula gratuita + preço promocional do Arsenal Completo após aberto!
            </span>
          </>
        ) : (
          <>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_2px_8px_rgba(220,38,38,0.4)] border border-red-500 animate-pulse shrink-0">
              Últimos Dias com R$500 OFF
            </span>
            <span className="tracking-tight text-white/95">
              CONCORRA A R$ 10 MIL EM PRÊMIOS EXCLUSIVOS AO ENTRAR HOJE!
            </span>
          </>
        )}
      </div>

      {/* Real-time Countdown Timer */}
      <div className="flex items-center justify-center gap-3 z-10">
        <div className="flex items-center gap-1.5 font-mono">
          {/* Days */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm md:text-base font-bold text-white bg-black/30 px-1.5 py-0.5 rounded border border-white/10 shadow-inner">
              {timeLeft.days}
            </span>
            <span className="text-[9px] text-white/80 font-sans font-bold uppercase tracking-wider">
              Dias
            </span>
          </div>

          {/* Hours */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm md:text-base font-bold text-white bg-black/30 px-1.5 py-0.5 rounded border border-white/10 shadow-inner animate-pulse">
              {timeLeft.hours}
            </span>
            <span className="text-[9px] text-white/80 font-sans font-bold uppercase tracking-wider">
              Horas
            </span>
          </div>

          {/* Minutes */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm md:text-base font-bold text-white bg-black/30 px-1.5 py-0.5 rounded border border-white/10 shadow-inner">
              {timeLeft.minutes}
            </span>
            <span className="text-[9px] text-white/80 font-sans font-bold uppercase tracking-wider">
              Minutos
            </span>
          </div>

          {/* Seconds */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm md:text-base font-bold text-red-400 bg-black/30 px-1.5 py-0.5 rounded border border-red-500/20 shadow-inner w-[28px] text-center inline-block">
              {timeLeft.seconds}
            </span>
            <span className="text-[9px] text-white/80 font-sans font-bold uppercase tracking-wider">
              Segundos
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="z-10 shrink-0 w-full md:w-auto">
        <a
          href={isWaitlist ? "#inscricao" : "#inscricao"}
          onClick={handleScrollToInscricao}
          className={cn(
            "w-full md:w-auto inline-flex items-center justify-center bg-black hover:bg-white hover:text-black text-white font-mono text-[10px] md:text-xs font-bold py-1.5 px-4 md:px-5 rounded-full border border-white/20 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.4)] group overflow-hidden relative"
          )}
        >
          {/* Subtle swipe-shine effect on hover */}
          <span className="absolute inset-0 w-[40px] h-full bg-white/20 transform -skew-x-[30deg] -translate-x-[60px] group-hover:animate-shine" />
          <span>
            {isWaitlist ? "GARANTIR VAGA GRATUITA →" : "ENTRAR COM DESCONTO →"}
          </span>
        </a>
      </div>
    </div>
  );
}
