import { createClient } from '@/supabase/server'
import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//   // The `/auth/callback` route is required for the server-side auth flow implemented
//   // by the SSR package. It exchanges an auth code for the user's session.
//   // https://supabase.com/docs/guides/auth/server-side/nextjs
//   const requestUrl = new URL(request.url)
//   const code = requestUrl.searchParams.get('code')
//   const origin = requestUrl.origin
//   const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString()

//   if (code) {
//     const supabase = await createClient()
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   if (redirectTo) {
//     return NextResponse.redirect(`${origin}${redirectTo}`)
//   }

//   // URL to redirect to after sign up process completes
//   return NextResponse.redirect(`${origin}/protected`)
// }

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/protected'

  // Solución robusta para obtener la URL base
  const host =
    request.headers.get('x-forwarded-host') || request.headers.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  console.log('baseUrl', baseUrl)
  console.log('next', next)

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code:', error)
      return NextResponse.redirect(`${baseUrl}/auth-error`)
    }

    return NextResponse.redirect(`${baseUrl}${next}`)
  }

  return NextResponse.redirect(`${baseUrl}/auth-error`)
}
