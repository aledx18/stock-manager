'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { FormModal } from './formModal'

export default function AddUser({
  companyId
}: {
  companyId: string | undefined
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <FormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        companyId={companyId}
      />
      <Button onClick={() => setOpen(true)}>
        <span className='sr-only'>Open menu</span>
        <Plus className='h-4 w-4' />
        Add New User
      </Button>
    </>
  )
}
