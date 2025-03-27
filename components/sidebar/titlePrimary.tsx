'use client'

import { BadgePercentIcon } from 'lucide-react'
import Link from 'next/link'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

export function TitlePrimary() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className='data-[slot=sidebar-menu-button]:!p-1.5'>
          <Link href='/'>
            <BadgePercentIcon className='!size-5' />
            <span className='text-base font-semibold'>Stock Manager.</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
