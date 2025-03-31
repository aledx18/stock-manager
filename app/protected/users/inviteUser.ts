'use server'

import { createClient } from '@/supabase/server'

export async function inviteUserCompany() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.rpc('invite_user_to_company', {
      user_email: 'aledx743@gmail.com',
      target_company_id: '8ec52ecf-3a47-4d00-9806-8284984dc744',
      user_role: 'member'
    })

    if (error) {
      console.error('Error invitando usuario:', error.message)
      return { success: false, message: error.message }
    }

    // Si la función retorna un mensaje (como en la versión mejorada)
    const message = data || 'Usuario invitado exitosamente'
    console.log(message)
    return { success: true, message }
  } catch (err) {
    console.error('Error inesperado:', err)
    return { success: false, message: 'Error inesperado al invitar usuario' }
  }
}
