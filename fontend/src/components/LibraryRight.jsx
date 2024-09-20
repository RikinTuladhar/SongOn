import React, { memo, useContext, useEffect, useState } from "react";
import { SongContext } from "../contextprovider/SongProvider";
import UserLibraryApi from "../Apis/UserLibraryApi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { GiCheckMark, GiCloakDagger } from "react-icons/gi";
import {
  handleSetSongIndex,
  songLike,
  getSongLikesByIds,
  getAllUserSongInteractions,
} from "../Apis/SongSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
const LibraryRight = ({ songs, artistName }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const { addSongToPlayList, displayPlayListByUserId } = UserLibraryApi();
  const { setSongId } = useContext(SongContext);
  const [filteredSong, setFilteredSong] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [playlist, setPlaylist] = useState([{ name: "" }]);
  const [activeFormIndex, setActiveFormIndex] = useState(null);
  const [selectedIdPlayListFromSelect, setSelectedIdPlayListFromSelect] =
    useState(0);

  const [songIdUsedForLike, setSongIdUsedForLike] = useState("");

  // console.log(songIdUsedForLike);
  useEffect(() => {
    // console.log("Updated songIdUsedForLike:", songIdUsedForLike);
  }, [songIdUsedForLike]);

  const handleSong = async (songId, songIndex) => {
    setSongId(songId);
    // console.log(songId);
    // console.log(songIndex);

    setSongIdUsedForLike(songId);
    dispatch(handleSetSongIndex(songIndex));
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
    // console.log(e);
    // console.log(selectedIdPlayListFromSelect + " " + songId);
    addSongToPlayList(selectedIdPlayListFromSelect, songId)
      .then((res) => {
        toast.success(res.message);
        // console.log(res);
        setActiveFormIndex(null);
      })
      .catch((err) =>
        toast.error(
          err + " Error when posting playlist by song id and playlist id"
        )
      );
  }

  const userDataFromLocalStoreage = JSON.parse(localStorage.getItem("user"));

  const [userInteractionsAll, setuserInteractionsAll] = useState([]);
  // console.log(userInteractionsAll);
  const [reloadInteractions, setReloadInteractions] = useState(false);
  useEffect(() => {
    getAllUserSongInteractions()
      .then((res) => {
        // console.log(res);
        setuserInteractionsAll(res);
      })
      .catch((err) => console.log(err));
  }, [reloadInteractions]);

  async function handleLikeSong() {
    if (!songIdUsedForLike) {
      // console.log(songIdUsedForLike);
      toast.error("Please select a song first.");
      return;
    }

    try {
      const res = await getSongLikesByIds(
        userDataFromLocalStoreage.id,
        songIdUsedForLike
      );

      const timesListened =
        res[0]?.timesListened == 0 || res[0]?.timesListened == undefined
          ? 0
          : res[0]?.timesListened;
      const liked = res[0]?.liked ?? false;

      // Creating the object with incremented timesListened
      const object = {
        userId: userDataFromLocalStoreage.id,
        songId: songIdUsedForLike,
        liked: !liked, // Toggle like status
        timesListened: timesListened,
      };

      // console.log(object);

      // Call the songLike API with the updated object
      const likeResponse = await songLike(object);

      // console.log(likeResponse);
      setReloadInteractions((prev) => !prev);
      toast.success("Song liked status updated!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update like status.");
    }
  }

  async function handleTimesListen(song_id, i) {
    handleSong(song_id, i);
    if (!songIdUsedForLike) {
      // console.log(songIdUsedForLike);
      toast.error("Please select a song first.");
      return;
    }
    try {
      const res = await getSongLikesByIds(
        userDataFromLocalStoreage.id,
        songIdUsedForLike
      );
      // console.log(res);

      const timesListened =
        res[0]?.timesListened == 0 || res[0]?.timesListened == undefined
          ? 0
          : res[0]?.timesListened;
      const liked = res[0]?.liked;

      // console.log("from api" + timesListened);

      // Creating the object with incremented timesListened
      const object = {
        userId: userDataFromLocalStoreage.id,
        songId: songIdUsedForLike,
        liked: liked, // Toggle like status
        timesListened: timesListened + 1,
      };

      // console.log(object);

      // Call the songLike API with the updated object
      const likeResponse = await songLike(object);

      // console.log(likeResponse.data);
      setReloadInteractions((prev) => !prev);
      toast.success("Song Listen status updated!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update like status.");
    }
  }

  return (
    <div className="w-full md:w-[70%] h-[100vh] overflow-y-auto mt-10 md:mt-3 px-5 md:px-10 py-10 bg-[#090909] rounded-xl">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex flex-wrap justify-between px-10 space-y-5">
        <h1 className="text-lg md:text-2xl text-[#E5E7EB]">
          Songs List {artistName ? `: ${artistName}` : ""}
        </h1>
        <div>
          <input
            type="search"
            onChange={handleSearch}
            className="px-2 py-1 text-black rounded-md"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="w-full mt-5 md:mt-3 h-[2px] bg-black"></div>
      <div className="w-full h-auto mt-5">
        <div className="w-full h-auto px-2 flex justify-center items-center flex-col gap-2 py-4 md:py-10 bg-[#0f0f0f]">
          <div className="flex flex-col w-full gap-2 md:px-2">
            {songs?.length === 0 ? (
              <div className="text-sm tracking-wider md:text-xl">
                No Songs Available
              </div>
            ) : (
              (searchFocus ? filteredSong : songs)?.map((song, i) =>
                userDetails.role == "USER" ? (
                  <div
                    onClick={() => {
                      handleSong(song?.id, i); // Trigger handleSong when the song is selected
                    }}
                    key={i}
                    className="text-[#E5E7EB] text-sm md:text-xl  px-5 hover:cursor-pointer md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between"
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
                    {/* play & like & playlist */}
                    <div className="flex items-center w-full justify-evenly gap-x-5">
                      <button
                        onClick={() => handleTimesListen(song?.id, i)}
                        className="text-white"
                      >
                        Play
                      </button>
                      {/* Like button */}
                      <div className="flex items-center justify-center">
                        <button
                          onClick={handleLikeSong}
                          className="flex items-center justify-center cursor-pointer"
                        >
                          {userInteractionsAll.find(
                            (i) =>
                              i.song_id === song.id &&
                              i.user_id === userDetails.id
                          )?.liked ? (
                            <>
                              <FcDislike />
                            </>
                          ) : (
                            <>
                              <FcLike />
                            </>
                          )}
                        </button>
                      </div>
                      {/* playlist  */}
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
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      handleSong(song?.id, i);
                    }}
                    key={i}
                    className="text-[#E5E7EB] text-sm md:text-xl  px-5 hover:cursor-pointer md:px-10 w-full h-20 items-center bg-[#090909] hover:bg-[#1b1b1bd3] flex justify-between"
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
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LibraryRight);
