import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const ArtistCard = ({ artist,handleDelete }) => {
  const { id, name, gender, bio } = artist;
  return (
    <div key={id}  className="rounded-xl  w-[150px] md:w-[250px] flex flex-col h-[300px] bg-slate-500">
      <div className="w-full bg-red-500 rounded-md h-2/3">
        <img
          src=""
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "/Artist/future.jpg";
          }}
          alt="img"
        />
      </div>
      <div className="w-full pt-2 flex items-center justify-around bg-yellow-200 h-[50%]">
        <span className="text-xl font-bold ">
          <p className="text-center">{name}</p>
        </span>{" "}
        <span className="font-bold">{gender}</span>
      </div>
      <div className="px-5 items-center flex justify-around w-full bg-green-300 h-[50%]">
        <div className="w-[50%]">{bio}</div>
        <div className="flex justify-around w-[50%]">
          <button className="text-2xl">
            <CiEdit />
          </button>{" "}
          <button className="text-2xl" onClick={e=>handleDelete(id)}>
            <MdDeleteOutline />
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
