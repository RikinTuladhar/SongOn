import React, { useEffect, useState } from "react";
import ArtistApi from "../../../Apis/ArtistApi";
import ArtistCard from "../components/ArtistCard";

const EditArtist = () => {
  const { getArtist } = ArtistApi();
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    //ife
    (async () => {
      const data = await getArtist("/artist");
      console.log(data);
      setArtists(data);
    })();
  }, []);
  return (
    <div>
      <div>
        <p className="text-3xl font-bold text-center">Artist List</p>
      </div>
      <div className="mt-16 ml-10 ">
        <div className="grid w-full grid-cols-3 gap-10">
          {artists?.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditArtist;
