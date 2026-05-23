"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    visual: "price" as const,
    title: "O preço absurdo de uma agência",
    description: "R$5.000, R$8.000 ou R$12.000 — um custo insustentável para pequenos estabelecimentos e uma enorme oportunidade de faturamento para quem aprende a criar.",
  },
  {
    visual: "time" as const,
    title: "Semanas (ou meses) esperando",
    description: "Briefing, reunião, proposta, aprovação, revisão, mais revisão... enquanto seu concorrente já está no Google.",
  },
  {
    visual: "lock" as const,
    title: "Dependência permanente",
    description: "Mudar uma vírgula ou imagem exige dias de espera e taxas extras de manutenção. Com nosso método, você tem controle total da sua presença digital.",
  },
];

function AIVisual({ src }: { src: string }) {
  return (
    <div className="relative h-52 overflow-hidden">
      <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
    </div>
  );
}

const visuals = {
  price: () => <AIVisual src="/images/o preco absurdo de uma agencia.png" />,
  time:  () => <AIVisual src="/images/semanas ou meses esperando.png" />,
  lock:  () => <AIVisual src="/images/dependencia permanente.png" />,
};

export function FeaturesSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const programmerProblems = [
    {
      visual: "price" as const,
      title: "Infraestrutura complexa e cara",
      description: "Pagar por VPS caras, gerenciar servidores Nginx/Apache e bancos de dados complexos apenas para LPs e sites institucionais simples. Um desperdício de tempo e recursos.",
    },
    {
      visual: "time" as const,
      title: "LPs lentas com Lighthouse quebrado",
      description: "Monólitos pesados em WordPress que quebram o Core Web Vitals (LCP, INP) e prejudicam a conversão de tráfego pago. O tráfego exige performance estática pura.",
    },
    {
      visual: "lock" as const,
      title: "Deploy manual e burocracia de commits",
      description: "Qualquer alteração simples de copy ou imagem exige burocracia de commits ou demanda horas de manutenção. Com IA e Github modernizado, o deploy de borda é automatizado.",
    },
  ];

  const activeProblems = isProgrammer ? programmerProblems : problems;

  return (
    <section id="problema" ref={sectionRef} className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-10 lg:mb-14 text-center flex flex-col items-center justify-center">
          {isProgrammer ? (
            <>
              <span className="inline-flex items-center gap-3 text-xs font-mono text-orange-500 mb-6 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-widest">
                [03] DIAGNÓSTICO // O GARGALO TRADICIONAL
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono tracking-tight leading-[1.1] text-white">
                Você está desperdiçando <span className="text-orange-500 font-bold">tempo e banda</span>
                <br />
                com fluxos de <span className="text-muted-foreground">hospedagem e setup obsoletos.</span>
              </h2>
              <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto font-mono">
                O ecossistema legado quer te prender a configurações manuais de Nginx, VPS caras ou pacotes complexos apenas para manter páginas estáticas e landing pages no ar. Rompemos essa barreira unindo IA Generativa e deploys instantâneos sem custo.
              </p>
            </>
          ) : (
            <>
              <span className={`inline-flex items-center gap-3 text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6 transition-all duration-700 justify-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}>
                <span className="w-8 h-[2px] bg-foreground/20 rounded-full" />
                A realidade do mercado hoje
                <span className="w-8 h-[2px] bg-foreground/20 rounded-full" />
              </span>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.05] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                Você está pagando <span className="text-muted-foreground">caro demais</span>
                <br />
                por algo que <span className="text-muted-foreground">deveria ser simples.</span>
              </h2>
              <p className={`mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                O mercado quer te fazer crer que criar um site é complexo para te cobrar fortunas. Rompemos essa barreira: um aprendizado cirúrgico, sem jargões de programação ou marketing digital, desenhado para leigos colocarem projetos profissionais no ar em poucas horas — seja para faturar alto vendendo esse serviço ou para digitalizar sua própria empresa com custo zero de agência.
              </p>
            </>
          )}
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {activeProblems.map((problem, index) => {
            const Visual = visuals[problem.visual];
            return (
              <div
                key={problem.title}
                className={`relative rounded-3xl glass-card glass-card-hover overflow-hidden transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${isProgrammer ? "border-orange-500/10 hover:border-orange-500/25" : ""}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Visual area */}
                <Visual />

                {/* Text area */}
                <div className="p-8 lg:p-10">
                  <h3 className={`text-xl lg:text-2xl mb-4 ${isProgrammer ? "font-mono font-bold text-white" : "font-display text-white"}`}>
                    {problem.title}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed text-sm ${isProgrammer ? "font-mono" : ""}`}>
                    {problem.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
                  isProgrammer ? "via-orange-500/20" : "via-[#3B82F6]/20"
                } to-transparent`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
