import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/glossario/guard'
import { prisma } from '@/lib/prisma'
import { gerarSlug, listarTermosAdmin } from '@/lib/glossario/queries'

async function requireAuth() {
  return (await isAuthed()) ? true : null
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const search = req.nextUrl.searchParams.get('search') ?? undefined
  const status = req.nextUrl.searchParams.get('status') ?? undefined
  const letra  = req.nextUrl.searchParams.get('letra')  ?? undefined
  const termos = await listarTermosAdmin({ search, status, letra })
  return NextResponse.json(termos)
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { termo, letra, nicho } = await req.json().catch(() => ({}))
  if (!termo?.trim()) return NextResponse.json({ error: 'termo é obrigatório' }, { status: 400 })
  try {
    const created = await prisma.glossaryTerm.create({
      data: { termo: termo.trim(), slug: gerarSlug(termo.trim()), letra: (letra || termo.trim().charAt(0)).toUpperCase(), nicho: nicho?.trim() || null, conteudo: '', publicado: false },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e: any) {
    if (e?.code === 'P2002') return NextResponse.json({ error: 'Termo duplicado' }, { status: 409 })
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, termo, nicho, publicado } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 })
  const data: any = {}
  if (termo    !== undefined) { data.termo = termo.trim(); data.slug = gerarSlug(termo.trim()); data.letra = termo.trim().charAt(0).toUpperCase() }
  if (nicho    !== undefined) data.nicho    = nicho?.trim() || null
  if (publicado !== undefined) data.publicado = publicado
  const updated = await prisma.glossaryTerm.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 })
  await prisma.glossaryTerm.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
