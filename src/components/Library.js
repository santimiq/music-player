import React from 'react'
import LibrarySong from './LibrarySong'
 

const  Library =({songs, setCurrentSong}) => {
    return (
        <div className="library">
           <h2 >Library</h2> 
           <div className="library-songs">
            {songs.map( song => (
                <LibrarySong 
                setCurrentSong={setCurrentSong} 
                song={song }
                key={song.id}
                id={song.id}
                songs={songs}
                 />
            ))}
           </div>
        </div>
    )
}

export default Library