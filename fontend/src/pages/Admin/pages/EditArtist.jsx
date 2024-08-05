import React, { useContext, useEffect, useState } from "react";
import ArtistApi from "../../../Apis/ArtistApi";
import ArtistCard from "../components/ArtistCard";
import { ReloadContext } from "../../../contextprovider/ReloadProvider";
import { Link } from "react-router-dom";
const EditArtist = () => {
  const { getArtist, deleteArtist } = ArtistApi();
  const { reload, setReload } = useContext(ReloadContext);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    //ife
    (async () => {
      const data = await getArtist("/artist");
      setArtists(data);
    })();
  }, [reload]);

  const handleDelete = async (id) => {
    // console.log(id);
    setReload(true);
    const sure = confirm("Are you sure you want to delete?");
    if (sure) {
      const response = await deleteArtist(`/artist/${id}`);
      alert(response.message);
      // alert("Deleted");
      setReload(false);
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        <p className="text-3xl font-bold text-center">Artist List</p>
      </div>
      <div className="relative flex justify-between w-full px-5 ">
        <div></div>
        <div></div>
        <Link to="/admin/addArtist">
          <button className="px-5 py-2 text-white transition delay-100 bg-black border hover:scale-125 rounded-2xl">
            Add
          </button>
        </Link>
      </div>
      <div className="mt-16 ">
        <div className="grid w-full gap-10 justify-items-center md:grid-cols-3">
          {artists?.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditArtist;
