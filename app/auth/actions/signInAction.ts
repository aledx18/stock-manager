'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { SignInOtpSchema } from '@/lib/schema'
import { encodedRedirect } from '@/app/(auth-pages)/message'
import getUrl from '@/lib/getUrl'
import {
  ActionResponse,
  signInWithOtpFormData
} from '@/app/(auth-pages)/sign-in/page'

export async function signInWithOtp(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const origin = (await headers()).get('origin')

  try {
    const rawData: signInWithOtpFormData = {
      email: formData.get('email') as string
    }
    const validatedData = SignInOtpSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors and try again.',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData
      }
    }

    // -------------
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email: validatedData.data.email,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        shouldCreateUser: false
      }
    })

    if (error?.code === 'otp_disabled') {
      return {
        success: false,
        message: 'This email is not registered. Please try another email.',
        inputs: rawData
      }
    }

    if (error) {
      return {
        success: false,
        message: error.message
      }
    }
    return {
      success: true,
      message: 'Check your email for a verification link.'
    }
  } catch {
    return {
      success: false,
      message: 'An unexpected error occurred'
    }
  }
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

  console.log(data.url)

  if (data.url) {
    redirect(data.url)
  }
}
