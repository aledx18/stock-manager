import { ReactNode } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidabar/app-sidebar'
import NavBar from '@/components/nav/navBar'

export default function ProtectedLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full h-svh'>
        <NavBar />
        {children}
      </main>
    </SidebarProvider>
  )
}
