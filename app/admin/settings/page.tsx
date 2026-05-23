import { getSettings } from "@/lib/db";
import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Configurações do Site - Painel Admin",
  description: "Gerencie o logotipo, SEO, favicon, geolocalização e o widget do WhatsApp do Método 3 Horas.",
};

export default async function AdminSettingsPage() {
  const initialSettings = await getSettings();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-light tracking-tight text-white md:text-4xl">
          Configurações do <span className="italic text-[#3B82F6]">Site</span>
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Controle a identidade visual, SEO, dados geográficos e configure o widget inteligente de geração de leads do WhatsApp exibido na página principal.
        </p>
      </div>

      {/* Interactive Settings Form */}
      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}
