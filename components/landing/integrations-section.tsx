"use client";

import { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";

/* ─── Tool visuals — imagens geradas por IA ────────────────── */

const toolImages = [
  "/images/tools/antigravity.png",
  "/images/tools/vercel.png",
  "/images/tools/cloudflare.png",
  "/images/tools/registro.png",
  "/images/tools/search-console.png",
  "/images/tools/google-business.png",
];

function ToolVisual({ src }: { src: string }) {
  return (
    <div className="relative h-44 overflow-hidden">
      <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */

const tools = [
  { name: "Antigravity", category: "Criação", description: "Site completo com IA", free: true },
  { name: "Vercel", category: "Hospedagem", description: "Deploy automático", free: true },
  { name: "Cloudflare", category: "DNS + CDN", description: "Performance e segurança", free: true },
  { name: "Registro.br", category: "Domínio", description: ".com.br oficial", price: "R$40/ano" },
  { name: "Search Console", category: "Indexação", description: "Aparecer no Google", free: true },
  { name: "Google Business", category: "Local SEO", description: "Aparecer no Maps", free: true },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section id="ferramentas" ref={sectionRef} className="relative overflow-hidden">

      {/* Header */}
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <span className="w-12 h-px bg-foreground/20" />
          Stack do curso
          <span className="w-12 h-px bg-foreground/20" />
        </span>

        <h2 className={`text-5xl md:text-6xl lg:text-[100px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Ferramentas
          <br />
          <span className="text-muted-foreground">profissionais.</span>
          <br />
          Custo zero.
        </h2>

        <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-100 px-6 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Cada ferramenta foi escolhida por um critério: é o que eu uso de verdade com meus clientes pagantes. Não é o que é fácil de mostrar — é o que funciona.
        </p>
      </div>

      {/* Full-width image */}
      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
          style={{ filter: "hue-rotate(180deg) saturate(1.4) brightness(0.9)" }}
        />
      </div>

      {/* Tools grid */}
      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className={`group relative overflow-hidden border transition-all duration-500 cursor-default ${
                hoveredIndex === index
                  ? "border-[#3B82F6]/50 scale-[1.02]"
                  : "border-foreground/10 hover:border-[#3B82F6]/30"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 60 + 300}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Visual area */}
              <ToolVisual src={toolImages[index]} />

                {/* Content */}
                <div className="p-5 lg:p-6 relative">
                  {/* Category tag */}
                  <span className={`absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 transition-colors ${
                    hoveredIndex === index ? "bg-[#3B82F6] text-white" : "bg-foreground/10 text-muted-foreground"
                  }`}>
                    {tool.category}
                  </span>

                  <h3 className="text-lg lg:text-xl font-display mb-1 pr-16">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>

                  <div className="flex items-center gap-2">
                    {tool.free ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span className="text-sm text-[#3B82F6] font-medium">Gratuito</span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">{tool.price}</span>
                    )}
                  </div>

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/10 overflow-hidden">
                    <div className={`h-full bg-[#3B82F6] transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}`} />
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {["Sem mensalidade", "Sem código", "Setup em 20 minutos"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#3B82F6]" />
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Custo total: <span className="text-foreground font-medium">~R$40/ano</span> (apenas o domínio)
          </p>
        </div>
      </div>
    </section>
  );
}
