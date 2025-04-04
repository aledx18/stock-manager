import AccountForm from './accountForm'
import { getProfileData } from './updatProfile'

export default async function AccountPage() {
  const profileData = await getProfileData()

  return <AccountForm profileData={profileData} />
}
