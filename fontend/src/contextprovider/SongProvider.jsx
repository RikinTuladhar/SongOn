import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const SongContext = createContext();

const SongProvider = ({children}) => {
    const [SongAPI,setSongAPi] = useState("http://localhost:8080/songs")
    const [songId,setSongId] = useState(null)
    const [songName,setSongName] = useState(null);

    console.log(songId)
    const [songDetails,setSongDetails] = useState([])
    const [ArtistDetails,setArtistDetails] = useState([])

    console.log(songDetails)  


    useEffect(()=>{
      axios.get(`http://localhost:8080/songs/${songId}`).then((res)=>{
        setSongDetails(res.data)
        
      }).catch((err)=>{
        console.log(err)
      })

      axios.get(`http://localhost:8080/artist/By-songid/${songId}`).then((res)=>{
        setArtistDetails(res.data)
      }).catch((err)=>{console.log(err)})


    },[songId])


  return (
    <SongContext.Provider value={{SongAPI,setSongAPi,songId,setSongId,songDetails,ArtistDetails}}>
      {children}
    </SongContext.Provider>
  )
}

export default SongProvider
