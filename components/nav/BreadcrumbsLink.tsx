'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export default function BreadcrumbsLink() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((segment) => segment !== '')
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem className='hidden md:block'>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem> */}
        {/* {segments.length > 0 && <BreadcrumbSeparator />} */}
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
  )
}
