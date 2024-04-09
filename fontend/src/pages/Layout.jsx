import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ReloadProvider from "../contextprovider/ReloadProvider";
import SongPlayer from "../components/SongPlayer";
import SongProvider from "../contextprovider/SongProvider";

const Layout = () => {
  return (
    <div className="w-full">
        <Navbar />
        <Outlet />
         <div className='flex justify-center'><SongPlayer/> </div>
        {/* <Footer /> */}
    </div>
  );
};

export default Layout;
