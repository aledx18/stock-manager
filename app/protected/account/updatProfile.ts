'use server'

import { z } from 'zod'
import { unstable_cache as cache, revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { formSchemaProfile } from './accountForm'
import { createClient } from '@/supabase/server'

export async function getProfileData() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  const profileCached = cache(
    async (userId: string) => {
      console.log('getProfile 📝 data cached')

      const profileData = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({ data, error }) => (error ? null : data))

      return profileData
    },
    [`profile-data-${user}`],
    { revalidate: 14400, tags: [`profile-data-${user.id}`] }
  )

  return await profileCached(user.id)
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
