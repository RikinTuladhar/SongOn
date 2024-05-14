import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
const AddSongs = () => {
  const { reload, setReload } = useContext(ReloadContext);
  const { API } = useContext(SongContext);
  // console.log(API)
  const stopPost = useRef();
  const [songUpload, setSongUpload] = useState(null);
  const [songImageUpload, setSongImageUpload] = useState(null);
  const [songlist, setSongList] = useState(null);

  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState([]);

  const [values, setValues] = useState({
    name: "",
    autoPath: "",
    imgPath: "",
  });
  const [ids, setIds] = useState({
    generic_id: "",
    artist_id: "",
  });

  const songRef = ref(storage, "songs/");
  const songImgRef = ref(storage, "songimage/");


  //file saved in firebase
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   stopPost.current.disabled = true;
  //   console.log("clicked submit button");
  //   console.log(songUpload);

  //   if (songUpload == null) return alert("no song upload");

  //   try {
  //     const songRef = ref(storage, `songs/${songUpload.name + v4()}`);
  //     const songImgRef = ref(storage, `songimage/${songImageUpload.name + v4()}`);

  //     const [songSnapshot, imageSnapshot] = await Promise.all([
  //       uploadBytes(songRef, songUpload),
  //       uploadBytes(songImgRef, songImageUpload)
  //     ]);

  //     const [songUrl, imageUrl] = await Promise.all([
  //       getDownloadURL(songSnapshot.ref),
  //       getDownloadURL(imageSnapshot.ref)
  //     ]);

  //     // Update state using state updater function
  //     await setValues(prevValues => ({
  //       ...prevValues,
  //       autoPath: songUrl,
  //       imgPath: imageUrl
  //     }));

  //     // Check if all necessary fields are filled before making the POST request
  //     if (values.name !== "" && values.autoPath !== "" && values.imgPath !== "") {
  //       await axios.post(`${API}/uploadSong/${ids.generic_id}/${ids.artist_id}`, values);
  //       setReload(true);
  //       alert("Success!");
  //       setReload(false);
  //     } else {
  //       alert("Please fill in all fields before submitting.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    stopPost.current.disabled = true;

    if (songUpload == null || songImageUpload == null) {
      stopPost.current.disabled = false;
      alert("no song upload");
     
    }

    const songRef = ref(storage, `songs/${songUpload.name + v4()}`);
    const songImgRef = ref(storage, `songimage/${songImageUpload.name + v4()}`);

    Promise.all([
      uploadBytes(songRef, songUpload),
      uploadBytes(songImgRef, songImageUpload),
    ])
      .then(([songSnapshot, imageSnapshot]) => {
        return Promise.all([
          getDownloadURL(songSnapshot.ref),
          getDownloadURL(imageSnapshot.ref),
        ]);
      })
      .then(([songUrl, imageUrl]) => {
        setValues((prevValues) => ({
          ...prevValues,
          autoPath: songUrl,
          imgPath: imageUrl,
        }));

        return axios.post(
          `${API}/uploadSong/${ids.generic_id}/${ids.artist_id}`,
          { ...values, autoPath: songUrl, imgPath: imageUrl }
        );
      })
      .then((res) => {
        setReload(true);
        alert("Success!");
        setReload(false);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  // posting in database

  // fetching artist and  genere from database
  useEffect(() => {
    axios
      .get(`${API}/artist`)
      .then((res) => {
        setArtist(res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    axios
      .get(`${API}/genre`)
      .then((res) => {
        // console.log(res);
        setGenre(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  // console.log(ids)

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
              {/* picture  */}
              <label className="text-lg font-bold" htmlFor="form-2-picture">
                Picture
              </label>
              <div key={"picture upload"} className="relative w-full">
                <input
                  type="file"
                  name="imgPath"
                  onChange={(event) => {
                    setSongImageUpload(event.target.files[0]);
                    alert("img halyo");
                  }}
                />
              </div>
              {/* audio file  */}
              <label className="text-lg font-bold" htmlFor="form-2-picture">
                Audio
              </label>
              <div key={"audio upload"} className="relative w-full">
                <input
                  type="file"
                  name="autoPath"
                  onChange={(event) => {
                    setSongUpload(event.target.files[0]);
                    alert("halyo hai");
                  }}
                />
              </div>
              <label
                className="mt-3 text-lg font-bold"
                htmlFor="text-lg font-bold"
              >
                Select Artist
              </label>
              <select
                name="artist"
                onChange={(e) =>
                  setIds((prev) => ({ ...prev, artist_id: e.target.value }))
                }
                id="artist"
              >
                <option selected disabled value="">
                  Select The Artist
                </option>
                {artist?.map((artist) => (
                  <option value={artist.id}>{artist.name}</option>
                ))}
              </select>
              <div className="flex flex-col w-full h-auto">
                <label className="mt-3 text-lg font-bold" htmlFor="">
                  Select Generic
                </label>
                <select
                  name="artist"
                  id="artist"
                  onChange={(e) =>
                    setIds((prev) => ({ ...prev, generic_id: e.target.value }))
                  }
                >
                  <option selected disabled value="">
                    Select The Artist
                  </option>
                  {genre?.map((genre) => (
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
