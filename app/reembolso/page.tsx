import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import { BadgeHelp, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Política de Reembolso e Garantia - ${settings.logoText || "Método 3h"}`,
    description: "Conheça as diretrizes da nossa garantia incondicional de 7 dias e saiba como solicitar seu reembolso instantâneo.",
    icons: {
      icon: settings.seoFavicon || "/favicon.ico",
    },
  };
}

export default async function RefundPage() {
  const settings = await getSettings();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navigation settings={settings} />

      {/* Decorative Glow Background */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/5 blur-[100px] pointer-events-none" />

      {/* Hero Section Page Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative z-10 max-w-[1200px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-xs font-mono uppercase tracking-wider text-white/70">Garantia Blindada</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-light tracking-tight mb-6">
          Garantia e <span className="italic text-[#3B82F6]">Reembolso</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Temos total confiança na qualidade e velocidade de entrega do Método 3h. Por isso, seu risco é absolutamente zero.
        </p>
      </div>

      {/* Refund Policy Content */}
      <section className="pb-24 md:pb-32 px-6 relative z-10 max-w-[900px] mx-auto">
        <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 md:p-12 space-y-12">
          {/* Main Statement Box */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 border border-[#3B82F6]/20">
              <span className="text-3xl font-display font-bold text-[#3B82F6]">7</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-display font-medium">7 Dias de Garantia Incondicional</h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Você pode se matricular, acessar a área de membros, assistir às aulas e baixar os templates. Se por qualquer motivo você achar que o curso não é para você, basta solicitar o cancelamento em até 7 dias corridos após a compra.
              </p>
            </div>
          </div>

          {/* Refund details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <BadgeHelp className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">1. Como funciona a solicitação?</h2>
            </div>
            <div className="pl-11 space-y-4 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                O processo de reembolso é rápido, transparente e sem burocracia ou questionamentos:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>
                  <strong className="text-white">Plataformas de Pagamento:</strong> Se sua compra foi efetuada através de nossa integradora oficial (como Hotmart ou Stripe), você poderá solicitar o reembolso diretamente no painel do comprador deles com apenas um clique.
                </li>
                <li>
                  <strong className="text-white">Suporte Direto:</strong> Alternativamente, você pode nos contatar pelo canal de atendimento oficial enviando um e-mail ou mandando mensagem de suporte no WhatsApp.
                </li>
                <li>
                  <strong className="text-white">Estorno Completo:</strong> O estorno do valor pago (R$ {settings?.launchPrice || "97"}) é processado integralmente. Para pagamentos via Pix ou boleto, o saldo cai na sua conta em instantes ou em poucas horas. Para pagamentos via cartão de crédito, o valor é devolvido diretamente na fatura de seu banco.
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Box */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">2. Canais de Atendimento Rápidos</h2>
            </div>
            <div className="pl-11 space-y-6">
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Estamos prontos para te atender e processar suas dúvidas ou cancelamento com rapidez e respeito ao seu tempo:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white mb-1">Suporte via E-mail</h3>
                    <p className="text-xs text-white/50 leading-relaxed">Respostas completas enviadas em até 24 horas úteis.</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full text-xs cursor-pointer">
                    <a href="mailto:suporte@metodo3horas.com" className="inline-flex items-center gap-2">
                      suporte@metodo3horas.com <ArrowRight className="w-3 h-3" />
                    </a>
                  </Button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white mb-1">Suporte via WhatsApp</h3>
                    <p className="text-xs text-white/50 leading-relaxed">Atendimento dinâmico em tempo real de segunda a sexta.</p>
                  </div>
                  <Button asChild size="sm" className="w-full bg-white text-black hover:bg-white/90 text-xs cursor-pointer">
                    <a href={`https://wa.me/${settings?.whatsappNumber || "5512999999999"}?text=${encodeURIComponent(settings?.whatsappMessage || "Olá!")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      Falar no WhatsApp <ArrowRight className="w-3 h-3 text-black" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Last Update */}
          <div className="pt-8 border-t border-white/5 text-center text-xs text-white/40">
            Última atualização oficial realizada em: 22 de Maio de 2026.
          </div>
        </div>
      </section>

      <FooterSection settings={settings} />
      <WhatsAppWidget settings={settings} />
    </main>
  );
}
