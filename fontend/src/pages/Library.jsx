import React, { useContext, useEffect, useState } from "react";
import HomeLeft from "../components/HomeLeft";
import LibraryLeft from "../components/LibraryLeft";
import LibraryRight from "../components/LibraryRight";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
const Library = () => {
  const {SongAPI,setSongAPi,API} = useContext(SongContext);
  const {reload,setReload} = useContext(ReloadContext);

  const {id} = useParams();
  const [songs, setSongs] = useState([]);
  // console.log(SongAPI)
  // alert(id)
  useEffect(()=>{
    axios.get(`${API}/by-genre/${id}`).then((res)=>{
      setSongAPi(`${API}/by-genre/${id}`)
      console.log(res.data)
      setSongs(res.data)
      setReload(!prev)
      
    })
  },[reload])

  return (
    <div className="w-full h-[120vh]  mt-[20vh] pt-5  md:mt-[10vh] bg-[#000000] flex justify-around">
     <LibraryLeft/>
     <LibraryRight songs={songs}/>
    </div>
  );
};

export default Library;
