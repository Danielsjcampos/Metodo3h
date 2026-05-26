"use client";

import { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";

/* ─── Tool visuals — imagens geradas por IA ────────────────── */

const toolImages = [
  "/images/imagem 1 antigravity.png",
  "/images/tools/vercel.png",
  "/images/imagem cloudfare.png",
  "/images/imagem registro br.png",
  "/images/imagem searchconsole.png",
  "/images/imagem google business.png",
];

function ToolVisual({ src }: { src: string }) {
  return (
    <div className="relative h-52 overflow-hidden bg-black/40">
      <img 
        src={src} 
        alt="" 
        aria-hidden="true" 
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
      />
      {/* Subtle dynamic grid patterns over tool images */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      {/* Premium vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/20 to-transparent" />
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */

const tools = [
  { name: "Antigravity", category: "Criação", description: "Criação ultra-veloz de sites profissionais com auxílio de Inteligência Artificial.", free: true },
  { name: "Vercel", category: "Hospedagem", description: "Hospedagem de alto desempenho com deploy automático a cada alteração.", free: true },
  { name: "Cloudflare", category: "DNS & Segurança", description: "Otimização de velocidade global, proteção contra ataques e CDN integrada.", free: true },
  { name: "Registro.br", category: "Domínio", description: "Registro e gestão do seu endereço comercial .com.br oficial brasileiro.", price: "R$40/ano" },
  { name: "Search Console", category: "Indexação", description: "Ferramenta oficial do Google para indexar e monitorar sua posição de busca.", free: true },
  { name: "Google Business", category: "Local SEO", description: "Posicionamento estratégico no Google Maps para atração de clientes locais.", free: true },
];

export function IntegrationsSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const defaultTools = [
    { name: "Antigravity", category: "Criação", description: "Criação ultra-veloz de sites profissionais com auxílio de Inteligência Artificial.", free: true },
    { name: "Vercel", category: "Hospedagem", description: "Hospedagem de alto desempenho com deploy automático a cada alteração.", free: true },
    { name: "Cloudflare", category: "DNS & Segurança", description: "Otimização de velocidade global, proteção contra ataques e CDN integrada.", free: true },
    { name: "Registro.br", category: "Domínio", description: "Registro e gestão do seu endereço comercial .com.br oficial brasileiro.", price: "R$40/ano" },
    { name: "Search Console", category: "Indexação", description: "Ferramenta oficial do Google para indexar e monitorar sua posição de busca.", free: true },
    { name: "Google Business", category: "Local SEO", description: "Posicionamento estratégico no Google Maps para atração de clientes locais.", free: true },
  ];

  const programmerTools = [
    { name: "Antigravity // AI-Compiler", category: "Criação", description: "Criação ultra-veloz com compiladores e prompts de Inteligência Artificial.", free: true },
    { name: "Vercel // Serverless Edge", category: "Hospedagem", description: "Hospedagem global de alta performance com deploy automático via Git branch.", free: true },
    { name: "Cloudflare // DNS & Cache", category: "DNS & Segurança", description: "DNS com latência sub-milissegundo, proteção contra DDoS e CDN integrada.", free: true },
    { name: "Registro.br // Domínios", category: "Domínio", description: "Domínio oficial brasileiro com DNS dinâmico e custo fixo de R$40/ano.", price: "R$40/ano" },
    { name: "Google Console // Crawl API", category: "Indexação", description: "Monitoramento automático de crawl-rate e indexação rápida via API do Google.", free: true },
    { name: "Maps API // Local SEO", category: "Local SEO", description: "Integração orgânica no Maps para atração e conversão passiva imediata.", free: true },
  ];

  const tools = defaultTools;
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ferramentas" ref={sectionRef} className="relative py-14 md:py-18 lg:py-22 overflow-hidden bg-background">
      
      {/* Ambient background glows */}
      <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none ${
        isProgrammer ? "bg-orange-500/5" : "bg-blue-600/5"
      }`} />
      <div className={`absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none ${
        isProgrammer ? "bg-amber-500/5" : "bg-[#3B82F6]/5"
      }`} />

      {/* Header */}
      <div className="relative z-10 text-center mb-10 md:mb-12 px-6">
        <span className={`inline-flex items-center gap-3 text-xs font-mono tracking-widest ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"} uppercase mb-6 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}>
          <span className="w-8 h-[2px] bg-[#3B82F6]/60 rounded-full" />
          Stack do curso
          <span className="w-8 h-[2px] bg-[#3B82F6]/60 rounded-full" />
        </span>

        <h2 className={cn(
          "text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1]",
          isProgrammer ? "font-mono text-white" : "font-display text-white"
        )}>
          Ferramentas profissionais. <span className={isProgrammer ? "text-orange-500" : "text-muted-foreground italic font-light"}>Com custo zero.</span>
        </h2>

        <p className={cn(
          "mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto",
          isProgrammer ? "font-mono" : ""
        )}>
          Cada ferramenta foi escolhida minuciosamente com base no que eu utilizo diariamente para atender clientes pagantes reais. Soluções de elite para você performar no mercado.
        </p>
      </div>

      {/* Full-width visual connection graph with smooth parallax and gradient blends */}
      <div 
        ref={parallaxContainerRef}
        className={`relative left-1/2 -translate-x-1/2 w-screen max-w-[1600px] h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] -mt-6 mb-6 overflow-hidden transition-opacity duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Vignette fade layers to blend perfectly at all edges into bg-background */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div 
          style={{ y: parallaxY, scale: 1.18 }}
          className="absolute inset-0 w-full h-[136%] -top-[18%]"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
            alt="Conexão de inteligência artificial"
            aria-hidden="true"
            className="w-full h-full object-cover opacity-80"
            style={{ filter: isProgrammer ? "hue-rotate(30deg) saturate(1.4) brightness(0.95)" : "hue-rotate(180deg) saturate(1.4) brightness(0.95)" }}
          />
        </motion.div>
      </div>

      {/* Tools grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={tool.name}
                className={`group relative overflow-hidden rounded-[2rem] glass-card transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isHovered
                    ? isProgrammer 
                      ? "border-white/15 scale-[1.02] shadow-[0_20px_50px_rgba(249,115,22,0.12)]"
                      : "border-white/15 scale-[1.02] shadow-[0_20px_50px_rgba(59,130,246,0.12)]"
                    : "border-white/5 hover:border-white/10"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Visual Area */}
                <div className="relative border-b border-white/5 overflow-hidden rounded-t-[2rem]">
                  <ToolVisual src={toolImages[index]} />
                  
                  {/* Floating badge for category */}
                  <div className={`absolute top-6 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg transition-colors ${
                    isProgrammer ? "group-hover:border-orange-500/30" : "group-hover:border-blue-500/30"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isProgrammer ? "bg-orange-500" : "bg-blue-500"}`} />
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-white/90 uppercase">{tool.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 relative z-10 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
                      isProgrammer 
                        ? "font-mono text-white group-hover:text-orange-400" 
                        : "font-display text-white group-hover:text-blue-400"
                    }`}>
                      {tool.name}
                    </h3>
                    <p className={`text-sm text-muted-foreground leading-relaxed mb-6 ${isProgrammer ? "font-mono" : ""}`}>
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      {tool.free ? (
                        <>
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                            isProgrammer 
                              ? "bg-orange-500/10 border-orange-500/20 text-orange-400" 
                              : "bg-blue-500/10 border-blue-500/20 text-[#3B82F6]"
                          }`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <span className={`text-xs font-mono tracking-wider font-semibold uppercase ${isProgrammer ? "text-orange-400" : "text-[#3B82F6]"}`}>Licença Gratuita</span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">Custo: <strong className="text-white font-medium">{tool.price}</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ambient glow highlight line at bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isProgrammer ? "via-orange-500/40" : "via-blue-500/40"
                }`} />
              </div>
            );
          })}
        </div>

        {/* Highly polished Summary Capsule Box */}
        <div className={`p-6 md:p-8 rounded-[2rem] glass-card border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-1000 delay-500 shadow-xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
            {["Sem mensalidades ocultas", "Sem necessidade de código", "Setup completo em 20 min"].map((t) => (
              <span key={t} className="flex items-center gap-2 font-medium">
                <div className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                  isProgrammer ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : "bg-blue-500/10 border-blue-500/20 text-[#3B82F6]"
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                {t}
              </span>
            ))}
          </div>
          
          <div className="shrink-0 text-center lg:text-right">
            <p className="text-sm text-muted-foreground">
              Investimento total em ferramentas: <span className={`font-bold font-mono text-base ml-1 ${isProgrammer ? "text-orange-400" : "text-[#3B82F6]"}`}>~R$40/ano</span> <span className="text-xs opacity-70">(apenas domínio .com.br)</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

