"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCircle, ShieldCheck, Star, Loader2, Mail, Phone, User as UserIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedShaderBackground from "../ui/animated-shader-background";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";

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
    icon: "💬",
    title: "Grupo VIP + Mentoria com 3 Mentores",
    description: "Acesso ao grupo VIP de alunos com o acompanhamento direto de 3 mentores para avaliar o seu site e tirar suas dúvidas em tempo real. Nós vamos te ajudar de verdade a colocar o seu primeiro site no ar!",
    value: "497,00",
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
  "1. Banco de Dados Sem Código & Modelagem com IA",
  "2. Backend Serverless: Fluxos de Dados Simplificados",
  "3. Interface Frontend Dinâmica de CRM com IA",
  "4. Webhooks, Triggers e Notificações de Vendas",
  "5. Publicação do CRM em Menos de 1 Hora",
];

const devGabrielLessons = [
  "1. Arquitetura de Software: Prompt-to-Database",
  "2. Backend Serverless: APIs de Gestão com Supabase",
  "3. Componentes React Dinâmicos & Dashboard Admin UI",
  "4. Webhooks, Triggers e Automação de Notifications",
  "5. Deploy Contínuo (CI/CD) de CRM de Alta Performance",
];

export function PricingSection({ settings, isProgrammer = false }: { settings?: any; isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setWhatsapp(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro ao realizar o cadastro.");
      }

      router.push(`/obrigado?name=${encodeURIComponent(name)}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Erro de conexão. Tente novamente mais tarde.");
      setIsLoading(false);
    }
  };
  
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
      {/* WebGL cosmic blue/amber meteorites background effect */}
      <AnimatedShaderBackground />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        {/* Header with High-Impact Value Stack Glow */}
        <div className="mb-14 lg:mb-20 relative">
          {/* Subtle Ambient Background Spotlight */}
          <div className={`absolute -top-12 left-10 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none -z-10 ${
            isProgrammer ? "bg-orange-500/10" : "bg-blue-500/10"
          }`} />

          {/* Glowing Pill Badge */}
          <div className={`inline-flex items-center gap-2 border px-5 py-2 rounded-full mb-8 transition-all duration-1000 ${
            isProgrammer ? "bg-orange-500/10 border-orange-500/30" : "bg-blue-500/10 border border-blue-500/30"
          } ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isProgrammer ? "bg-orange-500" : "bg-blue-500"}`} />
            <span className={`font-bold uppercase tracking-widest text-[10px] md:text-xs ${isProgrammer ? "text-orange-400" : "text-blue-400"}`}>
              {isProgrammer ? "Arsenal de Bônus Dev Exclusivos" : "Arsenal de Bônus Exclusivos"}
            </span>
          </div>

          {/* Main Epic Headline */}
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.15] text-white transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Bônus <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${
              isProgrammer ? "from-orange-400 via-[#F97316] to-amber-400" : "from-blue-400 via-[#3B82F6] to-cyan-400"
            }`}>Acumulados</span>
            <br />
            <span className="text-gray-400 text-base md:text-lg lg:text-xl font-medium tracking-tight block my-2">
              que somam mais de
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 font-extrabold drop-shadow-[0_0_35px_rgba(250,204,21,0.25)] select-none">
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
              className={`p-6 lg:p-8 rounded-3xl glass-card glass-card-hover transition-all duration-700 flex flex-col justify-between h-full relative overflow-hidden group border border-white/5 shadow-lg ${
                isProgrammer ? "hover:border-[#F97316]/30 shadow-[0_20px_50px_rgba(249,115,22,0.12)]" : "hover:border-[#3B82F6]/30"
              } ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Subtle blue/orange ambient glow on hover inside each card */}
              <div className={`absolute right-0 top-0 w-32 h-32 rounded-full blur-[30px] transition-all pointer-events-none ${
                isProgrammer ? "bg-[#F97316]/5 group-hover:bg-[#F97316]/10" : "bg-[#3B82F6]/5 group-hover:bg-[#3B82F6]/10"
              }`} />

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
                <span className={`text-gray-500 font-bold uppercase text-[10px] tracking-widest line-through decoration-2 ${
                  isProgrammer ? "decoration-orange-500/50" : "decoration-[#3B82F6]/50"
                }`}>
                  De R$ {bonus.value}
                </span>
                <span className={`text-xl lg:text-2xl font-black tracking-tighter ${isProgrammer ? "text-orange-400" : "text-cyan-400"}`}>
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
            <span className={`font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs block mb-3 ${
              isProgrammer ? "text-orange-500" : "text-[#3B82F6]"
            }`}>
              {isProgrammer ? "Módulos Bônus Exclusivos de Engenharia & Prospecção" : "Módulos Bônus Exclusivos de Destaque"}
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Aprenda Diretamente com Quem <span className={isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}>Faz Acontecer</span>
            </h3>
          </div>

          {/* Module 1: Vinicius Saldanha */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className={`backdrop-blur-xl border rounded-[2.5rem] overflow-hidden relative ${
              isProgrammer 
                ? "bg-[#0e0e0e]/85 border-[#F97316]/20 shadow-[0_0_80px_rgba(249,115,22,0.1)]" 
                : "bg-[#0e0e0e]/85 border-[#3B82F6]/20 shadow-[0_0_80px_rgba(59,130,246,0.1)]"
            }`}
          >
            {/* Top Line Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${
              isProgrammer ? "from-orange-600 via-[#F97316] to-amber-500" : "from-blue-600 via-[#3B82F6] to-cyan-500"
            }`} />
            
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
                <div className={`absolute bottom-4 left-4 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg ${
                  isProgrammer ? "bg-orange-600/90" : "bg-yellow-600/90"
                }`}>
                  <Star size={10} className="fill-white text-white shrink-0 animate-spin-slow" /> Participação Especial
                </div>
              </div>

              {/* Content Column */}
              <div className="p-8 md:p-10 lg:col-span-7 relative z-10 flex flex-col justify-center text-left">
                <div className="mb-6">
                  <span className={`font-bold uppercase tracking-widest text-[10px] md:text-xs block mb-1 ${
                    isProgrammer ? "text-orange-500" : "text-yellow-500"
                  }`}>
                    Especialista em Marketing Local & IA
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
                  <p className={`text-xs font-black uppercase tracking-widest mb-4 ${
                    isProgrammer ? "text-orange-500 font-mono" : "text-[#3B82F6]"
                  }`}>Aulas Exclusivas Inclusas:</p>
                  <div className="space-y-2.5">
                    {saldanhaLessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isProgrammer ? "bg-orange-500/20 border border-orange-500/40" : "bg-[#3B82F6]/20 border border-[#3B82F6]/40"
                        }`}>
                          <Check size={10} className={isProgrammer ? "text-orange-400" : "text-[#3B82F6]"} strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-xs sm:text-sm font-medium">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl mt-6 border ${
                  isProgrammer ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : "bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]"
                }`}>
                  <p className="text-sm font-bold leading-relaxed">
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
            className={`backdrop-blur-xl border rounded-[2.5rem] overflow-hidden relative ${
              isProgrammer 
                ? "bg-[#0e0e0e]/85 border-[#F97316]/20 shadow-[0_0_80px_rgba(249,115,22,0.1)]" 
                : "bg-[#0e0e0e]/85 border-[#3B82F6]/20 shadow-[0_0_80px_rgba(59,130,246,0.1)]"
            }`}
          >
            {/* Top Line Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${
              isProgrammer ? "from-orange-600 via-[#F97316] to-amber-500" : "from-blue-600 via-[#3B82F6] to-cyan-500"
            }`} />
            
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
                <div className={`absolute bottom-4 left-4 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg ${
                  isProgrammer ? "bg-orange-600/90" : "bg-[#3B82F6]/90"
                }`}>
                  <Star size={10} className="fill-white text-white shrink-0 animate-spin-slow" /> Módulo Bônus Especial
                </div>
              </div>
 
              {/* Content Column */}
              <div className="p-8 md:p-10 lg:col-span-7 relative z-10 flex flex-col justify-center text-left">
                <div className="mb-6">
                  <span className={`font-bold uppercase tracking-widest text-[10px] md:text-xs block mb-1 ${
                    isProgrammer ? "text-orange-500 font-mono" : "text-[#3B82F6]"
                  }`}>
                    {isProgrammer ? "Engenheiro de IA & Arquiteto de Sistemas" : "Especialista em Sistemas & IA"}
                  </span>
                  <h4 className="text-3xl font-black text-white mb-2 tracking-tight">
                    Gabriel
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base font-medium mb-3 leading-snug">
                    {isProgrammer ? "Arquitetura de Sistemas: Prompt-to-Database & CRM" : "Crie um CRM / Sistema de Gestão com IA em Menos de 1 Hora"}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {isProgrammer 
                      ? "Descubra como projetar, estruturar e publicar sistemas internos complexos usando IA. Gabriel revela a arquitetura do Prompt-to-Database, a criação automática de APIs, dashboards administrativos integrados e webhooks avançados com Supabase e Vercel sem precisar de codificação tradicional backend."
                      : "Aprenda a estruturar o backend e a interface frontend de um sistema de CRM/gestão completo do zero com inteligência artificial. Crie ferramentas corporativas de alto valor de mercado sem precisar de código manual e automatize empresas locais."
                    }
                  </p>
                </div>
 
                <div className="border-t border-white/5 pt-6">
                  <p className={`text-xs font-black uppercase tracking-widest mb-4 ${
                    isProgrammer ? "text-orange-500 font-mono" : "text-[#3B82F6]"
                  }`}>Aulas Exclusivas Inclusas:</p>
                  <div className="space-y-2.5">
                    {(isProgrammer ? devGabrielLessons : gabrielLessons).map((lesson, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isProgrammer ? "bg-orange-500/20 border border-orange-500/40" : "bg-[#3B82F6]/20 border border-[#3B82F6]/40"
                        }`}>
                          <Check size={10} className={isProgrammer ? "text-orange-400" : "text-[#3B82F6]"} strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-xs sm:text-sm font-medium">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
 
                <div className={`p-4 rounded-xl mt-6 border ${
                  isProgrammer ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : "bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]"
                }`}>
                  <p className="text-sm font-bold leading-relaxed">
                    {isProgrammer 
                      ? "Gabriel te ensina a arquitetar e implantar um sistema de gestão completo em menos de uma hora, agregando altíssimo valor comercial e escalabilidade aos seus projetos."
                      : "Gabriel te ensina a construir um sistema de gestão completo (CRM) com IA do zero, automatizando processos corporativos e gerando alto valor de vendas em menos de uma hora."
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
 
        {/* Certification & Launch Guarantee Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className={`backdrop-blur-xl border rounded-[2.5rem] p-8 md:p-12 mb-20 max-w-4xl mx-auto relative overflow-hidden text-center ${
            isProgrammer 
              ? "bg-[#0e0e0e]/85 border-orange-500/20 shadow-[0_0_80px_rgba(249,115,22,0.08)]" 
              : "bg-[#0e0e0e]/85 border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.08)]"
          }`}
        >
          {/* Ambient Glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[60px] pointer-events-none opacity-[0.06] ${
            isProgrammer ? "bg-orange-500" : "bg-blue-500"
          }`} />

          <div className="relative z-10 flex flex-col items-center">
            {/* Certification Icon/Stamp */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border ${
              isProgrammer ? "bg-orange-500/10 border-orange-500/30 text-orange-400" : "bg-blue-500/10 border-blue-500/30 text-blue-400"
            }`}>
              <Star className="w-8 h-8 fill-current shrink-0" />
            </div>

            <span className={`font-mono font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs block mb-3 ${
              isProgrammer ? "text-orange-500" : "text-[#3B82F6]"
            }`}>
              Garantia de Lançamento & Selo Oficial de Capacitação
            </span>

            <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
              Selo de Excelência & Certificado pela <span className={isProgrammer ? "text-orange-400" : "text-cyan-400"}>2timeweb</span>
            </h3>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Nossa missão não é apenas te entregar aulas: **nós vamos te apoiar para lançar seu site de verdade**. 
              Assim que você colocar o seu primeiro site no ar usando o Método 3h, nossa equipe fará uma **avaliação técnica completa** do seu projeto. 
              Sendo validado e aprovado, você ganhará o **Certificado Oficial de Profissional de Desenvolvimento IA** emitido pela renomada agência **2timeweb**, provando sua capacitação técnica e servindo de autoridade absoluta para fechar com novos clientes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-semibold uppercase text-white/80">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" /> Avaliação Técnica Individual
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" /> Selo 2timeweb de Qualidade
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" /> Certificado Homologado
              </span>
            </div>
          </div>
        </motion.div>

        {/* Centered glass card with registration form */}
        <div id="inscricao" className={`w-full max-w-4xl mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border rounded-[2.5rem] relative overflow-hidden p-8 md:p-14 text-center transition-all duration-700 ${
          isProgrammer 
            ? "border-[#F97316]/20 shadow-[0_0_120px_rgba(249,115,22,0.15)] hover:shadow-[0_0_150px_rgba(249,115,22,0.25)]" 
            : "border-[#3B82F6]/20 shadow-[0_0_120px_rgba(59,130,246,0.15)] hover:shadow-[0_0_150px_rgba(59,130,246,0.25)]"
        } ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          {/* Top Line Gradient */}
          <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r z-10 ${
            isProgrammer ? "from-orange-600 via-[#F97316] to-amber-500" : "from-blue-600 via-[#3B82F6] to-cyan-500"
          }`} />
 
          {/* Inner Glow Spotlight */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[100px] rounded-full pointer-events-none ${
            isProgrammer ? "bg-[#F97316]/15" : "bg-[#3B82F6]/15"
          }`} />
 
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={isProgrammer ? "/images/logo laranja metodo3h.png" : "/images/metodo3h logo.png"} 
              alt="Logo" 
              className="h-10 md:h-12 object-contain" 
            />
          </div>
 
          <span className={`font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs block mb-4 ${
            isProgrammer ? "text-orange-500" : "text-[#3B82F6]"
          }`}>
            RESERVA DE VAGA + DESCONTO EXCLUSIVO ATIVADO
          </span>
 
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Garanta Acesso Gratuito <span className={isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}>+ Reserva de Desconto</span>
          </h2>
          
          <p className="text-gray-400 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
            Ao se inscrever abaixo, você garante **acesso imediato e 100% gratuito** às 3 aulas/módulos práticos do Método 3h (Daniel, Vinícius e Gabriel). 
            Além disso, você **trava o valor promocional de lançamento** do Arsenal Completo: de <span className="line-through text-red-500/80">R$ 997,00</span> por **apenas R$ 197,00** caso decida adquiri-lo futuramente.
            <span className="block mt-3 font-semibold text-white">Sem compromisso ou obrigação de compra! É um benefício para garantir esse preço e ter acesso grátis imediato.</span>
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md mx-auto text-left mb-8 relative z-20">
            <div className="space-y-1.5 relative">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest block">Nome Completo</span>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input 
                  type="text"
                  placeholder="Ex: Daniel Marques"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-[#3B82F6] rounded-xl pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/45"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest block">E-mail</span>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input 
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-[#3B82F6] rounded-xl pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/45"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest block">WhatsApp (Com DDD)</span>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input 
                  type="tel"
                  placeholder="(DD) 99999-9999"
                  value={whatsapp}
                  onChange={handlePhoneChange}
                  className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-[#3B82F6] rounded-xl pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/45"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                {errorMsg}
              </p>
            )}

            {/* Countdown timer right inside the form area to add high-converting urgency */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 mt-6">
              <div className="text-left">
                <span className="text-[10px] text-red-500 uppercase font-mono tracking-wider block font-bold">VAGAS EXCLUSIVAS EXPIRANDO</span>
                <span className="text-[11px] text-muted-foreground">Garanta sua reserva antes que o tempo acabe.</span>
              </div>
              
              <div className="flex items-center gap-2 font-mono text-lg font-black text-white bg-black/40 border border-white/5 px-3 py-1 rounded-xl shrink-0">
                <span>{String(minutes).padStart(2, '0')}</span>
                <span className="animate-pulse">:</span>
                <span>{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>

            <ShinyButton 
              type="submit"
              disabled={isLoading}
              theme={isProgrammer ? "orange" : "blue"}
              variant="solid"
              className="w-full h-14 font-mono text-xs tracking-widest font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  RESERVANDO VAGA E DESCONTO...
                </>
              ) : (
                <>
                  GARANTIR ACESSO GRÁTIS + RESERVAR DESCONTO
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </ShinyButton>
          </form>
 
          {/* Trust Footnote */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-white/5 relative z-10">
            <div className="flex items-center gap-2 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-gray-400" /> Garantia de Preço Reservado
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-zinc-800 border border-[#0a0a0a]" />
                <div className="w-5 h-5 rounded-full bg-zinc-700 border border-[#0a0a0a]" />
                <div className="w-5 h-5 rounded-full bg-zinc-600 border border-[#0a0a0a]" />
              </div>
              Inscrições gratuitas ativas hoje
            </div>
          </div>
        </div>
 
        {/* Bottom note */}
        <div className={`mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="flex items-center gap-2">
            <Check className={`w-4 h-4 ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`} />
            Conexão segura
          </span>
          <span className="flex items-center gap-2">
            <Check className={`w-4 h-4 ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`} />
            Acesso grátis imediato
          </span>
          <span className="flex items-center gap-2">
            <Check className={`w-4 h-4 ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`} />
            Suporte individualizado
          </span>
        </div>
      </div>
    </section>
  );
}
