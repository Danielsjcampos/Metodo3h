"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pizza04Icon,
  CommandFreeIcons,
  GlobalSearchIcon,
  SmartPhone01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

const FEATURES = [
  {
    id: "gestao",
    label: "Sistema de Gestão",
    icon: DashboardSquare01Icon,
    image: "/images/sistema de gestao .png",
    description: "Construa painéis completos para controlar o caixa, estoque e processos da sua empresa sem precisar programar e sem pagar mensalidades de softwares caros.",
    url: "admin.metodo3h.com",
  },
  {
    id: "crm",
    label: "Funil & CRM de Vendas",
    icon: SmartPhone01Icon,
    image: "/images/Funil e CRM de Vendas.png",
    description: "Crie um sistema automático para organizar seus clientes, salvar contatos e gerenciar seu funil de vendas sem depender de planilhas confusas.",
    url: "crm.metodo3h.com",
  },
  {
    id: "landing",
    label: "Páginas de Venda",
    icon: Pizza04Icon,
    image: "/images/pagina de vendas.png",
    description: "Crie páginas altamente vendedoras e modernas que explicam seu produto de forma profissional e transformam simples visitantes em clientes.",
    url: "metodo3h.com/vendas",
  },
  {
    id: "institucional",
    label: "Site para Negócios",
    icon: CommandFreeIcons,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    description: "Coloque qualquer empresa física no mapa da internet com um site profissional de carregamento instantâneo que passa total credibilidade.",
    url: "suaempresa.com.br",
  },
  {
    id: "seo",
    label: "Topo do Google (SEO)",
    icon: GlobalSearchIcon,
    image: "/images/Topo do Google SEO .png",
    description: "Aprenda a cadastrar e ranquear negócios locais no topo do Google para atrair dezenas de novos clientes todos os dias de forma 100% gratuita.",
    url: "google.com",
  },
  {
    id: "magic",
    label: "Automações Inteligentes",
    icon: MagicWandIcon,
    image: "/images/automacoes inteligentes.png",
    description: "Use a inteligência artificial para responder clientes, organizar dados e fazer todo o trabalho repetitivo e chato de forma automática 24 horas por dia.",
    url: "ai.metodo3h.com",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface FeatureCarouselProps {
  isProgrammer?: boolean;
}

export function FeatureCarousel({ isProgrammer = false }: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-white/5">
        {/* Left Column containing selection chips */}
        <div 
          className={cn(
            "w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 transition-colors duration-500",
            isProgrammer ? "bg-orange-600" : "bg-[#2563EB]"
          )}
        >
          {/* Fades for smooth top and bottom scrolling effect */}
          <div className={cn(
            "absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 z-40",
            isProgrammer 
              ? "bg-gradient-to-b from-orange-600 via-orange-600/80 to-transparent" 
              : "bg-gradient-to-b from-[#2563EB] via-[#2563EB]/80 to-transparent"
          )} />
          <div className={cn(
            "absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 z-40",
            isProgrammer 
              ? "bg-gradient-to-t from-orange-600 via-orange-600/80 to-transparent" 
              : "bg-gradient-to-t from-[#2563EB] via-[#2563EB]/80 to-transparent"
          )} />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20 my-10 lg:my-0">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border cursor-pointer",
                      isActive
                        ? "bg-white border-white z-10 shadow-lg"
                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                    )}
                    style={{
                      color: isActive ? (isProgrammer ? "#EA580C" : "#2563EB") : undefined
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive 
                          ? (isProgrammer ? "text-orange-600" : "text-[#2563EB]") 
                          : "text-white/40 group-hover:text-white/70"
                      )}
                    >
                      <HugeiconsIcon
                        icon={feature.icon}
                        size={18}
                        strokeWidth={2}
                      />
                    </div>

                    <span className="font-semibold text-xs md:text-sm tracking-widest whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Right Column containing previews */}
        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-neutral-900/60 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="relative w-full max-w-[560px] aspect-[16/10] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -2 : isNext ? 2 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 origin-center flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                >
                  {/* Sleek Mac Browser Header Bar */}
                  <div className="h-7 bg-neutral-900 border-b border-white/5 flex items-center px-4 gap-1.5 shrink-0 z-30 relative select-none">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    
                    <div className="mx-auto w-40 md:w-56 h-4.5 bg-neutral-950/80 rounded border border-white/5 flex items-center justify-center text-[9px] text-white/30 font-mono tracking-wide">
                      {feature.url}
                    </div>
                  </div>

                  {/* Browser Window Body Content */}
                  <div className="relative flex-1 h-[calc(100%-1.75rem)] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={cn(
                        "w-full h-full object-cover transition-all duration-700",
                        isActive
                          ? "grayscale-0 blur-0"
                          : "grayscale blur-[2px] brightness-75"
                      )}
                      style={{
                        objectPosition: feature.id === "landing" ? "left top" : "center top"
                      }}
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-6 pt-24 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent flex flex-col justify-end pointer-events-none"
                        >
                          <div className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase w-fit shadow-lg mb-2.5 border",
                            isProgrammer 
                              ? "bg-orange-500/10 border-orange-500/20 text-orange-400" 
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          )}>
                            {index + 1} • {feature.label}
                          </div>
                          <p className="text-white font-normal text-xs md:text-sm leading-relaxed drop-shadow-md tracking-tight max-w-[95%]">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={cn(
                        "absolute top-5 left-6 flex items-center gap-2.5 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isProgrammer 
                          ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)] animate-pulse" 
                          : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)] animate-pulse"
                      )} />
                      <span className="text-white/80 text-[8px] font-semibold uppercase tracking-[0.3em] font-mono">
                        APLICAÇÃO PRÁTICA
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
