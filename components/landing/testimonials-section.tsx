"use client";

import { useEffect, useState, useRef } from "react";
import { Star, Volume2, VolumeX, Play, Sparkles, Cpu, Layers } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";

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
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.2, 0.45], [0.85, 1.02]);
  const width = useTransform(scrollYProgress, [0.2, 0.45], ["300px", "100%"]);
  const height = useTransform(scrollYProgress, [0.2, 0.45], ["400px", "650px"]);
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.45], ["2rem", "1.5rem"]);
  const opacityText = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (videoRef.current) {
        if (v > 0.35 && v < 0.7) {
          if (hasInteracted) {
            setIsMuted(false);
            videoRef.current.muted = false;
          }
        } else {
          setIsMuted(true);
          videoRef.current.muted = true;
        }
      }
    });
  }, [scrollYProgress, hasInteracted]);

  const toggleMute = () => {
    setHasInteracted(true);
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-14 md:py-18 overflow-hidden bg-background">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="mb-10 text-center flex flex-col items-center justify-center">
          <span className={`inline-flex items-center gap-3 text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-6 transition-all duration-700 justify-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}>
            <span className="w-8 h-[2px] bg-[#3B82F6]/60 rounded-full" />
            Prova real
            <span className="w-8 h-[2px] bg-[#3B82F6]/60 rounded-full" />
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.1] mt-2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Quem aplicou, <span className="text-muted-foreground italic font-light">já está</span> faturando.
          </h2>
        </div>

        <div ref={scrollContainerRef} className="relative w-full min-h-[70vh] flex items-center justify-center mb-12">
          
          <motion.div
            style={{
              width,
              height,
              scale,
              borderRadius,
            }}
            className="relative overflow-hidden border border-white/10 bg-black/60 shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-5xl w-full"
            onClick={() => setHasInteracted(true)}
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <video
              ref={videoRef}
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover pointer-events-none opacity-80 mix-blend-screen saturate-[1.2] filter contrast-[1.1]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 shadow-lg text-white hover:bg-black/90 hover:border-white/20 transition-all duration-300 group active:scale-95"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-mono font-semibold tracking-wider">ATIVAR ÁUDIO</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                    <span className="text-[10px] font-mono font-semibold tracking-wider">ÁUDIO LIGADO</span>
                  </>
                )}
              </button>
            </div>

            <div className="absolute top-6 left-6 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono font-semibold tracking-wider text-white/90 uppercase">Depoimento em Vídeo</span>
            </div>

            {isMuted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] transition-all duration-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_50px_rgba(59,130,246,0.4)] cursor-pointer group active:scale-95 z-20"
                >
                  <Play className="w-8 h-8 text-black fill-black ml-1 group-hover:rotate-12 transition-transform duration-300" />
                </button>
                <div className="absolute bottom-28 text-center text-white/60 text-xs font-mono tracking-widest uppercase animate-bounce">
                  Role a página para expandir e ouvir
                </div>
              </div>
            )}

            <motion.div
              style={{ opacity: opacityText }}
              className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none"
            >
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[10px] font-mono text-[#3B82F6] uppercase font-semibold mb-3">
                  <Cpu className="w-3 h-3" /> Projeto construído 100% com IA
                </span>
                <h3 className="text-2xl md:text-4xl font-display font-medium text-white mb-3">
                  SaaS CRM Automatizado do Henrique
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  "Eu não sabia nada de código. Com o Método 3h, desenvolvi e publiquei um software de CRM completo com integrações em 3 dias. Hoje o projeto já fatura no mercado digital."
                </p>
              </div>

              <div className="shrink-0 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-2 min-w-[200px]">
                <div className="flex items-center gap-1.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-yellow-500" />)}
                </div>
                <p className="text-sm font-semibold text-white">Henrique Souza</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase">Aluno Método 3h · Ex-Leigo</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`relative p-8 lg:p-10 rounded-[2rem] glass-card overflow-hidden transition-all duration-500 hover:border-white/15 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute top-6 right-8 text-[80px] font-display text-white/[0.02] leading-none select-none pointer-events-none font-bold">
                “
              </span>

              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.stars)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-[#3B82F6] text-[#3B82F6]" />
                ))}
              </div>

              <p className="text-base lg:text-lg text-foreground leading-relaxed mb-8">
                "{t.quote}"
              </p>

              <div className="flex items-end justify-between pt-4 border-t border-white/5">
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#3B82F6]/5 border border-[#3B82F6]/20 text-[10px] font-mono text-[#3B82F6] font-semibold">
                  {t.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`border-y border-white/5 py-6 overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-0 w-max ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 px-8 text-xs font-mono text-muted-foreground whitespace-nowrap"
              >
                <span className="text-[#3B82F6] text-xs">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className={`mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {[
            { value: "100%", label: "aprovam o método", sub: "de quem implementou" },
            { value: "3h", label: "tempo médio", sub: "para o primeiro site no ar" },
            { value: "R$2.800", label: "ticket mínimo", sub: "para vender como serviço" },
            { value: "7 dias", label: "garantia total", sub: "devolução sem perguntas" },
          ].map((m, i) => (
            <div
              key={m.label}
              className="p-6 rounded-2xl glass-card border border-white/5 hover:border-blue-500/20 text-center transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="block text-3xl lg:text-4xl font-display text-white mb-1 font-semibold">{m.value}</span>
              <span className="block text-sm font-medium text-foreground">{m.label}</span>
              <span className="block text-xs text-muted-foreground mt-1">{m.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
