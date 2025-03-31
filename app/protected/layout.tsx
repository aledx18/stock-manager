import { CSSProperties, ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SiteHeader } from '@/components/nav/SiteHeader'
import { getInitialData } from './getInitialData'

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const { profileData, company } = await getInitialData()

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 62)'
        } as CSSProperties
      }>
      <AppSidebar
        variant='inset'
        companyName={company?.name || 'name not found'}
        profileData={profileData}
      />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
