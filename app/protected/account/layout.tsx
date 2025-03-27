import { ReactNode } from 'react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col px-10 flex-1'>
      <div className='flex items-center justify-between py-10'>
        <Heading title='Account' description='Manage your account' />
      </div>
      <Separator />
      {children}
    </div>
  )
}
