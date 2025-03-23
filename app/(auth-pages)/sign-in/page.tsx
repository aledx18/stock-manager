'use client'

import { useFormStatus } from 'react-dom'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useActionState } from 'react'
import CardWrapper from '@/components/authForm/card-wrapper'
import { FormError } from '@/components/authForm/form-error'
import { FormSuccess } from '@/components/authForm/form-success'
import { signInWithOtp } from '@/app/auth/actions/actions'

export default function Page() {
  const [state, action] = useActionState(signInWithOtp, undefined)
  const { pending } = useFormStatus()

  return (
    <div className='flex h-screen justify-center items-center'>
      <CardWrapper
        headerLabel='Welcome back'
        backButtonLabel="Don't have an account?"
        backButtonHref='/sign-up'
        showSocial>
        <form action={action} className='space-y-4'>
          <div className='space-y-4'>
            <div className='grid gap-2'>
              <Label
                className='data-[error=true]:text-destructive'
                htmlFor='email'>
                Email
              </Label>
              <Input
                id='email'
                name='email'
                placeholder='m@example.com'
                type='email'
                disabled={pending}
              />
              {state?.errors?.email && (
                <p className='text-destructive text-sm'>{state.errors.email}</p>
              )}
            </div>
            {state?.errorMessage && <FormError message={state.errorMessage} />}
            {state?.successMessage && (
              <FormSuccess message={state.successMessage} />
            )}
          </div>
          <Button
            aria-disabled={pending}
            variant={'secondary'}
            type='submit'
            className='w-full'
            disabled={pending}>
            {pending ? 'Submitting...' : 'Sign in'}
          </Button>
        </form>
      </CardWrapper>
    </div>
  )
}
