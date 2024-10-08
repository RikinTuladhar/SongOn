import React, { Suspense } from "react";
import { useSelector } from "react-redux";

const LibraryLeft = () => {
  const songClickedId = useSelector((state) => state.song?.songIndex);
  const songs = useSelector((state) => state?.song?.songs);

  console.log(songClickedId);
  console.log(songs);

  // Ensure songs and songClickedId are defined and valid
  const song = songs?.[songClickedId];
  const artist = song?.artist?.[0];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="md:w-[25%] md:h-[100vh]    pb-10 mt-3 overflow-y-auto px-5  py-10  text-2xl bg-[#11111182] rounded-xl">
        <h1 className="text-2xl text-[#E5E7EB]">Brief</h1>
        <div className="w-full mt-3 h-[2px] bg-black"></div>
        <div className="w-full md:h-[110vh] md:pb-[200px] mt-9 justify-between md:flex-nowrap flex flex-col gap-10">
          {/* top card */}
          <div className="w-full py-5 md:px-5 md:py-10 rounded-lg bg-[#111827] flex flex-col gap-5 justify-center items-center">
            <div className="w-[200px] md:min-w-[250px]">
              <img
                src={song ? song.img_path : "/Artist/future.jpg"}
                onError={(e) => (e.target.src = "/Artist/future.jpg")}
                alt="image"
                className="w-full h-full rounded"
              />
            </div>
            <div className="text-2xl text-[#FFFFFF]">
              {song ? song.name : ""}
            </div>
            <div className="text-lg text-[#E5E7EB]">Song Name</div>
          </div>
          {/* bottom card */}
          <div className="md:w-full pb-5 rounded-lg bg-[#111827] flex flex-col gap-5">
            <div className="w-full">
              <img
                src={
                  artist?.imgArtist ? artist.imgArtist : "/Artist/future.jpg"
                }
                onError={(e) => (e.target.src = "/Artist/future.jpg")}
                alt="artist"
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 px-5">
              <div className="text-xl text-[#FFFFFF]">
                {artist ? artist.name : ""}
              </div>
              <div className="text-lg text-[#E5E7EB]">Artist</div>
              <div className="text-base text-[#E5E7EB]">
                {/* {artistDetail?.bio} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default LibraryLeft;
