
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { SongContext } from "../contextprovider/SongProvider";
const AddArtist = () => {
  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    gender: "",
  });

  const {API} = useContext(SongContext);

  const stopPost = useRef();

  const getValues = (event) => {
    const {name,value} = event.target;
    setArtist({...artist, [name]: value});

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    stopPost.current.disabled = true;
    const {name ,bio ,gender } = artist; 
    if(name && bio && gender){
        axios.post(`${API}/artist`,artist).then((res)=>{
            if(res){
                alert("Artist Added Successfully")
                setArtist({
                    name: "",
                    bio: "",
                    gender: "",
                })
                stopPost.current.disabled = false;
                window.location.reload();
            }
        }).catch((err) => {console.error(err);})

    }
    else{
        alert("Please fill all the fields")
        stopPost.current.disabled = false;
    }

  };

  return (
    <div>
      <div>
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

                {/* <label className="text-lg font-bold" htmlFor="form-2-picture">
                Picture
              </label> */}
                {/* <div className="relative w-full">
                <input
                  id="form-2-picture"
                  className="sr-only"
                  aria-hidden="true"
                  type="file"
                  name="autoPath"
                  onChange={(event) => {
                    setSongUpload(event.target.files[0]);
                  }}
                />
                <label
                  htmlFor="form-2-picture"
                  className="flex items-center w-full gap-2 px-3 py-2 text-sm transition-colors duration-150 border border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                  <span>Choose a file…</span>
                </label>
              </div> */}

                <button type="submit" ref={stopPost}>
                  Add Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtist;
