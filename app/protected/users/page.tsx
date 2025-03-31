// import { getCompanyUsers } from '../getUser'
import { getInitialData } from '../getInitialData'
import UserClient from './components/UserClient'

export interface Profile {
  email: string
  avatar: string
  first_name: string
}

export interface companyUsersColumnsType {
  user_id: string
  company_id: string
  role: string
  created_at: string
  email: string
  avatar: string
  first_name: string
}

export default async function UserPage() {
  const { companyUsers } = await getInitialData()

  const formattedUsers: companyUsersColumnsType[] = companyUsers
    ? companyUsers.map((item) => ({
        user_id: item.user_id,
        company_id: item.company_id,
        role: item.role,
        created_at: item.created_at as string,
        email: item.profile.email,
        avatar: item.profile.avatar || '',
        first_name: item.profile.first_name || ''
      }))
    : []

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <UserClient data={formattedUsers} />
      </div>
    </div>
  )
}
