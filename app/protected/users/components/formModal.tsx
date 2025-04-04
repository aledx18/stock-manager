'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/modals/modal'
import { Input } from '@/components/ui/input'
import { inviteUserCompany } from '../inviteUser'
import { FormSuccess } from '@/components/authForm/form-success'
import { FormError } from '@/components/authForm/form-error'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'

export const InviteUserSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  companyId: z.string().min(1, { message: 'Company ID is required.' })
})

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  companyId: string | undefined
}
export const FormModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  companyId
}: {
  isOpen: boolean
  onClose: () => void
  companyId: string | undefined
}) => {
  const [error, setError] = useState<string | undefined>('')
  const [isMounted, setIsMounted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof InviteUserSchema>>({
    resolver: zodResolver(InviteUserSchema),
    defaultValues: {
      companyId,
      email: ''
    }
  })

  function onSubmit(values: z.infer<typeof InviteUserSchema>) {
    setError('')
    startTransition(() => {
      inviteUserCompany(values).then((res) => {
        if (!res.success) {
          setError(res.message)
        }
      })
    })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleClose = () => {
    setError('')
    form.reset()
    setSuccess('')
    onClose()
  }

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title='Invite User'
      description='Please enter the email of the user you want to invite.'
      isOpen={isOpen}
      onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            <div className='grid gap-2'>
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
              <input type='hidden' name='companyId' value={companyId} />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>

          <div className='pt-2 space-x-2 flex items-center justify-end w-full'>
            <Button
              aria-disabled={isPending}
              variant={'secondary'}
              type='submit'
              disabled={isPending}>
              {isPending ? 'Submitting...' : 'Invite User'}
            </Button>
            <Button variant='outline' type={'button'} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
