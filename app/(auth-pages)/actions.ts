'use server'

// import { headers } from 'next/headers'
// import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'
import { z } from 'zod'
import { LoginSchema } from '@/lib/schema'
import { encodedRedirect } from './message'

export async function signInAction(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return encodedRedirect('error', '/sign-in', 'Invalid fields')
  }

  const { email, password } = validatedFields.data

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }
}
