"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowRight, Sparkles, CheckCircle2, Gift, FileText, Users, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FinalCtaSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const listItems = [
    {
      icon: <PlayCircle className="w-5 h-5 text-blue-400" />,
      title: "Aula Prática Completa Gravada",
      desc: "Passo a passo cirúrgico mostrando como colocar um site profissional no ar em menos de 3 horas.",
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      title: "PDF Guia de Apoio & Checklist Dino",
      desc: "O roteiro exato com todos os comandos e prompts para você consultar e executar de forma simples.",
    },
    {
      icon: <Gift className="w-5 h-5 text-blue-400" />,
      title: "Acesso ao Pack de Bônus de Lançamento",
      desc: "Modelos prontos de landing pages premium validadas de alta conversão para você usar de imediato.",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      title: "Acesso ao Grupo VIP do WhatsApp",
      desc: "Participe de uma comunidade de empreendedores que estão faturando alto com automação de sites.",
    },
  ];

  const programmerListItems = [
    {
      icon: <PlayCircle className="w-5 h-5 text-orange-400" />,
      title: "Método Completo Prompt-to-Prod",
      desc: "Como usar Inteligência Artificial para gerar layouts premium em Next.js/Tailwind/TSX em minutos.",
    },
    {
      icon: <FileText className="w-5 h-5 text-orange-400" />,
      title: "Stack Completa com Custo Zero",
      desc: "Configuração profissional de deploy serverless na Vercel e DNS na Cloudflare sem gastar nada.",
    },
    {
      icon: <Gift className="w-5 h-5 text-orange-400" />,
      title: "Templates Autorais Otimizados",
      desc: "Acesso a templates státicos ultrarrápidos com pontuação máxima no Lighthouse (100/100).",
    },
    {
      icon: <Users className="w-5 h-5 text-orange-400" />,
      title: "Grupo VIP de Network de Desenvolvedores",
      desc: "Faça networking de alto nível com profissionais de ponta que escalam fluxos de engenharia com IA.",
    },
  ];

  const activeItems = isProgrammer ? programmerListItems : listItems;

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-background overflow-hidden">
      {/* Background glow styling */}
      <div className={cn(
        "absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-50",
        isProgrammer ? "bg-orange-500/15" : "bg-blue-600/15"
      )} />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <div 
          onMouseMove={handleMouseMove}
          className={cn(
            "relative rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden border border-white/5 bg-black/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"
          )}
        >
          {/* Spotlight overlay effect */}
          <div 
            className="absolute inset-0 opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.03), transparent 50%)`
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column / Details List */}
            <div className="flex-1 space-y-8">
              <div>
                <span className={cn(
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4",
                  isProgrammer ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                )}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Garantia de Conteúdo Premium
                </span>

                <h3 className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white",
                  isProgrammer ? "font-mono" : "font-display"
                )}>
                  Tudo que você recebe
                  <br />
                  <span className="text-white/50">ao se inscrever agora:</span>
                </h3>
              </div>

              {/* Grid of Perks */}
              <div className="grid sm:grid-cols-2 gap-6">
                {activeItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column / Large Action Card */}
            <div className="shrink-0 w-full lg:w-[400px] flex flex-col items-stretch">
              <div className="relative rounded-[2rem] p-8 border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl space-y-6 text-center">
                {/* Secondary inner glow */}
                <div className={cn(
                  "absolute -top-12 -right-12 w-[160px] h-[160px] opacity-20 blur-[50px] pointer-events-none rounded-full",
                  isProgrammer ? "bg-orange-500" : "bg-blue-500"
                )} />

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#3B82F6] font-bold">
                    Aula 100% Gratuita e Online
                  </span>
                  <h4 className="text-2xl font-display font-medium text-white tracking-tight">
                    Garanta Sua Vaga
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Inscreva-se com seu nome, e-mail e WhatsApp para ter acesso imediato a todo o material de apoio.
                  </p>
                </div>

                {/* Counter */}
                <div className="bg-white/[0.02] border border-white/5 py-4 px-6 rounded-2xl flex items-center justify-between text-xs font-mono">
                  <div className="text-left">
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">Status das Vagas</span>
                    <span className="text-white font-semibold">94% Preenchidas</span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div className="text-right">
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">Restam Apenas</span>
                    <span className={cn("font-bold text-sm", isProgrammer ? "text-orange-400" : "text-blue-400")}>06 Vagas</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <ShinyButton
                    asChild
                    theme={isProgrammer ? "orange" : "blue"}
                    variant="solid"
                    className="w-full h-14 font-bold"
                  >
                    <a href="#inscricao">
                      Quero me inscrever agora
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </ShinyButton>

                  <p className="text-[9px] text-muted-foreground/60 leading-normal">
                    🔒 Seus dados estão 100% protegidos e seguros. Nossos disparos de WhatsApp são imediatos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
