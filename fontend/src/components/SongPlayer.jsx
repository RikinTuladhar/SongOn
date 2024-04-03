import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const SongPlayer = () => {
    const [dota,setData] = useState([]);
    const [audioSources,setaudioSources] = useState([]);
    // useEffect(()=>{
    //     axios.get("http://localhost:8080/songs").then((res)=>{
    //         return res.data 
    //     }).then((res)=>{
    //         console.log(res);
    //         setData(res);  
    //         res.forEach(song => {
    //            setaudioSources([ ...prev ,song.autoPath]);
    //         });
    //     })
    // },[])


    useEffect(() => {
        axios.get("http://localhost:8080/songs").then((res) => {
            return res.data;
        }).then((res) => {
            console.log(res);
            setData(res);  
            const paths = res.map(song => song.autoPath);
            setaudioSources(paths);
          
        });
    }, []);
    

        console.log(audioSources)
      const [currentIndex, setCurrentIndex] = useState(0);
      const audioRef = useRef(null);
    
      const previousSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + audioSources.length) % audioSources.length);
        audioRef.current.pause(); // Pause the audio before changing the source
        audioRef.current.load(); // Load the new source
        audioRef.current.play(); // Play the audio
      };
      
      const nextSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % audioSources.length);
        audioRef.current.pause(); // Pause the audio before changing the source
        audioRef.current.load(); // Load the new source
        audioRef.current.play(); // Play the audio
      };
      
    
      const backward = () => {
        audioRef.current.currentTime -= 10; // Go back 10 seconds
      };
    
      const forward = () => {
        audioRef.current.currentTime += 10; // Go forward 10 seconds
      };
      console.log(audioSources[currentIndex])
      return (
        <div>
          <h2>Next</h2>
          <audio ref={audioRef} autoPlay controls width="600px">
            <source src={audioSources[currentIndex]} type="video/mp4" />
          </audio>
    
          <button onClick={previousSong}>Previous Song</button>
          <button onClick={nextSong}>Next Song</button>
          <button onClick={backward}>Backward</button>
          <button onClick={forward}>Forward</button>

            <h1>Mapping ALl The list</h1>
            <ul>
                {dota.map((dota, index) => (
                    <li key={index}>{dota.name}</li>
                ))}
            </ul>

        </div>
      );
}

export default SongPlayer
