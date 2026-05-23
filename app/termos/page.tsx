import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";
import { getSettings } from "@/lib/db";
import { Scale, Users, Award, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Termos de Uso - ${settings.logoText || "Método 3 Horas"}`,
    description: "Entenda os termos de uso, licença de código e regras da nossa área de membros do Método 3 Horas.",
    icons: {
      icon: settings.seoFavicon || "/favicon.ico",
    },
  };
}

export default async function TermsPage() {
  const settings = await getSettings();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navigation settings={settings} />

      {/* Decorative Glow Background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] left-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/5 blur-[100px] pointer-events-none" />

      {/* Hero Section Page Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative z-10 max-w-[1200px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <Scale className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-xs font-mono uppercase tracking-wider text-white/70">Condições Legais</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-light tracking-tight mb-6">
          Termos de <span className="italic text-[#3B82F6]">Uso</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Por favor, leia atentamente as diretrizes abaixo para entender suas permissões, responsabilidades e direitos ao se tornar aluno do Método 3 Horas.
        </p>
      </div>

      {/* Terms of Use Content */}
      <section className="pb-24 md:pb-32 px-6 relative z-10 max-w-[900px] mx-auto">
        <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 md:p-12 space-y-12">
          {/* Item 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Users className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">1. Acesso e Conta de Usuário</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Ao adquirir o curso ou se cadastrar na nossa plataforma:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>
                  <strong className="text-white">Acesso Individual:</strong> Sua conta e credenciais de acesso são estritamente pessoais e intransferíveis. O compartilhamento de logins com terceiros resultará no bloqueio imediato do acesso, sem reembolso.
                </li>
                <li>
                  <strong className="text-white">Duração do Acesso:</strong> O acesso padrão contratado garante a você a visualização de todas as aulas gravadas e downloads de arquivos pelo período de <strong className="text-white">1 (um) ano</strong> a partir da data de confirmação do pagamento.
                </li>
                <li>
                  <strong className="text-white">Responsabilidade das Credenciais:</strong> Você é inteiramente responsável por manter a confidencialidade de sua senha e por qualquer atividade que ocorra em sua conta no portal.
                </li>
              </ul>
            </div>
          </div>

          {/* Item 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Award className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">2. Licença de Uso dos Materiais e Códigos</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Toda a propriedade intelectual dos códigos fornecidos, vídeos explicativos, artes gráficas e templates é propriedade exclusiva do Método 3 Horas. Ao se tornar aluno, concedemos a você uma licença de uso limitada:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#3B82F6]">
                <li className="text-white/60">
                  <strong className="text-white">Você PODE:</strong> Utilizar os componentes, layouts, scripts SQL e templates desenvolvidos durante o curso para criar seus próprios sites e projetos comerciais de clientes reais, cobrando pelo seu trabalho.
                </li>
                <li className="text-[#3B82F6]/80 font-medium">
                  <strong className="text-white">Você NÃO PODE:</strong> Copiar, redistribuir, revender, republicar ou empacotar o código-fonte original dos nossos templates e projetos para criar cursos concorrentes, kits de venda de templates diretos ou distribuí-los em canais públicos ou grupos de compartilhamento de arquivos.
                </li>
              </ul>
            </div>
          </div>

          {/* Item 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <AlertCircle className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">3. Limitação de Responsabilidade</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                O Método 3 Horas ensina técnicas profissionais modernas utilizando as melhores práticas do mercado de desenvolvimento web acelerado por inteligência artificial. Contudo:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>Não garantimos ganhos financeiros específicos, resultados comerciais ou fechamento automático de contratos com clientes, pois o sucesso profissional depende integralmente da aplicação prática e dedicação individual de cada aluno.</li>
                <li>Não nos responsabilizamos pelo gerenciamento, custos ou falhas de provedores de hospedagem externos, serviços de infraestrutura de banco de dados (como Neon, AWS ou Supabase) ou quaisquer outras integrações de terceiros configuradas pelo aluno para seus próprios projetos.</li>
              </ul>
            </div>
          </div>

          {/* Item 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Scale className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium">4. Modificações e Suspensão</h2>
            </div>
            <div className="pl-11 space-y-3 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                Nos reservamos o direito de atualizar o escopo técnico do curso, alterar ou atualizar ferramentas de terceiras abordadas na grade curricular à medida que o mercado de tecnologia de IA evolui, garantindo que o curso permaneça sempre com conteúdos altamente práticos e atualizados.
              </p>
              <p>
                Comportamentos ofensivos, assédio a outros alunos na comunidade oficial ou atos de pirataria darão direito ao encerramento imediato de sua matrícula e exclusão da plataforma, sem possibilidade de reembolso.
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
