"use client";

import { useEffect, useRef, useState } from "react";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { cn } from "@/lib/utils";

export function HowItWorksSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="metodo"
      ref={sectionRef}
      className="relative py-12 lg:py-16 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-10 lg:mb-12 text-center flex flex-col items-center justify-center">
          <span className={`inline-flex items-center gap-3 text-xs font-mono tracking-widest ${isProgrammer ? "text-orange-500" : "text-white/40"} uppercase mb-6 justify-center`}>
            <span className="w-8 h-[2px] bg-white/20 rounded-full" />
            A virada
            <span className="w-8 h-[2px] bg-white/20 rounded-full" />
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-6",
            isProgrammer ? "font-mono text-white" : "font-display text-white"
          )}>
            O que você realmente vai aprender a fazer com o <span className={isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}>Método 3h</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className={cn(
              "text-base md:text-lg text-white/70 leading-relaxed mb-4",
              isProgrammer ? "font-mono" : ""
            )}>
              A tecnologia evoluiu para que você <span className="text-white font-medium">não precise ser programador</span> para criar sistemas de gestão, sites profissionais e automações inteligentes. Com Inteligência Artificial e as ferramentas certas de IA, qualquer leigo constrói soluções digitais ultra-profissionais.
            </p>
            <p className={cn(
              "text-sm md:text-base text-white/50 leading-relaxed",
              isProgrammer ? "font-mono" : ""
            )}>
              Pare de usar IAs apenas para gerar textos ou imagens. Você vai aprender a criar sistemas de gestão reais que economizam tempo, controlam seu caixa e colocam sua empresa no topo das buscas do Google de ponta a ponta.
            </p>
          </div>
        </div>

        {/* Interactive Features Carousel Section */}
        <div className="mt-12 lg:mt-16">
          <FeatureCarousel isProgrammer={isProgrammer} />
        </div>
      </div>
    </section>
  );
}
