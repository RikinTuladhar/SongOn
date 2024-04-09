import React, { useContext, useEffect, useState } from "react";
import ArtistList from "./ArtistList";
import { Link } from "react-router-dom";
import axios from "axios";
import { SongContext } from "../contextprovider/SongProvider";
const HomeLeft = () => {
  const [artist, setArtist] = useState([]);
  const { API } = useContext(SongContext);
  useEffect(() => {
    axios.get(`${API}/artist`).then((res) => {
      // console.log(res.data);
      setArtist(res.data);
    });
  }, []);
  return (
    <div
    
      className=" w-full md:w-[30%] h-[100vh] md:h-auto mt-3 overflow-y-auto  mx-10 md:m-0 px-5 py-10 p-5 text-2xl bg-[#11111182] rounded-xl"
    >
      <h1 className=" text-[#E5E7EB]"> Artist List</h1>
      <div className="w-full   rounded-lg  h-[2px] bg-black mt-10">
        {artist?.length === 0
          ? Array(10)
              .fill()
              .map(() => (
                <div   role="status" className="animate-pulse  w-full h-20 bg-[#0F0F0F]   px-5 py-2 flex items-center gap-5">
                  <div className="w-[40px] h-[40px] flex justify-center">
                    <svg
                      class="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#E5E7EB]">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    </div>{" "}
                    <div className="font-semibold text-sm  text-[#9C9EA0]">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    </div>{" "}
                  </div>
                </div>
              ))
          : artist?.map((artist, i) => (
              <Link key={i} to={`/artist/${artist.id}`}>
                {" "}
                <ArtistList name={artist.name} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HomeLeft;
