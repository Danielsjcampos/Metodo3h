"use client";

import { useEffect, useRef, useState } from "react";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

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
          {isProgrammer ? (
            <>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-orange-500 mb-6 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-widest">
                [04] O QUE VOCÊ VAI APRENDER // APLICAÇÃO REAL
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono tracking-tight leading-[1.05] mb-6 text-white">
                Construa sistemas reais com IA. <span className="text-orange-500">Sem precisar saber programar.</span>
              </h2>
              <div className="max-w-3xl mx-auto font-mono">
                <p className="text-base text-white/70 leading-relaxed mb-4">
                  A tecnologia evoluiu para que você <span className="text-orange-500 font-semibold">não precise gastar meses</span> estudando sintaxe complexa, bancos de dados ou configurações de servidor para criar seus próprios sistemas e painéis. Com Inteligência Artificial e as ferramentas certas, você constrói CRMs, ERPs e automações funcionais para o seu negócio ou clientes de forma rápida.
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  Chega de usar IA apenas para conversar ou criar fotos divertidas. É hora de dominar a criação de ferramentas digitais completas e faturar alto no mercado real.
                </p>
              </div>
            </>
          ) : (
            <>
              <span className={`inline-flex items-center gap-3 text-xs font-mono tracking-widest text-white/40 uppercase mb-6 justify-center`}>
                <span className="w-8 h-[2px] bg-white/20 rounded-full" />
                A virada
                <span className="w-8 h-[2px] bg-white/20 rounded-full" />
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.05] mb-6">
                O que você realmente vai aprender a fazer com o <span className="text-[#3B82F6]">Método 3h</span>
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
                  A tecnologia evoluiu para que você <span className="text-white font-medium">não precise ser programador</span> para criar sistemas de gestão, sites profissionais e automações inteligentes. Com Inteligência Artificial e as ferramentas certas de IA, qualquer leigo constrói soluções digitais ultra-profissionais.
                </p>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  Pare de usar IAs apenas para gerar textos ou imagens. Você vai aprender a criar sistemas de gestão reais que economizam tempo, controlam seu caixa e colocam sua empresa no topo das buscas do Google de ponta a ponta.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Interactive Features Carousel Section */}
        <div className="mt-12 lg:mt-16">
          <FeatureCarousel isProgrammer={isProgrammer} />
        </div>
      </div>
    </section>
  );
}
