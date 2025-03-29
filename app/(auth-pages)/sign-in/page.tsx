/* eslint-disable no-unused-vars */
'use client'

import CardWrapper from '@/components/authForm/card-wrapper'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormSuccess } from '@/components/authForm/form-success'
import { FormError } from '@/components/authForm/form-error'
import { Button } from '@/components/ui/button'
import { signInWithOtp } from '@/app/auth/actions/signInAction'

export interface signInWithOtpFormData {
  email: string
}

export interface ActionResponse {
  success: boolean
  message: string
  inputs?: signInWithOtpFormData
  errors?: {
    [K in keyof signInWithOtpFormData]?: string[]
  }
}

const initialState: ActionResponse = {
  success: false,
  message: ''
}

export default function Page() {
  const [state, action] = useActionState(signInWithOtp, initialState)
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
                required
                defaultValue={state?.inputs?.email}
                disabled={pending}
              />
              {state?.errors?.email && (
                <p className='text-destructive text-sm'>
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            {state?.message &&
              (state.success ? (
                <FormSuccess message={state.message} />
              ) : (
                <FormError message={state.message} />
              ))}
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
