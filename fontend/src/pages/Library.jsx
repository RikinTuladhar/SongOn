import React from "react";
import HomeLeft from "../components/HomeLeft";
import LibraryLeft from "../components/LibraryLeft";

const Library = () => {
  return (
    <div className="w-full h-[120vh]  mt-[20vh] pt-5  md:mt-[10vh] bg-[#000000] flex justify-around">
     <LibraryLeft/>
      {/* right  */}
      {/* top */}
      <div className="w-[70%] h-[100vh] overflow-y-auto  mt-3 px-10 py-10 bg-[#090909] rounded-xl">
      <h1 className="text-2xl text-[#E5E7EB] ">Songs List</h1>
        <div className="w-full mt-3 h-[2px] bg-black "></div>
        {/* bottom  */}
       <div className="mt-5 w-full h-auto"> 
       {/* songs list  */}
       <div className="w-full h-auto px-2 flex flex-col gap-2 py-10 bg-[#0f0f0f]">
        {/* headings */}
        <div className="flex justify-between px-5 text-[#E5E7EB]">
          <span>#</span>
          <span>Title </span>
          <span>Artist Name</span>
        </div>
        <div className="flex flex-col gap-2 px-2">
        <div className="w-full h-20 bg-[#090909] "></div>
        <div className="w-full h-20 bg-[#090909] "></div>
        <div className="w-full h-20 bg-[#090909] "></div>
        <div className="w-full h-20 bg-[#090909] "></div>
        <div className="w-full h-20 bg-[#090909] "></div>
       
       


        </div>
       </div>
       </div>

      </div>
    </div>
  );
};

export default Library;
