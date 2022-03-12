import React from 'react'

const PlaylistItem: React.FC<{
	playlist: SpotifyApi.PlaylistObjectSimplified
}> = (playlist) => {
	return (
		<div className='rounded shadow-lg w-80'>
			{playlist.playlist.images[0]?.url && (
				<img
					className='h-80 object-cover'
					src={playlist.playlist.images[0].url}
				/>
			)}
			<div className='px-6 py-4'>
				<div className='font-bold text-xl mb-2'>{playlist.playlist.name}</div>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					type='button'
				>
					Start
				</button>
			</div>
		</div>
	)
}

export default PlaylistItem
