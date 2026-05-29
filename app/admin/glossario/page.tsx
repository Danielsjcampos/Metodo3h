export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { GlossarioAdmin } from '@/components/GlossarioAdmin'
import { getConfig } from '@/lib/settings'

export const metadata = { title: 'Glossário — Admin' }

export default async function GlossarioAdminPage() {
  const [termos, config] = await Promise.all([
    prisma.glossaryTerm.findMany({ orderBy: [{ letra: 'asc' }, { termo: 'asc' }], take: 500 }),
    getConfig(),
  ])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14', padding: '32px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Gerador de Glossário</h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24 }}>
          Nicho: <strong style={{ color: '#fff' }}>{config.siteNiche}</strong>
        </p>
        <GlossarioAdmin initialTermos={termos as any} defaultNicho={config.siteNiche} siteUrl={config.siteUrl} />
      </div>
    </div>
  )
}
