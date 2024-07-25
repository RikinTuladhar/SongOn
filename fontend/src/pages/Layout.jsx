import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ReloadProvider from "../contextprovider/ReloadProvider";
import SongPlayer from "../components/SongPlayer";
import SongProvider from "../contextprovider/SongProvider";

const Layout = () => {
  const [genreId, setGenreId] = useState("");
  const [artistId, setArtistId] = useState("");
  return (
    <div className="relative w-full">
      <Navbar />
      <Outlet context={{ genreId, setGenreId, artistId, setArtistId }} />
        <SongPlayer />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
