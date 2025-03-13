'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export default function NavBar() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((segment) => segment !== '')
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {segments.length > 0 && <BreadcrumbSeparator />}
            {segments?.map((item, index) => (
              <Fragment key={item}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${segments.slice(0, index + 1).join('/')}`}
                    className={
                      pathname === `/${segments.slice(0, index + 1).join('/')}`
                        ? 'text-secondary-foreground'
                        : ''
                    }>
                    {item}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
