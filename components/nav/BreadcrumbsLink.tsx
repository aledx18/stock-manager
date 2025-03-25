'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export default function BreadcrumbsLink() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter((segment) => segment !== '')
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments?.map((item, index) => (
          <Fragment key={item}>
            <BreadcrumbItem>
              <Link
                href={`/${segments.slice(0, index + 1).join('/')}`}
                className={
                  pathname === `/${segments.slice(0, index + 1).join('/')}`
                    ? 'text-secondary-foreground'
                    : 'hover:text-foreground transition-colors'
                }>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </BreadcrumbItem>
            {index < segments.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
