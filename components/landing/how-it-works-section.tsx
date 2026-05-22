"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "3h",     label: "Tempo médio para publicar", sublabel: "Do absoluto zero ao site no ar. Sem jargões técnicos complexos ou enrolações. 100% amigável para leigos.", img: "/images/3 horas.png" },
  { value: "R$0",    label: "Custo de hospedagem",       sublabel: "Vercel + Cloudflare integrados de graça. Economize milhares de reais em custos operacionais ou aumente seu lucro.", img: "/images/custo de hospedagem.png" },
  { value: "100%",   label: "Independência total",       sublabel: "Você edita, atualiza, muda e replica sem depender de ninguém.",         img: "/images/100-independencia.png" },
  { value: "R$2.800",label: "Pacote médio de venda",    sublabel: "Precifique seu novo serviço com alta margem. Crie sites de R$1.500 a R$3.500 e fature logo no início.", img: "/images/2800.png" },
];

export function HowItWorksSection() {
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
        <div className="relative mb-10 lg:mb-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          {/* Title */}
          <div className="overflow-hidden">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-4">
                <span className="w-12 h-px bg-white/20" />
                A virada
              </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.9] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">A IA acabou</span>
              <span className="block text-white/40">com a</span>
              <span className="block">barreira técnica.</span>
              <span className="block text-white/20">Para sempre.</span>
            </h2>
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <p className="text-xl text-white/70 leading-relaxed mb-4">
              A tecnologia evoluiu para que você <span className="text-white">não precise ser programador</span> para criar designs dignos de grandes marcas. Com Inteligência Artificial e as ferramentas certas, qualquer leigo constrói sites ultra-profissionais de forma rápida e precisa.
            </p>
            <p className="text-lg text-white/50 leading-relaxed">
              Seja você um empresário local querendo reduzir custos operacionais ou um profissional em busca de uma renda extra lucrativa, este é o caminho mais curto e eficiente para dominar o digital.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden rounded-3xl glass-card glass-card-hover transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* AI image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={stat.img}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-[#0e0f13]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7 lg:p-8">
                <span className="text-4xl lg:text-5xl font-display text-[#3B82F6] block mb-3">
                  {stat.value}
                </span>
                <h3 className="text-base lg:text-lg font-display mb-2">
                  {stat.label}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
