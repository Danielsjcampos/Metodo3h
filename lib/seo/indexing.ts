/**
 * 2time SEO — Indexação unificada Google + Bing
 * Notifica Google Indexing API + IndexNow em paralelo com log em banco.
 */

import { prisma } from '@/lib/prisma'
import { notifyGoogleIndexing, notifyIndexNow } from './instant-indexing'

export interface TriggerIndexingOptions {
  action?: 'URL_UPDATED' | 'URL_DELETED'
  origem?: string
  await?:  boolean
  forcar?: boolean
}

export async function triggerIndexing(url: string, options: TriggerIndexingOptions = {}) {
  const { action = 'URL_UPDATED', origem, await: aguardar = false, forcar = false } = options

  if (!aguardar) {
    void executarIndexacao(url, { action, origem, forcar }).catch(() => null)
    return
  }
  return executarIndexacao(url, { action, origem, forcar })
}

async function executarIndexacao(url: string, opts: { action: string; origem?: string; forcar: boolean }) {
  // Dedup: ignora se mesma URL foi enviada há menos de 1 min
  if (!opts.forcar) {
    const recente = await prisma.seoIndexingLog.findFirst({
      where: { url, motor: 'google', createdAt: { gte: new Date(Date.now() - 60_000) } },
    })
    if (recente) return
  }

  const [google, indexnow] = await Promise.allSettled([
    notifyGoogleIndexing(url, opts.action as any).then(async (r) => {
      await prisma.seoIndexingLog.create({
        data: { url, action: opts.action, motor: 'google', status: r.ok ? 'sent' : 'error', statusCode: (r as any).status, erro: r.error, origem: opts.origem },
      })
      return r
    }),
    notifyIndexNow([url]).then(async (r) => {
      await prisma.seoIndexingLog.create({
        data: { url, action: opts.action, motor: 'indexnow', status: r.ok ? 'sent' : 'error', statusCode: (r as any).status, erro: r.error, origem: opts.origem },
      })
      return r
    }),
  ])

  return { google, indexnow }
}
