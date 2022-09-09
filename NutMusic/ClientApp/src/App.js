import './App.css';
import { Route } from 'react-router';
import { Home } from './components/Home';
import Player from './Player/Player'
import { songsdata } from './Player/audios';
import { useRef, useState, useEffect } from 'react';


const App = () => {
    const [songs, setSongs] = useState(songsdata);
    const [isplaying, setisplaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(songsdata[1]);

    const audioElem = useRef();

    useEffect(() => {
        if (isplaying) {
            audioElem.current.play();
        }
        else {
            audioElem.current.pause();
        }
    }, [isplaying])

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;

        setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

    }

    return (
        <div className="App">
            <img className="AlbumImage" src="/images/album2.jpeg" alt="" />
            <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
            <audio src="/music/havana.mp3" ref={audioElem} onTimeUpdate={onPlaying} />
        </div>
    );
}

export default App;