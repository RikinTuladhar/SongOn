import React, { useContext, useEffect, useState } from "react";

import { handleSetSongIndex } from "../Apis/SongSlice";
import { useDispatch, useSelector } from "react-redux";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import UserLibraryApi from "../Apis/UserLibraryApi";

const ArtistMiddle = ({ songsArray, artist, showArtistFunc }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  // console.log(songs);
  const [activeFormIndex, setActiveFormIndex] = useState(null);
  const [playlist, setPlaylist] = useState([{ name: "" }]);
  const [selectedIdPlayListFromSelect, setSelectedIdPlayListFromSelect] =
    useState(0);
  // click play song
  const { addSongToPlayList, displayPlayListByUserId } = UserLibraryApi();
  const [songs, setSongs] = useState([]);

  // console.log(songs);
  // console.log(songsArray)
  useEffect(() => {
    if (songsArray) {
      setSongs(songsArray);
    }
  }, [songsArray]);

  useEffect(() => {
    displayPlayListByUserId(userDetails?.id)
      .then((res) => {
        setPlaylist(res);
        console.log(res);
        setSelectedIdPlayListFromSelect(res[0].id);
      })
      .catch((err) =>
        console.log("Error when fetching playlist by userid", err)
      );
  }, [userDetails?.id]);

  const handleSong = (songId, clickedSongId) => {
    dispatch(handleSetSongIndex(clickedSongId));
    // console.log(songId);
    // console.log(clickedSongId);
  };

  function handleAddUserSongToPlayList(e, songId) {
    e.preventDefault();
    // console.log(e);
    // console.log(selectedIdPlayListFromSelect + " " + songId);
    addSongToPlayList(selectedIdPlayListFromSelect, songId)
      .then((res) => {
        alert(res.message);
        // console.log(res);
        setActiveFormIndex(null);
      })
      .catch((err) =>
        console.log(
          err + " Error when posting playlist by song id and playlist id"
        )
      );
  }

  function handleSearch(e) {
    const searching = e.target.value;
    if (searching.length > 0) {
      const filtered = songs.filter(
        (item) => item.name.toLowerCase() == searching.toLowerCase()
      );
      setSongs(filtered);
    } else {
      setSongs(songsArray);
    }

    console.log(searching);
  }
  // console.log(artist);

  return (
    <div className="w-full md:w-[80%] h-[100vh] overflow-y-auto  mt-10 md:mt-3 px-5 md:px-10 py-10 bg-[#090909] rounded-xl">
      <div className="flex flex-wrap items-center justify-between px-5 text-lg text-white md:text-2xl ">
        <span className="w-full md:w-[auto] order-3 text-center mb-2 md:mb-0 font-bold  md:order-1  md:text-left">
          Songs List
        </span>
        <span className="text-center w-full    md:w-[auto]text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r animate-pulse from-slate-100 to-gray-300">
          <button onClick={(e) => showArtistFunc(true)}>{artist?.name} </button>
        </span>
        <span className="w-full md:w-[auto] order-1 md:order-3 flex justify-center items-center my-5 md:my-0">
          <input
            type="search"
            onChange={handleSearch}
            placeholder="search"
            className="px-5 py-1 text-black rounded-3xl"
          />
        </span>
      </div>
      <div className="w-full mt-10 md:mt-3 h-[2px] bg-black "></div>
      {/* bottom  */}
      <div className="w-full h-auto mt-5">
        {/* songs list  */}
        <div className="w-full h-auto px-2 flex justify-center items-center flex-col gap-2 py-4 md:py-10 bg-[#0f0f0f]">
          {/* headings */}
          <div className="text-[#E5E7EB] mt-5 mb-5 md:px-10 w-full  items-center flex-wrap flex justify-around md:justify-between">
            {songs?.length === 0 ? (
              <div className="text-xl tracking-wider">No Songs Available</div>
            ) : (
              songs?.map((song, i) => (
                <div
                  onClick={(e) => handleSong(song.id, i)}
                  key={i}
                  className="text-[#E5E7EB] hover:cursor-pointer  md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] gap-2 flex justify-around md:justify-between"
                >
                  {/* number  */}
                  <div>{i + 1}</div>
                  {/* name of song  */}
                  <div
                    key={song.id}
                    className="text-base font-bold text-center md:w-full md:text-lg"
                  >
                    {song?.name?.length < 25
                      ? song?.name
                      : song?.name.slice(0, 60) + "..."}
                  </div>
                  {/* playlist button  */}
                  {userDetails.role == "USER" && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveFormIndex(activeFormIndex === i ? null : i)
                        }
                      >
                        {activeFormIndex === i ? (
                          <CiCircleRemove size={25} />
                        ) : (
                          <IoIosAddCircleOutline size={25} />
                        )}
                      </button>
                      <div className="absolute right-0 z-50 top-10">
                        {activeFormIndex === i && (
                          <form
                            onSubmit={(e) =>
                              handleAddUserSongToPlayList(e, song.id)
                            }
                            className="px-5 space-y-3  bg-[#000000] py-2 rounded-2xl"
                          >
                            <div>
                              <h1 className="text-xl text-center">
                                Select Playlist
                              </h1>
                            </div>
                            <div className="flex gap-5 ">
                              <select
                                onChange={(e) =>
                                  setSelectedIdPlayListFromSelect(
                                    e.target.value
                                  )
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

                              <button type="submit">
                                <GiCheckMark />
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistMiddle;
