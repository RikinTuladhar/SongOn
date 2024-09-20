import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { getUserLikedSongByName } from "../Apis/SongSlice";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.user.userDetails);
  console.log(user);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ref = useRef();

  const [likedSongs, setlikedSongs] = useState([]);
  useEffect(() => {
    getUserLikedSongByName(user?.id)
      .then((res) => {
        console.log(res ?? []);
        setlikedSongs(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const playSong = (index) => {
    setCurrentIndex(index); // Set the index first
    setTimeout(() => {
      ref.current.play(); // Play after a short delay to ensure re-render completes
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full px-16 py-5 text-black bg-black gap-y-10">
        <div className="w-full px-10 py-5 bg-[#090909] text-white rounded-2xl">
          <div className="w-full">
            <h1 className="text-4xl">User Profile</h1>
          </div>
          <div className="flex items-center w-full mt-5 ml-5">
            <div>
              <div className="flex flex-col w-full gap-5 ml-5 ">
                <h2 className="text-xl">
                  {user?.username.charAt(0).toUpperCase() +
                    user?.username.slice(1)}
                </h2>
                <p>First Name : {user?.firstName} </p>
                <p>Last Name: {user?.lastname}</p>
              </div>
              <audio
                className="hidden"
                ref={ref}
                key={likedSongs[currentIndex]?.auto_path}
                controls
                src={likedSongs[currentIndex]?.auto_path}
              ></audio>
            </div>
          </div>
        </div>
        <div className="w-full rounded-2xl h-[70%] px-10 py-5 bg-[#090909] text-white">
          <div className="mt-5">
            {" "}
            <h1 className="text-4xl">List of songs you liked</h1>
          </div>
          <div className="flex flex-col w-full px-10 py-5 mt-5 h-[60vh] overflow-y-auto bg-[#0f0f0f] rounded-xl gap-y-5 ">
            {likedSongs.length > 0 ? (
              likedSongs?.map((i, index) =>
                currentIndex == index ? (
                  <div
                    onClick={(e) => playSong(index)}
                    key={index}
                    className="flex items-center w-full px-5 py-8 font-bold transition-all duration-300 ease-in-out gap-x-52 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${i.img_path})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      opacity: 0.85,
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        color: "#FFF",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      style={{
                        color: "#FFF",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      {i.name}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={(e) => playSong(index)}
                    key={index}
                    className="flex items-center bg-[#0f0f0f0f] py-8 w-full px-5 transition-all duration-300 ease-in-out bg-center bg-cover gap-x-52 group-hover:scale-110"
                  >
                    <div>{index + 1}</div>
                    <div>{i?.name}</div>

                    {/* 
                <div>{i.autoPath}</div>
                <div>{i.lyrics}</div> */}
                  </div>
                )
              )
            ) : (
              <div>No Liked Songs Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
