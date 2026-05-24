import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { getSettings } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, AlertTriangle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = "Inscrição Confirmada! · Método 3h";
  const description = "Sua vaga está garantida. Siga o próximo passo para entrar no Grupo VIP e ter acesso ao link da aula gratuita e materiais de apoio.";
  return {
    title: title,
    description: description,
    icons: {
      icon: settings.seoFavicon || "/favicon.ico",
    },
  };
}

// We mark this page as dynamic since it uses searchParams to welcome the lead by name
export const dynamic = "force-dynamic";

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const settings = await getSettings();
  const { name } = await searchParams;
  const leadName = name ? decodeURIComponent(name).split(" ")[0] : "";

  // Dynamic WhatsApp link using settings stored in database
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber || "5512999999999"}?text=${encodeURIComponent(
    settings.whatsappMessage || "Olá! Gostaria de receber o link da aula gratuita gravada e os materiais do Método 3h."
  )}`;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-black text-white flex flex-col justify-between"
      style={{
        backgroundImage: "radial-gradient(rgba(59,130,246,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Navigation settings={settings} />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{ top: `${16.6 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex-1 flex items-center justify-center pt-28 pb-16">
        <div className="w-full max-w-xl bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl text-center space-y-8">
          
          {/* Header Checkmark */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-semibold text-white tracking-tight">
              {leadName ? `Parabéns, ${leadName}!` : "Cadastro Confirmado!"}
            </h1>
            <p className="text-sm text-white/60 mt-2">Sua inscrição para a aula gratuita foi realizada com sucesso.</p>
          </div>

          {/* Steps Progress Tracker */}
          <div className="border border-white/10 rounded-2xl p-6 bg-white/5 space-y-4 text-left">
            <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">Seus Passos de Inscrição</h3>
            
            {/* Step 1: Confirmed */}
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 text-xs">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Passo 1: Vaga Reservada</p>
                <p className="text-xs text-white/50">Seu e-mail e contato estão registrados na nossa lista.</p>
              </div>
            </div>

            {/* Step 2: Critical Pending Action */}
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 text-xs animate-pulse">
                !
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Passo 2: Entrar no Grupo VIP (Pendente)</p>
                <p className="text-xs text-white/50">O link exclusivo da aula gravada e os materiais serão enviados apenas dentro do WhatsApp.</p>
              </div>
            </div>
          </div>

          {/* Attention Banner */}
          <div className="flex items-center gap-3 text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-left leading-normal">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>Atenção:</strong> Não enviamos e-mails promocionais invasivos. A liberação do material complementar e o acesso à gravação serão disponibilizados exclusivamente no nosso canal VIP.
            </span>
          </div>

          {/* Pulse Action Button */}
          <div className="space-y-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-14 rounded-2xl group cursor-pointer flex items-center justify-center font-bold text-base transition-all duration-300 shadow-[0_8px_32px_0_rgba(16,185,129,0.35)] animate-cta-pulse border border-emerald-500/50"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-5 h-5 mr-2" />
                Entrar no Grupo VIP Grátis
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <p className="text-[10px] text-white/40">Você será redirecionado para o WhatsApp com segurança.</p>
          </div>

        </div>
      </div>

      <FooterSection settings={settings} />
    </main>
  );
}
