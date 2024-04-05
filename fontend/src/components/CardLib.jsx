import React from "react";
import { Link } from "react-router-dom";
const CardLib = ({id,name,songlist}) => {
  console.log(songlist)
  return (
    // /library/1 -> hiphop 
    // /library/2 -> classic 
    <Link to ={`/library/${id}`}>  
      <div className="w-40 px-2 py-2 rounded-md h-52 ">
        <div className="w-full h-[65%] ">
          <img
            src="/Artist/future.jpg"
            className="w-full h-full rounded-3xl"
            alt="img"
          />
        </div>
        <div>
          <h1 className="text-base font-semibold text-[#E5E7EB]">
          {name}
          </h1>
        </div>
        <div>
          <span className="text-[#E5E7EB] flex flex-wrap gap-2">
            { songlist.slice(0,3)?.map((song)=>(
              <span key={song.id}>{song.name},</span>
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
