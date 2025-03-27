'use client'

import { ComponentProps } from 'react'

import { NavMain } from '@/components/sidebar/nav-main'
import { NavUser } from '@/components/sidebar/nav-user'
import { TitlePrimary } from '@/components/sidebar/titlePrimary'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { Database } from '@/db_types'
import { NavPagesLinks } from './nav-pages'

type ProfileData = Database['public']['Tables']['profiles']['Row'] | null
type CompanyName = {
  name: string
} | null

export function AppSidebar({
  profileData,
  companyName,
  ...props
}: { profileData: ProfileData; companyName: CompanyName } & ComponentProps<
  typeof Sidebar
>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TitlePrimary />
      </SidebarHeader>
      <SidebarContent>
        <NavMain companyName={companyName} />
        <NavPagesLinks />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profileData={profileData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
