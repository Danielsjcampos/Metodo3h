export const dynamic = 'force-dynamic'
import { listarTermosPublicos } from '@/lib/glossario/queries'
import { getConfig } from '@/lib/settings'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const cfg = await getConfig()
  return {
    title: `Glossário — ${cfg.siteName}`,
    description: `Glossário completo de ${cfg.siteNiche || 'termos'} com definições detalhadas.`,
  }
}

export default async function GlossarioPage() {
  const [termos, cfg] = await Promise.all([listarTermosPublicos(), getConfig()])

  const porLetra = termos.reduce<Record<string, typeof termos>>((acc, t) => {
    if (!acc[t.letra]) acc[t.letra] = []
    acc[t.letra].push(t)
    return acc
  }, {})

  const letras = Object.keys(porLetra).sort()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">{cfg.siteName} — Glossário</h1>
      <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>
        {termos.length} termos sobre {cfg.siteNiche}
      </p>

      {/* Índice A-Z */}
      <div className="flex flex-wrap gap-2 mb-10">
        {letras.map((l) => (
          <a key={l} href={`#letra-${l}`}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all"
            style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
            {l}
          </a>
        ))}
      </div>

      {/* Termos por letra */}
      {letras.map((letra) => (
        <section key={letra} id={`letra-${letra}`} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              {letra}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {porLetra[letra].map((t) => (
              <Link key={t.id} href={`/glossario/${t.slug}`}
                className="glass rounded-xl p-4 hover:border-indigo-500/40 transition-all group">
                <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{t.termo}</h3>
                {t.resumo && <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--muted)' }}>{t.resumo}</p>}
              </Link>
            ))}
          </div>
        </section>
      ))}

      {termos.length === 0 && (
        <p className="text-center py-20" style={{ color: 'var(--muted)' }}>
          Nenhum verbete publicado ainda.
        </p>
      )}
    </div>
  )
}
