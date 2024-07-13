import React, { useContext, useEffect, useState } from "react";
import { SongContext } from "../contextprovider/SongProvider";
const LibraryLeft = () => {
  const { clicked,songArray,songClickedId } = useContext(SongContext);
  // console.log(songDetails);
  // console.log(ArtistDetails);
  const [artist,setArtist] = useState({
    name:"",
    bio:"",
    imgArtist:""
  });
  console.log(artist)
  const [songDetail, setSongDetail] = useState();
  console.log(songDetail);

  
  useEffect(() => {
      setSongDetail(songArray[songClickedId])
      const id = songArray[songClickedId]?.id
      console.log(id)
  }, [songClickedId]);
  console.log()
  console.log(songClickedId)
  console.log(songArray[songClickedId]);

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
                src={songDetail?.img_path}
                // onError={(e) => (e.target.src = "/Artist/future.jpg")}
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
                  songDetail?.artist[0]?.imgArtist === null ||
                  songDetail?.artist[0]?.imgArtist === "" ||
                  songDetail?.artist[0]?.imgArtist === undefined
                    ? "/Artist/future.jpg"
                    : songDetail?.artist[0]?.imgArtist
                }
                onError={(e) => (e.target.src = "/Artist/future.jpg")}
                alt=""
                className="w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 px-5">
              {
                <div className="text-xl text-[#FFFFFF]">{songDetail?.artist[0]?.name}</div>
              }

              <div className="text-lg text-[#E5E7EB]">Artist</div>
              <div className="text-base text-[#E5E7EB]">
               {/* {artistDetail?.bio} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryLeft;
