import React, { useContext, useEffect, useState } from "react";
import LibraryLeft from '../components/LibraryLeft'
import LibraryRight from '../components/LibraryRight'
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArtistMiddle from "../components/ArtistMiddle";
const Artist = () => {
  const {SongAPI,setSongAPi,API} = useContext(SongContext);
  const {reload,setReload} = useContext(ReloadContext);
  const {id} = useParams();
  const [songs, setSongs] = useState([]);
  const [artistName, setArtistName] = useState([]);
  useEffect(()=>{
    axios.get(`${API}/artist/${id}`).then((res)=>{
      console.log(res.data.songs)
      console.log(res.data)
      setSongs(res.data.songs)
      setArtistName(res.data.name)
      setReload(!prev)
    })
  },[reload])

  return (
    <div className="w-full h-[120vh]   pt-5 bg-[#000000] flex justify-around">
      {/* <LibraryLeft/> */}

      <ArtistMiddle artistName={artistName} songs={songs}/>
    </div>
  )
}

export default Artist
