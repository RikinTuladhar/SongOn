import React from "react";
import Navbar from "../components/Navbar";
import AddArtist from "../components/AddArtist";

const AddArtistPage = () => {
  console.log(user);
  return (
    <div>
      <Navbar />
      <div>
        <AddArtist />
      </div>
    </div>
  );
};

export default AddArtistPage;
