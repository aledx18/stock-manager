'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/authForm/form-error'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/lib/schema'
import { signInAction } from '../actions'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import CardWrapper from '@/components/authForm/card-wrapper'

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')

  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') || ''

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError('')
    startTransition(() => {
      signInAction(values)
    })
  }
  return (
    <div className='flex h-screen justify-center items-center'>
      <CardWrapper
        headerLabel='Welcome back'
        backButtonLabel="Don't have an account?"
        backButtonHref='/sign-up'
        showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='john.@email.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='******'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                    <Button
                      size='sm'
                      variant='link'
                      asChild
                      className='px-0 font-normal'
                    />
                  </FormItem>
                )}
              />
              <FormError message={urlError || error} />
            </div>
            <Button type='submit' className='w-full' disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
