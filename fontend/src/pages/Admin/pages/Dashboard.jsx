import React, { useEffect, useState } from "react";
import GenreApi from "../../../Apis/GenreApi";
import ArtistApi from "../../../Apis/ArtistApi";
import SongApi from "../../../Apis/SongApi";
import UserApi from "../../../Apis/UserApi";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const { getTotalGenre } = GenreApi();
  const { getTotalArtist } = ArtistApi();
  const { getTotalSong, getTopSongs } = SongApi();
  const { getTopUsers } = UserApi();

  const user = useSelector((state) => state.user.userDetails);
  console.log(user);
  const [topsongs, settopsongs] = useState([]);
  const [topUser, setTopUser] = useState([]);

  const [totalCounts, setTotalCounts] = useState({
    song: "",
    artist: "",
    genre: "",
  });
  // console.log(totalCounts);

  // console.log(topUser);

  useEffect(() => {
    Promise.all([getTotalGenre(), getTotalArtist(), getTotalSong()])
      .then(([genre, aritst, song]) => {
        // console.log(genre, aritst, song);
        setTotalCounts({
          song: song.message,
          artist: aritst.message,
          genre: genre.message,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getTopSongs()
      .then((res) => {
        // console.log(res);
        settopsongs(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getTopUsers()
      .then((res) => {
        // console.log(res);
        setTopUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {user.role == "ADMIN" ? (
        <div className="w-full p-10 ">
          <div className="w-full h-[30%] gap-10 flex justify-center flex-wrap">
            <div className="w-[20rem] h-[10rem] flex justify-center items-center rounded-2xl hover:scale-110 transition-all hover:bg-[#0f0f0ff2] bg-[#0f0f0f]">
              <h1 className="p-5 text-4xl font-bold leading-loose tracking-wide text-transparent bg-gradient-to-b from-neutral-100 to-neutral-700 bg-clip-text">
                Total Songs {totalCounts.song}
              </h1>
            </div>
            <div className=" p-5 w-[20rem] h-[10rem] flex justify-center items-center rounded-2xl hover:scale-110 transition-all hover:bg-[#0f0f0ff2] bg-[#0f0f0f]">
              <h1 className="text-4xl font-bold leading-loose tracking-wide text-transparent bg-gradient-to-b from-neutral-100 to-neutral-700 bg-clip-text">
                Total Artists {totalCounts.artist}
              </h1>
            </div>
            <div className=" p-5 w-[20rem] h-[10rem] flex justify-center items-center rounded-2xl hover:scale-110 transition-all hover:bg-[#0f0f0ff2] bg-[#0f0f0f]">
              <h1 className="text-4xl font-bold leading-loose tracking-wide text-transparent bg-gradient-to-b from-neutral-100 to-neutral-700 bg-clip-text">
                Total Genres {totalCounts.genre}
              </h1>
            </div>
          </div>
          <div className="w-full my-5 h-[0.25rem] bg-black"></div>
          <h1 className="p-5 mt-10 text-4xl font-bold leading-loose tracking-wide text-transparent bg-gradient-to-b from-black to-neutral-500 bg-clip-text">
            Top Songs
          </h1>
          <div className="mt-10 space-y-5 h-[70vh] overflow-y-auto">
            <div className="flex  text-xl h-[full] flex-col w-full pl-10 space-y-5">
              <div className="grid grid-cols-3 text-xl px-10  h-[full] flex-col w-full pl-10 gap-10">
                {topsongs?.slice(0, 6).map((top, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl hover:scale-105 overflow-hidden h-[20rem] bg-[#0f0f0f85] text-white font-bold text-2xl"
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 w-full h-full bg-center bg-cover "
                      style={{ backgroundImage: `url(${top.img_path})` }}
                    ></div>

                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-5 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-2xl">
                      <div className="text-center">
                        <div className="text-3xl">🎵 {top.name}</div>
                        <div className="mt-2 text-lg">
                          Listen Count: {top.times_listened}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full my-5 h-[0.25rem] bg-black"></div>
          <h1 className="mt-10 text-4xl font-bold leading-loose tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-black to-neutral-500">
            Top Listener
          </h1>
          <div className="mt-10 space-y-5 h-[50vh] overflow-y-auto">
            <div className="grid grid-cols-3 text-xl h-[full] flex-col w-full pl-10 gap-10">
              {topUser.map((topUser, index) => (
                <div key={index} className="px-16 py-5 rounded-2xl">
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-5 text-white bg-black bg-opacity-70 hover:bg-opacity-50 hover:text-black rounded-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-loose tracking-wide">
                        {" "}
                        {topUser.username}
                      </div>
                      <div className="mt-2 text-lg font-bold">
                        Listen Count: {topUser.timesListened}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>{(window.location.href = "/")}</div>
      )}
    </>
  );
};

export default Dashboard;
