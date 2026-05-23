import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import { ShieldCheck, Eye, Lock, FileText } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Política de Privacidade - ${settings.logoText || "Método 3h"}`,
    description: "Entenda como protegemos e cuidamos dos seus dados pessoais em conformidade com a LGPD no Método 3h.",
    icons: {
      icon: settings.seoFavicon || "/favicon.ico",
    },
  };
}

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navigation settings={settings} />

      {/* Decorative Glow Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/5 blur-[100px] pointer-events-none" />

      {/* Hero Section Page Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative z-10 max-w-[1200px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-xs font-mono uppercase tracking-wider text-white/70">Segurança de Dados</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-light tracking-tight mb-6">
          Política de <span className="italic text-[#3B82F6]">Privacidade</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Esta política detalha como coletamos, usamos e protegemos suas informações pessoais de acordo com a LGPD (Lei Geral de Proteção de Dados).
        </p>
      </div>

      {/* Privacy Policy Content */}
      <section className="pb-24 md:pb-32 px-6 relative z-10 max-w-[900px] mx-auto">
        <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 md:p-12 space-y-12">
          {/* Item 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Eye className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">1. Coleta de Informações</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Coletamos informações essenciais para prover o melhor serviço possível. Isso inclui:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>
                  <strong className="text-white">Dados da Lista de Espera:</strong> Nome, endereço de e-mail e número de WhatsApp, fornecidos voluntariamente por você ao se cadastrar.
                </li>
                <li>
                  <strong className="text-white">Dados da Área de Membros:</strong> E-mail e senha criptografada (hash seguro) criados para autenticar seu acesso aos módulos e aulas do curso.
                </li>
                <li>
                  <strong className="text-white">Dados de Navegação:</strong> Informações técnicas anônimas de uso e desempenho da plataforma, para nos ajudar a otimizar a experiência geral.
                </li>
              </ul>
            </div>
          </div>

          {/* Item 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Lock className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">2. Uso e Finalidade dos Dados</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Seus dados pessoais são processados de forma segura e possuem finalidades estritamente conectadas ao serviço:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>Liberar e gerenciar seu login e progresso nas aulas no Portal do Aluno.</li>
                <li>Enviar avisos e notificações urgentes sobre o curso e novas turmas através de e-mail ou WhatsApp.</li>
                <li>Prestar suporte ao aluno e responder a solicitações de dúvidas técnicas ou administrativas.</li>
              </ul>
            </div>
          </div>

          {/* Item 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">3. Segurança e Armazenamento</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Temos o compromisso de manter a integridade dos seus dados pessoais sob o mais alto padrão de segurança:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>
                  <strong className="text-white">Banco de Dados:</strong> Armazenamos seus registros de forma segura no Neon PostgreSQL, uma infraestrutura de banco de dados robusta e protegida por criptografia de conexão SSL e firewalls rigorosos.
                </li>
                <li>
                  <strong className="text-white">Criptografia:</strong> As credenciais de acesso e dados confidenciais são protegidos com algoritmos modernos de hash de segurança (SHA-256), impedindo a leitura direta em qualquer circunstância.
                </li>
                <li>
                  <strong className="text-white">Ausência de Compartilhamento:</strong> Seus dados nunca serão vendidos, alugados ou compartilhados com terceiros sem seu consentimento expresso, exceto quando legalmente exigido.
                </li>
              </ul>
            </div>
          </div>

          {/* Item 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <FileText className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">4. Seus Direitos (LGPD)</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Como titular dos dados pessoais de acordo com a LGPD (Lei 13.709/2018), você possui direitos garantidos e pode solicitar a qualquer momento:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>Acesso aos dados que mantemos sobre você.</li>
                <li>Correção de informações incompletas ou incorretas.</li>
                <li>Exclusão permanente dos seus dados de nossa base de dados ativa (o que resultará no encerramento de sua conta e acesso à área de membros).</li>
              </ul>
              <p className="mt-4">
                Para exercer qualquer um desses direitos, entre em contato diretamente com o nosso canal oficial de suporte pelo e-mail ou WhatsApp listados no rodapé desta página.
              </p>
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
