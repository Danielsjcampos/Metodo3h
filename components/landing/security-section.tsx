"use client";

import { useEffect, useState, useRef } from "react";

const targetAudience = [
  {
    icon: "🏪",
    title: "O pequeno empresário",
    description: "Você tem um negócio local — salão, clínica, oficina, loja — e não tem site, ou tem um site que ninguém acha. Quer aparecer no Google e no Maps sem depender de agência.",
  },
  {
    icon: "💼",
    title: "O freelancer em potencial",
    description: "Você quer uma renda extra criando sites para outros negócios. Quer cobrar R$1.500 a R$3.500 por projeto sem precisar saber programar — e este curso te dá o método completo.",
  },
  {
    icon: "🔄",
    title: "O profissional em transição",
    description: "Você trabalha em outra área e quer entrar no mercado digital. Criar sites com IA é a porta de entrada mais rápida e barata para uma carreira com demanda crescente e alto valor.",
  },
];

const notFor = [
  "Você quer criar e-commerce complexo com ERP integrado",
  "Você quer aprender programação profissional do zero",
  "Você já faz isso e quer nível avançado de código",
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Para quem é este curso
          </span>
          
          <h2 className={`text-5xl md:text-6xl lg:text-[100px] font-display tracking-tight leading-[0.9] mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Para quem quer
            <br />
            <span className="text-muted-foreground">resultado,</span>
            <br />
            não diploma.
          </h2>
        </div>

        {/* Target audience cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {targetAudience.map((item, index) => (
            <div
              key={item.title}
              className={`p-8 lg:p-10 border transition-all duration-500 cursor-default ${
                activeCard === index 
                  ? "border-foreground/30 bg-foreground/[0.04]" 
                  : "border-foreground/10 hover:border-foreground/20"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveCard(index)}
            >
              <span className="text-4xl mb-6 block">{item.icon}</span>
              <h3 className="text-xl lg:text-2xl font-display mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Not for section */}
        <div className={`p-8 lg:p-10 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h3 className="text-lg font-display mb-6 text-muted-foreground">
            Este curso não é para você se:
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {notFor.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-muted-foreground mt-0.5">—</span>
                <p className="text-muted-foreground text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
