import { cookies } from 'next/headers'

/** Verifica se há sessão admin (compatível com o auth por cookie do Método 3h) */
export async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get('session_token')?.value
}
