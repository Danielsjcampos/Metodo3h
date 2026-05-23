"use client";

import { useEffect, useRef, useState } from "react";

export function HowItWorksSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const defaultStats = [
    { value: "3h",     label: "Tempo médio para publicar", sublabel: "Do absoluto zero ao site no ar. Sem jargões técnicos complexos ou enrolações. 100% amigável para leigos.", img: "/images/3 horas.png" },
    { value: "R$0",    label: "Custo de hospedagem",       sublabel: "Vercel + Cloudflare integrados de graça. Economize milhares de reais em custos operacionais ou aumente seu lucro.", img: "/images/custo de hospedagem.png" },
    { value: "100%",   label: "Independência total",       sublabel: "Você edita, atualiza, muda e replica sem depender de ninguém.",         img: "/images/100-independencia.png" },
    { value: "R$2.800",label: "Pacote médio de venda",    sublabel: "Precifique seu novo serviço com alta margem. Crie sites de R$1.500 a R$3.500 e fature logo no início.", img: "/images/2800.png" },
  ];

  const programmerStats = [
    { value: "3h",     label: "Tempo de deploy inicial", sublabel: "Do absoluto zero à produção. Sem configurações complexas, burocracias de servidor ou dockerfiles.", img: "/images/3 horas.png" },
    { value: "R$0",    label: "Custo de infraestrutura",       sublabel: "Hospedagem profissional com Vercel + Cloudflare. Latência sub-milissegundo com custo fixo zero por site.", img: "/images/custo de hospedagem.png" },
    { value: "100%",   label: "Autonomia & Código Limpo",       sublabel: "Projetos limpos, flexíveis e sob seu total controle direto no seu repositório Git.",         img: "/images/100-independencia.png" },
    { value: "R$2.800",label: "Média por microsserviço/LP",    sublabel: "Precifique seus deploys ultra-velozes como freela de alto valor. Produza MVPs e LPs de elite em horas.", img: "/images/2800.png" },
  ];

  const stats = isProgrammer ? programmerStats : defaultStats;

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
                [04] SOLUÇÃO // A VIRADA TECNOLÓGICA
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono tracking-tight leading-[1.05] mb-6 text-white">
                Prompt-to-Prod sem código boilerplate. <span className="text-orange-500">Para sempre.</span>
              </h2>
              <div className="max-w-3xl mx-auto font-mono">
                <p className="text-base text-white/70 leading-relaxed mb-4">
                  A tecnologia evoluiu para que você <span className="text-orange-500">não precise gastar tempo</span> configurando servidores, escrevendo CSS do zero ou lidando com burocracias de infra. Com IA e as ferramentas certas, você pula a barreira do boilerplate e faz deploy direto para produção.
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  Seja você um dev buscando maximizar sua velocidade de entrega ou um engenheiro querendo monetizar LPs rápidas com margem de 95%, este é o atalho técnico ideal.
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
                A IA acabou com a barreira técnica. <span className="text-white/40">Para sempre.</span>
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
                  A tecnologia evoluiu para que você <span className="text-white">não precise ser programador</span> para criar designs dignos de grandes marcas. Com Inteligência Artificial e as ferramentas certas, qualquer leigo constrói sites ultra-profissionais de forma rápida e precisa.
                </p>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  Seja você um empresário local querendo reduzir custos operacionais ou um profissional em busca de uma renda extra lucrativa, este é o caminho mais curto e eficiente para dominar o digital.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden rounded-3xl glass-card glass-card-hover transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${isProgrammer ? "hover:border-orange-500/20" : ""}`}
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
                <span className={`text-4xl lg:text-5xl font-display block mb-3 ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`}>
                  {stat.value}
                </span>
                <h3 className={`text-base lg:text-lg mb-2 ${isProgrammer ? "font-mono font-bold text-white" : "font-display"}`}>
                  {stat.label}
                </h3>
                <p className={`text-white/50 text-sm leading-relaxed ${isProgrammer ? "font-mono" : ""}`}>
                  {stat.sublabel}
                </p>
              </div>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                isProgrammer ? "via-orange-500/30" : "via-[#3B82F6]/30"
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
