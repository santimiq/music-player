import React from 'react'

const LibrarySong = ({song, setCurrentSong, audioRef, isPlaying, songs, setSongs, id}) => {

    const songSelectHandler = () => {
        setCurrentSong(song);
        audioRef.current.play();

        //Add Active State
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return{
                    ...song,
                    active: true
                }
            }
            else {
                return{
                    ...song,
                    active: false
                }
            }
        });
        setSongs(newSongs)
        //check if the song is playing
        if(isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                });
            }
        }
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>   
    )
}

export default LibrarySong;
