'use server'

import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { unstable_cache as cache } from 'next/cache'
import { Database } from '@/db_types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Company = Database['public']['Tables']['companies']['Row']
export type CompanyUsersType =
  Database['public']['Tables']['company_users']['Row'] & {
    profile: Profile
  }

export interface InitialData {
  profileData: Profile | null
  company: Company | null
  companyUsers: CompanyUsersType[] | null
}

export async function getInitialData(): Promise<InitialData> {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/sign-in')

  const getInitialDataCached = cache(
    async () => {
      console.log('🔴 Real consulta a DB (cache miss)')
      const [profileData, company] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          .then(({ data, error }) => (error ? null : data)),

        supabase
          .from('companies')
          .select('*')
          .eq('owner_id', user.id)
          .maybeSingle()
          .then(({ data, error }) => (error ? null : data))
      ])
      let companyUsers: CompanyUsersType[] | null = null
      if (company?.id) {
        companyUsers = await supabase
          .from('company_users')
          .select('*, profile:user_id (id, first_name, email, avatar)')
          .eq('company_id', company.id)
          .then(({ data, error }) =>
            error || !data
              ? null
              : data.map((user) => ({
                  ...user,
                  profile: {
                    ...user.profile,
                    created_at: user.created_at,
                    role: user.role,
                    updated_at: user.updated_at
                  }
                }))
          )
      }

      return {
        profileData,
        company,
        companyUsers
      }
    },
    ['initial-load-data', user.id],
    { revalidate: 3600, tags: [`initial-load-data-${user.id}`] }
  )

  return await getInitialDataCached()
}
