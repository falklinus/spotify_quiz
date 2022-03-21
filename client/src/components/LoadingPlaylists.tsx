const LoadingPlaylists = () => {
  const skeletonArray = Array.from(Array(20).keys())
  return (
    <div className='grid gap-y-4 xs:grid-cols-[repeat(auto-fill,minmax(216px,1fr))] w-[calc(64rem-4vmin)] max-w-[calc(100vw-4vmin)]'>
      {skeletonArray.map((key) => (
        <div key={key} className='flex justify-center'>
          <div className='rounded-lg border shadow'>
            <div className='h-[200px] w-full xs:w-[200px] bg-gray-200' />
            <div className='h-[40px] w-full px-6 py-3 flex items-center justify-center'>
              <p className='h-3 w-20 bg-gray-100 rounded' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingPlaylists
