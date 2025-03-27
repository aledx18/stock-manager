'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Database } from '@/db_types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateProfile } from '../getUser'
import { FormError } from '@/components/authForm/form-error'
import { FormSuccess } from '@/components/authForm/form-success'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileData = Database['public']['Tables']['profiles']['Row'] | null

export const formSchemaProfile = z.object({
  id: z.string(),
  first_name: z.string(),
  avatar: z.string()
})

export default function AccountForm({
  profileData
}: {
  profileData: ProfileData
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof formSchemaProfile>>({
    resolver: zodResolver(formSchemaProfile),
    defaultValues: {
      id: profileData?.id,
      first_name: profileData?.first_name || '',
      avatar: profileData?.avatar || ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchemaProfile>) {
    setError('')
    startTransition(() => {
      updateProfile(values).then(({ errorMessage, successMessage }) => {
        if (errorMessage) {
          setError(errorMessage)
        } else {
          setSuccess(successMessage)
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 mt-8 w-[700px] '>
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='UserName' disabled={isPending} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='avatar'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar Url</FormLabel>
              <div className='flex items-center gap-2'>
                <Avatar className='h-10 w-10 rounded-lg'>
                  <AvatarImage
                    src={profileData?.avatar || ''}
                    alt={profileData?.first_name || ''}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {profileData?.first_name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <FormControl>
                  <Input
                    placeholder='https://...'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </div>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type='submit'>
          {isPending ? <Loader2 className='h-4 w-4 animate-spin' /> : ''}
          Update
        </Button>
      </form>
    </Form>
  )
}
// https://lh3.googleusercontent.com/a/ACg8ocJK05mLaUMHb30pJr2V6gtxy_tuhtsHdxgzX29cauNXoDCEM8Qr=s96-c
