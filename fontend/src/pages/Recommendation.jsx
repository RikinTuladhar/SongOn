import React, { useEffect, useRef, useState } from "react";
import RecommendationApi from "../Apis/RecommendationApi";
import { useDispatch, useSelector } from "react-redux";
import { handleEmptySongArray } from "../Apis/SongSlice";

import NavBar from "../components/Navbar";
const Recommendation = () => {
  const { getRecommendation } = RecommendationApi();
  const [songs, setSongs] = useState([]);
  const user = useSelector((state) => state?.user?.userDetails);
  const dispatch = useDispatch();

  // Create a ref array for the audio elements
  const audioRefs = useRef([]);

  useEffect(() => {
    // removing all songs from state redux

    dispatch(handleEmptySongArray());
    getRecommendation(user.username)
      .then((res) => {
        setSongs(res);
      })
      .catch((err) => console.log(err));
  }, [user.username]);

  // console.log(audioRefs);

  const playSong = (index) => {
    // Pause all other audios
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
      }
    });

    // Play the selected song
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
    }
  };

  return (
    <>
      {user.role == "USER" ? (
        <>
          <NavBar />
          <div className="bg-[#080808] h-[100vh] overflow-y-auto text-white w-full p-4">
            <h1 className="mt-5 mb-10 text-3xl font-bold text-center">
              Recommended Songs
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {songs?.map((song, index) => (
                <div
                  key={index}
                  className="relative h-64 overflow-hidden transition-all duration-300 ease-in-out rounded-2xl group hover:shadow-xl"
                >
                  <div
                    className="absolute inset-0 transition-all duration-300 ease-in-out bg-center bg-cover group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${song.imgPath}?height=400&width=600)`,
                    }}
                  />
                  <div className="absolute inset-0 transition-all duration-300 ease-in-out bg-black bg-opacity-40 group-hover:bg-opacity-50" />
                  <div className="relative flex flex-col justify-end h-full p-6 text-white">
                    <h2 className="mb-2 text-2xl font-bold drop-shadow-lg">
                      {song.name}
                    </h2>
                    <button
                      className="py-2 border bg-[#0f0f0fa5] rounded-3xl"
                      onClick={() => playSong(index)}
                    >
                      Play
                    </button>
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)} // Assign unique ref to each audio element
                      controls
                      className="hidden"
                      src={song.autoPath}
                    ></audio>
                    <p className="text-sm opacity-80">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>{(window.location.href = "/")}</div>
      )}
    </>
  );
};

export default Recommendation;
