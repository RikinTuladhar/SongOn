import React, { useContext, useEffect, useState } from "react";
import LibraryLeft from "../components/LibraryLeft";
import LibraryRight from "../components/LibraryRight";
import { SongContext } from "../contextprovider/SongProvider";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { useParams } from "react-router-dom";
import ArtistApi from "../Apis/ArtistApi";
import ArtistMiddle from "../components/ArtistMiddle";
import { useDispatch, useSelector } from "react-redux";
import { handleSongArray } from "../Apis/SongSlice";
const Artist = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state?.song?.songs);
  // const {songArray,setSongArray} = useContext(SongContext);
  const { reload, setReload } = useContext(ReloadContext);
  const { id } = useParams();
  // const [songs, setSongs] = useState([]);
  const { getArtistById, getSongByArtistId } = ArtistApi();

  const [showArtist, setShowArtist] = useState(false);

  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    gender: "",
    imgArtist: "",
  });
  // console.log(id)
  // console.log(songs);
  useEffect(() => {
    getArtistById(id)
      .then((res) => {
        // console.log(res.data.songs)
        setArtist(res);
        // console.log(res);
        setReload(true);
      })
      .then((res) => {
        getSongByArtistId(id).then((res) => {
          // console.log(res);
          // setSongArray(res);
          console.log(res);
          dispatch(handleSongArray(res));
        });
        return () => {
          setReload(false);
        };
      });
  }, [reload]);

  console.log();

  function showArtistFunc(result) {
    setShowArtist(result);
  }

  return (
    <div className="w-full relative h-[120vh] pt-5 bg-[#000000] ">
      {showArtist && (
        <div className="absolute z-50 w-full h-[100%] bg-transparent backdrop-blur-md">
          <div className="text-white justify-center border-4 items-center pr-10 flex bg-[#000000] rounded-lg  absolute top-10 left-[50%] -translate-x-[50%] translate-y-[20%]   ">
            <div
              className="absolute right-5 top-5"
              onClick={() => setShowArtist(false)}
            >
              <button>Close</button>
            </div>
            <div className=" w-full h-[100%] bg-[#0F0F0F] px-5 py-5 ">
              <div className="my-4 text-2xl font-bold text-center">
                {artist.name}
              </div>
              <img
                className="object-cover w-full h-full rounded"
                src={artist?.imgArtist}
                onError={(e) => (e.target.src = "/Artist/future.jpg")}
                alt="img of artist"
              />
            </div>
            <div className="w-full px-5 space-y-2 h-[100%] bg-">
              <div className="text-xl font-semibold">{artist?.bio}</div>
              <div>Gender : {artist?.gender}</div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <ArtistMiddle
          songsArray={songs}
          showArtistFunc={showArtistFunc}
          artist={artist}
        />
      </div>
    </div>
  );
};

export default Artist;
