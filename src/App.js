import React, {useState, useRef} from "react";
//Import Styles
import "./styles/app.scss"
// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library'
import Nav from './components/Nav'
// Import Data
import data from './data';


function App() {
  // REF
  const audioRef = useRef(null);
  // STATE
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
      currentTime: null,
      duration: null,
      animationPercentage: 0
  });
  const [libraryStatus, setLibraryStatus ] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)
    setSongInfo({
        ...songInfo, currentTime: current, duration: duration, animationPercentage: animation, //duration can be only duration
  })
}
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song ) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);    
    if(isPlaying) audioRef.current.play();    
  }

  return (
    <div className={`App ${libraryStatus ? "library-active": ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setSongInfo={setSongInfo}/>
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} />
      <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
}

export default App;
