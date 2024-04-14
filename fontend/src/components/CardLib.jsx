import React from "react";
import { Link } from "react-router-dom";


const CardLib = ({id,name,songlist}) => {
  // console.log(songlist)
  return (
    // /library/1 -> hiphop 
    // /library/2 -> classic 
    <Link to ={`/library/${id}`}>  
      <div className="w-52 h-auto px-5  py-2 rounded-md min-h-52 hover:bg-[#1b1b1bd3]  hover:ease-in">
        <div className="w-full h-[65%] mb-2 ">
          <img
            src="/Artist/future.jpg"
            className="w-full h-full rounded-lg"
            alt="img"
          />
        </div>
        <div className="mb-1">
          <h1 className="text-base font-semibold text-[#E5E7EB]">
          {name}
          </h1>
        </div>
        <div>
          <span className="text-[#E5E7EB] flex flex-wrap gap-2">
            { songlist.slice(0,2)?.map((song)=>(
              <span key={song.id}>{song.name.length > 15 ? song.name.slice(0,15) : song.name},</span>
            ))
            }
             <span>..More</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardLib;
