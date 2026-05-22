"use client";

import { useEffect, useState, useRef } from "react";

const modules = [
  {
    number: "M0",
    tag: "BASE",
    title: "Por que agora é o melhor momento",
    description: "Mentalidade certa, mapa do curso, setup das contas (Antigravity, Vercel, Cloudflare). Você já sai da primeira aula com tudo configurado.",
    lessons: "2 aulas",
    duration: "~20 min",
    accent: "#3B82F6",
  },
  {
    number: "M1",
    tag: "CRIAÇÃO",
    title: "Antigravity — Criando o site com IA",
    description: "A fórmula NCPA (Negócio, Cliente, Página, Ação) que transforma qualquer prompt em um site profissional. Demo ao vivo sem cortes.",
    lessons: "4 aulas",
    duration: "~55 min",
    accent: "#60A5FA",
  },
  {
    number: "M2",
    tag: "DESIGN",
    title: "Design profissional com skills de IA",
    description: "Como usar skills de IA para elevar o design sem saber design. Onde achar as imagens certas. Como aplicar paleta e tipografia.",
    lessons: "3 aulas",
    duration: "~45 min",
    accent: "#38BDF8",
  },
  {
    number: "M3",
    tag: "VISUAL",
    title: "Efeitos 3D, scroll e animações",
    description: 'Parallax, fade-in, cards 3D com hover, animações de entrada. O módulo que faz o cliente dizer "como você fez isso?"',
    lessons: "4 aulas",
    duration: "~60 min",
    accent: "#93C5FD",
  },
  {
    number: "M4",
    tag: "DEPLOY",
    title: "Domínio + Cloudflare + Vercel",
    description: "Comprar domínio do jeito certo. Configurar DNS no Cloudflare. Hospedar na Vercel sem pagar nada. Vincular tudo em 20 minutos.",
    lessons: "4 aulas",
    duration: "~50 min",
    accent: "#3B82F6",
  },
  {
    number: "M5",
    tag: "CONVERSÃO",
    title: "Estrutura de site que converte",
    description: "Home, Sobre, Serviços, Contato e OnePage. A estrutura de 5 blocos que converte visitante em cliente.",
    lessons: "4 aulas",
    duration: "~55 min",
    accent: "#60A5FA",
  },
  {
    number: "M6",
    tag: "SEO",
    title: "SEO, GEO, Sitemap e Robots.txt",
    description: "Title tag, meta description, H1, sitemap.xml, robots.txt, Google Search Console e Google Business Profile. Checklist completo.",
    lessons: "5 aulas",
    duration: "~65 min",
    accent: "#38BDF8",
  },
];

export function InfrastructureSection() {
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
    <section id="modulos" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 lg:mb-20">
        {/* Header */}
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <span className="w-12 h-px bg-foreground/20" />
          O que você vai aprender
        </span>
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            7 módulos.
            <br />
            <span className="text-muted-foreground">Tudo prático.</span>
            <br />
            Zero teoria.
          </h2>
          <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            Cada aula foi desenhada para que você saia fazendo, não apenas assistindo.
            Nenhuma aula passa de 25 minutos. Gravadas com tela real — o que eu faço no meu Mac, você faz junto comigo.
          </p>
        </div>
      </div>

      {/* Infinite carousel */}
      <div
        className={`overflow-hidden transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex gap-5 w-max carousel-scroll py-4 px-4">
          {[...modules, ...modules].map((mod, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] lg:w-[360px] rounded-3xl glass-card glass-card-hover overflow-hidden group cursor-default"
            >
              {/* Top accent bar */}
              <div className="h-[2px]" style={{ background: `linear-gradient(to right, ${mod.accent}, transparent)` }} />

              <div className="p-7 lg:p-8">
                {/* Number + tag row */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[64px] font-display font-bold leading-none select-none"
                    style={{ color: `${mod.accent}18` }}
                  >
                    {mod.number}
                  </span>
                  <span
                    className="text-[9px] font-mono tracking-widest px-2.5 py-1 border rounded-full uppercase mt-1"
                    style={{ color: mod.accent, borderColor: `${mod.accent}40`, background: `${mod.accent}0d` }}
                  >
                    {mod.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-display leading-[1.25] mb-3 text-foreground group-hover:text-white transition-colors duration-300">
                  {mod.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {mod.description}
                </p>

                {/* Meta footer */}
                <div className="flex items-center gap-3 pt-5 border-t border-foreground/10">
                  <span className="text-[10px] font-mono text-muted-foreground/60">{mod.lessons}</span>
                  <span className="text-foreground/20">·</span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">{mod.duration}</span>
                  <div className="ml-auto">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: mod.accent, opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className={`mt-16 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {[
          { value: "26", label: "aulas" },
          { value: "~6h", label: "de conteúdo" },
          { value: "1 ano", label: "de acesso" },
          { value: "R$0", label: "hospedagem" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex items-baseline gap-3">
            {i > 0 && <div className="hidden sm:block w-px h-8 bg-foreground/10" />}
            <span className="text-4xl font-display text-white">{stat.value}</span>
            <span className="text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
