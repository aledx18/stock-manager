'use client'

import { ComponentProps } from 'react'
import { Frame, Map, PieChart, SquareTerminal } from 'lucide-react'

import { NavMain } from '@/components/sidabar/nav-main'
import { NavProjects } from '@/components/sidabar/nav-projects'
import { NavUser } from '@/components/sidabar/nav-user'
import { TitlePrimary } from '@/components/sidabar/titlePrimary'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/38964375?v=4'
  },
  navMain: [
    {
      title: 'Platforms',
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

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
