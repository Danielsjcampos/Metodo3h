"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { 
  Play, VolumeX, Volume2, Info, Lock, CheckCircle2, Clock, 
  Mail, Phone, User as UserIcon, HelpCircle, ChevronRight, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FreeLesson {
  id: string;
  moduleNum: number;
  title: string;
  tag: string;
  description: string;
  duration: string;
  videoUrl: string; // YouTube ID
  instructor: string;
  thumbnail: string;
}

const FREE_LESSONS: FreeLesson[] = [
  {
    id: "aula-1",
    moduleNum: 1,
    title: "Módulo 1: Digitalize seu Negócio",
    tag: "AULA 1",
    description: "Aprenda a estruturar, digitalizar e colocar um site profissional no ar em menos de 25 minutos sem programar e sem gastar com hospedagem.",
    duration: "24:15",
    videoUrl: "dQw4w9WgXcQ", // Rickroll as premium placeholder
    instructor: "Daniel Marques",
    thumbnail: "/images/pagina de vendas.png"
  },
  {
    id: "aula-2",
    moduleNum: 2,
    title: "Módulo 2: Tráfego e SEO Orgânico",
    tag: "AULA 2",
    description: "Como fazer seu site aparecer no topo das buscas do Google de forma 100% gratuita, gerando leads orgânicos recorrentes.",
    duration: "18:40",
    videoUrl: "dQw4w9WgXcQ",
    instructor: "Vinícius",
    thumbnail: "/images/Topo do Google SEO .png"
  },
  {
    id: "aula-3",
    moduleNum: 3,
    title: "Módulo 3: CRM e Automações Comerciais",
    tag: "AULA 3",
    description: "Construa um CRM rápido, eficaz e funcional para gerenciar e automatizar suas vendas por WhatsApp sem complicações.",
    duration: "21:10",
    videoUrl: "dQw4w9WgXcQ",
    instructor: "Gabriel",
    thumbnail: "/images/sistema de gestao .png"
  }
];

export default function FreeClassesPortal() {
  const [isApproved, setIsApproved] = useState(true);
  const [leadName, setLeadName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Portal VOD playback state
  const [activeLesson, setActiveLesson] = useState<FreeLesson>(FREE_LESSONS[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCinemaPlayer, setShowCinemaPlayer] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gateMatrixRef = useRef<HTMLCanvasElement>(null);

  // Check if approved on load
  useEffect(() => {
    const approved = localStorage.getItem("waitlist_approved");
    const name = localStorage.getItem("waitlist_name");
    if (approved === "true") {
      setIsApproved(true);
      if (name) setLeadName(name);
    }
  }, []);

  // Full-Screen Matrix Coding Rain Background Effect for the Login Gate
  useEffect(() => {
    if (isApproved || !gateMatrixRef.current) return;
    const canvas = gateMatrixRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const codes = "01010100 01000101 01000011 01001000 01001110 01001111 01001100 01001111 01000111 01011001 HTML CSS JS IA SEO CRM WEB DEV";
    const alphabet = codes.split("");
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 115, 230, 0.2)"; // Glowing subtle electric blue rain
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isApproved]);

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      toast.error("Por favor, preencha o e-mail ou WhatsApp.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const name = data.lead?.name || "Aluno";
        localStorage.setItem("waitlist_approved", "true");
        localStorage.setItem("waitlist_name", name);
        setLeadName(name);
        setIsApproved(true);
        toast.success(`Seja bem-vindo, ${name}! Acesso liberado.`);
      } else {
        toast.error(data.error || "Cadastro não encontrado. Por favor, registre-se na página principal.");
      }
    } catch (err) {
      toast.error("Erro interno ao validar seu acesso.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonSelect = (lesson: FreeLesson) => {
    setActiveLesson(lesson);
    setIsMuted(true);
    setIsPlaying(true);
    setShowCinemaPlayer(true);
    
    const playerEl = document.getElementById("main-vod-anchor");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleLessonCompleted = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) {
        toast.info("Módulo marcado como pendente.");
        return prev.filter((id) => id !== lessonId);
      } else {
        toast.success("Módulo concluído! Parabéns!");
        return [...prev, lessonId];
      }
    });
  };

  const handleUnmute = () => {
    setIsMuted(false);
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"unMute","args":""}', 
      '*'
    );
    iframeRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}', 
      '*'
    );
  };

  const handlePlayerToggle = () => {
    if (isMuted) {
      handleUnmute();
      return;
    }
    if (isPlaying) {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}', 
        '*'
      );
      setIsPlaying(false);
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}', 
        '*'
      );
      setIsPlaying(true);
    }
  };

  // Overall Completion Progress
  const totalLessonsCount = FREE_LESSONS.length;
  const progressPercent = Math.round((completedLessons.length / totalLessonsCount) * 100);

  if (!isApproved) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 relative overflow-hidden select-none">
        {/* Full Screen Matrix Code Rain Background */}
        <canvas ref={gateMatrixRef} className="absolute inset-0 z-0 w-full h-full opacity-30 pointer-events-none" />

        {/* Background glow meshes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none z-0" />

        <div className="w-full max-w-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2 animate-bounce-gentle">
              <img 
                src="/images/metodo3h logo.png" 
                className="h-14 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.35)]" 
                alt="Método 3H" 
              />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
              ÁREA EXCLUSIVA DE AULAS GRATUITAS
            </p>
          </div>

          <Card className="bg-black/75 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />
            
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/25 rounded-3xl flex items-center justify-center overflow-hidden p-3 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <img src="/images/metodo3h logo.png" className="w-full h-full object-contain animate-pulse" alt="Logo" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-white leading-snug">
                  Área de Espera Liberada
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Para acessar os 3 módulos gratuitos do Método 3h (Daniel Marques, Vinícius e Gabriel), informe seu e-mail ou WhatsApp cadastrado.
                </p>
              </div>

              <form onSubmit={handleGateSubmit} className="space-y-4">
                <div className="space-y-1.5 relative">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest block">E-mail ou WhatsApp</span>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <input 
                      type="text"
                      placeholder="seuemail@exemplo.com ou DDD + Número"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-[#3B82F6] rounded-xl pl-11 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/45"
                      required
                    />
                  </div>
                </div>

                <ShinyButton 
                  type="submit"
                  disabled={isLoading}
                  theme="blue"
                  variant="solid"
                  className="w-full h-12 text-xs font-mono font-bold tracking-widest"
                >
                  {isLoading ? "VERIFICANDO CADASTRO..." : "ACESSAR AULAS GRATUITAS"}
                </ShinyButton>
              </form>
            </CardContent>
          </Card>
          
          <p className="text-[10px] text-center text-muted-foreground/60 font-mono leading-relaxed">
            Seus dados estão protegidos. Ao clicar você se inscreve gratuitamente na Fila de Espera oficial do Método 3h.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#141414] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      
      {/* Dynamic VOD Hero Section mimicking Netflix Header Banner */}
      <div id="main-vod-anchor" className="relative w-full aspect-[21/9] min-h-[480px] lg:min-h-[600px] flex items-center justify-start overflow-hidden">
        
        {/* Loop coding/developer video background in the hero banner (AUTOPLAYED & MUTED) */}
        <div className="absolute inset-0 z-0">
          {showCinemaPlayer ? (
            <div className="w-full h-full relative z-10 bg-black">
              {/* Overlay play control for VOD */}
              <div className="absolute inset-0 z-20 cursor-pointer" onClick={handlePlayerToggle} />

              {isMuted && (
                <div 
                  className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                  onClick={handleUnmute}
                >
                  <div className="w-[300px] bg-[#0073e6] border border-blue-400/30 text-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,115,230,0.4)] text-center space-y-4 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                    <h4 className="text-base font-bold tracking-tight">Dê o play para ativar o som</h4>
                    <div className="relative w-14 h-14 mx-auto bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <div className="absolute -inset-2 rounded-full border border-white/10 animate-ping opacity-75" />
                      <VolumeX className="w-6 h-6 animate-pulse text-white" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-mono font-bold text-blue-200">O vídeo já começou</p>
                  </div>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${activeLesson.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
                className="w-full h-full pointer-events-none scale-[1.01]"
                allow="autoplay; encrypted-media"
                title="Cinema Player"
              />
            </div>
          ) : (
            <video
              src="/ai%20bacgkround.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-35 scale-[1.01]"
            />
          )}

          {/* Netflix signature dark vignette fade overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Global Floating Header Brand Navigation */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 lg:px-12 py-6">
          <a href="/" className="flex items-center gap-2 group">
            <img 
              src="/images/metodo3h logo.png" 
              className="h-10 md:h-12 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,115,230,0.3)]" 
              alt="Método 3H" 
            />
          </a>
          
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-white/60">Aulas Gratuitas Ativas</span>
            <div className="h-6 w-px bg-white/20" />
            <span className="text-emerald-400 font-bold shrink-0">FILA DE ESPERA LIBERADA ✓</span>
          </div>
        </div>

        {/* Netflix Hero Meta Content on Left */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-start gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest block font-mono">
              ★ IMERSÃO EXCLUSIVA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.05] text-white uppercase drop-shadow-md">
              PROFISSÃO <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">Criação com IA</span>
            </h1>
            
            <div className="flex items-center gap-3 text-xs md:text-sm font-semibold mt-2 select-none">
              <span className="text-[#3b82f6]">1ª Temporada</span>
              <span className="text-white/40">·</span>
              <span className="bg-red-600/10 border border-red-500/25 text-red-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                Top 1 de hoje
              </span>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed drop-shadow">
            {activeLesson.description} Domine a criação de sites e automação comercial para alavancar seu negócio ou prestar serviços profissionais.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <ShinyButton
              onClick={() => handleLessonSelect(activeLesson)}
              theme="default"
              variant="solid"
              className="h-12 px-8 font-bold text-sm tracking-tight"
            >
              <Play className="w-5 h-5 fill-current mr-2" />
              Assistir {activeLesson.tag}
            </ShinyButton>
            
            <ShinyButton
              onClick={() => {
                toast.success("Suas aulas estão 100% liberadas no carrossel abaixo! Bons estudos.");
              }}
              theme="default"
              variant="glass"
              className="h-12 px-6 font-bold text-sm tracking-tight"
            >
              <Info className="w-5 h-5 mr-2" />
              Mais informações
            </ShinyButton>
          </div>
        </div>

        {/* Floating bottom-right volume status bar */}
        {showCinemaPlayer && (
          <button 
            onClick={handlePlayerToggle}
            className="absolute bottom-16 right-6 lg:right-12 z-30 p-3 bg-black/60 border border-white/10 hover:border-white/20 text-white rounded-full transition-all active:scale-90"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* 2. Netflix-style Slider rows block ("Em Alta") */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12 py-10 relative z-20">
        
        {/* Progress dashboard hud block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#181818] border border-white/5 p-6 rounded-2xl shadow-inner">
          <div className="space-y-1">
            <span className="text-[10px] text-[#3B82F6] font-mono tracking-widest block uppercase">CRONOGRAMA DE AULAS</span>
            <h3 className="text-lg font-bold text-white leading-none">Módulos Exclusivos do Método 3h</h3>
          </div>
          
          <div className="w-full sm:w-80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Seu Progresso de Estudos</span>
              <span className="text-[#3B82F6] font-bold">{progressPercent}%</span>
            </div>
            <div className="h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">
              {completedLessons.length} de {totalLessonsCount} aulas assistidas
            </p>
          </div>
        </div>

        {/* Modules Carousel Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-white uppercase font-sans">
              Aulas em alta
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              3 Aulas de Acesso Gratuito
            </span>
          </div>

          {/* Sliding Card Decks exactly mimicking Pedro Sobral platform grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FREE_LESSONS.map((lesson) => {
              const isActive = activeLesson.id === lesson.id;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className={cn(
                    "group relative aspect-video rounded-2xl border bg-[#181818] overflow-hidden transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-end select-none",
                    isActive 
                      ? "border-[#3B82F6] ring-1 ring-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-[1.02]"
                      : "border-white/5 hover:border-white/20 hover:scale-[1.02]"
                  )}
                >
                  {/* Thumbnail Cover Image */}
                  <img 
                    src={lesson.thumbnail} 
                    alt={lesson.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                  />

                  {/* Dark mask overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Top-left checked mark if completed */}
                  {isCompleted && (
                    <div className="absolute top-4 left-4 bg-emerald-500 text-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border border-emerald-400">
                      ✓
                    </div>
                  )}

                  {/* Visual card content details */}
                  <div className="relative p-5 space-y-1.5 z-10">
                    {/* Bold red signature Netflix AULA Pill */}
                    <div className="flex items-center justify-between">
                      <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded font-sans tracking-wide uppercase select-none drop-shadow-md">
                        {lesson.tag}
                      </span>
                      <span className="text-[10px] text-white/50 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight leading-tight group-hover:text-[#3B82F6] transition-colors drop-shadow">
                      {lesson.title.split(": ").slice(1).join("") || lesson.title}
                    </h3>
                    
                    <p className="text-[11px] text-white/70 leading-normal line-clamp-2 select-none group-hover:text-white transition-colors">
                      {lesson.description}
                    </p>

                    {/* Bottom action trigger bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1 select-none">
                      <span className="text-[9px] font-mono text-[#3B82F6]">
                        Instrutor: {lesson.instructor}
                      </span>
                      
                      <button
                        onClick={(e) => toggleLessonCompleted(lesson.id, e)}
                        className="p-1 rounded-full hover:bg-white/10 active:scale-90 transition-all"
                        title="Marcar como assistido"
                      >
                        <CheckCircle2 className={cn(
                          "w-4 h-4 transition-all",
                          isCompleted 
                            ? "text-emerald-400 scale-105" 
                            : "text-white/20 hover:text-emerald-500"
                        )} />
                      </button>
                    </div>
                  </div>

                  {/* Micro-hover glow border reflect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pre-Reservation CTA Section */}
        <div className="mt-16 bg-[#181818]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          {/* Subtle Ambient Background Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] blur-[100px] rounded-full bg-blue-500/10 pointer-events-none -z-10" />

          {/* Top Line Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />

          <div className="max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 text-[#3B82F6] font-bold">
              ★ Oportunidade Exclusiva de Abertura
            </span>

            <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Desbloqueie o <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">Arsenal Completo</span>
            </h3>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Assista às aulas gratuitas e garanta sua vaga de pré-reserva para ter acesso a todos os templates prontos, roteiros de IA, grupo VIP de suporte e certificação oficial. Ao se cadastrar, você garante um desconto exclusivo de abertura: de <span className="line-through text-red-500/80">R$ 997,00</span> por **apenas R$ 197,00** na abertura oficial!
            </p>

            {/* Price Tag Comparison inside free portal */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-4 max-w-md mx-auto my-6">
              <div className="text-center sm:text-left">
                <span className="text-[9px] text-muted-foreground uppercase font-mono tracking-wider block">Preço de Lançamento</span>
                <span className="text-lg text-gray-500 line-through font-bold">R$ 997,00</span>
              </div>
              <div className="hidden sm:block text-xl text-white/20">→</div>
              <div className="text-center sm:text-left bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl px-4 py-2">
                <span className="text-[9px] text-emerald-400 uppercase font-mono tracking-wider block font-bold">Preço de Pré-Reserva</span>
                <span className="text-2xl font-black text-emerald-400">R$ 197,00</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col items-center gap-4">
              <ShinyButton
                theme="blue"
                variant="solid"
                href="/#inscricao"
                className="w-full sm:w-auto h-14 font-mono text-xs tracking-widest font-bold px-8"
              >
                ACESSE A PRÉ-RESERVA DO ARSENAL COMPLETO
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </ShinyButton>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1">✓ Trava de Preço Garantida</span>
                <span className="flex items-center gap-1">✓ Sem Compromisso de Compra</span>
                <span className="flex items-center gap-1">✓ Acesso Grátis Imediato</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}
