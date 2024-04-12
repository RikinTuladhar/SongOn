import React, { createContext, useRef, useState } from 'react'

export const PannelContext = createContext();

const PannelProvider = ({children}) => {



    const [audioSources, setaudioSources] = useState([]);
    const [nextSongState,setNextSongState] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);
    const previousSong = () => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + audioSources.length) % audioSources.length
        );
        // audioRef.current.pause(); // Pause the audio before changing the source
        audioRef.current.load(); // Load the new source
        audioRef.current.play(); // Play the audio
      };

      const nextSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % audioSources.length);
        // audioRef.current.pause(); // Pause the audio before changing the source
        audioRef.current.load(); // Load the new source
        audioRef.current.play(); // Play the audio
      };

      
  const backward = () => {
    audioRef.current.currentTime -= 10; // Go back 10 seconds
  };
  

  const forward = () => {
    audioRef.current.currentTime += 10; // Go forward 10 seconds
  };


    return (
    <PannelContext.Provider value={{audioRef,currentIndex,setCurrentIndex,audioSources,setaudioSources,nextSongState,setNextSongState,previousSong,nextSong,backward,forward}}>
      {children}
    </PannelContext.Provider>
  )
}

export default PannelProvider
