'use client'

import { workspaceLinks } from './pageLinks'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import clsx from 'clsx'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

export function NavMain() {
  const pathname = usePathname()

  return (
    <div className='flex justify-between flex-col flex-1 py-6'>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu>
          {workspaceLinks.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link
                  href={item.url}
                  className={clsx({
                    'bg-sidebar-accent font-semibold': item.url === pathname
                  })}>
                  {item.icon && <item.icon className='text-primary' />}
                  <span className=''>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>More</SidebarGroupLabel>
        <SidebarMenu>
          {workspaceLinks.moreLinks.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link
                  href={item.url}
                  className={clsx({
                    'bg-sidebar-accent font-semibold': item.url === pathname
                  })}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  )
}
