/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'
import '@github/relative-time-element'
import { companyUsersColumnsType } from '../page'
import { User2Icon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<companyUsersColumnsType>[] = [
  {
    accessorKey: 'first_name',
    header: 'Name'
  },

  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <>
        {row.original.role === 'owner' ? (
          <Badge variant='admin'>Owner</Badge>
        ) : (
          <Badge variant='secondary'>Member</Badge>
        )}
      </>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'avatar',
    header: 'Picture',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.avatar ? (
          <img
            src={row.original.avatar}
            alt='avatar'
            className='h-8 w-8 rounded-full'
          />
        ) : (
          <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center'>
            <User2Icon />
          </div>
        )}
      </div>
    )
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
    cell: ({ row }) => (
      // @ts-ignore
      <relative-time datetime={row.original.created_at} title='' />
    )
  },
  {
    id: 'actions',
    cell: () => <CellAction />
  }
]
