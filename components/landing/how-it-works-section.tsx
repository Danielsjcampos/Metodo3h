"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "3h",     label: "Tempo médio para publicar", sublabel: "Do prompt ao site no ar com domínio próprio. Cronometrado.",            img: "/images/tools/metric-speed.png" },
  { value: "R$0",    label: "Custo de hospedagem",       sublabel: "Vercel + Cloudflare são gratuitos para o que você precisa. Sem mensalidade.", img: "/images/tools/metric-free.png" },
  { value: "100%",   label: "Independência total",       sublabel: "Você edita, atualiza, muda e replica sem depender de ninguém.",         img: "/images/tools/metric-independence.png" },
  { value: "R$2.800",label: "Pacote mínimo para vender", sublabel: "O que você aprende aqui pode ser precificado e vendido para clientes amanhã.", img: "/images/tools/metric-earnings.png" },
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
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-16 lg:mb-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
          {/* Title */}
          <div className="overflow-hidden">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
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
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Em 2025, criar um site profissional com IA não é mais vantagem competitiva — é <span className="text-white">obrigação de quem quer se manter relevante</span>.
            </p>
            <p className="text-lg text-white/50 leading-relaxed">
              O profissional que ainda depende de agência para criar presença digital está ficando para trás enquanto você lê isso.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mt-6">
              Neste curso eu mostro exatamente como eu crio sites para meus clientes — <span className="text-white">ao vivo, sem cortes, sem teatro</span>. Você aprende fazendo junto.
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
