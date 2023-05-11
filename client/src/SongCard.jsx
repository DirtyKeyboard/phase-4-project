import React from 'react'

const SongCard = ({song, click}) => {
    return (
        <div className="flex justify-top flex-col p-8 w-60 h-100 bg-gray-900 text-white shadow-lg hover:translate-y-3 
        hover:cursor-pointer hover:bg-gray-700 rounded-2xl transition-all ease-in-out duration-200"
        onClick={click}>
            <h1 className="text-2xl">{song.title}</h1>
            <h1 className="text-xl">By: {song.artist}</h1>
            <h1 className="text-l">Album: {song.album}</h1>
            <img alt="Album Cover"
                className="p-4 mt-2"
            src={song.album_cover}/>
        </div>
    )
}

export default SongCard