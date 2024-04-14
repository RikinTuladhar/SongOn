
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { SongContext } from "../contextprovider/SongProvider";
import Navbar from "../components/Navbar";
import AddArtist from "../components/AddArtist";
const AddArtistPage = () => {
  return (
    <div>
      <Navbar/>
      <div>
       <AddArtist/>
      </div>
    </div>
  );
};

export default AddArtistPage;
