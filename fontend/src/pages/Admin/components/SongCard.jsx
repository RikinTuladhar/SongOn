import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const SongCard = ({ song, handleDelete }) => {
  const { id, name, autoPath, imgPath } = song;
  console.log(song);
  return (
    <div class="relative flex w-52 md:w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img
          src={imgPath ? imgPath : "/Artist/future.jpg"}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "/Artist/future.jpg";
          }}
          alt="img"
        />
      </div>
      <div class="p-6">
        <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {name}
          <p class="block font-semibold font-sans text-base leading-relaxed text-inherit antialiased">
            {}
          </p>
        </h5>
        <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"></p>
      </div>
      <div class="p-6">
        <div className="flex justify-around w-[50%]">
          <button className="text-2xl">
            <CiEdit />
          </button>{" "}
          <button className="text-2xl" onClick={(e) => handleDelete(id)}>
            <MdDeleteOutline />
          </button>{" "}
        </div>
      </div>
      <audio
        className=" w-auto h-[10%] text-white "
        controls
        width="600px"
      >
        {/* <source src={audioSources[currentIndex]} type="video/mp4" /> */}
        <source src={autoPath} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default SongCard;
