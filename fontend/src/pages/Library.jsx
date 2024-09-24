import React, { useContext, useEffect, useState } from "react";
import HomeLeft from "../components/HomeLeft";
import LibraryLeft from "../components/LibraryLeft";
import LibraryRight from "../components/LibraryRight";
import { useOutletContext, useParams } from "react-router-dom";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import GenreApi from "../Apis/GenreApi";
import { useDispatch, useSelector } from "react-redux";
import {handleSongArray} from "../Apis/SongSlice"

const Library = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state)=> state.song.songs);
  // console.log(songs)
  const { reload, setReload } = useContext(ReloadContext);
  const { getSongByGenreId } = GenreApi();
  const { id } = useParams();
  const { setGenreId } = useOutletContext();

  useEffect(() => {
    setGenreId(id);
    getSongByGenreId(id).then((res) => {
      // console.log(res)
      dispatch(handleSongArray(res));
      setReload(true);
      return () => {
        setReload(false);
      };
    });
  }, [reload, id]);

  return (
    <div className="w-full  md:h-[130vh]  pt-5  bg-[#000000] flex-wrap flex justify-around">
      <LibraryLeft /> 
      <LibraryRight songs={songs} />
    </div>
  );
};

export default Library;
