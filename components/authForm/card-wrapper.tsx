/* eslint-disable no-undef */
'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import Social from '@/components/authForm/Social'
import BackButton from '@/components/authForm/BackButton'
import Header from '@/components/authForm/Header'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) {
  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <div className='relative text-center mx-6 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
        <span className='relative z-10 bg-card px-2 text-muted-foreground'>
          Or
        </span>
      </div>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
