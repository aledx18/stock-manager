import { NavUser } from './nav-user'
import { getProfileData } from '@/app/protected/account/updatProfile'

export default async function NavUserData() {
  const data = await getProfileData()
  return <NavUser profileData={data} />
}
