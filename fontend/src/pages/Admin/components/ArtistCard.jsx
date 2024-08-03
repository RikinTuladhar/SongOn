import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const ArtistCard = ({ artist, handleDelete }) => {
  const { id, name, gender, bio, imgArtist } = artist;
  return (
    <div class="relative flex w-52 md:w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img
          src={imgArtist ? imgArtist : "/Artist/future.jpg"}
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
            {gender}
          </p>
        </h5>
        <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {bio}
        </p>
      </div>
      <div class="p-6 pt-0">
        <div className="flex justify-around w-[50%]">
          <button className="text-2xl">
            <Link to={`/admin/editArtist/${artist.id}`}>
              <CiEdit />
            </Link>
          </button>{" "}
          <button className="text-2xl" onClick={(e) => handleDelete(id)}>
            <MdDeleteOutline />
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
