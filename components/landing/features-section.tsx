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

export function FeaturesSection() {
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

  return (
    <section id="problema" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-20 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                A realidade do mercado hoje
              </span>
              <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                Você está pagando
                <br />
                <span className="text-muted-foreground">caro demais</span>
                <br />
                por algo que
                <br />
                <span className="text-muted-foreground">deveria ser simples.</span>
              </h2>
            </div>
          </div>
          <p className={`mt-12 text-xl text-muted-foreground leading-relaxed max-w-3xl transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            O mercado quer te fazer crer que criar um site é complexo para te cobrar fortunas. Rompemos essa barreira: um aprendizado cirúrgico, sem jargões de programação ou marketing digital, desenhado para leigos colocarem projetos profissionais no ar em poucas horas — seja para faturar alto vendendo esse serviço ou para digitalizar sua própria empresa com custo zero de agência.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Visual = visuals[problem.visual];
            return (
              <div
                key={problem.title}
                className={`relative rounded-3xl glass-card glass-card-hover overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Visual area */}
                <Visual />

                {/* Text area */}
                <div className="p-8 lg:p-10">
                  <h3 className="text-xl lg:text-2xl font-display mb-4">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
