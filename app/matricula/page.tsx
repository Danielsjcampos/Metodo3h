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
  const title = settings.seoTitle || "Método 3h - Seu site profissional com IA em 3 horas";
  const description = settings.seoDescription || "Aprenda a colocar seu site no ar hoje sem precisar programar e sem pagar por hospedagem cara com o Método 3h.";
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
      url: "https://metodo3horas.com.br/matricula",
      siteName: "Método 3h",
    },
  };
}

export default async function MatriculaPage() {
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

      {/* O que você vai aprender: 8 módulos carrossel */}
      <InfrastructureSection />

      {/* Para quem é este curso (Alinhamento de Ego / Identidade) */}
      <SecuritySection />

      {/* A Virada: O que você realmente vai aprender a fazer com o Método 3h */}
      <HowItWorksSection />

      {/* Stack do curso: Ferramentas profissionais */}
      <IntegrationsSection />

      {/* Quem vai te ensinar: Daniel Marques */}
      <DevelopersSection />

      {/* Quote: O que eu ensino aqui */}
      <MetricsSection />

      {/* Depoimentos reais */}
      <TestimonialsSection />

      {/* Bônus que valem mais que o curso (Oferta e valor empilhado) */}
      <PricingSection settings={settings} />

      {/* FAQ: Suas perguntas (Quebra de objeções após o preço) */}
      <FaqSection settings={settings} />

      {/* CTA: Garanta sua vaga (Purchase Card) */}
      <CtaSection settings={settings} showForm={false} />

      {/* Footer */}
      <FooterSection settings={settings} />

      {/* Floating WhatsApp CRM lead capture button */}
      <WhatsAppWidget settings={settings} />
    </main>
  );
}
