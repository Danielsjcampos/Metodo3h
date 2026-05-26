"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteSettings } from "@/lib/db";
import { toast } from "sonner";
import { 
  Palette, 
  Globe, 
  MapPin, 
  Share2, 
  MessageSquare, 
  Loader2, 
  Save, 
  Eye, 
  HelpCircle,
  Tag,
  Upload,
  Image as ImageIcon,
  Play
} from "lucide-react";

interface SettingsFormProps {
  initialSettings: SiteSettings;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof SiteSettings) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [fieldName]: true }));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar arquivo.");
      }

      setSettings(prev => ({
        ...prev,
        [fieldName]: data.url,
      }));
      toast.success("Arquivo enviado com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Não foi possível enviar o arquivo.");
    } finally {
      setIsUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (name: keyof SiteSettings) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar configurações.");
      }

      toast.success("Configurações atualizadas com sucesso!");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Não foi possível atualizar as configurações.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Identidade Visual */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <Palette className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-lg font-medium text-white">Identidade Visual</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Logotipo do Site (Texto)
            </label>
            <input
              type="text"
              name="logoText"
              value={settings.logoText}
              onChange={handleInputChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: SITECOMIA"
            />
            <span className="text-[10px] text-muted-foreground block">
              Texto que aparece no header da navegação e no rodapé do site.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Logotipo do Site (Imagem)
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="logoImage"
                  value={settings.logoImage || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all pr-12"
                  placeholder="Ex: /images/metodo3h logo.png"
                />
                <label className="absolute right-2 top-1.5 p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "logoImage")}
                    className="hidden"
                    disabled={isUploading["logoImage"]}
                  />
                  {isUploading["logoImage"] ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Upload className="w-4 h-4 text-white" />
                  )}
                </label>
              </div>

              {settings.logoImage && (
                <div className="w-16 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={settings.logoImage}
                    alt="Preview do Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground block">
              Imagem oficial do logotipo exibida na navegação e rodapé.
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEO & Metadados */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <Globe className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-lg font-medium text-white">SEO & Metadados (Google & Social Share)</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Título da Página (Meta Title)
              </label>
              <input
                type="text"
                name="seoTitle"
                value={settings.seoTitle}
                onChange={handleInputChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
                placeholder="Ex: Método 3h - Seu site no ar hoje"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Favicon (Ícone da aba)
              </label>
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    name="seoFavicon"
                    value={settings.seoFavicon}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all pr-12"
                    placeholder="Ex: /favicon.ico"
                  />
                  <label className="absolute right-2 top-1.5 p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/x-icon,image/png,image/svg+xml"
                      onChange={(e) => handleFileUpload(e, "seoFavicon")}
                      className="hidden"
                      disabled={isUploading["seoFavicon"]}
                    />
                    {isUploading["seoFavicon"] ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Upload className="w-4 h-4 text-white" />
                    )}
                  </label>
                </div>
                {settings.seoFavicon && (
                  <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-2 shrink-0">
                    <img
                      src={settings.seoFavicon}
                      alt="Favicon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                Imagem de Preview (og:image)
              </label>
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    name="seoImage"
                    value={settings.seoImage || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all pr-12"
                    placeholder="Ex: /images/preview.png"
                  />
                  <label className="absolute right-2 top-1.5 p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "seoImage")}
                      className="hidden"
                      disabled={isUploading["seoImage"]}
                    />
                    {isUploading["seoImage"] ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Upload className="w-4 h-4 text-white" />
                    )}
                  </label>
                </div>
                {settings.seoImage && (
                  <div className="w-16 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-1 shrink-0">
                    <img
                      src={settings.seoImage}
                      alt="Preview og:image"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Descrição do Site (Meta Description)
            </label>
            <textarea
              name="seoDescription"
              value={settings.seoDescription}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all resize-none"
              placeholder="Descreva seu site para motores de busca como o Google..."
            />
          </div>
        </div>
      </div>

      {/* 3. Localização Geográfica */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <MapPin className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-lg font-medium text-white">Localização Geográfica</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Cidade
            </label>
            <input
              type="text"
              name="geoCity"
              value={settings.geoCity}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: São José dos Campos"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Estado (UF)
            </label>
            <input
              type="text"
              name="geoState"
              value={settings.geoState}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: SP"
            />
          </div>
        </div>
      </div>

      {/* 4. Canais Sociais */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <Share2 className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-lg font-medium text-white">Canais de Redes Sociais</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Link do Instagram
            </label>
            <input
              type="url"
              name="socialInstagram"
              value={settings.socialInstagram}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: https://instagram.com/seu.perfil"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Link do YouTube
            </label>
            <input
              type="url"
              name="socialYoutube"
              value={settings.socialYoutube}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: https://youtube.com/c/seucanal"
            />
          </div>
        </div>
      </div>

      {/* Configurações de Vídeo (VSL & Depoimentos) */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <Play className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-lg font-medium text-white">Configurações de Vídeo (VSL & Depoimentos)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Vídeo do VSL (YouTube URL)
            </label>
            <input
              type="text"
              name="vslVideoUrl"
              value={settings.vslVideoUrl || ""}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
            <span className="text-[10px] text-muted-foreground block">
              O link do vídeo principal de apresentação (VSL) exibido na seção de demonstração.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Vídeo de Depoimentos (YouTube URL)
            </label>
            <input
              type="text"
              name="testimonialsVideoUrl"
              value={settings.testimonialsVideoUrl || ""}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
            <span className="text-[10px] text-muted-foreground block">
              O vídeo que roda de fundo/interativo na seção de prova social e depoimentos de alunos.
            </span>
          </div>
        </div>
      </div>

      {/* 5. Configurações de Preço */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/5">
          <Tag className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-lg font-medium text-white">Configurações de Preço</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Preço de Lançamento (R$)
            </label>
            <input
              type="text"
              name="launchPrice"
              value={settings.launchPrice || ""}
              onChange={handleInputChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: 97"
            />
            <span className="text-[10px] text-muted-foreground block">
              O valor com desconto exibido nos botões e seções de oferta.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Preço Regular (R$)
            </label>
            <input
              type="text"
              name="regularPrice"
              value={settings.regularPrice || ""}
              onChange={handleInputChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:outline-none transition-all"
              placeholder="Ex: 247"
            />
            <span className="text-[10px] text-muted-foreground block">
              O valor original riscado (âncora de preço) pós-lançamento.
            </span>
          </div>
        </div>
      </div>

      {/* 6. Widget de WhatsApp e Captura de Leads */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-medium text-white">Widget Flutuante do WhatsApp</h2>
          </div>
          
          {/* Custom Toggle Switch */}
          <button
            type="button"
            onClick={() => handleToggleChange("whatsappEnabled")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              settings.whatsappEnabled ? "bg-emerald-500" : "bg-white/10"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.whatsappEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {settings.whatsappEnabled ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Telefone / WhatsApp (DDI + DDD + Número)
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all"
                  placeholder="Ex: 5512999999999"
                />
                <span className="text-[10px] text-muted-foreground block">
                  Utilize apenas números com o código de país (55 para o Brasil).
                </span>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Mensagem Padrão Pré-preenchida
                </label>
                <textarea
                  name="whatsappMessage"
                  value={settings.whatsappMessage}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-emerald-500/50 focus:outline-none transition-all resize-none"
                  placeholder="Digite a mensagem padrão que o aluno enviará no chat..."
                />
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#3B82F6]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Como funciona o funil?
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  O botão flutuante aparecerá no canto inferior do site. Quando o usuário clicar, um popup solicitará seu **Nome** e **Telefone / WhatsApp**.
                </p>
                <p className="text-xs text-white/60 leading-relaxed">
                  Após preencher e enviar, a plataforma insere o usuário automaticamente na sua lista de leads (CRM) como <span className="text-[#3B82F6] font-medium">pending</span> e, em seguida, abre o redirecionamento seguro para o seu chat de suporte do WhatsApp.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <Eye className="w-4 h-4" />
                Funil de CRM ativo para este botão flutuante.
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            O botão flutuante de WhatsApp está desativado na landing page. Ative no switch acima para configurar.
          </p>
        )}
      </div>

      {/* Form Action */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#3B82F6]/90 disabled:opacity-50 text-black font-medium text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-black" />
              Salvar Configurações
            </>
          )}
        </button>
      </div>
    </form>
  );
}
