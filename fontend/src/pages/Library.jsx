import React, { useContext, useEffect, useState } from "react";
import HomeLeft from "../components/HomeLeft";
import LibraryLeft from "../components/LibraryLeft";
import LibraryRight from "../components/LibraryRight";
import { useOutletContext, useParams } from "react-router-dom";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import GenreApi from "../Apis/GenreApi";

const Library = () => {
  const { setSongArray } = useContext(SongContext);
  const { reload, setReload } = useContext(ReloadContext);
  const { getGenreById } = GenreApi();
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const { setGenreId } = useOutletContext();
  // console.log(SongAPI)
  // alert(id)
  useEffect(() => {
    setGenreId(id);
    getGenreById(id).then((res) => {
      // setAPI(`${API}/by-genre/${id}`)
      // console.log(res)
      setSongs(res);
      setSongArray(res);
      setReload(true);
      return () => {
        setReload(false);
      };
    });
  }, [reload, id]);

  return (
    <div className="w-full  md:h-[120vh]  pt-5  bg-[#000000] flex-wrap flex justify-around">
      <LibraryLeft />
      <LibraryRight songs={songs} />
    </div>
  );
};

export default Library;
