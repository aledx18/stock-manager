'use client'

import { ChevronsUpDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

import { Database } from '@/db_types'

type ProfileData = Database['public']['Tables']['profiles']['Row'] | null

export function NavUser({ profileData }: { profileData: ProfileData }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage
              src={profileData?.avatar || ''}
              alt={profileData?.first_name || ''}
            />
            <AvatarFallback className='rounded-lg'>
              {profileData?.first_name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {profileData?.first_name}
            </span>
            <span className='truncate text-xs'>{profileData?.email}</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
