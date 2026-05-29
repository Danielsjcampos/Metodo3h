import { Navigation } from "@/components/landing/navigation";
import { HeroCaptureSection } from "@/components/landing/hero-capture-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { MiddleCtaSection } from "@/components/landing/middle-cta";

import { MetricsSection } from "@/components/landing/metrics-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { VslSection } from "@/components/landing/vsl-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FinalCtaSection } from "@/components/landing/final-cta";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FooterSection } from "@/components/landing/footer-section";

import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.seoTitle || "Método 3h - Aula Prática Gratuita com IA";
  const description = settings.seoDescription || "Aprenda a colocar seu site profissional no ar hoje sem precisar programar e sem pagar por hospedagem com a nossa aula gratuita.";
  const previewImage = settings.seoImage || "/images/preview.png";
  
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
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
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

      {/* 1. Pre-Launch Waitlist Hero (Title rotation + Email/Name/WhatsApp Capture Form) */}
      <div id="inscricao">
        <HeroCaptureSection />
      </div>

      {/* 2. DEMONSTRAÇÃO / PROVA: Método em funcionamento real */}
      <VslSection settings={settings} />

      {/* 3. DOR & AGITAÇÃO: Conexão empática expondo o problema do mercado tradicional */}
      <FeaturesSection />

      {/* Middle CTA Button section for registration */}
      <MiddleCtaSection />

      {/* 5. ALINHAMENTO & EGO FEEDING: Mostra a quem pertence o ecossistema (Freelancer, Negócio Local, etc.) */}
      <SecuritySection />



      {/* 7. O OUTLOOK PROFISSIONAL: A stack de ferramentas que ele dominará */}
      <IntegrationsSection />

      {/* 8. LIDERANÇA / CREDIBILIDADE: Quem vai te ensinar (Dino com foto e carrossel de logos) */}
      <DevelopersSection showPartners={true} />

      {/* 9. Quote: O que eu ensino aqui */}
      <MetricsSection />

      {/* 10. Depoimentos reais */}
      <TestimonialsSection settings={settings} />

      {/* 11. A OFERTA IRRECUSÁVEL: O valor empilhado com os bônus detalhados por R$0,00 e selo 2timeweb */}
      <PricingSection settings={settings} />

      {/* Final CTA Button section for registration */}
      <FinalCtaSection />

      {/* 12. FAQ: Suas perguntas (Quebra de objeções) */}
      <FaqSection settings={settings} isWaitlist={true} />
      {/* Footer */}
      <FooterSection settings={settings} />

      {/* Floating WhatsApp CRM lead capture button */}
      <WhatsAppWidget settings={settings} />
    </main>
  );
}
