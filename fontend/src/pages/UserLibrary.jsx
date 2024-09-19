import React, { useState, useContext, useEffect } from "react";

import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import CardLib from "../components/CardLib";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import SongPlayer from "../components/SongPlayer";
import axios from "axios";
import UserLibraryApi from "../Apis/UserLibraryApi";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { handleSongArray, handleSetSongIndex } from "../Apis/SongSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomAlert from "../components/CustomAlert";

const UserLibrary = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);
  //for user details extract from slice
  const userDetails = useSelector((state) => state.user.userDetails);
  //api call
  const {
    addPlayList,
    addSongToPlayList,
    displayPlayListByPlaylistId,
    displayPlayListByUserId,
    deletePlayList,
    deleteSongFromPlayList,
  } = UserLibraryApi();
  
  const { reload, setReload } = useContext(ReloadContext);

  //show pop up
  const [showAddPlayList, setShowAddPlayList] = useState(false);
  // console.log(userDetail)

  const [nowPlayingList, setNowPlayingList] = useState("");
  // console.log(nowPlayingList);

  function displayPlaylistSongs(id) {
    displayPlayListByPlaylistId(id)
      .then((response) => {
        // console.log(response);
        setNowPlayingList(response.name);
        dispatch(handleSongArray(response.songModels));
      })
      .catch((err) => console.log(err + " when displaying playlist's songs"));
  }

  //for posting with name in api
  const [playlist, setPlaylist] = useState({
    name: "",
  });

  //left side playlists data
  const [userPlayLists, setUserPlayLists] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //passing playlist name and userid
    addPlayList(playlist, userDetails?.id)
      .then((response) => {
        setShowAddPlayList(false);
        toast.success(response.message);
        setReload(!reload);
        // console.log(response)
      })
      .catch((err) => console.log(err + " when creating playlists"));
  };

  useEffect(() => {
    dispatch(handleSongArray([]));
    displayPlayListByUserId(userDetails?.id)
      .then((response) => {
        // console.log(response);
        setUserPlayLists(response);
      })
      .catch((err) => console.log(err + " when displaying user's playlists"));
  }, [userDetails?.id, reload]);
  // console.log(playlist);

  function playSongByClick(songIndex) {
    dispatch(handleSetSongIndex(songIndex));
  }

  function handleDeletePlayList(id) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      deletePlayList(id)
        .then((res) => {
          // Set only the relevant part of the response
          toast.success(res.message || "Playlist deleted successfully!");
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err + " Error when trying to delete playlist");
          toast.error("Failed to delete the playlist.");
        });
    }
  }

  function handleDeleteSongFromPlayList(songId) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      deleteSongFromPlayList(songId)
        .then((res) => {
          toast.success(res);
          setReload(!reload);
        })
        .catch((err) =>
          toast.error(err + " Error when trying to delete playlist")
        );
    } else {
      return;
    }
  }

  return (
    <div className="w-full h-[auto] text-white pb-10 bg-black">
      <Navbar />

      {showAddPlayList && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
          {/* creating playlist form  */}
          <div className="w-[50rem]  h-[20rem] top-1/4 rounded-3xl bg-[#080808] left-[25%]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center w-full h-full gap-8 "
            >
              <h1 className="text-4xl">Create Playlist</h1>
              <input
                onChange={(e) =>
                  setPlaylist({ ...playlist, name: e.target.value })
                }
                type="text"
                className="w-[90%] text-black px-3 py-2 text-xl border rounded-2xl "
                placeholder="Enter playlist name"
                required
              />
              <div className="flex justify-around w-full">
                <button
                  type="submit"
                  className="w-[20%] px-3 py-1 text-xl border rounded-3xl"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={(e) => setShowAddPlayList(false)}
                  className="w-[20%] px-3 py-1 text-xl border rounded-3xl"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <h1 className="text-3xl text-center text-white ">
        {userDetails?.username.toUpperCase()}'s Library
      </h1>
      <div className="flex h-full px-20 mt-5 rounded-3xl gap-x-10">
        {/* left  */}
        <div className="w-[30%] rounded-3xl px-5 py-10 bg-[#161616] h-full">
          <div className="w-full px-5 h-[90vh] overflow-y-auto pb-32 bg-[#0F0F0F] ">
            <div className="flex justify-between w-full ">
              <h2 className="px-5 py-5 text-2xl font-bold">Playlists</h2>
              <button className="mr-5">
                <IoAddCircleOutline
                  onClick={(e) => setShowAddPlayList(true)}
                  size={30}
                />
              </button>
            </div>
            <div className="w-[95%]  mx-1 h-[5px] bg-black"></div>
            {/* cards */}
            {userPlayLists?.map((userPlayList, i) => (
              <div
                key={i}
                onClick={(e) => displayPlaylistSongs(userPlayList?.id)}
                className="w-full  justify-between px-5 mt-10  items-center  flex my-2  h-[4.2rem] rounded-2xl bg-[rgb(45,43,43)]"
              >
                <h2>{userPlayList.name}</h2>
                <button onClick={(e) => handleDeletePlayList(userPlayList.id)}>
                  <MdDeleteOutline size={25} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* right  */}
        <div className="w-[70%] rounded-3xl  px-5 py-10 bg-[#161616] h-full">
          <div className="w-full h-[auto]  bg-[#0F0F0F] ">
            <h2 className="px-5 py-5 text-2xl font-bold">
              List of songs : {nowPlayingList}
            </h2>
            <div className="w-[95%] mx-2 h-[5px] bg-black"></div>
            <div className="w-full px-10 py-10 h-[78vh]  gap-10 overflow-y-auto bg-[#0F0F0F]">
              {/* cards */}
              {songs.map((song, i) => (
                <div
                  onClick={(e) => playSongByClick(i)}
                  key={i}
                  className="hover:bg-[#161616] cursor-pointer w-[100%] flex justify-around items-center   h-[5rem] bg-[#090909]"
                >
                  <span>{song.name}</span>
                  <button
                    onClick={(e) => handleDeleteSongFromPlayList(song.id)}
                  >
                    <MdDeleteOutline size={25} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SongPlayer />
      </div>
    </div>
  );
};

export default UserLibrary;
