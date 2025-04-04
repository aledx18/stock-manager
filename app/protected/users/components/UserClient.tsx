'use client'

import '@github/relative-time-element'

import { Separator } from '@/components/ui/separator'

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
      <Separator />
      <DataTable searchKey='first_name' columns={columns} data={data} />
      <Separator />
    </>
  )
}
