import { createClient } from '@/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const origin = requestUrl.origin

  const supabase = await createClient()

  // Obtener el token de la URL correctamente desde query params
  const tokenHash = requestUrl.searchParams.get('token_hash')

  if (!tokenHash) {
    return NextResponse.redirect(`${origin}/sign-in?error=MissingToken`)
  }

  // Verificar el token con Supabase
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: 'email'
  })

  if (error) {
    return NextResponse.redirect(`${origin}/sign-in?error=InvalidToken`)
  }

  return NextResponse.redirect(`${origin}/protected`)
}
