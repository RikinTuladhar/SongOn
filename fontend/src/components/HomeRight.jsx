import React, { useEffect, useState } from "react";
import CardLib from "./CardLib";
import axios from "axios";
const HomeRight = () => {
  const [artist,setArtist] = useState([])
  const [songList,setSongList] = useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:8080/genre").then((res)=>{
      setArtist(res.data)
      console.log(res.data[0].songs)
      


      console.log(res.data)
    }).catch((err)=>{
      console.log("Error is :" +err);
    })
    
  },[])

  return (
    <div className="w-[80%] h-auto overflow-y-auto  mt-3 px-10 py-10 bg-[#11111182] rounded-xl ">
      <h1
        className="text-2xl text-[#E5E7EB] "
      >
        Librarys
      </h1>
      <div className='w-full mt-3 h-[2px] bg-black  '></div>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-6 overflow-y-auto">
        {artist.map((card,id)=>(
          <CardLib id={card.id} name={card.name} songlist= {card.songs}/>
        ))}
      </div>

      </div>
   
  );
};

export default HomeRight;
