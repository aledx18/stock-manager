import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/sign-in', req.url), {
    status: 302
  })
}
