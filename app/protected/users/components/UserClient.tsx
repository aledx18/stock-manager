'use client'

import { Plus } from 'lucide-react'
import '@github/relative-time-element'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'

import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { companyUsersColumnsType } from '../page'

export default function UserClient({
  data
}: {
  data: companyUsersColumnsType[]
}) {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Users (${data.length})`} description='Manage Users' />
        <Button>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='first_name' columns={columns} data={data} />
      <Separator />
    </>
  )
}
