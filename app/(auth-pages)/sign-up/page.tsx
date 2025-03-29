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
import CardWrapper from '@/components/authForm/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Suspense, useState, useTransition } from 'react'
import { SignupFormSchema } from '@/lib/schema'
import { Input } from '@/components/ui/input'
import { FormSuccess } from '@/components/authForm/form-success'
import { FormError } from '@/components/authForm/form-error'
import { Button } from '@/components/ui/button'
import { signUpAction } from '@/app/auth/actions/signUpAction'

function MessageParams() {
  const searchParams = useSearchParams()

  const urlError = searchParams.get('error') || ''
  const urlSuccess = searchParams.get('success') || ''

  return (
    <>
      <FormError message={urlError} />
      <FormSuccess message={urlSuccess} />
    </>
  )
}

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    setError('')
    startTransition(() => {
      signUpAction(values)
    })
    form.reset()
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <CardWrapper
        headerLabel='Create a free account'
        backButtonLabel='Already have an account?'
        backButtonHref='/sign-in'
        showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='john'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder='you@example.com'
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
              <FormError message={error} />
              <Suspense>
                <MessageParams />
              </Suspense>
            </div>
            <Button
              type='submit'
              variant='secondary'
              className='w-full'
              disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
