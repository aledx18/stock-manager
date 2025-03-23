import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import BreadcrumbsLink from './BreadcrumbsLink'
import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { signOutAction } from '@/app/auth/actions/actions'

export async function SiteHeader() {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }
  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <BreadcrumbsLink />
        <div className='ml-auto flex items-center gap-2'>
          {user ? (
            <div className='flex items-center gap-4'>
              <form action={signOutAction}>
                <Button type='submit' variant={'outline'}>
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </header>
  )
}
