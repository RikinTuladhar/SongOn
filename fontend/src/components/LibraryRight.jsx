import React, { memo, useContext, useEffect, useState } from "react";
import { SongContext } from "../contextprovider/SongProvider";
import UserLibraryApi from "../Apis/UserLibraryApi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import {handleSetSongIndex} from "../Apis/SongSlice"
const LibraryRight = ({ songs, artistName }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const { addSongToPlayList, displayPlayListByUserId } = UserLibraryApi();
  const { setSongId,} =useContext(SongContext);
  const [filteredSong, setFilteredSong] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [playlist, setPlaylist] = useState([{ name: "" }]);
  const [activeFormIndex, setActiveFormIndex] = useState(null);
  const [selectedIdPlayListFromSelect, setSelectedIdPlayListFromSelect] =useState(0);

  console.log(selectedIdPlayListFromSelect);

  const handleSong = async (songId, songIndex) => {
    setSongId(songId);
    // setSongClickedId(songIndex);
    dispatch(handleSetSongIndex(songIndex))
  };

  const handleSearch = (e) => {
    const searching = e.target.value.toLowerCase().trim();
    const filtered = songs?.filter((item) =>
      item.name.toLowerCase().includes(searching)
    );
    setFilteredSong(filtered);

    setSearchFocus(searching.length > 0);
  };

  useEffect(() => {
    displayPlayListByUserId(userDetails.id)
      .then((res) => {
        setPlaylist(res);
        setSelectedIdPlayListFromSelect(res[0].id);
      })
      .catch((err) =>
        console.log("Error when fetching playlist by userid", err)
      );
  }, [userDetails?.id]);

  function handleAddUserSongToPlayList(e, songId) {
    e.preventDefault();
    console.log(e);
    console.log(selectedIdPlayListFromSelect + " " + songId);
    addSongToPlayList(selectedIdPlayListFromSelect, songId)
      .then((res) => {
        alert(res.message)
        // console.log(res);
        setActiveFormIndex(null)
      })
      .catch((err) =>
        console.log(
          err + " Error when posting playlist by song id and playlist id"
        )
      );
  }



  return (
    <div className="w-full md:w-[70%] h-[100vh] overflow-y-auto mt-10 md:mt-3 px-5 md:px-10 py-10 bg-[#090909] rounded-xl">
      <div className="flex flex-wrap justify-between px-10">
        <h1 className="text-lg md:text-2xl text-[#E5E7EB]">
          Songs List {artistName ? `: ${artistName}` : ""}
        </h1>
        <div>
          <input
            type="text"
            onChange={handleSearch}
            className="px-2 py-1 text-black rounded-md"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="w-full mt-10 md:mt-3 h-[2px] bg-black"></div>
      <div className="w-full h-auto mt-5">
        <div className="w-full h-auto px-2 flex justify-center items-center flex-col gap-2 py-4 md:py-10 bg-[#0f0f0f]">
          <div className="flex flex-col w-full gap-2 md:px-2">
            {songs?.length === 0 ? (
              <div className="text-xl tracking-wider">No Songs Available</div>
            ) : (
              (searchFocus ? filteredSong : songs)?.map((song, i) => (
                <div
                  onClick={() => handleSong(song?.id, i)}
                  key={i}
                  className="text-[#E5E7EB] hover:cursor-pointer md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between"
                >
                  <div className="text-center md:w-full">{i + 1}</div>
                  <div className="text-center md:w-full">{song?.name}</div>
                  <div className="text-center md:w-full">
                    {song?.artist?.slice(0, 3)?.map((artist, i) => (
                      <span className="ml-3 mr-3" key={i}>
                        {artist?.name}
                      </span>
                    ))}
                  </div>
                  {userDetails.role == "USER" && <div className="relative">
                    <button
                      onClick={() =>
                        setActiveFormIndex(activeFormIndex === i ? null : i)
                      }
                    >
                      {activeFormIndex === i ? <CiCircleRemove size={25}/> : <IoIosAddCircleOutline size={25} />}
                    </button>
                    <div className="absolute right-0 z-50 top-10">
                      
                      {activeFormIndex === i && (
                        
                        <form
                          onSubmit={(e) =>
                            handleAddUserSongToPlayList(e, song.id)
                          }
                          className="px-5 space-y-3  bg-[#000000] py-2 rounded-2xl"

                         
                        >
                         <div><h1 className="text-xl text-center">Select Playlist</h1></div>
                         <div className="flex gap-5 "> <select
                            onChange={(e) =>
                              setSelectedIdPlayListFromSelect(e.target.value)
                            }
                            
                            className="flex items-center justify-between h-8 text-black hover:cursor-pointer md:px-10"
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {playlist?.map((item) => (
                              <option key={item?.id} value={item?.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                          <button type="submit"><GiCheckMark /></button></div>
                        </form>
                      )}
                    </div>
                   
                  </div>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LibraryRight);
