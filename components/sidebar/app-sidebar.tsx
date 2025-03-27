'use client'

import { ComponentProps } from 'react'
import { Frame, Map, PieChart, SquareTerminal } from 'lucide-react'

import { NavMain } from '@/components/sidebar/nav-main'
import { NavProjects } from '@/components/sidebar/nav-projects'
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
  // This is sample data.

  const data = {
    navMain: [
      {
        title: `${companyName?.name}`,
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'All',
            url: '/platforms'
          },
          {
            title: 'Nintendo',
            url: '/platforms/nintendo'
          },
          {
            title: 'Playstation',
            url: '/platforms/playstation'
          },
          {
            title: 'Sega',
            url: '/platforms/sega'
          },
          {
            title: 'Atari',
            url: '/platforms/atari'
          }
        ]
      }
    ],
    projects: [
      {
        name: 'D',
        url: '#',
        icon: Frame
      },
      {
        name: 'S',
        url: '#',
        icon: PieChart
      },
      {
        name: 'T',
        url: '#',
        icon: Map
      }
    ]
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TitlePrimary />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profileData={profileData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
