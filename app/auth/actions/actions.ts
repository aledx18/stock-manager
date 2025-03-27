'use server'

import { z } from 'zod'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { FormState, SignInOtpSchema, SignupFormSchema } from '@/lib/schema'
import { encodedRedirect } from '@/app/(auth-pages)/message'
import getUrl from '@/lib/getUrl'

// export async function exampleSignInWithOtp(values: z.infer<typeof SignInOtpSchema>) {
//   const origin = (await headers()).get('origin')
//   const validatedFields = SignInOtpSchema.safeParse(values)

//   if (!validatedFields.success) {
//     return encodedRedirect('error', '/sign-in', 'Invalid fields')
//   }

//   const { email } = validatedFields.data

//   const supabase = await createClient()

//   const { error } = await supabase.auth.signInWithOtp({
//     email,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`
//     }
//   })

//   if (error) {
//     return encodedRedirect('error', '/sign-in', error.message)
//   }

// }

export async function signInWithOtp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const origin = (await headers()).get('origin')

  const validatedFields = SignInOtpSchema.safeParse({
    email: formData.get('email')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { email } = validatedFields.data

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      shouldCreateUser: false
    }
  })

  if (error?.code === 'otp_disabled') {
    return {
      errorMessage: 'This email is not registered. Please try another email.'
    }
  }

  if (error) {
    return {
      errorMessage: error.message
    }
  }
  return { successMessage: 'Check your email for a verification link.' }
}

export async function signUpAction(values: z.infer<typeof SignupFormSchema>) {
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

export async function signInWithGoogle() {
  //   const origin = (await headers()).get('origin')

  // test
  console.log(`${getUrl('/auth/callback')}`)

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getUrl('/auth/callback')}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })

  if (error) {
    console.log(error)
    encodedRedirect('error', '/sign-in', error.message)
  }

  if (data.url) {
    redirect(data.url)
  }
}
