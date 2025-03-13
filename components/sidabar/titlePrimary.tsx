'use client'

import { BoxIcon } from 'lucide-react'
import Link from 'next/link'

export function TitlePrimary() {
  return (
    <Link
      href='/'
      className='flex justify-center items-center gap-2 data-[state=open]:text-sidebar-accent-foreground'>
      <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground'>
        <BoxIcon className='size-6' />
      </div>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>Stock Manager</span>
      </div>
    </Link>
  )
}
