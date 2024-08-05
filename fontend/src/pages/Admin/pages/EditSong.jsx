import React, { useContext, useEffect, useState } from "react";
import SongApi from "../../../Apis/SongApi";
import SongCard from "../components/SongCard";
import { ReloadContext } from "../../../contextprovider/ReloadProvider";
import { Link } from "react-router-dom";
const EditSong = () => {
  const { getSong, deleteSong } = SongApi();
  const [data, setData] = useState([]);
  const { reload, setReload } = useContext(ReloadContext);
  useEffect(() => {
    (async () => {
      const data = await getSong();
      setData(data);
    })();
  }, [reload]);
  const handleDelete = async (id) => {
    // console.log(id);
    const ok = confirm("Are you sure you want to delete?");
    if (ok) {
      setReload(true);
      const response = await deleteSong(id);
      alert("Deleted");
      setReload(false);
    } else {
      return;
    }
  };
  return (
    <div>
      <div>
        <p className="text-3xl font-bold text-center">Song List</p>
      </div>
      <div className="relative flex justify-between w-full px-5 ">
        <div></div>
        <div></div>
        <Link to="/admin/addSongs">
          <button className="px-5 py-2 text-white transition delay-100 bg-black border hover:scale-125 rounded-2xl">
            Add
          </button>
        </Link>
      </div>
      <div className="mt-16 ">
        <div className="grid w-full gap-10 justify-items-center md:grid-cols-3">
          {data?.map((song) => (
            <SongCard key={song?.id} song={song} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditSong;
