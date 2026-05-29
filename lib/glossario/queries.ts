import { prisma } from '@/lib/prisma'
import slugifyLib from 'slugify'

export function gerarSlug(termo: string) {
  return slugifyLib(termo, { lower: true, strict: true, locale: 'pt' })
}

export async function criarTermo(data: {
  termo: string; nicho?: string; conteudo: string; resumo?: string
  seoTitle?: string; publicado?: boolean; origem?: any
}) {
  return prisma.glossaryTerm.create({
    data: {
      ...data,
      slug:  gerarSlug(data.termo),
      letra: data.termo.trim().charAt(0).toUpperCase(),
    },
  })
}

export async function buscarTermoPorSlug(slug: string) {
  return prisma.glossaryTerm.findUnique({ where: { slug, publicado: true } })
}

export async function listarTermosPublicos(letra?: string) {
  return prisma.glossaryTerm.findMany({
    where: { publicado: true, ...(letra ? { letra: letra.toUpperCase() } : {}) },
    orderBy: [{ letra: 'asc' }, { termo: 'asc' }],
    select: { id: true, termo: true, slug: true, letra: true, resumo: true, views: true },
  })
}

export async function incrementarViews(slug: string) {
  await prisma.glossaryTerm.update({
    where: { slug },
    data:  { views: { increment: 1 } },
  }).catch(() => null)
}

export async function listarTermosAdmin(filters?: {
  search?: string; status?: string; letra?: string
}) {
  const where: any = {}
  if (filters?.search) where.OR = [
    { termo: { contains: filters.search, mode: 'insensitive' } },
    { nicho: { contains: filters.search, mode: 'insensitive' } },
  ]
  if (filters?.letra)            where.letra    = filters.letra.toUpperCase()
  if (filters?.status === 'publicado') where.publicado = true
  if (filters?.status === 'pendente')  where.publicado = false

  return prisma.glossaryTerm.findMany({
    where,
    orderBy: [{ letra: 'asc' }, { termo: 'asc' }],
    take: 500,
  })
}
