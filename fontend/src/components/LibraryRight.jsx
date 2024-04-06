import React, { useContext, useEffect } from 'react'
import { SongContext } from '../contextprovider/SongProvider'
import { ReloadContext } from '../contextprovider/ReloadProvider'
import axios from 'axios'
const LibraryRight = ({songs,artistName}) => {
  const {SongAPI,setSongAPi,setSongId} = useContext(SongContext)
  const {reload,setReload} = useContext(ReloadContext);


  // click play song 
  const handleSong = (id) =>{
    // console.log("song clicked" + id)
    setSongAPi( `http://localhost:8080/songs/${id}`);
    setSongId(id)
    setReload(!prev)
  }

  // useEffect(()=>{
  //   axios.get(`http://localhost:8080/artist/By-songid/${songId}`)
  // },[])
  
  return (
    <>
       <div className="w-[70%] h-[100vh] overflow-y-auto  mt-3 px-10 py-10 bg-[#090909] rounded-xl">
      <h1 className="text-2xl text-[#E5E7EB] ">Songs List  {artistName ? `: ${artistName} `: "" }</h1>
        <div className="w-full mt-3 h-[2px] bg-black "></div>
        {/* bottom  */}
       <div className="w-full h-auto mt-5"> 
       {/* songs list  */}
       <div className="w-full h-auto px-2 flex flex-col gap-2 py-10 bg-[#0f0f0f]">
        {/* headings */}
        <div className="text-[#E5E7EB] mb-5 px-10 w-full h-5 items-center  flex justify-between">
          <div className="w-[20%] text-lg text-left  font-bold"> #</div>
          <div className="w-full text-lg font-bold text-center">Song - Name</div>
          <div className="w-full text-lg font-bold text-center">Artists</div>
        </div>
        <div className="flex flex-col gap-2 px-2">

        {songs?.map((song,i)=>(
        <div onClick={e=>handleSong(song.id)} key={song.id}  className="text-[#E5E7EB] hover:cursor-pointer px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between">
        <div key={song.id}   className="w-[20%] text-left"> {i+1}</div>
        <div key={song.id} className="w-full text-center">{song?.name}</div>
        <div key={song.id} className="w-full text-center">{song?.artist?.slice(0,3).map((artist)=>(
        <span className='ml-3' key={artist?.id}>
        {artist?.name}
        </span>
        ))} <span>..</span> </div>
        </div> 
        ))}
  
        </div>
       </div>
       </div>

      </div>
    </>
  )
}

export default LibraryRight
