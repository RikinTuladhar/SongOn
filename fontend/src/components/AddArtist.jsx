import React, { useContext, useRef, useState } from "react";
import { SongContext } from "../contextprovider/SongProvider";
import { v4 } from "uuid";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import axios from "axios";
import ArtistApi from "../Apis/ArtistApi";

const AddArtist = () => {
  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    gender: "",
    imgArtist: "",
  });

  const { reload, setReload } = useContext(ReloadContext);

const {addArtist} =ArtistApi();
  const [artistImage, setArtistImage] = useState(null);
  const stopPost = useRef();

  const getValues = (event) => {
    const { name, value } = event.target;
    setArtist({ ...artist, [name]: value });
  };
console.log(artist);
  const handleSubmit = (event) => {
    event.preventDefault();
    stopPost.current.disabled = true;
    const { name, bio, gender } = artist;
    if (name && bio && gender) {
      if (artistImage == null) {
        stopPost.current.disabled = false;
        alert("Please upload image");
      }
      const artistRef = ref(storage, `artistImage/${artistImage.name + v4()}`);
      uploadBytes(artistRef, artistImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
          .then((url) => {
              console.log("Uploading" + artist)
              console.log(url)
              // axios.post(`${API}/artist`, { ...artist, imgArtist: url ? url :""});
              return addArtist({ ...artist, imgArtist: url ? url :""});
            }).then((res)=>{
              alert("Uploaded");
              setReload(true);
              alert("Artist Added Successfully");
              setReload(false);
              setArtist({
                name: "",
                bio: "",
                gender: "",
                imgArtist: "",
              });
              stopPost.current.disabled = false;
            })
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Please fill all the fields");
      stopPost.current.disabled = false;
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-500 flex justify-center items-center">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-1.5 p-6 rounded-lg border width center dark:border-gray-800">
            <label className="text-lg font-bold" htmlFor="form-2-name ">
              Name
            </label>
            <input
              className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="form-2-name"
              placeholder="Enter your name"
              name="name"
              onChange={getValues}
              type="text"
              value={artist.name}
            />

            <label className="text-lg font-bold" htmlFor="form-2-name ">
              Bio
            </label>
            <input
              className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="form-2-name"
              placeholder="Enter your name"
              name="bio"
              type="text"
              onChange={getValues}
              value={artist.bio}
            />

            <label className="text-lg font-bold" htmlFor="form-2-name ">
              Gender
            </label>
            <div className="flex justify-around">
              <div>
                <span>Male:</span>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="form-2-name"
                  placeholder="Enter your name"
                  name="gender"
                  value="Male"
                  onChange={getValues}
                  type="radio"
                />
              </div>
              <div>
                <span>Femal:</span>
                <input
                  className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="form-2-name"
                  placeholder="Enter your name"
                  value="Female"
                  name="gender"
                  onChange={getValues}
                  type="radio"
                />
              </div>
            </div>
            <label className="text-lg font-bold" htmlFor="form-2-picture">
              Image
            </label>
            <div key={"audio upload"} className="relative w-full">
              <input
                type="file"
                name="autoPath"
                onChange={(event) => {
                  setArtistImage(event.target.files[0]);
                  alert("img hai");
                }}
              />
            </div>
            <button type="submit" ref={stopPost}>
              Add Artist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtist;
