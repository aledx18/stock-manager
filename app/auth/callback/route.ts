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
  const origin = requestUrl.origin
  const redirectTo =
    requestUrl.searchParams.get('redirect_to')?.toString() || '/protected'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${origin}/auth-error`)
    }

    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocalEnv = process.env.NODE_ENV === 'development'

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${redirectTo}`)
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${redirectTo}`)
    }
  }

  // Redirección por defecto (tanto para casos con/sin código)
  return NextResponse.redirect(`${origin}${redirectTo}`)
}
