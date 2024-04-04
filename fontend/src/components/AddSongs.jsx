import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import {ReloadContext} from "../contextprovider/ReloadProvider"
const AddSongs = () => {
    const {reload,setReload} = useContext(ReloadContext);
   
  const stopPost = useRef();
  const [songUpload, setSongUpload] = useState(null);
  const [songlist, setSongList] = useState(null);

  const [values, setValues] = useState({
    name: "",
    autoPath: "",
  });

//file saved in firebase 
  const handleSubmit = async (e) => {
    e.preventDefault();
    stopPost.current.disabled = true;
  
    if (songUpload == null) return;
    const songRef = ref(storage, `songs/${songUpload.name + v4()}`);
    uploadBytes(songRef, songUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        alert("song uploaded ");
        console.log(url);
        setValues({ ...values, autoPath: url });
      });
    });
  };
  
  useEffect(() => {
    //then after the  file save it will rerender the componenet as values.autoPath is filled with url so
    // it will add data in database by this function 
    const postSong = async () => {
      try {
        if (values.autoPath !== "") {
          const response = await axios.post(
            "http://localhost:8080/uploadSong",
            values
          );
          console.log(response);
          setReload(true)
          alert("Success!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    postSong();
  }, [values.autoPath]);
  

  const songRef = ref(storage, "songs/");



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <input
          type="file"
          name="autoPath"
          onChange={(event) => {
            setSongUpload(event.target.files[0]);
          }}
        />
        <button type="submit" ref={stopPost} >
          Add song
        </button>
      </form>
    </div>
  );
};

export default AddSongs;
