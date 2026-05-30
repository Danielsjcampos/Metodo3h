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
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.seoTitle ? `${settings.seoTitle} (Matrícula Dev)` : "Método 3h (Edição Programador) - Matrícula Aberta";
  const description = settings.seoDescription || "Matrícula aberta para a edição premium focada em programadores. Crie sites profissionais com IA em apenas 3 horas.";
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
      url: "https://metodo3horas.com.br/programador/matricula",
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

export default async function ProgramadorMatriculaPage() {
  const settings = await getSettings();

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-black text-white"
      style={{
        backgroundImage: "radial-gradient(rgba(249,115,22,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <Navigation settings={settings} isProgrammer={true} isWaitlist={false} />

      {/* Hero: Seu site no ar hoje (Dev style) */}
      <HeroSection settings={settings} isProgrammer={true} />

      {/* VSL: Veja o método ao vivo (Dev style) */}
      <VslSection settings={settings} isProgrammer={true} />

      {/* O Problema: Você está pagando caro demais (Dev style) */}
      <FeaturesSection isProgrammer={true} />

      {/* O que você vai aprender: 8 módulos carrossel (Dev style) */}
      <InfrastructureSection isProgrammer={true} />

      {/* Para quem é este curso (Dev style) */}
      <SecuritySection isProgrammer={true} />

      {/* A Virada: O que você realmente vai aprender a fazer (Dev style) */}
      <HowItWorksSection isProgrammer={true} />

      {/* Stack do curso: Ferramentas profissionais (Dev style) */}
      <IntegrationsSection isProgrammer={true} />

      {/* Quem vai te ensinar: Daniel Marques (Dev style) */}
      <DevelopersSection isProgrammer={true} />

      {/* Quote: O que eu ensino aqui (Dev style) */}
      <MetricsSection isProgrammer={true} />

      {/* Depoimentos reais (Dev style) */}
      <TestimonialsSection settings={settings} isProgrammer={true} />

      {/* Bônus que valem mais que o curso (Dev style) */}
      <PricingSection settings={settings} isProgrammer={true} />

      {/* FAQ: Suas perguntas (Dev style) */}
      <FaqSection settings={settings} isProgrammer={true} />

      {/* Footer */}
      <FooterSection settings={settings} isProgrammer={true} />

      {/* Floating WhatsApp CRM lead capture button */}
      <WhatsAppWidget settings={settings} isProgrammer={true} />
    </main>
  );
}
