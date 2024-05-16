import React, { useEffect, useState } from "react";
import SongApi from "../Apis/SongApi";
import GenreApi from "../Apis/GenreApi";
import Wave from "../SVG/Wave";
const AddSongInGenre = () => {
  const { getSong } = SongApi();
  const { getGenre, putSongOnGenre } = GenreApi();
  const [genre, setGenre] = useState([]);
  const [song, setSong] = useState([]);
  const [data, setData] = useState({
    genreId: "",
    songId: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // console.log(data.genreId)
  // console.log(data.songId)
  useEffect(() => {
    (() => {
      Promise.all([getGenre(), getSong()]).then(([genre, song]) => {
        // console.log(genre);
        setGenre(genre);
        // console.log(song);
        setSong(song);
      });
    })();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("clicked");
    putSongOnGenre(data.genreId, data.songId)
      .then((res) => {
        alert(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full px-5  flex justify-center items-center h-[100vh] bg-[#0E0F19] text-white">
      <div className="w-full rounded-2xl h-auto md:h-[95%] bg-[#66788F] flex flex-col justify-center items-center gap-5">
        <div className="h-[20%]  my-10">
          <h1 className="text-2xl md:text-5xl font-bold ">Song in Genre Edit</h1>
        </div>
        <div className="w-full h-full ">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full relative text-black"
          >
            <div className="flex w-full h-[80%] justify-around flex-wrap">
              {/* genre  */}
              <div className="flex flex-col">
                <label
                  className="text-xl md:text-2xl px-5 py-5 font-semibold"
                  htmlFor="genreId"
                >
                  Select Genre
                </label>
                <select
                  onChange={handleChange}
                  name="genreId"
                  id=""
                  className="p-[3px] text-base md:p-[10px] md:text-[16px] rounded-md"
                >
                  <option disabled selected>
                    Select Genre
                  </option>
                  {genre?.map((genre, i) => (
                    <option key={i} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* song  */}
              <div className="flex flex-col">
                <label
                  className="text-xl md:text-2xl px-5 py-5 font-semibold "
                  htmlFor="songId"
                >
                  Select Song
                </label>
                <select
                  name="songId"
                  id=""
                  onChange={handleChange}
                  className="p-[3px] text-base md:p-[10px] md:text-[16px] rounded-md"
                >
                  <option disabled selected>
                    Select Song
                  </option>
                  {song?.map((song, i) => (
                    <option key={i} value={song.id}>
                      {song.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex mb-5 justify-center items-center">
              <button
                className="my-5 z-50 group cursor-pointer outline-none hover:rotate-90 duration-300"
                title="Add New"
              >
                <svg
                  className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                  viewBox="0 0 24 24"
                  height="50px"
                  width="50px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-width="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  ></path>
                  <path stroke-width="1.5" d="M8 12H16"></path>
                  <path stroke-width="1.5" d="M12 16V8"></path>
                </svg>
              </button>
            </div>
            <Wave />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSongInGenre;
