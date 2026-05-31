"use client";

import { useState, useEffect, useRef } from "react";
import { SiteSettings } from "@/lib/db";
import { toast } from "sonner";
import { Loader2, MessageSquare, X, Send } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";

interface WhatsAppWidgetProps {
  settings: SiteSettings;
  isProgrammer?: boolean;
}

export function WhatsAppWidget({ settings, isProgrammer = false }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const phoneInputRef = useRef<HTMLInputElement>(null);

  // WhatsApp active verification check
  if (!settings.whatsappEnabled) return null;

  // Auto-open chatbot after 3 seconds of initial load
  useEffect(() => {
    const hasClosed = sessionStorage.getItem("chatbot_closed");
    if (!hasClosed) {
      const openTimer = setTimeout(() => {
        setIsOpen(true);
        setHasNotification(false);
        simulateTyping();
      }, 3000);
      return () => clearTimeout(openTimer);
    } else {
      setHasNotification(false);
    }
  }, []);

  const simulateTyping = () => {
    setIsTyping(true);
    setShowForm(false);
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setShowForm(true);
    }, 1500); // 1.5 seconds typing simulation
    return () => clearTimeout(typingTimer);
  };

  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setHasNotification(false);
      simulateTyping();
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    sessionStorage.setItem("chatbot_closed", "true");
  };

  // WhatsApp / Cellphone formatting mask: (XX) XXXXX-XXXX
  const formatPhone = (val: string) => {
    const clean = val.replace(/\D/g, "");
    if (clean.length <= 2) return clean;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");
    
    // Validations
    if (!name.trim()) {
      toast.error("Por favor, digite seu nome.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Por favor, digite um e-mail válido.");
      return;
    }
    if (cleanPhone.length < 10) {
      toast.error("Por favor, insira um celular/WhatsApp válido com DDD.");
      return;
    }

    setIsSubmitting(true);

    try {
      // POST lead directly to local SQLite/Neon DB waitlist endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: cleanPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar seus dados. Tente novamente.");
      }

      setIsSubmitted(true);
      toast.success("Vaga garantida com sucesso!");

      // Delay redirect slightly for premium feel
      setTimeout(() => {
        const encodedMsg = encodeURIComponent(settings.whatsappMessage || "Olá! Quero garantir minha vaga no Método 3h.");
        const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMsg}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setIsOpen(false);
      }, 1500);

    } catch (error: any) {
      console.error("Chatbot Submission Error:", error);
      toast.error(error.message || "Houve um problema de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none font-sans">
      
      {/* 1. Floating Interactive Chatbot Popup Container */}
      {isOpen && (
        <div className="w-[360px] max-w-[calc(100vw-32px)] bg-[#070913] border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 flex flex-col mb-4 transform scale-100 origin-bottom-right">
          
          {/* A. Dynamic Gradient Glow Background */}
          <div className={cn(
            "absolute inset-0 opacity-15 blur-[40px] pointer-events-none z-0",
            isProgrammer ? "bg-orange-500/20" : "bg-blue-500/20"
          )} />

          {/* B. Chatbot Header Panel */}
          <div className={cn(
            "relative z-10 px-5 py-4 flex items-center justify-between border-b border-white/5",
            isProgrammer ? "bg-orange-500/10" : "bg-blue-500/10"
          )}>
            <div className="flex items-center gap-3">
              {/* Specialist Profile Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/metodo3h logo.png" 
                    alt="Especialista" 
                    className="w-full h-full object-cover scale-[1.3]" 
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Robot/Message Fallback icon if image error */}
                  <MessageSquare className={cn("w-5 h-5", isProgrammer ? "text-orange-400" : "text-blue-400")} />
                </div>
                {/* Active/Online Glow Indicator Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#070913] animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white tracking-tight leading-snug">Daniel Marques</h4>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Especialista Online
                </p>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all active:scale-90"
              title="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* C. Scrollable Chat Messages Container Area */}
          <div className="relative z-10 p-5 space-y-4 max-h-[360px] overflow-y-auto flex-1 bg-black/40">
            
            {/* System welcome notification */}
            <div className="text-center">
              <span className="inline-block text-[9px] font-mono tracking-widest uppercase text-muted-foreground/60 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full">
                Chat Iniciado
              </span>
            </div>

            {/* Specialist welcome balloon */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                <MessageSquare className={cn("w-3.5 h-3.5 text-white/60")} />
              </div>
              
              <div className="space-y-2 flex-1 max-w-[85%]">
                
                {/* Typing Simulation Dot Loader */}
                {isTyping && (
                  <div className="bg-white/5 border border-white/10 text-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md inline-block">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                {/* The main chat question */}
                {showForm && !isSubmitted && (
                  <div className="bg-white/5 border border-white/10 text-white rounded-3xl rounded-tl-none px-4 py-3.5 shadow-md text-xs sm:text-sm leading-relaxed space-y-2">
                    <p className="font-semibold text-white/90">Olá! Tudo bom? 👋</p>
                    <p>
                      Não perca esta oportunidade! Garanta já sua vaga exclusiva com desconto de lançamento no <strong>Método 3h</strong>.
                    </p>
                    <p className="font-medium text-white">
                      Você tem interesse? Se sim, coloque seu <strong>Nome, WhatsApp e E-mail</strong> abaixo e sua vaga estará 100% garantida!
                    </p>
                  </div>
                )}

                {/* Submitted success balloon */}
                {isSubmitted && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-3xl rounded-tl-none px-4 py-3.5 shadow-md text-xs sm:text-sm leading-relaxed space-y-2">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      🎉 Vaga Reservada!
                    </p>
                    <p>
                      Seus dados foram salvos com sucesso na nossa lista de prioridade.
                    </p>
                    <p className="text-xs text-emerald-400/90 animate-pulse font-mono font-bold">
                      Redirecionando você para o WhatsApp oficial agora...
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* D. Form fields displayed inside the chat thread dynamically */}
            {showForm && !isSubmitted && (
              <div className="animate-fade-in duration-300 pt-2 pl-9">
                <form onSubmit={handleSubmit} className="space-y-3.5 bg-white/[0.02] border border-white/5 rounded-3xl p-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 block">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-full px-4 h-10 text-xs text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-all"
                      placeholder="Ex: Carlos Silva"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 block">
                      Seu Melhor E-mail
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-full px-4 h-10 text-xs text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-all"
                      placeholder="Ex: carlos@email.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 block">
                      WhatsApp com DDD
                    </label>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-white/5 border border-white/10 rounded-full px-4 h-10 text-xs text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-all"
                      placeholder="Ex: (11) 99999-9999"
                    />
                  </div>

                  <ShinyButton
                    type="submit"
                    disabled={isSubmitting}
                    theme={isProgrammer ? "orange" : "blue"}
                    variant="solid"
                    className="w-full h-11 text-xs font-bold mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        Garantindo Vaga...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        Reservar Minha Vaga
                        <Send className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </ShinyButton>
                </form>
              </div>
            )}

          </div>

          {/* E. Chat Footer Brand Attribution */}
          <div className="relative z-10 px-5 py-2.5 text-center bg-black/50 border-t border-white/5">
            <p className="text-[9px] text-muted-foreground font-mono leading-none">
              Resposta imediata · Método 3h © 2026
            </p>
          </div>

        </div>
      )}

      {/* 2. Floating Circular Chatbot Toggle Button Trigger */}
      <button
        onClick={handleToggleOpen}
        className={cn(
          "p-4 rounded-full text-white shadow-2xl transition-all duration-300 group cursor-pointer relative",
          isOpen 
            ? "bg-red-500 hover:bg-red-600 rotate-90 active:scale-95" 
            : isProgrammer
              ? "bg-[#f97316] hover:bg-orange-600 hover:scale-110 active:scale-95 hover:shadow-orange-500/30"
              : "bg-[#0088ff] hover:bg-blue-600 hover:scale-110 active:scale-95 hover:shadow-blue-500/30"
        )}
        aria-label={isOpen ? "Fechar Chat" : "Abrir Chatbot"}
      >
        {/* Pulsing visual glow border ring */}
        {!isOpen && (
          <span className={cn(
            "absolute inset-0 rounded-full border-2 opacity-75 animate-ping group-hover:animate-none",
            isProgrammer ? "border-orange-400" : "border-blue-400"
          )} />
        )}

        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}

        {/* Dynamic Unread Red Notification Badge */}
        {!isOpen && hasNotification && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg animate-pulse">
            1
          </span>
        )}
      </button>

    </div>
  );
}
