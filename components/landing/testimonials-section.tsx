"use client";

import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Eduardo",
    role: "Empresário local · Salão de beleza",
    result: "Site no ar em 2h47",
    quote:
      "Eu tinha pavor de tecnologia. Em 3 horas eu tinha o site do meu salão funcionando, com domínio próprio, aparecendo no Google. Minha concorrente tem agência e o site dela é pior que o meu.",
    stars: 5,
    highlight: "2h47 do zero ao ar",
  },
  {
    name: "Mariana Costa",
    role: "Freelancer · Ex-CLT",
    result: "R$2.800 no primeiro projeto",
    quote:
      "Fechei o primeiro cliente na semana que terminei o curso. Cobrei R$2.800 por um site que levei menos de 4 horas para entregar. O cliente ficou tão satisfeito que me indicou mais 3 pessoas.",
    stars: 5,
    highlight: "R$2.800 em 4h de trabalho",
  },
  {
    name: "Felipe Andrade",
    role: "Nutricionista autônomo",
    result: "Independente de agência",
    quote:
      "Pagava R$380 por mês para uma agência que demorava semanas para mudar qualquer coisa. Hoje eu mesmo faço, em minutos. O curso se pagou no segundo mês de economia.",
    stars: 5,
    highlight: "Economizou R$380/mês",
  },
  {
    name: "Ana Julia Souza",
    role: "Profissional em transição",
    result: "Nova carreira em 30 dias",
    quote:
      "Eu era analista de RH e queria mudar de vida. Em 30 dias após o curso já tinha 2 clientes e uma renda extra maior que meu salário. Hoje é minha renda principal.",
    stars: 5,
    highlight: "Renda extra > salário CLT",
  },
];

const tickerItems = [
  "Carlos E. · Site no ar em 2h47 ✓",
  "Mariana C. · R$2.800 no primeiro projeto ✓",
  "Felipe A. · Economizou R$380/mês ✓",
  "Ana J. · Nova carreira em 30 dias ✓",
  "Roberto S. · 3 clientes em 2 semanas ✓",
  "Juliana M. · R$1.800 primeiro freelance ✓",
  "Diego P. · Site de clínica em 3h ✓",
  "Letícia R. · Livre da agência ✓",
  "Marcos T. · R$4.500 em um mês ✓",
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#60A5FA] rounded-full blur-[200px] opacity-[0.04] pointer-events-none animate-pulse-glow" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <span className="w-12 h-px bg-foreground/20" />
            Prova real
          </span>
          <h2 className={`text-5xl md:text-6xl lg:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Quem aplicou,
            <br />
            <span className="text-muted-foreground">já está</span>
            <br />
            faturando.
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`relative p-8 lg:p-10 border border-foreground/10 bg-foreground/[0.02] shine-effect glow-border transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Quote mark */}
              <span className="absolute top-6 right-8 text-[80px] font-display text-foreground/5 leading-none select-none pointer-events-none">
                "
              </span>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.stars)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-[#3B82F6] text-[#3B82F6]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base lg:text-lg text-foreground leading-relaxed mb-8">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{t.role}</p>
                </div>

                {/* Result badge */}
                <div
                  className="px-3 py-1.5 border text-xs font-mono"
                  style={{
                    color: "#3B82F6",
                    borderColor: "rgba(236,168,214,0.3)",
                    background: "rgba(236,168,214,0.06)",
                  }}
                >
                  {t.highlight}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Social proof ticker */}
        <div className={`border-y border-foreground/10 py-5 overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-0 w-max ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 px-8 text-sm font-mono text-muted-foreground whitespace-nowrap"
              >
                <span className="text-[#3B82F6] text-xs">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Summary metrics */}
        <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {[
            { value: "100%", label: "aprovam o método", sub: "de quem implementou" },
            { value: "3h", label: "tempo médio", sub: "para o primeiro site no ar" },
            { value: "R$2.800", label: "ticket mínimo", sub: "para vender como serviço" },
            { value: "7 dias", label: "garantia total", sub: "devolução sem perguntas" },
          ].map((m, i) => (
            <div
              key={m.label}
              className="p-6 border border-foreground/10 text-center hover:border-[#3B82F6]/30 transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="block text-3xl lg:text-4xl font-display text-white mb-1">{m.value}</span>
              <span className="block text-sm font-medium text-foreground">{m.label}</span>
              <span className="block text-xs text-muted-foreground mt-1">{m.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
