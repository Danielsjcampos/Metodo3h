"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    visual: "price" as const,
    title: "O preço absurdo de uma agência",
    description: "R$5.000, R$8.000, R$12.000 — para um site que você vai depender deles para sempre mudar uma vírgula.",
  },
  {
    visual: "time" as const,
    title: "Semanas (ou meses) esperando",
    description: "Briefing, reunião, proposta, aprovação, revisão, mais revisão... enquanto seu concorrente já está no Google.",
  },
  {
    visual: "lock" as const,
    title: "Dependência permanente",
    description: "Precisa trocar uma foto? Liga para o desenvolvedor. Quer mudar o horário? Manda e-mail. Quer atualizar o preço? Aguarde.",
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
  price: () => <AIVisual src="/images/tools/problem-price.png" />,
  time:  () => <AIVisual src="/images/tools/problem-time.png" />,
  lock:  () => <AIVisual src="/images/tools/problem-lock.png" />,
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
            Agências cobram R$3.000 a R$15.000 por sites que levam 3 meses para ficar prontos — e que você não consegue atualizar sozinho depois. Freelancers somem. WordPress quebra. E seu negócio fica sem presença digital porque ninguém te ensinou o caminho mais rápido.
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
