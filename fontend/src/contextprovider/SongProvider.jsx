import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  // https://songonbackend.onrender.com


  const [count, setCount] = useState(0);
  const [clicked,setClicked] = useState(0);

  //passed around library and artist components
  const [songId, setSongId] = useState(null);
  //when clicked on song list it store that id used in library and artist 
  const [songClickedId,setSongClickedId] = useState(0);

  //used by library left for filling cards
  const [songDetails, setSongDetails] = useState([]);
  const [ArtistDetails, setArtistDetails] = useState([]);
  
  //all song list array used in library and artist 
  const [songArray,setSongArray] = useState([]);

  // console.log(songDetails + ArtistDetails)

  const handleClickOnSong = useCallback(() => {
    setCount(count + 1);
  }, [songDetails, count]);
  // console.log(count)


  return (
    <SongContext.Provider
      value={{
        songId,
        setSongId,
        songDetails,
        ArtistDetails,
        count,
        handleClickOnSong,
        songArray,
        setSongArray,
        songClickedId,
        setSongClickedId,
        clicked,
        setClicked
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
