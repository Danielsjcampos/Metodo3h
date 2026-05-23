"use client";

import { useState, useEffect, useRef } from "react";

const dinoFeatures = [
  { title: "1.000+ sites entregues", description: "Em 30 anos de mercado real, não apenas teoria." },
  { title: "10+ lojas físicas gerenciadas", description: "Experiência com negócios de verdade, não só digital." },
  { title: "SaaS e sistemas próprios", description: "Plataformas de cursos e automações com IA." },
  { title: "Gestor de Meta Ads", description: "Tráfego pago e marketing digital na prática." },
];

export function DevelopersSection({ isProgrammer = false }: { isProgrammer?: boolean }) {
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
