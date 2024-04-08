import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const SongContext = createContext();

const SongProvider = ({children}) => {
    const [SongAPI,setSongAPi] = useState("http://localhost:8080/songs")
    const [API,setAPI] = useState("https://songonbackend.onrender.com");
  
    const [play,setPlay] = useState(false);

    const [songId,setSongId] = useState(null)
    const [songName,setSongName] = useState(null);
    
    const [songDetails,setSongDetails] = useState([])
    const [ArtistDetails,setArtistDetails] = useState([])

    console.log(songDetails)  


    useEffect(()=>{
      axios.get(`${API}/songs/${songId}`).then((res)=>{
        setSongDetails(res.data)
        
      }).catch((err)=>{
        console.log(err)
      })

      axios.get(`${API}/artist/By-songid/${songId}`).then((res)=>{
        setArtistDetails(res.data)
      }).catch((err)=>{console.log(err)})


    },[songId])


  return (
    <SongContext.Provider value={{SongAPI,setSongAPi,songId,setSongId,songDetails,ArtistDetails,API,play,setPlay}}>
      {children}
    </SongContext.Provider>
  )
}

export default SongProvider
