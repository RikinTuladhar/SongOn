import React, { useContext, useEffect, useState } from "react";
import LibraryLeft from '../components/LibraryLeft'
import LibraryRight from '../components/LibraryRight'
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { useParams } from "react-router-dom";
import ArtistApi from "../Apis/ArtistApi";
import axios from "axios";
import ArtistMiddle from "../components/ArtistMiddle";

const Artist = () => {
  const {songArray,setSongArray} = useContext(SongContext);
  const {reload,setReload} = useContext(ReloadContext);
  const {id} = useParams();
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const {getArtistById,getSongByArtistId} = ArtistApi();
  console.log(id)
  useEffect(()=>{
    getArtistById(id).then((res)=>{
      // console.log(res.data.songs)
      console.log(res)
    
      
      setReload(true)
    }).then((res)=>{
      getSongByArtistId(id).then((res)=>{
        console.log(res);
        setSongArray(res);

      })
      return(()=>{
        setReload(false)
      })
    })

   
  },[reload])

  return (
    <div className="w-full h-[120vh]   pt-5 bg-[#000000] flex justify-around">
      {/* <LibraryLeft/> */}

      <ArtistMiddle songs={songArray}/>
    </div>
  )
}

export default Artist
