import React, { memo, useContext, useEffect } from "react";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";

import axios from "axios";
import SongApi from "../Apis/SongApi";

const LibraryRight = ({ songs, artistName }) => {
  const { setSongId, songClickedId, setSongClickedId } =useContext(SongContext);
  const { reload, setReload } = useContext(ReloadContext);
  const { getSongById } = SongApi();

  // click play song
  const handleSong = async (songId,songIndex) => {
    // console.log("song clicked" + songId);
    setSongId(songId);
    setSongClickedId(songIndex)
    // setReload(!prev)
    // nextSong();
  };
  return (
    <>
      <div className="w-full md:w-[70%] h-[100vh] overflow-y-auto  mt-10 md:mt-3 px-5 md:px-10 py-10 bg-[#090909] rounded-xl">
        <h1 className="text-lg  md:text-2xl text-[#E5E7EB] ">
          Songs List {artistName ? `: ${artistName} ` : ""}
        </h1>
        <div className="w-full mt-10 md:mt-3 h-[2px] bg-black "></div>
        {/* bottom  */}
        <div className="w-full h-auto mt-5">
          {/* songs list  */}
          <div className="w-full h-auto px-2 flex justify-center items-center flex-col gap-2 py-4 md:py-10 bg-[#0f0f0f]">
            <div className="flex flex-col w-full gap-2 md:px-2">
              {songs?.length === 0 ? (
                <div className="text-xl tracking-wider">No Songs Available</div>
              ) : (
                songs?.map((song, i) => (
                  <div
                    onClick={(e) => {
                      handleSong(song.id,i);
                    }}
                    key={i}
                    className="text-[#E5E7EB] hover:cursor-pointer  md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between"
                  >
                    <div
                      key={song.id}
                      className="w-[20%] text-center md:text-left"
                    >
                      {i + 1}
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(LibraryRight);
