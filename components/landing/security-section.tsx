"use client";

import { useEffect, useState, useRef } from "react";
import { X, Check } from "lucide-react";

const targetAudience = [
  {
    badge: "PERFIL 01",
    num: "01",
    image: "/images/o pequeno empresario.png",
    title: "O Pequeno Empresário",
    subtitle: "Dono de Negócio Local",
    description: "Você tem um estabelecimento — clínica, salão, loja, escritório — e precisa digitalizar sua operação para reduzir custos e atrair clientes do Google e Maps, de forma independente e livre de mensalidades abusivas de agências.",
    accent: "from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30",
    glow: "rgba(59,130,246,0.15)",
    badgeColor: "bg-blue-500",
    textColor: "group-hover:text-blue-400",
  },
  {
    badge: "PERFIL 02",
    num: "02",
    image: "/images/free lancer potencial.png",
    title: "O Freelancer Potencial",
    subtitle: "Renda Extra Digital",
    description: "Você quer construir uma nova fonte de renda e faturar alto, cobrando de R$1.500 a R$3.500 por projeto. Conecte-se a este modelo altamente lucrativo em tempo recorde sem precisar de experiência em código ou marketing digital.",
    accent: "from-amber-500/10 to-orange-500/10 hover:border-amber-500/30",
    glow: "rgba(245,158,11,0.15)",
    badgeColor: "bg-amber-500",
    textColor: "group-hover:text-amber-400",
  },
  {
    badge: "PERFIL 03",
    num: "03",
    image: "/images/transicao de carreira.png",
    title: "O Transição de Carreira",
    subtitle: "Iniciante / Leigo Absoluto",
    description: "Mesmo sendo um completo leigo em internet ou desenvolvimento, você terá acesso a um aprendizado extremamente rápido e preciso para dominar a criação de projetos com Inteligência Artificial e conquistar seu espaço no mercado.",
    accent: "from-purple-500/10 to-pink-500/10 hover:border-purple-500/30",
    glow: "rgba(168,85,247,0.15)",
    badgeColor: "bg-purple-500",
    textColor: "group-hover:text-purple-400",
  },
];

const notFor = [
  "Você busca atalhos fáceis, dinheiro rápido sem esforço ou fórmulas mágicas sem dedicação.",
  "Você quer aprender programação profissional complexa, lógica pura ou desenvolvimento nativo do zero.",
  "Você quer desenvolver e-commerces ultra-robustos com integrações customizadas de ERPs corporativos legados.",
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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
    <section ref={sectionRef} id="para-quem" className="relative py-14 md:py-18 lg:py-22 overflow-hidden bg-background">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12 text-center md:text-left">
          <span className={`inline-flex items-center gap-3 text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}>
            <span className="w-8 h-[2px] bg-[#3B82F6]/60 rounded-full" />
            Para quem é este curso
          </span>
          
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[1.05] mt-2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Projetado para quem quer
            <br />
            <span className="text-muted-foreground italic font-light">resultados reais,</span>{" "}
            não diplomas.
          </h2>
          <p className={`mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            O método prático direto ao ponto para tirar ideias do papel, dominar ferramentas de inteligência artificial e monetizar no mercado digital.
          </p>
        </div>

        {/* Premium Target Audience Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {targetAudience.map((item, index) => {
            const isHovered = activeCard === index;
            return (
              <div
                key={item.title}
                className={`relative rounded-[2rem] glass-card overflow-hidden transition-all duration-500 group cursor-pointer ${
                  isHovered ? "border-white/15 scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.6)]" : "border-white/5 hover:border-white/10"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  boxShadow: isHovered ? `0 20px 50px -12px ${item.glow}` : undefined
                }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Visual Accent Top Bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Floating Glass Profile Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                  <span className={`w-2 h-2 rounded-full ${item.badgeColor} animate-pulse`} />
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-white/90">{item.badge}</span>
                </div>

                {/* Big stylized watermark background number */}
                <div className="absolute bottom-6 right-6 text-[100px] font-display font-extrabold leading-none text-white/[0.02] group-hover:text-white/[0.04] select-none pointer-events-none transition-colors duration-500">
                  {item.num}
                </div>

                {/* Image Showcase */}
                <div className="h-64 relative overflow-hidden bg-black/40 border-b border-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[1.1] contrast-[1.05]"
                  />
                  {/* Subtle dynamic grid patterns over images */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  {/* Premium vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/30 to-transparent" />
                </div>
                
                {/* Content Area */}
                <div className="p-8 relative z-10 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className={`text-2xl font-display font-medium text-white mb-4 transition-colors duration-300 ${item.textColor}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Blacklist Commitment Exclusion Box */}
        <div className={`relative rounded-[2.5rem] bg-gradient-to-b from-[#110b14]/90 to-[#08050a]/95 border border-red-500/10 p-8 md:p-12 lg:p-14 overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        } shadow-[0_20px_50px_rgba(239,68,68,0.03)]`}>
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            {/* Tag/Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-4 border-b border-white/5">
              <div>
                <span className="text-xs font-mono tracking-widest text-red-500 uppercase block mb-2">Filtro de Alinhamento</span>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white">
                  Este curso <span className="text-red-500 underline decoration-red-500/40 underline-offset-4 font-normal italic">NÃO é</span> para você se:
                </h3>
              </div>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                <X className="w-6 h-6" />
              </div>
            </div>

            {/* Negatives List */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {notFor.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xs font-bold leading-none">✕</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

