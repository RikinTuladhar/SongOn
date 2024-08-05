import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const SongCard = ({ song, handleDelete }) => {
  const { id, name, autoPath, imgPath } = song;
  // console.log(song);
  return (
    <div class="relative py-5 px-2 border flex w-52 md:w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div class="w-full h-[200px]">
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
        <h5 class="mb-1 block font-sans text-xl font-semibold">
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
            <Link to={`/admin/editSong/${song.id}`}>
              <CiEdit size={25} />
            </Link>
          </button>{" "}
          <button className="text-2xl" onClick={(e) => handleDelete(id)}>
            <MdDeleteOutline size={25} />
          </button>{" "}
        </div>
      </div>
      <audio className=" w-auto h-[10%] text-white " controls width="600px">
        {/* <source src={audioSources[currentIndex]} type="video/mp4" /> */}
        <source src={autoPath} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default SongCard;
