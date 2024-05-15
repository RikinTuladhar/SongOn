import React, { useContext, useEffect, useState } from "react";
import { SongContext } from "../contextprovider/SongProvider";
const LibraryLeft = () => {
  const { songDetails, ArtistDetails } = useContext(SongContext);
  // console.log(songDetails);
  // console.log(ArtistDetails);

  const [songDetail, setSongDetail] = useState();
  const [artistDetail, setArtistDetail] = useState();
  console.log(songDetail);
  useEffect(() => {
    setSongDetail(songDetails[0]);
    setArtistDetail(ArtistDetails[0]);
  }, [songDetails, artistDetail]);

  return (
    <>
      {/* left  */}
      <div className="md:w-[25%]  md:h-[100vh] pb-10  mt-3 overflow-y-auto  px-5 py-10 p-5 text-2xl bg-[#11111182] rounded-xl">
        <h1 className="text-2xl text-[#E5E7EB] ">Brief</h1>
        <div className="w-full mt-3 h-[2px] bg-black "></div>
        <div className="w-full md:h-[110vh] md:pb-[200px]  mt-9  justify-between md:flex-nowrap flex flex-col gap-10">
          {/* top card  */}
          <div className="w-full py-5  md:px-5 md:py-10 rounded-lg  bg-[#111827] flex flex-col gap-5 justify-center items-center">
            <div class="w-[200px] md:min-w-[250px]">
              <img
                src={
                  songDetail?.imgPath === null ||
                  songDetail?.imgPath === undefined || 
                  songDetail?.imgPath === ""
                    ? "/Artist/future.jpg"
                    : songDetail?.imgPath
                }
                onError={(e) => (e.target.src = "/Artist/future.jpg")}
                alt="image"
                className="w-full h-full rounded"
              />
            </div>
            <div className="text-2xl text-[#FFFFFF]">{songDetail?.name}</div>
            <div className="text-lg text-[#E5E7EB]">Artist</div>
          </div>
          {/* bottom card  */}

          <div className="  md:w-full   pb-5  rounded-lg  bg-[#111827] flex flex-col gap-5">
            <div class="w-full">
              <img
                src={
                  artistDetail?.imgArtist === null ||
                  artistDetail?.imgArtist === "" ||
                  artistDetail?.imgArtist === undefined
                    ? "/Artist/future.jpg"
                    : artistDetail?.imgArtist
                }
                onError={(e) => (e.target.src = "/Artist/future.jpg")}
                alt=""
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 px-5">
              {ArtistDetails?.map((artist) => (
                <div className="text-xl text-[#FFFFFF]">{artist?.name}</div>
              ))}

              <div className="text-lg text-[#E5E7EB]">Artist</div>
              <div className="text-base text-[#E5E7EB]">
               {artistDetail?.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryLeft;
