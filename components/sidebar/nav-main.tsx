'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { ChevronRight, Store } from 'lucide-react'
import Link from 'next/link'

type CompanyName = {
  name: string
} | null

export function NavMain({ companyName }: { companyName: CompanyName }) {
  const pathname = usePathname()

  const data = {
    navMain: [
      {
        title: `${companyName?.name}`,
        url: '#',
        icon: Store,
        isActive: true,
        items: [
          {
            title: 'All',
            url: '/protected'
          },
          {
            title: 'Products',
            url: '#'
          },
          {
            title: 'Reports',
            url: '#'
          },
          {
            title: 'Sales',
            url: '#'
          },
          {
            title: 'Analitycs',
            url: '#'
          }
        ]
      }
    ]
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className='text-primary' />}
                  <span className='font-semibold'>{item.title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subItem.url}
                          className={clsx({
                            'bg-sidebar-accent': subItem.url === pathname,
                            'font-medium': true
                          })}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
