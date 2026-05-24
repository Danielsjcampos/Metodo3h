import { Navigation } from "@/components/landing/navigation";
import { HeroCaptureSection } from "@/components/landing/hero-capture-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.seoTitle || "Método 3h - Aula Prática Gratuita com IA";
  const description = "Aprenda a colocar seu site profissional no ar hoje sem precisar programar e sem pagar por hospedagem com a nossa aula gratuita.";
  return {
    title: title,
    description: description,
    icons: {
      icon: settings.seoFavicon || "/favicon.ico",
    },
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: "https://metodo3horas.com.br",
      siteName: "Método 3h",
    },
  };
}

export default async function Home() {
  const settings = await getSettings();

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: "radial-gradient(rgba(59,130,246,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Navigation settings={settings} />

      {/* 1. Pre-Launch Waitlist Hero (Title rotation + Email/Name Capture Form) */}
      <HeroCaptureSection />

      {/* 2. DOR & AGITAÇÃO: A realidade do mercado tradicional e os 3 ganchos dos Avatares */}
      <FeaturesSection />

      {/* 3. A VIRADA: Apresentando o veículo (IA) que resolve o problema */}
      <HowItWorksSection />

      {/* 4. LIDERANÇA / CREDIBILIDADE: Quem é o mentor (Daniel) e os co-fundadores (Vinicius e Gabriel) */}
      <DevelopersSection showPartners={true} />

      {/* 5. Footer */}
      <FooterSection settings={settings} />

      {/* 6. Floating WhatsApp CRM lead capture button */}
      <WhatsAppWidget settings={settings} />
    </main>
  );
}
