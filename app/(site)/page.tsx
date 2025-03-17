import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <Button asChild variant='link' size='lg'>
        <Link href='/sign-in'>sign-in</Link>
      </Button>

      <h1>Inicio stock manager</h1>
    </div>
  )
}
