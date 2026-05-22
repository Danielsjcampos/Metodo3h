"use client";

import { useState, useEffect, useRef } from "react";

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

export function DevelopersSection() {
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
    <section id="instrutor" ref={sectionRef} className="relative overflow-hidden">

      {/* ── PARTE 1: Daniel Marques ─────────────────────────── */}
      <div className="relative min-h-[900px] py-24 lg:py-32">

        {/* Dino image */}
        <div
          className={`absolute bottom-0 right-0 pointer-events-none transition-opacity duration-1000 delay-300 ${
            isVisible ? "opacity-90" : "opacity-0"
          }`}
          style={{ width: "58%", height: "100%" }}
        >
          <img
            src="/images/dino/dinosemf.png"
            alt="Daniel Marques"
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Quem vai te ensinar
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              30 anos de
              <br />
              <span className="text-muted-foreground">mercado real.</span>
              <br />
              Não YouTube.
            </h2>
          </div>

          <div className={`lg:max-w-[50%] transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Me chamo <span className="text-foreground font-medium">Daniel Marques</span>. Comecei no mercado digital antes da internet banda larga existir no Brasil. Em 30 anos entreguei mais de 1.000 sites e sistemas de gestão, gerenciei mais de 10 lojas físicas, construí SaaS, micro-SaaS, plataformas de cursos e automações com IA para clientes reais.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Não sou um youtuber que aprendeu a fazer site mês passado. Sou um profissional que vive disso há três décadas — e que agora tem acesso às mesmas ferramentas de IA que nivelaram o campo para quem está começando agora.
            </p>

            <blockquote className="border-l-2 border-[#3B82F6] pl-6 mb-12">
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
                  <h3 className="font-medium mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PARTE 2: Saldanha & Gabriel ─────────────────────── */}
      <div className={`relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        <div className="border-t border-foreground/10 pt-16">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">+ Também no time</span>
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-[10px] font-mono text-[#3B82F6]/70 border border-[#3B82F6]/20 px-3 py-1 tracking-widest">EX-ALUNOS → SÓCIOS</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partners.map((p, i) => (
              <div
                key={p.name}
                className={`relative flex gap-6 p-6 lg:p-8 rounded-3xl glass-card glass-card-hover overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150 + 500}ms` }}
              >
                {/* Photo */}
                <div className="shrink-0">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-full border-2 border-[#3B82F6]/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
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
                  <p className="text-xs font-mono text-[#3B82F6]/80 mb-3">{p.role}</p>
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
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
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
