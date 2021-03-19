import React, {useState, useRef} from "react";
//Import Styles
import "./styles/app.scss"
// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library'
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
      duration: null
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
        ...songInfo, currentTime: current, duration: duration //duration can be only duration
  })
}

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setSongInfo={setSongInfo}/>
      <Library setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
}

export default App;
