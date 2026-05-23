import { Navigation } from "@/components/landing/navigation";
import { HeroProgrammerSection } from "@/components/landing/hero-programmer-section";
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
  const title = "Método 3 Horas (Edição Programador) - Crie Sites com IA";
  const description = "Aprenda a criar sites profissionais com IA em apenas 3 horas. Edição premium com foco em programadores e entusiastas de tecnologia com Matrix Code Rain.";
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
      url: "https://metodo3horas.com.br/programador",
      siteName: "Método 3 Horas",
    },
  };
}

export default async function ProgramadorPage() {
  const settings = await getSettings();

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: "radial-gradient(rgba(34,197,94,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Navigation settings={settings} />

      {/* 1. ATENÇÃO: Seu site no ar hoje (Edição Programador com Matrix Code Rain) */}
      <HeroProgrammerSection settings={settings} />

      {/* 2. DEMONSTRAÇÃO / PROVA: Método em funcionamento real */}
      <VslSection />

      {/* 3. DOR & AGITAÇÃO: Conexão empática expondo o problema do mercado tradicional */}
      <FeaturesSection />

      {/* 4. SOLUÇÃO / A VIRADA: Apresentando o veículo (IA) que resolve o problema */}
      <HowItWorksSection />

      {/* 5. ALINHAMENTO & EGO FEEDING: Mostra que ele pertence ao ecossistema (Freelancer, Negócio Local, etc.) */}
      <SecuritySection />

      {/* 6. A JORNADA: Detalhamento dos 7 módulos práticos do curso */}
      <InfrastructureSection />

      {/* 7. O OUTLOOK PROFISSIONAL: A stack de ferramentas que ele dominará */}
      <IntegrationsSection />

      {/* 8. LIDERANÇA / CREDIBILIDADE: Quem é o mentor (Daniel) e sua filosofia */}
      <DevelopersSection />
      <MetricsSection />

      {/* 9. PROVA SOCIAL: Depoimentos e validação real do método */}
      <TestimonialsSection />

      {/* 10. A OFERTA IRRECUSÁVEL: O valor empilhado com os bônus detalhados por R$0,00 */}
      <PricingSection settings={settings} />

      {/* 11. ANTIMÍSSIL DE OBJEÇÕES: FAQ colocado cirurgicamente ao lado do preço final */}
      <FaqSection settings={settings} />

      {/* 12. FECHAMENTO SEGURO: Chamada à ação final antes do rodapé */}
      <CtaSection settings={settings} />

      {/* Footer */}
      <FooterSection settings={settings} />

      {/* Floating WhatsApp CRM lead capture button */}
      <WhatsAppWidget settings={settings} />
    </main>
  );
}
