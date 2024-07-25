import React, { useState ,useContext, useEffect} from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import CardLib from "../components/CardLib";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import SongPlayer from "../components/SongPlayer";
import axios from "axios";
import UserLibraryApi from "../Apis/UserLibraryApi";
import { SongContext } from "../contextprovider/SongProvider";
import {ReloadContext} from "../contextprovider/ReloadProvider"
const UserLibrary = () => {
  //for user details extract from slice 
  const userDetails = useSelector((state) => state.userDetails);
  const { id,firstName, lastname, role, username } = userDetails;
  //api call
  const { addPlayList, addSongToPlayList,displayPlayListByPlaylistId,displayPlayListByUserId } = UserLibraryApi();
  const {reload,setReload} = useContext(ReloadContext)
  const {songArray,setSongArray} = useContext(SongContext)
  //show pop up
  const [showAddPlayList,setShowAddPlayList] = useState(false); 
  // console.log(userDetail)

  const [nowPlayingList,setNowPlayingList] = useState("");
  console.log(nowPlayingList)
  function displayPlaylistSongs(id){
    displayPlayListByPlaylistId(id)
    .then((response)=>{
      console.log(response)
      setNowPlayingList(response.name)
      setSongArray(response.songModels)
    }).catch((err)=> console.log(err +" when displaying playlist's songs"));
    
  }

  //for posting with name in api
  const [playlist,setPlaylist] = useState({
    name:""
  });

  //left side playlists data
  const [userPlayLists,setUserPlayLists] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //passing playlist name and userid
    addPlayList(playlist,id)
    .then((response)=>{
      setShowAddPlayList(false)
      alert(response.message)
      setReload(!reload)
      // console.log(response)
    }).catch((err)=>console.log(err +" when creating playlists"));

  
  };

  useEffect(()=>{
    displayPlayListByUserId(userDetails.id)
    .then((response)=>{
      console.log(response)
      setUserPlayLists(response)
    }).catch((err)=> console.log(err +" when displaying user's playlists"));

  },[id,reload])
  console.log(playlist)


  return (
    <div className="w-full h-[auto] text-white pb-10 bg-black">
      <Navbar />
      {
        showAddPlayList &&
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-transparent backdrop-blur-sm">
        <div className="w-[50rem]  h-[20rem] top-1/4 rounded-3xl bg-[#080808] left-[25%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full h-full gap-8 "
          >
            <h1 className="text-4xl">Create Playlist</h1>
            <input
              onChange={(e) => setPlaylist({...playlist,name:e.target.value})}
              type="text"
              className="w-[90%] text-black px-3 py-2 text-xl border rounded-2xl "
              placeholder="Enter playlist name"
            />
            <div className="flex justify-around w-full">
              <button type="submit" className="w-[20%] px-3 py-1 text-xl border rounded-3xl">
                Create
              </button>
              <button type="button"  onClick={e=> setShowAddPlayList(false)} className="w-[20%] px-3 py-1 text-xl border rounded-3xl">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>}
      <h1 className="text-3xl text-center text-white ">
        {username.toUpperCase()}'s Library
      </h1>
      <div className="flex h-full px-20 mt-5 rounded-3xl gap-x-10">
        {/* left  */}
        <div className="w-[30%] rounded-3xl px-5 py-10 bg-[#161616] h-full">
          <div className="w-full px-5 h-[90vh] overflow-y-auto pb-32 bg-[#0F0F0F] ">
            <div className="flex justify-between w-full ">
              <h2 className="px-5 py-5 text-2xl font-bold">Playlists</h2>
              <button className="mr-5">
                <IoAddCircleOutline onClick={e=> setShowAddPlayList(true)} size={30} />
              </button>
            </div>
            <div className="w-[95%]  mx-1 h-[5px] bg-black"></div>
            {/* cards */}
            {userPlayLists?.map((userPlayList,i)=>(
              <div key={i} onClick={e=>displayPlaylistSongs(userPlayList?.id)} className="w-full  justify-between px-5 mt-10  items-center  flex my-2  h-[4.2rem] rounded-2xl bg-[rgb(45,43,43)]">
              <h2>{userPlayList.name}</h2>
              <button>
                <MdDeleteOutline  size={25} />
              </button>
            </div>
            ))
            }
          </div>
        </div>

        {/* right  */}
        <div className="w-[70%] rounded-3xl  px-5 py-10 bg-[#161616] h-full">
          <div className="w-full h-[auto]  bg-[#0F0F0F] ">
            <h2 className="px-5 py-5 text-2xl font-bold">List of songs : {nowPlayingList}</h2>
            <div className="w-[95%] mx-2 h-[5px] bg-black"></div>
            <div className="w-full px-10 py-10 h-[78vh]  gap-10 overflow-y-auto bg-[#0F0F0F]">
              {/* cards */}
              {songArray
                .map((songs,i) => (
                  <div key={i} className="w-[100%] flex justify-around items-center   h-[5rem] bg-[#090909]">
                    <span>{songs.name}</span>
                    <button>
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
