"use client";

import { useEffect, useState, useRef } from "react";
import { Check, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

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
  {
    icon: "🗺️",
    title: "Super Bônus: Ranquear no Google Meu Negócio",
    description: "Aprenda com o especialista Vinicius Saldanha o método definitivo (avaliado em R$697) para colocar qualquer empresa local no topo das buscas do Google e do Maps e explodir suas vendas.",
  },
];

export function PricingSection({ settings }: { settings?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // 7 minutes countdown timer logic (looping)
  const [timeLeft, setTimeLeft] = useState(7 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(7 * 60); // Reset timer to keep looping!
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
    <section id="pricing" ref={sectionRef} className="relative py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-12 h-px bg-foreground/30" />
            O que vem junto
          </span>
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Bônus acumulados
            <br />
            <span className="text-muted-foreground">que valem mais de</span>
            <br />
            R$ 697 reais.
          </h2>
        </div>

        {/* Bonus cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

// Main pricing card
        <div className={`w-full max-w-4xl mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#3B82F6]/20 rounded-[2.5rem] relative shadow-[0_0_120px_rgba(59,130,246,0.15)] overflow-hidden p-8 md:p-14 text-center transition-all duration-700 hover:shadow-[0_0_150px_rgba(59,130,246,0.25)] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {/* Top Line Gradient */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-[#3B82F6] to-cyan-500 z-10" />

          {/* Inner Blue Glow Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3B82F6]/15 blur-[100px] rounded-full pointer-events-none" />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/images/logo.png" alt="Logo" className="h-10 md:h-12 object-contain" />
          </div>

          <span className="text-[#3B82F6] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs block mb-4">
            Lançamento — Valor Especial por Tempo Limitado
          </span>

          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Garanta Sua Vaga <span className="text-[#3B82F6]">Agora</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
            7 módulos práticos + Módulo Bônus com Vinicius Saldanha + Comunidade VIP. Tudo por um investimento único de lançamento.
          </p>

          <div className="text-gray-400 font-bold uppercase text-xs md:text-sm tracking-[0.15em] mb-2 line-through decoration-blue-500/70 decoration-2">
            De R$ {settings?.regularPrice || "247"},00 por
          </div>

          <div className="mb-2 flex flex-col items-center justify-center">
            <span className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
              R$ {settings?.launchPrice || "97"},00 à vista
            </span>
          </div>
          <div className="text-[#3B82F6]/90 font-bold text-xs md:text-sm mb-10">
            no Cartão ou Pix (sem mensalidades)
          </div>

          {/* Real Timer */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#111] border border-[#3B82F6]/30 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl font-black text-[#3B82F6] shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] font-mono">
                {String(minutes).padStart(2, '0')}
              </div>
              <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-bold">Minutos</span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-[#3B82F6]/50 -mt-6 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-[#111] border border-[#3B82F6]/30 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl font-black text-[#3B82F6] shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] font-mono">
                {String(seconds).padStart(2, '0')}
              </div>
              <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-bold">Segundos</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Ao finalizar o contador acima as vagas da oferta atual podem se encerrar. Oportunidade com 1 Ano de acesso e bônus inclusos.
          </p>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-y-5 gap-x-6 max-w-2xl mx-auto mb-12 text-left">
            {[
              "7 módulos completos (~6h de conteúdo)",
              "26 aulas práticas com tela real",
              "Módulo Bônus: Google Meu Negócio (Vinicius Saldanha)",
              "Mais de R$697 acumulados em bônus inclusos",
              "1 ano de acesso completo",
              "Grupo de alunos no WhatsApp",
              "7 dias de garantia incondicional",
            ].map((feature) => {
              const isBonus = feature.toLowerCase().includes("bônus");
              return (
                <div key={feature} className={`flex items-start gap-3 ${isBonus ? "animate-pulse" : ""}`}>
                  <CheckCircle size={18} className={`shrink-0 mt-0.5 ${isBonus ? "text-yellow-500" : "text-[#3B82F6]"}`} />
                  <span className={`text-gray-300 text-xs sm:text-sm ${isBonus ? "font-bold text-yellow-400" : "font-medium"}`}>
                    {feature}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Premium CTA Button */}
          <motion.a
            href="#inscricao"
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-xl mx-auto bg-gradient-to-r from-blue-700 to-[#3B82F6] hover:from-blue-600 hover:to-[#60a5fa] text-white px-8 py-5 sm:py-6 rounded-2xl font-black text-sm md:text-[15px] uppercase tracking-widest transition-all mb-4 shadow-xl relative overflow-hidden group flex items-center justify-center cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Quero Garantir Minha Vaga Agora</span>
          </motion.a>
          <p className="text-gray-600 text-xs mb-8">Acesso imediato após a confirmação do cadastro</p>

          {/* Trust Footnote */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-gray-400" /> Garantia Incondicional de 7 Dias
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-zinc-800 border border-[#0a0a0a]" />
                <div className="w-5 h-5 rounded-full bg-zinc-700 border border-[#0a0a0a]" />
                <div className="w-5 h-5 rounded-full bg-zinc-600 border border-[#0a0a0a]" />
              </div>
              Vagas sujeitas à disponibilidade
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className={`mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground transition-all duration-1000 delay-500 ${
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
