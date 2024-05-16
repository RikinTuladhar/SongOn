import React, { useContext, useEffect } from 'react'
import { SongContext } from '../contextprovider/SongProvider'
import { ReloadContext } from '../contextprovider/ReloadProvider'
import axios from 'axios'
const ArtistMiddle = ({songs,artistName}) => {
  const {setSongId,setSongClickedId} = useContext(SongContext)
  const {reload,setReload} = useContext(ReloadContext);


  // click play song 
  const handleSong = (songId,clickedSongId) =>{
    // console.log("song clicked" + id)
    // setSongAPi( `${API}/songs/${id}`);
    setSongId(songId)
    setSongClickedId(clickedSongId);
    console.log(songId)
    console.log(clickedSongId)
    setReload(true)
    setReload(false)
  }
  
  return (
    <>
       <div className="w-full md:w-[70%] h-[100vh] overflow-y-auto  mt-10 md:mt-3 px-5 md:px-10 py-10 bg-[#090909] rounded-xl">
      <h1 className="text-lg  md:text-2xl text-[#E5E7EB] ">Songs List  {artistName ? `: ${artistName} `: "" }</h1>
        <div className="w-full mt-10 md:mt-3 h-[2px] bg-black "></div>
        {/* bottom  */}
       <div className="w-full h-auto mt-5"> 
       {/* songs list  */}
       <div className="w-full h-auto px-2 flex justify-center items-center flex-col gap-2 py-4 md:py-10 bg-[#0f0f0f]">
        {/* headings */}
        {/* <div className="text-[#E5E7EB] mb-5 md:px-10 w-full h-5 items-center  flex justify-around md:justify-between">
          <div className=" md:w-[20%] text-base md:text-lg text-left  font-bold"> #</div>
          <div className="text-base font-bold text-center md:w-full md:text-lg">Song - Name</div> */}
          {/* <div className="w-full text-base font-bold text-center md:text-lg">Artists</div> */}
        {/* </div> */}
       
        <div className="text-[#E5E7EB] mt-5 mb-5 md:px-10 w-full  items-center flex-wrap flex justify-around md:justify-between">

        {
        songs?.length === 0 ? (<div className='text-xl tracking-wider'>No Songs Available</div>) : 
        songs?.map((song,i)=>(
        <div onClick={e=>handleSong(song.id,i)} key={song.id}  className="text-[#E5E7EB] hover:cursor-pointer  md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] gap-2 flex justify-around md:justify-between">
        <div key={song.id}   className="md:w-[20%] text-base md:text-lg text-left  font-bold"> {i+1}</div>
        <div key={song.id} className="text-base font-bold text-center md:w-full md:text-lg">{(song?.name?.length < 25) ? (song?.name) : (song?.name.slice(0,6) + "...")}</div>
        {/* <div key={song.id} className="text-center md:w-full">{song?.artist?.slice(0,3).map((artist)=>(
        <span className='ml-3' key={artist?.id}>
        {artist?.name}
        </span>
        ))} <span>..</span> </div> */}
        </div> 
        ))}
  
        </div>
       </div>
       </div>

      </div>
    </>
  )
}

export default ArtistMiddle
