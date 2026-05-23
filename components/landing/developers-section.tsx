"use client";

import { useState, useEffect, useRef } from "react";
import { Player } from "@remotion/player";
import { PerspectiveMarquee, PerspectiveMarqueeItem } from "../ui/remotion-perspective-marquee";

function PerspectiveMarqueeScene({ isProgrammer }: { isProgrammer: boolean }) {
  const items: PerspectiveMarqueeItem[] = [
    { type: "image", src: "/images/antigravity logo.webp", alt: "Antigravity", heightClass: "h-10 md:h-12" },
    { type: "image", src: "/images/Vercel_logo_2025.svg", alt: "Vercel", heightClass: "h-7 md:h-8 invert" },
    { type: "image", src: "/images/claudecode-color.png", alt: "Cloud Code", heightClass: "h-9 md:h-10" },
    { type: "image", src: "/images/google-search-console-icon.webp", alt: "Google Search Console", heightClass: "h-9 md:h-10" },
  ];
  
  return (
    <PerspectiveMarquee
      items={items}
      rotateY={-28}
      rotateX={8}
      perspective={1200}
      pixelsPerFrame={2}
      background="transparent"
      fadeColor="#000000"
    />
  );
}

const dinoFeatures = [
  { title: "1.000+ sites entregues", description: "Em 30 anos de mercado real, não apenas teoria." },
  { title: "10+ lojas físicas gerenciadas", description: "Experiência com negócios de verdade, não só digital." },
  { title: "SaaS e sistemas próprios", description: "Plataformas de cursos e automações com IA." },
  { title: "Gestor de Meta Ads", description: "Tráfego pago e marketing digital na prática." },
];

const partners = [
  {
    name: "Vinícius Saldanha",
    role: "Especialista em IA & Marketing Digital",
    bio: "Dono de agência, especialista em marketing digital, desenvolvimento full-stack e IA/LLMs aplicados a negócios. Entrou como aluno, aplicou o método, escalou os resultados e se tornou sócio.",
    tags: ["W-Tech Brasil", "Nacional Hidro", "IA aplicada"],
    photo: "/images/Saldanha.jpeg",
  },
  {
    name: "Gabriel",
    role: "Especialista em IA & Desenvolvimento",
    bio: "Especialista em IA e desenvolvimento full-stack. Dominou o método, começou a entregar sites para clientes e hoje é co-instrutor e sócio do 2Time — prova viva de que o método funciona.",
    tags: ["Full-stack", "IA", "Automação"],
    photo: "/images/gabriel.jpeg",
  },
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
                    [08] MENTORIA // DANIEL MARQUES
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono tracking-tight leading-[1.1] mb-6 text-white">
                    30 anos de <span className="text-orange-500 italic font-light">produção real.</span> Sem enrolação.
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
            className={`flex flex-col items-center justify-start order-1 lg:order-2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Dino Image Container - Extremely Large and Faded at the bottom */}
            <div className="relative w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full max-w-full sm:max-w-[650px] lg:max-w-none h-[660px] sm:h-[760px] md:h-[840px] lg:h-[1050px] flex items-end justify-center overflow-hidden mb-8 md:mb-10">
              <img
                src="/images/dino/dinosemf.png"
                alt="Daniel Marques (Dino)"
                className="h-full w-auto object-contain object-bottom transition-all duration-700 ease-out hover:scale-[1.03]"
                style={{ 
                  opacity: 0.95,
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
                }}
              />
              {/* Premium smooth bottom fade overlay to prevent hard crop cuts */}
              <div className="absolute bottom-0 left-0 right-0 h-36 md:h-48 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
              <div className={`absolute inset-0 -z-10 bg-radial-gradient(circle_at_center,${isProgrammer ? "rgba(249,115,22,0.08)" : "rgba(59,130,246,0.08)"}_0%,transparent_70%) pointer-events-none`} />
            </div>

            {/* Infinite Scrolling Logo Carousel underneath Dino */}
            <div className="w-full h-32 mt-2 overflow-hidden relative pointer-events-auto flex items-center justify-center">
              <Player
                component={PerspectiveMarqueeScene}
                inputProps={{ isProgrammer }}
                durationInFrames={240}
                fps={30}
                compositionWidth={1280}
                compositionHeight={720}
                style={{ width: "100%", height: "100%" }}
                controls={false}
                autoPlay
                loop
                clickToPlay={false}
                acknowledgeRemotionLicense={true}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── PARTE 2: Saldanha & Gabriel ─────────────────────── */}
      <div className={`relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 lg:pb-16 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        <div className="border-t border-foreground/10 pt-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">+ Também no time</span>
            <div className="flex-1 h-px bg-foreground/10" />
            <span className={`text-[10px] font-mono border px-3 py-1 tracking-widest ${
              isProgrammer ? "text-orange-500/70 border-orange-500/20" : "text-[#3B82F6]/70 border border-[#3B82F6]/20"
            }`}>EX-ALUNOS → SÓCIOS</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partners.map((p, i) => (
              <div
                key={p.name}
                className={`relative flex gap-6 p-6 lg:p-8 rounded-3xl glass-card glass-card-hover overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${
                  isProgrammer ? "hover:border-orange-500/30 hover:shadow-[0_16px_48px_-4px_rgba(249,115,22,0.2)]" : ""
                }`}
                style={{ transitionDelay: `${i * 150 + 500}ms` }}
              >
                {/* Photo */}
                <div className="shrink-0">
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-full border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${
                    isProgrammer ? "border-orange-500/30 shadow-orange-500/10" : "border-[#3B82F6]/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  }`}>
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-display text-white">{p.name}</h3>
                  </div>
                  <p className={`text-xs font-mono mb-3 ${isProgrammer ? "text-orange-400" : "text-[#3B82F6]/80"}`}>{p.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 border border-foreground/15 text-muted-foreground/60 tracking-widest uppercase rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                  isProgrammer ? "via-orange-500/30" : "via-[#3B82F6]/30"
                }`} />
              </div>
            ))}
          </div>

          <p className={`mt-8 text-center text-sm text-muted-foreground transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            Os três juntos formam o único time que combina{" "}
            <span className="text-foreground">30 anos de mercado</span> com{" "}
            <span className="text-foreground">especialização profunda em IA</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
