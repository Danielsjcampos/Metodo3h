"use client";

import { useEffect, useState, useRef } from "react";
import { Check, CheckCircle, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedShaderBackground from "../ui/animated-shader-background";

const bonuses = [
  {
    icon: "🔗",
    title: "Links exclusivos — o arsenal completo",
    description: "A lista de ferramentas, bancos de imagens, fontes, geradores de paleta e recursos de IA que só cursos de R$2.000+ costumam entregar. Curados e testados por mim.",
    value: "197,00",
  },
  {
    icon: "💰",
    title: "Como cobrar e conseguir o primeiro cliente",
    description: "Tabela de preços, 3 estratégias para conseguir cliente sem portfólio, script de abordagem no WhatsApp e modelo de contrato simples para proteger você.",
    value: "297,00",
  },
  {
    icon: "📡",
    title: "Grupo exclusivo + novidades da IA toda semana",
    description: "Acesso ao grupo de alunos com 1 link/ferramenta nova por semana — porque o mundo da IA muda todo mês e você precisa se manter na frente.",
    value: "147,00",
  },
  {
    icon: "🗺️",
    title: "Super Bônus: Ranquear no Google Meu Negócio",
    description: "Aprenda com o especialista Vinicius Saldanha o método definitivo (avaliado em R$697) para colocar qualquer empresa local no topo das buscas do Google e do Maps e explodir suas vendas.",
    value: "697,00",
  },
];

const saldanhaLessons = [
  "1. O Poder do Posicionamento Local nas Buscas",
  "2. Como Reivindicar e Otimizar sua Ficha do GMN",
  "3. SEO Local Avançado para Destaque na Concorrência",
  "4. Estratégias de Prospecção para Fechar Clientes Rápidos",
  "5. Script de Negociação e Modelo de Contrato Exclusivo",
];

const gabrielLessons = [
  "1. Gatilhos Mentais Essenciais para Textos Persuasivos",
  "2. Estruturação de Headlines e Copy de Páginas Web",
  "3. Scripts de Venda e Quebra de Objeções no WhatsApp",
  "4. O Método Exato para Fechar Contratos Sem Descontos",
  "5. Roteiro Passo a Passo de Apresentação de Propostas",
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
    <section id="pricing" ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-black flex flex-col items-center justify-center min-h-[90vh]">
      {/* WebGL cosmic blue meteorites background effect */}
      <AnimatedShaderBackground />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        {/* Header with High-Impact Value Stack Glow */}
        <div className="mb-14 lg:mb-20 relative">
          {/* Subtle Ambient Background Spotlight */}
          <div className="absolute -top-12 left-10 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          {/* Glowing Pill Badge */}
          <div className={`inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-5 py-2 rounded-full mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              Arsenal de Bônus Exclusivos
            </span>
          </div>

          {/* Main Epic Headline */}
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.05] text-white transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Bônus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#3B82F6] to-cyan-400">Acumulados</span>
            <br />
            <span className="text-gray-400 text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight block my-2">
              que somam mais de
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 font-black drop-shadow-[0_0_35px_rgba(250,204,21,0.25)] select-none">
              R$ 1.300,00 reais!
            </span>
          </h2>
          
          {/* Supporting Premium Subtext */}
          <p className={`mt-6 text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            Você não vai receber apenas um treinamento. Ao garantir sua vaga hoje, você leva um ecossistema completo com métodos validados de fechamento e posicionamento local para acelerar seu faturamento.
          </p>
        </div>

        {/* Bonus cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {bonuses.map((bonus, index) => (
            <div
              key={bonus.title}
              className={`p-6 lg:p-8 rounded-3xl glass-card glass-card-hover transition-all duration-700 flex flex-col justify-between h-full relative overflow-hidden group border border-white/5 hover:border-[#3B82F6]/30 shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Subtle blue ambient glow on hover inside each card */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-[30px] group-hover:bg-[#3B82F6]/10 transition-all pointer-events-none" />

              <div className="relative z-10 flex-grow">
                <span className="text-4xl mb-6 block">{bonus.icon}</span>
                <h3 className="text-lg lg:text-xl font-bold tracking-tight text-white mb-4 leading-snug uppercase">
                  {bonus.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {bonus.description}
                </p>
              </div>

              {/* Price-comparison bar modeled on W-Tech */}
              <div className="pt-4 border-t border-white/5 flex flex-row items-end justify-between gap-1 relative z-10 mt-auto">
                <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest line-through decoration-[#3B82F6]/50">
                  De R$ {bonus.value}
                </span>
                <span className="text-xl lg:text-2xl font-black text-cyan-400 tracking-tighter">
                  POR R$ 0,00
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Bonus Modules (Paschoalin-style) */}
        <div className="space-y-12 mb-20 max-w-5xl mx-auto w-full">
          {/* Header for Highlight Modules */}
          <div className="text-center mb-8">
            <span className="text-[#3B82F6] font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs block mb-3">
              Módulos Bônus Exclusivos de Destaque
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Aprenda Diretamente com Quem <span className="text-[#3B82F6]">Faz Acontecer</span>
            </h3>
          </div>

          {/* Module 1: Vinicius Saldanha */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#0e0e0e]/85 backdrop-blur-xl border border-[#3B82F6]/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.1)] relative"
          >
            {/* Top Line Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-[#3B82F6] to-cyan-500" />
            
            <div className="grid lg:grid-cols-12 gap-0 items-stretch">
              {/* Photo Column */}
              <div className="relative h-72 lg:h-auto lg:col-span-5 overflow-hidden">
                <img
                  src="/images/Saldanha.jpeg"
                  alt="Vinicius Saldanha"
                  className="w-full h-full object-cover object-center lg:object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0e0e]/95 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/95 to-transparent lg:hidden" />
                
                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-yellow-600/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                  <Star size={10} className="fill-white text-white shrink-0 animate-spin-slow" /> Participação Especial
                </div>
              </div>

              {/* Content Column */}
              <div className="p-8 md:p-10 lg:col-span-7 relative z-10 flex flex-col justify-center text-left">
                <div className="mb-6">
                  <span className="text-yellow-500 font-bold uppercase tracking-widest text-[10px] md:text-xs block mb-1">
                    Especialista em Marketing Local
                  </span>
                  <h4 className="text-3xl font-black text-white mb-2 tracking-tight">
                    Vinicius Saldanha
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base font-medium mb-3 leading-snug">
                    Google Meu Negócio: Domine o Maps e Atraia Clientes Sem Gastar Com Anúncios
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Aprenda a fórmula testada de SEO local para colocar qualquer empresa no topo das buscas do Google Maps. Uma ficha bem otimizada gera chamadas diárias e atrai clientes reais logo nas primeiras semanas de forma orgânica.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <p className="text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-4">Aulas Exclusivas Inclusas:</p>
                  <div className="space-y-2.5">
                    {saldanhaLessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-[#3B82F6]" strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-xs sm:text-sm font-medium">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl mt-6">
                  <p className="text-sm font-bold text-[#3B82F6] leading-relaxed">
                    Vinicius te ensina a colocar qualquer empresa no topo do Google Maps, <strong className="text-white">gerando prospecção passiva de clientes altamente qualificados</strong> de forma orgânica.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Module 2: Gabriel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[#0e0e0e]/85 backdrop-blur-xl border border-[#3B82F6]/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.1)] relative"
          >
            {/* Top Line Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-[#3B82F6] to-cyan-500" />
            
            <div className="grid lg:grid-cols-12 gap-0 items-stretch">
              {/* Photo Column */}
              <div className="relative h-72 lg:h-auto lg:col-span-5 overflow-hidden">
                <img
                  src="/images/gabriel.jpeg"
                  alt="Gabriel"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0e0e]/95 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/95 to-transparent lg:hidden" />
                
                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-[#3B82F6]/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                  <Star size={10} className="fill-white text-white shrink-0 animate-spin-slow" /> Módulo Bônus Especial
                </div>
              </div>

              {/* Content Column */}
              <div className="p-8 md:p-10 lg:col-span-7 relative z-10 flex flex-col justify-center text-left">
                <div className="mb-6">
                  <span className="text-[#3B82F6] font-bold uppercase tracking-widest text-[10px] md:text-xs block mb-1">
                    Copywriter Profissional
                  </span>
                  <h4 className="text-3xl font-black text-white mb-2 tracking-tight">
                    Gabriel
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base font-medium mb-3 leading-snug">
                    Copywriting e Fechamento de Vendas Pelo WhatsApp
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Descubra os segredos da escrita persuasiva aplicados a sites profissionais que convertem visitantes em clientes pagantes. Aprenda scripts de abordagem práticos e de alto impacto para conduzir reuniões comerciais e fechar propostas sem dar descontos.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <p className="text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-4">Aulas Exclusivas Inclusas:</p>
                  <div className="space-y-2.5">
                    {gabrielLessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-[#3B82F6]" strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-xs sm:text-sm font-medium">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl mt-6">
                  <p className="text-sm font-bold text-[#3B82F6] leading-relaxed">
                    Gabriel revela o roteiro exato e os gatilhos comerciais para <strong className="text-white">fechar contratos de alto valor pelo WhatsApp</strong> sem sofrer com objeções ou pedidos de desconto.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Centered glass card */}
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
              "Mais de R$ 1.300 em bônus inclusos",
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
