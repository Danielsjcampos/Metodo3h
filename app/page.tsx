import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { VslSection } from "@/components/landing/vsl-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    icons: {
      icon: settings.seoFavicon || "/favicon.ico",
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

      {/* Hero: Seu site no ar hoje */}
      <HeroSection settings={settings} />

      {/* VSL: Veja o método ao vivo */}
      <VslSection />

      {/* O Problema: Você está pagando caro demais */}
      <FeaturesSection />

      {/* A Virada: A IA acabou com a barreira técnica */}
      <HowItWorksSection />

      {/* Quote: O que eu ensino aqui */}
      <MetricsSection />

      {/* Quem vai te ensinar: Daniel Marques */}
      <DevelopersSection />

      {/* O que você vai aprender: 7 módulos carrossel */}
      <InfrastructureSection />

      {/* Stack do curso: Ferramentas profissionais */}
      <IntegrationsSection />

      {/* Para quem é este curso */}
      <SecuritySection />

      {/* Depoimentos reais */}
      <TestimonialsSection />

      {/* FAQ: Suas perguntas */}
      <FaqSection settings={settings} />

      {/* Bônus que valem mais que o curso */}
      <PricingSection settings={settings} />

      {/* CTA: Garante sua vaga */}
      <CtaSection settings={settings} />

      {/* Footer */}
      <FooterSection settings={settings} />

      {/* Floating WhatsApp CRM lead capture button */}
      <WhatsAppWidget settings={settings} />
    </main>
  );
}
