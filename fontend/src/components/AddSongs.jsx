import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
const AddSongs = () => {
  const { reload, setReload } = useContext(ReloadContext);
 const {API} = useContext(SongContext);
  console.log(API)
  const stopPost = useRef();
  const [songUpload, setSongUpload] = useState(null);
  const [songlist, setSongList] = useState(null);

  const [genre,setGenre] = useState([])
  const [artist,setArtist] = useState([])

  const [values, setValues] = useState({
    name: "",
    autoPath: "",
  });
  const [ids,setIds] = useState({
    generic_id:"",
    artist_id:""
  })

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

  // posting in database 
  useEffect(() => {
    //then after the  file save it will rerender the componenet as values.autoPath is filled with url so
    // it will add data in database by this function
    const postSong = async () => {
      try {
        if (values.autoPath !== "") {
          const response = await axios.post(
            `${API}/uploadSong/${ids.generic_id}/${ids.artist_id}`,
            values
          );
          console.log(response);
          setReload(true);
          alert("Success!");
          setReload(false)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    postSong();
  }, [values.autoPath]);


  // fetching artist and  genere from database 
  useEffect(()=>{
    axios.get(`${API}/artist`).then((res)=>{
      setArtist(res.data);
      // console.log(res);

    }).catch((err)=>{console.error("Error:", err);})

    axios.get(`${API}/genre`).then((res)=>{
      // console.log(res);
      setGenre(res.data)
    }).catch((err)=>{console.error("Error:", err);})

  },[])

  const songRef = ref(storage, "songs/");

  console.log(ids)

  return (
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
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <label className="text-lg font-bold" htmlFor="form-2-picture">
                Picture
              </label>
              <div className="relative w-full">
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
              </div>

              <label
                className="mt-3 text-lg font-bold"
                htmlFor="text-lg font-bold"

              >
                Select Artist
              </label>
              <select name="artist" onChange={e=>setIds((prev)=>({...prev,artist_id:e.target.value}))} id="artist">
                <option selected disabled value="">Select The Artist</option>
               {artist?.map((artist) =>(
                <option value={artist.id}>{artist.name}</option>
               ))}
              </select>
              <div className="flex flex-col w-full h-auto">
                <label className="mt-3 text-lg font-bold" htmlFor="">
                  Select Generic
                </label>
                <select name="artist" id="artist" onChange={e=>setIds((prev)=>({...prev,generic_id:e.target.value}))} >
                <option selected disabled value="">Select The Artist</option>
               {genre?.map((genre) =>(
                <option value={genre.id}>{genre.name}</option>
               ))}
              </select>
              </div>

              <button type="submit" ref={stopPost}>
                Add song
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSongs;
