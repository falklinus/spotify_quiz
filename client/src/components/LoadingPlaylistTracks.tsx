const LoadingPlaylistTracks = () => {
  const skeletonArray = Array.from(Array(20).keys())
  return (
    <div className='flex flex-col gap-2'>
      {skeletonArray.map((key) => (
        <div
          key={key}
          className='border rounded-lg flex shadow gap-4 items-center p-4 h-[98px]'
        >
          <div className='w-16 h-16 bg-gray-200 rounded' />
          <div>
            <p className='h-4 w-32 my-1 bg-gray-200 rounded'></p>
            <p className='h-[14px] w-20 my-[3px] bg-gray-100 rounded'></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingPlaylistTracks
