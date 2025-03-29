'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { SignupFormSchema } from '@/lib/schema'
import { encodedRedirect } from '@/app/(auth-pages)/message'

export async function signUpAction(values: z.infer<typeof SignupFormSchema>) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const validatedFields = SignupFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return encodedRedirect('error', '/sign-up', 'Invalid fields')
  }

  const { email, name, password } = validatedFields.data

  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: `${name}`
      }
    }
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return encodedRedirect('error', '/sign-up', error.message)
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    )
  }
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
