"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const dinoFeatures = [
  { title: "1.000+ sites entregues", description: "Em 30 anos de mercado real, não apenas teoria." },
  { title: "10+ lojas físicas gerenciadas", description: "Experiência com negócios de verdade, não só digital." },
  { title: "SaaS e sistemas próprios", description: "Plataformas de cursos e automações com IA." },
  { title: "Gestor de Meta Ads", description: "Tráfego pago e marketing digital na prática." },
];

export function DevelopersSection({ 
  isProgrammer = false, 
  showPartners = false 
}: { 
  isProgrammer?: boolean; 
  showPartners?: boolean;
}) {
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

  if (showPartners) {
    return (
      <section id="instrutor" ref={sectionRef} className="relative overflow-hidden py-20 md:py-24 lg:py-32 bg-background border-t border-white/5">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="relative mb-14 lg:mb-20 text-center flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-3 text-xs font-mono tracking-widest text-blue-400 uppercase mb-6 justify-center">
              <span className="w-8 h-[2px] bg-blue-500/30 rounded-full" />
              Equipe do Método 3h
              <span className="w-8 h-[2px] bg-blue-500/30 rounded-full" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white tracking-tight leading-[1.05] mb-6">
              Quem vai te guiar <span className="text-muted-foreground italic font-light">passo a passo.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Reunimos especialistas com décadas de experiência real em desenvolvimento de sistemas, engenharia de prompts de Inteligência Artificial e estratégias comerciais de atração para que você saia com resultados imediatos.
            </p>
          </div>

          {/* Partners Grid Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Daniel Marques (Dino)",
                role: "Fundador & Instrutor Principal",
                image: "/images/dino/dino3.jpg",
                highlights: ["30+ anos de mercado", "1.000+ sites entregues"],
                bio: "Veterano do mercado digital com três décadas de experiência construindo SaaS, sistemas empresariais complexos e automações avançadas. Ensina a essência da lógica e a infraestrutura cirúrgica.",
                color: "border-blue-500/20 text-blue-400",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                name: "Vinicius Saldanha",
                role: "Co-fundador & Diretor de Tecnologia",
                image: "/images/Saldanha.jpeg",
                highlights: ["Especialista em IA e UX", "Desenvolvimento Premium"],
                bio: "Especialista em engenharia de prompt, layouts de alto padrão visual com efeito de vidro (Glassmorphism) e performance otimizada de SEO. Garante que seu aprendizado use as melhores IAs do mundo.",
                color: "border-emerald-500/20 text-emerald-400",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                  </svg>
                )
              },
              {
                name: "Gabriel",
                role: "Co-fundador & Diretor de Growth",
                image: "/images/gabriel.jpeg",
                highlights: ["Funis de Alta Conversão", "Estratégia de Vendas"],
                bio: "Estrategista de marketing de atração e funis automatizados de conversão de tráfego. Ensina você a comercializar seus sites para obter recorrência e fechar contratos comerciais lucrativos.",
                color: "border-purple-500/20 text-purple-400",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  "relative rounded-3xl glass-card glass-card-hover p-6 md:p-8 flex flex-col justify-between transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div>
                  {/* Photo container with zoom on hover */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-white/5 shadow-inner">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn("w-10 h-10 rounded-xl bg-white/5 border flex items-center justify-center", p.color.split(" ")[0])}>
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white leading-tight">{p.name}</h3>
                      <p className="text-[9px] text-white/50 font-medium uppercase tracking-wider mt-1">{p.role}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {p.bio}
                  </p>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider font-semibold uppercase border bg-white/5",
                        p.color
                      )}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instrutor" ref={sectionRef} className="relative overflow-hidden py-24 md:py-28 lg:py-36 bg-background">
      {/* Ambient background glow */}
      <div className={`absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none ${
        isProgrammer ? "bg-orange-500/5" : "bg-blue-600/5"
      }`} />

      {/* ── PARTE 1: Daniel Marques ─────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 mb-10 lg:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          
          {/* Left Column: Bio & Info */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className={`mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {isProgrammer ? (
                <>
                  <span className="inline-flex items-center gap-3 text-xs font-mono text-orange-500 mb-6 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-widest">
                    Quem vai te ensinar
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono tracking-tight leading-[1.1] mb-6 text-white">
                    30 anos de <span className="text-orange-500 italic font-light">mercado real.</span> Não YouTube.
                  </h2>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                    <span className="w-8 h-px bg-foreground/30" />
                    Quem vai te ensinar
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.1] mb-6">
                    30 anos de <span className="text-muted-foreground italic font-light">mercado real.</span> Não YouTube.
                  </h2>
                </>
              )}
            </div>

            <div className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                Me chamo <span className="text-foreground font-medium">Daniel Marques</span>. Comecei no mercado digital antes da internet banda larga existir no Brasil. Em 30 anos entreguei mais de 1.000 sites e sistemas de gestão, gerenciei mais de 10 lojas físicas, construí SaaS, micro-SaaS, plataformas de cursos e automações com IA para clientes reais.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                Não sou um youtuber que aprendeu a fazer site mês passado. Sou um profissional que vive disso há três décadas — e que agora tem acesso às mesmas ferramentas de IA que nivelaram o campo para quem está começando agora.
              </p>

              <blockquote className={`border-l-2 pl-6 mb-6 ${isProgrammer ? "border-orange-500" : "border-[#3B82F6]"}`}>
                <p className="text-lg text-foreground italic leading-relaxed">
                  &ldquo;Eu faço ao vivo, sem ensaio, sem script de teleprompter. Você vê exatamente o que eu faço quando entrego para um cliente pagando.&rdquo;
                </p>
              </blockquote>

              <div className="grid grid-cols-2 gap-6">
                {dinoFeatures.map((f, i) => (
                  <div
                    key={f.title}
                    className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${i * 50 + 200}ms` }}
                  >
                    <h3 className="font-medium text-white mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Dino Image & Logo Carousel */}
          <div 
            className={`flex flex-col items-center justify-end order-1 lg:order-2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Dino Image Container - Extremely Large and Faded at the bottom */}
            <div className="relative w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full max-w-full sm:max-w-[650px] lg:max-w-none h-[450px] sm:h-[580px] md:h-[680px] lg:h-[850px] flex items-end justify-center overflow-hidden mb-8 md:mb-10">
              <img
                src="/images/dino/dinosemf_cropped.png"
                alt="Daniel Marques (Dino)"
                className="w-[125%] sm:w-[105%] md:w-[115%] lg:w-[130%] max-w-none h-auto object-contain object-bottom transition-all duration-700 ease-out origin-bottom hover:scale-[1.08]"
                style={{ 
                  opacity: 0.95,
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
                }}
              />
              {/* Premium smooth bottom fade overlay to prevent hard crop cuts */}
              <div className="absolute bottom-0 left-0 right-0 h-28 md:h-36 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
              <div className={`absolute inset-0 -z-10 bg-radial-gradient(circle_at_center,${isProgrammer ? "rgba(249,115,22,0.08)" : "rgba(59,130,246,0.08)"}_0%,transparent_70%) pointer-events-none`} />
            </div>

            {/* Infinite Scrolling Logo Carousel underneath Dino (Pure CSS 3D Perspective Marquee) */}
            <div 
              className="w-full h-28 sm:h-36 md:h-44 mt-2 overflow-hidden relative pointer-events-auto flex items-center justify-center"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Scrolling Container with 3D rotation */}
              <div 
                className="flex items-center select-none pointer-events-none"
                style={{
                  transform: "rotateX(8deg) rotateY(-28deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div 
                  className="flex gap-20 md:gap-28 items-center marquee w-max"
                  style={{ animation: "marquee 16s linear infinite" }}
                >
                  {[
                    { src: "/images/antigravity logo.webp", alt: "Antigravity", className: "h-12 sm:h-14 md:h-18 w-auto object-contain" },
                    { src: "/images/Vercel_logo_2025.svg", alt: "Vercel", className: "h-8 sm:h-9 md:h-12 w-auto object-contain invert" },
                    { src: "/images/claudecode-color.png", alt: "Claude Code", className: "h-10 sm:h-12 md:h-16 w-auto object-contain" },
                    { src: "/images/google-search-console-icon.webp", alt: "Google Search Console", className: "h-10 sm:h-12 md:h-16 w-auto object-contain" },
                    // Duplicate for seamless infinite scrolling loop
                    { src: "/images/antigravity logo.webp", alt: "Antigravity", className: "h-12 sm:h-14 md:h-18 w-auto object-contain" },
                    { src: "/images/Vercel_logo_2025.svg", alt: "Vercel", className: "h-8 sm:h-9 md:h-12 w-auto object-contain invert" },
                    { src: "/images/claudecode-color.png", alt: "Claude Code", className: "h-10 sm:h-12 md:h-16 w-auto object-contain" },
                    { src: "/images/google-search-console-icon.webp", alt: "Google Search Console", className: "h-10 sm:h-12 md:h-16 w-auto object-contain" },
                  ].map((logo, idx) => (
                    <img key={idx} src={logo.src} alt={logo.alt} className={logo.className} />
                  ))}
                </div>
              </div>
              
              {/* Gradient masks for soft edges fading seamlessly into the background */}
              <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
