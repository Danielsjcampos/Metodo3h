"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

const words = [
  "sites de R$ 3.000",
  "sistemas em minutos",
  "o superpoder da IA",
  "liberdade sem programar"
];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;
  const DURATION = 500;
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const gradientColors = ["#3B82F6", "#60A5FA", "#38BDF8", "#93C5FD", "#3B82F6"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </>
  );
}

export function HeroCaptureSection() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp Mask: (99) 99999-9999
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setWhatsapp(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro ao realizar o cadastro.");
      }

      // Smooth redirection to thank you page
      router.push(`/obrigado?name=${encodeURIComponent(name)}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Erro de conexão. Tente novamente mais tarde.");
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-stretch overflow-hidden bg-black pt-24 pb-12 lg:pt-32 lg:pb-16">
      {/* Background video / overlay layout from standard azul theme */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-70"
          style={{ filter: "hue-rotate(200deg) saturate(1.4) brightness(0.85)" }}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/70" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex-1 flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16 pt-8">
        {/* Left Side: Headlines & Promise */}
        <div className="flex-1 lg:max-w-[55%]">
          {/* Eyebrow */}
          <div 
            className={`mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono text-blue-400 uppercase tracking-widest">
              <span className="w-8 h-px bg-blue-500/50" />
              Aula Prática Gravada · 100% Gratuita
            </span>
          </div>
          {/* Main headline */}
          <div className="mb-6">
            <h1 
              className={`text-left text-[clamp(2.25rem,6.5vw,3.75rem)] font-display leading-[1.1] tracking-tight text-white transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">Crie e fature com</span>
              <span className="block text-white/50">
                <span className="relative inline-block text-white min-w-[3ch]">
                  <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                </span>
                <span className="text-white/40">.</span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className={`text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mb-6 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Descubra os bastidores da metodologia que permite colocar estruturas profissionais no ar em tempo recorde usando Inteligência Artificial. Aprenda a faturar de R$ 1.500 a R$ 3.500 por projeto, <span className="text-white font-medium">sem precisar programar e com custo zero de hospedagem</span>.
          </p>

          {/* Features checkmarks */}
          <div className={`space-y-3 mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {[
              "Ganhos Acelerados: Crie e entregue sites profissionais cobrando de R$ 1.500 a R$ 3.500 por projeto.",
              "Custo Operacional Zero: Aprenda a hospedar todos os seus projetos de graça com velocidade máxima.",
              "Sem Barreira Técnica: Descubra o atalho para construir qualquer layout premium sem digitar código."
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm sm:text-base text-white/80">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className={`w-full max-w-md bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}>
          <div className="mb-6 text-center lg:text-left">
            <h3 className="text-xl font-display font-semibold text-white mb-2">Garantir Acesso Gratuito</h3>
            <p className="text-xs text-white/60">Preencha os campos abaixo para receber o link exclusivo da aula e os bônus no WhatsApp.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-white/70 mb-1">Seu Nome Completo</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Ex: Daniel Marques"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/70 mb-1">Seu Melhor E-mail</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Ex: daniel@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-xs font-medium text-white/70 mb-1">Seu WhatsApp</label>
              <input
                id="whatsapp"
                type="tel"
                required
                placeholder="Ex: (12) 99999-9999"
                value={whatsapp}
                onChange={handlePhoneChange}
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 rounded-xl group cursor-pointer flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_0_rgba(59,130,246,0.3)] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cadastrando Vaga...
                </>
              ) : (
                <>
                  Garantir Acesso Gratuito
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-[10px] text-center text-white/40 mt-4 leading-normal">
            Prometemos não enviar spam. Seus dados estão seguros e você poderá cancelar a assinatura a qualquer momento.
          </p>
        </div>
      </div>
      
      {/* Stats Section */}
      <div 
        className={`relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1000px] mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 px-10 shadow-2xl flex items-center justify-between gap-6 md:gap-12 flex-wrap">
          {[
            { value: "1.000+", label: "sites entregues" },
            { value: "100% Grátis", label: "aula gravada" },
            { value: "R$0", label: "custo de hospedagem" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 md:flex-1 md:text-center">
              <span className="text-xl lg:text-2xl font-display text-white">{stat.value}</span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#3B82F6] leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
