'use server'

import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { formSchemaProfile } from './account/accountForm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function getProfileData() {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profileData = error || !data ? null : data

  return profileData
}

export async function updateProfile(values: z.infer<typeof formSchemaProfile>) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: values.first_name,
      avatar: values.avatar
    })
    .eq('id', values.id as string)

  if (error) {
    return { errorMessage: error.message }
  }
  revalidatePath('/protected')
  return { successMessage: 'profile updated' }
}

export async function getCompanyName() {
  const supabase = await createClient()

  const { data: { user } = {} } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  const { data, error } = await supabase
    .from('companies')
    .select('name')
    .eq('owner_id', user.id)
    .single()

  // Assuming the user is an admin and has a company
  return error || !data ? null : data
}

// export async function testOne() {
//   const supabase = await createClient()

//   const { data, error } = await supabase.rpc('invite_user_to_company', {
//     user_email: 'aledx743@gmail.com',
//     target_company_id: '2b3582d8-933e-4347-9e0f-4333fc8f24c9',
//     user_role: 'member'
//   })

//   if (error) console.log('Error invitando:', error.message)
//   else console.log('Invitación exitosa!', data)
// }

// export async function test() {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .from('company_users')
//     .select('*')
//     .eq('company_id', '2b3582d8-933e-4347-9e0f-4333fc8f24c9')

//   if (error) console.error('Error:', error.message)
//   else console.log('Miembros:', data)
// }
