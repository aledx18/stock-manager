'use client'

import { BoxIcon } from 'lucide-react'
import Link from 'next/link'

export function TitlePrimary() {
  return (
    <Link
      href='/protected'
      className='flex justify-center items-center data-[state=open]:text-sidebar-accent-foreground'>
      <div className='flex aspect-square size-9 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground'>
        <BoxIcon />
      </div>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>Stock Manager</span>
      </div>
    </Link>
  )
}
