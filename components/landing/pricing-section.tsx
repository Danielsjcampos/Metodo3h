"use client";

import { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";

const bonuses = [
  {
    icon: "🔗",
    title: "Links exclusivos — o arsenal completo",
    description: "A lista de ferramentas, bancos de imagens, fontes, geradores de paleta e recursos de IA que só cursos de R$2.000+ costumam entregar. Curados e testados por mim.",
  },
  {
    icon: "💰",
    title: "Como cobrar e conseguir o primeiro cliente",
    description: "Tabela de preços, 3 estratégias para conseguir cliente sem portfólio, script de abordagem no WhatsApp e modelo de contrato simples para proteger você.",
  },
  {
    icon: "📡",
    title: "Grupo exclusivo + novidades da IA toda semana",
    description: "Acesso ao grupo de alunos com 1 link/ferramenta nova por semana — porque o mundo da IA muda todo mês e você precisa se manter na frente.",
  },
];

export function PricingSection({ settings }: { settings?: any }) {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-12 h-px bg-foreground/30" />
            O que vem junto
          </span>
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Bônus que
            <br />
            <span className="text-muted-foreground">valem mais</span>
            <br />
            que o curso.
          </h2>
        </div>

        {/* Bonus cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {bonuses.map((bonus, index) => (
            <div
              key={bonus.title}
              className={`p-8 lg:p-10 rounded-3xl glass-card glass-card-hover transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-4xl mb-6 block">{bonus.icon}</span>
              <h3 className="text-xl lg:text-2xl font-display mb-4">
                {bonus.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {bonus.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main pricing card */}
        <div className={`relative rounded-[2.5rem] glass-card border border-white/20 p-8 lg:p-12 overflow-hidden transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {/* Ambient glow decoration */}
          <div className="absolute -top-12 -right-12 w-[300px] h-[300px] ambient-glow-blue opacity-30 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-[300px] h-[300px] ambient-glow-gold opacity-15 blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Price */}
            <div>
              <span className="text-sm font-mono text-muted-foreground mb-4 block">
                Investimento único
              </span>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-6xl lg:text-8xl font-display text-white">R${settings?.launchPrice || "97"}</span>
              </div>
              <p className="text-muted-foreground mb-8">
                <span className="line-through">R${settings?.regularPrice || "247"}</span> — preço de lançamento (50 vagas)
              </p>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {[
                  "7 módulos completos (~6h de conteúdo)",
                  "26 aulas práticas com tela real",
                  "1 ano de acesso",
                  "3 bônus exclusivos",
                  "Grupo de alunos no WhatsApp",
                  "7 dias de garantia incondicional",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3B82F6] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground font-mono">
                7 dias de garantia · Sem spam · Acesso de 1 ano
              </p>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:flex items-end justify-center h-[400px] -mr-12">
              <img
                src="/images/whale.png"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain object-center animate-float-y"
              />
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#3B82F6]" />
            Pagamento seguro
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#3B82F6]" />
            Acesso imediato
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#3B82F6]" />
            Suporte por WhatsApp
          </span>
        </div>
      </div>
    </section>
  );
}
