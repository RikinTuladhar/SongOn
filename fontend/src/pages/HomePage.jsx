import React, { useEffect } from "react";
import SongPlayer from "../components/SongPlayer";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  useEffect(() => {

    toast.info("Click on song and press next song from panel to listen!!");
  }, []);

  return (
    <div className="w-full h-[auto] min-h-[100vh] bg-[#000000] relative  mt-[10vh] pt-5 md:pb-40 md:mt-[10vh] overflow-hidden flex flex-col items-center gap-3">
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="text-2xl my-3  md:my-0 md:text-3xl font-extrabold text-center text-[#E5E7EB] ">
        Welcome to my songs list
      </h1>
      <div className="container flex flex-wrap w-full h-full gap-5 md:flex-nowrap">
        <HomeLeft />
        <HomeRight />
      </div>
    </div>
  );
};

export default HomePage;
