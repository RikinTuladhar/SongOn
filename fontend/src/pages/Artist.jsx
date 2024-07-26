import React, { useContext, useEffect, useState } from "react";
import LibraryLeft from '../components/LibraryLeft'
import LibraryRight from '../components/LibraryRight'
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { useParams } from "react-router-dom";
import ArtistApi from "../Apis/ArtistApi";
import ArtistMiddle from "../components/ArtistMiddle";
import { useDispatch, useSelector } from "react-redux";
import {handleSongArray} from "../Apis/SongSlice"
const Artist = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state)=> state?.song?.songs)
  const {songArray,setSongArray} = useContext(SongContext);
  const {reload,setReload} = useContext(ReloadContext);
  const {id} = useParams();
  // const [songs, setSongs] = useState([]);
  const {getArtistById,getSongByArtistId} = ArtistApi();
  // console.log(id)
  console.log(songs)
  useEffect(()=>{
    getArtistById(id).then((res)=>{
      // console.log(res.data.songs)
      // console.log(res)
      setReload(true)
    }).then((res)=>{
      getSongByArtistId(id).then((res)=>{
        // console.log(res);
        // setSongArray(res);c
        console.log("working inside arist")
        console.log(res)
        dispatch(handleSongArray(res))
      })
      return(()=>{
        setReload(false)
      })
    })

  },[reload])

  return (
    <div className="w-full h-[120vh]   pt-5 bg-[#000000] flex justify-around">
      {/* <LibraryLeft/> */}
      <ArtistMiddle songs={songs}/>
    </div>
  )
}

export default Artist
