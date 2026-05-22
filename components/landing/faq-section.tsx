"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection({ settings }: { settings?: any }) {
  const launchPrice = settings?.launchPrice || "97";
  const regularPrice = settings?.regularPrice || "247";

  const faqs = [
    {
      question: "Preciso saber programar?",
      answer: "Não. Zero. O curso foi desenhado exatamente para quem não sabe código. A IA faz a parte técnica — você aprende a direcionar ela corretamente.",
    },
    {
      question: "Em quanto tempo consigo criar meu primeiro site?",
      answer: "No módulo 1 você já cria. A maioria dos alunos publica o primeiro site no mesmo dia que começa o curso. O objetivo é exatamente esse.",
    },
    {
      question: "As ferramentas realmente são grátis?",
      answer: "Sim. Antigravity (gratuito), Vercel (gratuito), Cloudflare (gratuito). O único custo real é o domínio — cerca de R$40 por ano no Registro.br.",
    },
    {
      question: "Posso realmente cobrar para criar sites depois?",
      answer: "Sim — e o curso tem um módulo inteiro sobre isso. Você aprende a precificar (de R$1.500 a R$4.500 por projeto), abordar o primeiro cliente e criar o contrato.",
    },
    {
      question: "E se eu não gostar do curso?",
      answer: "Você tem 7 dias de garantia — devolvo 100% do valor sem pergunta. Isso é o CDC, é lei, e eu respeito porque confio no que estou entregando.",
    },
    {
      question: `Por que R$${launchPrice} e não mais barato?`,
      answer: `Porque curso barato não é levado a sério. E porque o que você aprende aqui pode gerar R$1.500 no primeiro projeto — o investimento se paga no primeiro cliente. Após o lançamento sobe para R$${regularPrice}.`,
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section ref={sectionRef} id="faq" className="relative py-16 lg:py-20 bg-background text-foreground overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] ambient-glow-blue opacity-50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ambient-glow-purple opacity-30 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <span className="w-8 h-px bg-foreground/20" />
            Respondendo suas dúvidas
            <span className="w-8 h-px bg-foreground/20" />
          </span>
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Suas perguntas.
            <br />
            <span className="text-muted-foreground">Respostas diretas.</span>
          </h2>
        </div>

        {/* Accordion list */}
        <div className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl glass-card overflow-hidden transition-all duration-500 ${
                  isOpen ? "border-[#3B82F6]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]" : "hover:bg-white/[0.04]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-6 lg:px-8 lg:py-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                >
                  <span className="text-lg lg:text-xl font-display font-medium text-foreground group-hover:text-white transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-500 ${
                    isOpen ? "rotate-180 bg-white/10 border-white/20 text-[#3B82F6]" : "text-muted-foreground"
                  }`}>
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 lg:px-8 lg:pb-8 text-base text-muted-foreground leading-relaxed pt-3 border-t border-white/5">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
