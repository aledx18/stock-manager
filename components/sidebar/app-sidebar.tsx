import { NavMain } from '@/components/sidebar/nav-main'
import { TitlePrimary } from '@/components/sidebar/titlePrimary'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import NavUserData from './nav-user-data'
import { Suspense } from 'react'
import NavUserSkeleton from './components/nav-user-skeleton'

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <TitlePrimary />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavUserData />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
