"use client";

import { useState } from "react";
import { SiteSettings } from "@/lib/db";
import { toast } from "sonner";
import { Loader2, MessageCircle, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WhatsAppWidgetProps {
  settings: SiteSettings;
}

export function WhatsAppWidget({ settings }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If WhatsApp is disabled, don't render the widget
  if (!settings.whatsappEnabled) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const cleanPhone = phone.replace(/\D/g, "");
    if (!name.trim() || cleanPhone.length < 10) {
      toast.error("Por favor, preencha seu nome e telefone/WhatsApp completo.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a unique email for the database based on phone and timestamp
      const mockEmail = `wa_${cleanPhone}_${Date.now()}@metodo3horas.com.br`;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: mockEmail,
          whatsapp: cleanPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao iniciar contato.");
      }

      toast.success("Dados salvos! Redirecionando para o WhatsApp...");
      
      // Build WhatsApp Redirect URL
      const encodedMsg = encodeURIComponent(settings.whatsappMessage || "Olá!");
      const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMsg}`;
      
      // Open in a new tab safely
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      
      // Reset form and close
      setName("");
      setPhone("");
      setIsOpen(false);
    } catch (error: any) {
      console.error("WhatsApp Funnel Error:", error);
      toast.error(error.message || "Houve um problema de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Floating Button Trigger */}
      <DialogTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 hover:scale-110 active:scale-95 text-white shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 group cursor-pointer"
          aria-label="Falar no WhatsApp"
        >
          {/* Pulsing glow ring */}
          <span className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-75 animate-ping group-hover:animate-none" />
          
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.58-1.008-5.005-2.844-6.844-1.838-1.839-4.283-2.853-6.86-2.854-5.439 0-9.867 4.372-9.87 9.743-.001 1.73.457 3.41 1.32 4.937L1.87 21.083l5.068-1.319zm11.385-6.825c-.299-.149-1.778-.877-2.057-.978-.28-.101-.483-.149-.686.15-.203.299-.785.979-.962 1.18-.178.201-.355.226-.655.077-1.27-.636-2.099-1.03-2.932-2.457-.22-.375.22-.348.63-.1.368.223.483.299.655.374.172.075.27.037.348-.038.077-.075.356-.449.467-.674.111-.226.056-.425-.028-.574-.084-.149-.686-1.65-.94-2.261-.247-.595-.503-.514-.686-.523-.178-.008-.382-.01-.585-.01-.203 0-.534.076-.814.374-.28.298-1.068 1.043-1.068 2.543 0 1.5 1.093 2.948 1.246 3.149.153.2 2.15 3.282 5.207 4.601.727.314 1.291.502 1.731.641.73.232 1.393.197 1.917.12.584-.087 1.778-.727 2.027-1.43.248-.702.248-1.303.172-1.43-.076-.127-.28-.201-.578-.352z" />
          </svg>
        </button>
      </DialogTrigger>

      {/* Dynamic Lead Capture Modal */}
      <DialogContent className="sm:max-w-[440px] bg-[#060814]/75 border border-white/10 backdrop-blur-xl text-white rounded-[2rem] p-6 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-[180px] h-[180px] ambient-glow-blue opacity-40 blur-[50px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-[180px] h-[180px] ambient-glow-gold opacity-15 blur-[50px] pointer-events-none" />

        <div className="relative z-10">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2 mx-auto">
              <MessageCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <DialogTitle className="text-2xl font-display font-light text-center">
              Falar com o <span className="italic text-[#3B82F6]">Especialista</span>
            </DialogTitle>
            <DialogDescription className="text-center text-white/60 text-xs leading-relaxed">
              Preencha seus dados rapidamente abaixo para iniciarmos seu atendimento personalizado via WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Seu Nome Completo
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 h-12 text-sm text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all"
                placeholder="Ex: Carlos Eduardo"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                WhatsApp / Celular (com DDD)
              </label>
              <input
                type="tel"
                required
                disabled={isSubmitting}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 h-12 text-sm text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all"
                placeholder="Ex: (11) 99999-9999"
              />
              <span className="text-[9px] text-muted-foreground block px-2">
                Digite apenas números ou formato padrão com DDD.
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium h-12 rounded-full transition-all shadow-lg hover:shadow-emerald-500/20 mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Iniciando chat...
                </>
              ) : (
                <>
                  Falar no WhatsApp
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
