interface HeaderProps {
  label: string
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className='w-full flex flex-col gap-y-1 items-center justify-center'>
      <h1 className='text-xl font-semibold'>Stock manager</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}
