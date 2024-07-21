import React, { memo, useContext, useEffect, useState } from "react";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";

import axios from "axios";
import SongApi from "../Apis/SongApi";
import { GiSouthAfrica } from "react-icons/gi";

const LibraryRight = ({ songs, artistName }) => {
  const { setSongId, songClickedId, setSongClickedId } =useContext(SongContext);
  const [filteredSong,setFilteredSong] = useState([])
  const [searchFocus,setSearchFocus] = useState(false);
  // click play song
  const handleSong = async (songId,songIndex) => {
    // console.log("song clicked" + songId);
    setSongId(songId);
    setSongClickedId(songIndex)
  };

  const handleSearch= (e)=>{
      const searching =  e.target.value.toLowerCase().trim();
      // console.log(searching);
      const filtered = songs.filter((item)=> {
        return item.name.toLowerCase().includes(searching);
      })
      // console.log(filtered)
      setFilteredSong(filtered)
      
      if(searching.length === 0 || searching.length < 0){
        setSearchFocus(false)
      }
      else{
        setSearchFocus(true)
      }

    }
// console.log(searchFocus)
// console.log(filteredSong)
  return (
    <>
      <div className="w-full md:w-[70%] h-[100vh] overflow-y-auto  mt-10 md:mt-3 px-5 md:px-10 py-10 bg-[#090909] rounded-xl">
       <div className="flex flex-wrap justify-between px-10">
       <h1 className="text-lg  md:text-2xl text-[#E5E7EB] ">
          Songs List {artistName ? `: ${artistName} ` : ""}
        </h1>
        <div>
          <input type="text" onChange={handleSearch} className="px-2 py-1 text-black rounded-md" placeholder="Search" />
        </div>
       </div>
        <div className="w-full mt-10 md:mt-3 h-[2px] bg-black "></div>
        {/* bottom  */}
        <div className="w-full h-auto mt-5">
          {/* songs list  */}
          <div className="w-full h-auto px-2 flex justify-center items-center flex-col gap-2 py-4 md:py-10 bg-[#0f0f0f]">
            <div className="flex flex-col w-full gap-2 md:px-2">
              {songs?.length === 0 ? (
                <div className="text-xl tracking-wider">No Songs Available</div>
              ) :
              (
                searchFocus == true ?
                (searchFocus && filteredSong?.map((song, i) => (
                  <div
                  onClick={(e) => {
                    handleSong(song.id,i);
                  }}
                  key={i}
                  className="text-[#E5E7EB] hover:cursor-pointer  md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between"
                >
                  {/* <div key={song.id} className="text-center md:w-full">
                    {i+1}
                  </div> */}
                  <div key={song.id} className="text-center md:w-full">
                    {song?.name}
                  </div>
                  {/* <div key={song.id} className="text-center md:w-full">
                    {song?.artist?.slice(0, 3)?.map((artist, i) => (
                      <span className="ml-3 mr-3" key={i}>
                        {artist?.name}
                      </span>
                    ))}
                  </div> */}
                </div>
                )))
                
                : (!searchFocus && songs?.map((song, i) => (
                  <div
                    onClick={(e) => {
                      handleSong(song.id,i);
                    }}
                    key={i}
                    className="text-[#E5E7EB] hover:cursor-pointer  md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between"
                  >
                    <div key={song.id} className="text-center md:w-full">
                      {i+1}
                    </div>
                    <div key={song.id} className="text-center md:w-full">
                      {song?.name}
                    </div>
                    <div key={song.id} className="text-center md:w-full">
                      {song?.artist?.slice(0, 3)?.map((artist, i) => (
                        <span className="ml-3 mr-3" key={i}>
                          {artist?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(LibraryRight);
