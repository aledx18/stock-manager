export default function ProtectedPage() {
  return (
    <div className='@container/main flex flex-1 flex-col gap-2'>
      <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
        {/* <SectionCards /> */}
        <div className='px-4 lg:px-6'>
          <h1 className='text-2xl font-bold'>Stock manager</h1>
          <p className='text-muted-foreground text-sm'>Manage your stocks</p>
        </div>
        {/* <DataTable data={data} /> */}
        table
      </div>
    </div>
  )
}
