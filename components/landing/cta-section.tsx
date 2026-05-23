"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function CtaSection({ settings, isProgrammer = false }: { settings?: any; isProgrammer?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Waitlist form states
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!name || !email || !whatsapp) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Erro ao se cadastrar na lista de espera.");
      } else {
        setIsSuccess(true);
        setSuccessMessage(data.message || "Cadastro realizado com sucesso!");
      }
    } catch (err) {
      setErrorMessage("Erro de rede. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="inscricao" ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative rounded-[2.5rem] glass-card overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.08), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 lg:px-16 py-10 lg:py-14">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div>
                <span className="text-sm font-mono text-muted-foreground mb-4 block">
                  {isProgrammer ? "O que acontece se você continuar programando na mão" : "O que acontece se você esperar"}
                </span>
                {isProgrammer ? (
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
                    Cada semana sem
                    <br />
                    automatizar é tempo
                    <br />
                    <span className="text-muted-foreground">indo embora.</span>
                  </h2>
                ) : (
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
                    Cada semana sem site
                    <br />
                    é dinheiro
                    <br />
                    <span className="text-muted-foreground">indo embora.</span>
                  </h2>
                )}

                {isProgrammer ? (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Seus concorrentes já usam IA.<br />
                    Já codificam 10x mais rápido.<br />
                    Já entregam projetos inteiros em horas e lucram o triplo.
                  </p>
                ) : (
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Seu concorrente já está no Google.<br />
                    Já aparece no Maps.<br />
                    Já está pegando os clientes que deveriam ser seus.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-8">
                  <span className="text-foreground font-medium">50 vagas</span>
                  <span>·</span>
                  <span className={`${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"} font-medium`}>R${settings?.launchPrice || "97"} agora</span>
                  <span>·</span>
                  <span>R${settings?.regularPrice || "247"} depois</span>
                  <span>·</span>
                  <span>7 dias de garantia</span>
                </div>

                {isProgrammer ? (
                  <p className="text-sm text-muted-foreground">
                    Quando as 50 vagas de deploy VIP acabarem, a lista fecha.<br />
                    A próxima turma abre com preço normal — sem data definida.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Quando as 50 vagas acabarem, a lista fecha.<br />
                    A próxima turma abre com preço maior — sem data definida.
                  </p>
                )}
              </div>

              {/* Right - Form */}
              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 lg:p-10 transition-all duration-500 shadow-2xl relative overflow-hidden">
                <div className={`absolute -top-12 -right-12 w-[150px] h-[150px] opacity-30 blur-[50px] pointer-events-none ${
                  isProgrammer ? "bg-orange-500/30" : "ambient-glow-blue"
                }`} />
                
                {isSuccess ? (
                  <div className="text-center py-12 px-4 space-y-6 animate-char-in relative z-10">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl font-light ${
                      isProgrammer ? "bg-orange-500/15 border border-orange-500/40 text-orange-400" : "bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#3B82F6]"
                    }`}>
                      ✓
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-display font-medium text-white tracking-tight">Você está garantido!</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        {successMessage}<br />
                        Preço especial de lançamento de <strong className="text-white">R${settings?.launchPrice || "97"}</strong> bloqueado com sucesso.
                      </p>
                    </div>
                    <div className="bg-foreground/[0.02] border border-foreground/10 py-6 px-4 rounded-xl space-y-1 max-w-xs mx-auto">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono block">Sua Posição na Fila</span>
                      <p className={`text-4xl font-display font-semibold ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`}>#043</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-2">Próxima turma · Vagas Limitadas</p>
                    </div>
                    <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto">
                      Fique de olho no WhatsApp. Entraremos em contato assim que o carrinho oficial for aberto.
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display mb-2 text-white">
                      Garanta sua vaga.
                    </h3>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                      Preencha abaixo e garanta o preço de lançamento de R${settings?.launchPrice || "97"}.<br />
                      Quem está na lista é avisado primeiro — e tem o preço bloqueado.
                    </p>

                    {/* Vacancy counter */}
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className={`text-3xl font-display ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`}>7</span>
                        <span className="text-sm text-muted-foreground">confirmados</span>
                      </div>
                      <span className="text-muted-foreground">/</span>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-display text-white">50</span>
                        <span className="text-sm text-muted-foreground">vagas totais</span>
                      </div>
                      <span className="text-muted-foreground">·</span>
                      <span className={`text-sm font-medium ${isProgrammer ? "text-orange-500" : "text-[#3B82F6]"}`}>43 restantes</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-md">
                          ⚠️ {errorMessage}
                        </div>
                      )}
                      
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">Seu nome *</label>
                        <Input 
                          placeholder="Daniel Marques" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`h-12 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 px-5 ${
                            isProgrammer ? "focus-visible:ring-orange-500" : "focus-visible:ring-[#3B82F6]"
                          }`} 
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">WhatsApp *</label>
                        <Input 
                          placeholder="(12) 99999-9999" 
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className={`h-12 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 px-5 ${
                            isProgrammer ? "focus-visible:ring-orange-500" : "focus-visible:ring-[#3B82F6]"
                          }`} 
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 block">E-mail *</label>
                        <Input 
                          type="email" 
                          placeholder="voce@seusite.com.br" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`h-12 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 px-5 ${
                            isProgrammer ? "focus-visible:ring-orange-500" : "focus-visible:ring-[#3B82F6]"
                          }`} 
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full h-14 text-base rounded-full font-medium transition-all duration-300 group mt-6 cursor-pointer disabled:opacity-50 flex items-center justify-center ${
                          isProgrammer 
                            ? "bg-gradient-to-r from-orange-600 to-[#F97316] text-white hover:from-orange-500 hover:to-[#fb923c] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]" 
                            : "bg-white hover:bg-white/95 text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                        }`}
                      >
                        {isSubmitting ? "Enviando..." : "Quero garantir minha vaga agora"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground mt-6 text-center">
                      🔒 Seus dados são privados. Você será avisado no WhatsApp quando o carrinho abrir.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
