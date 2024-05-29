import React from "react";
import { Link } from "react-router-dom";

const CardLib = ({ id, name, songlist, img }) => {
  // console.log(songlist)
  return (
    // /library/1 -> hiphop
    // /library/2 -> classic
    <Link key={id} to={`/library/${id}`}>
      <div className="w-52 flex flex-col gap-5 h-auto px-5  py-2 rounded-md min-h-52 hover:bg-[#1b1b1bd3]  hover:ease-in">
        <div className="w-full h-[150px] mb-2 ">
          <img
            src={img ? img : "/Artist/future.jpg"}
            onError={(e) => (e.target.src = "/Artist/future.jpg")}
            className="object-cover w-full h-full rounded-lg"
            alt="img"
          />
        </div>
        <div className="mb-1">
          <h1 className="text-base font-semibold text-[#E5E7EB]">{name}</h1>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default CardLib;
