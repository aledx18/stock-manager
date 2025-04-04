'use server'

import { createClient } from '@/supabase/server'
import { z } from 'zod'

const InviteUserSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  companyId: z.string().min(1, { message: 'Company ID is required.' })
})

export async function inviteUserCompany(
  values: z.infer<typeof InviteUserSchema>
) {
  try {
    const validatedFields = InviteUserSchema.safeParse(values)

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid fields'
      }
    }
    const { email, companyId } = validatedFields.data
    const supabase = await createClient()

    const { error, data } = await supabase.rpc('invite_user_to_company', {
      user_email: email,
      target_company_id: companyId,
      user_role: 'member'
    })

    if (error) {
      return {
        success: false,
        message: error.message
      }
    }

    return {
      success: false,
      message: data
    }
  } catch (err) {
    console.error('Error inesperado:', err)
    return { success: false, message: 'Error inesperado al invitar usuario' }
  }
}
