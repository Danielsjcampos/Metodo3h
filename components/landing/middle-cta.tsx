"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function MiddleCtaSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden bg-black">
      {/* Background ambient glow */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-all duration-1000",
        isProgrammer ? "bg-orange-500/10" : "bg-blue-600/10"
      )} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div
          onMouseMove={handleMouseMove}
          className={cn(
            "relative rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-1000 flex flex-col lg:flex-row items-center justify-between gap-10",
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
          )}
        >
          {/* Subtle mouse spotlight glow */}
          <div 
            className="absolute inset-0 opacity-100 pointer-events-none transition-opacity duration-500 bg-radial from-white/[0.03] to-transparent"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.06), transparent 50%)`
            }}
          />

          {/* Left / Info */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <span className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest",
              isProgrammer ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            )}>
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              Acesso Gratuito e Imediato
            </span>

            <h3 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white",
              isProgrammer ? "font-mono" : "font-display"
            )}>
              Pare de adiar o seu site.
              <br />
              <span className="text-white/50">Coloque-o no ar hoje mesmo.</span>
            </h3>

            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Não perca mais tempo com processos complexos de agências ou jargões técnicos difíceis de dominar. Aprenda o método cirúrgico de Prompt-to-Prod com IA e digitalize sua ideia em poucas horas.
            </p>

            {/* Check benefits */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-2 text-xs font-mono text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Online e Grátis
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Custo de Hospedagem Zero
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Sem Programação
              </span>
            </div>
          </div>

          {/* Right / Button CTA */}
          <div className="shrink-0 w-full lg:w-auto flex flex-col items-center gap-3">
            <ShinyButton
              asChild
              theme={isProgrammer ? "orange" : "blue"}
              variant="solid"
              className="w-full sm:w-auto h-14 font-bold"
            >
              <a href="#inscricao">
                Garantir Minha Vaga Grátis
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </ShinyButton>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center">
              * Vagas limitadas para o grupo VIP de bônus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
