import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { ReloadContext } from "../contextprovider/ReloadProvider";
import { SongContext } from "../contextprovider/SongProvider";
import ArtistApi from "../Apis/ArtistApi";
import GenreApi from "../Apis/GenreApi";
import SongApi from "../Apis/SongApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
const AddSongs = () => {
  const user = useSelector((state) => state.user.userDetails);
  const { reload, setReload } = useContext(ReloadContext);
  // console.log(API)
  const stopPost = useRef();
  const [songUpload, setSongUpload] = useState(null);
  const [songImageUpload, setSongImageUpload] = useState(null);
  const [songlist, setSongList] = useState(null);
  const { getArtist } = ArtistApi();
  const { addSong } = SongApi();
  const { getGenre } = GenreApi();

  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState([]);

  const [values, setValues] = useState({
    name: "",
    autoPath: "",
    imgPath: "",
    lyrics: "",
  });
  const [ids, setIds] = useState({
    generic_id: "",
    artist_id: "",
  });

  // console.log(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Uploading...");
    stopPost.current.disabled = true;

    if (values?.name.length <= 0) {
      stopPost.current.disabled = false;
      toast.info("Name cannot be empty");
      return;
    }

    if (songUpload == null || songImageUpload == null) {
      stopPost.current.disabled = false;
      toast.error("No song or image upload");
      return;
    }

    const songRef = ref(storage, `songs/${songUpload.name + v4()}`);
    const songImgRef = ref(storage, `songimage/${songImageUpload.name + v4()}`);

    // console.log("Uploading song and image...");
    // console.log(ids)

    if (ids.generic_id == "" || ids.generic_id == null) {
      stopPost.current.disabled = false;
      toast.error("No Genre Selected");
      return;
    }

    if (ids.artist_id == "" || ids.artist_id == null) {
      stopPost.current.disabled = false;
      toast.error("No Artist Selected");
      return;
    }

    Promise.all([
      uploadBytes(songRef, songUpload),
      uploadBytes(songImgRef, songImageUpload),
    ])
      .then(([songSnapshot, imageSnapshot]) => {
        // console.log("Upload successful. Retrieving URLs...");
        return Promise.all([
          getDownloadURL(songSnapshot.ref),
          getDownloadURL(imageSnapshot.ref),
        ]);
      })
      .then(([songUrl, imageUrl]) => {
        // console.log("URLs retrieved:", songUrl, imageUrl);
        setValues((prevValues) => ({
          ...prevValues,
          autoPath: songUrl,
          imgPath: imageUrl,
        }));
        // console.log("Values updated:", values);
        return addSong(ids.generic_id, ids.artist_id, {
          ...values,
          autoPath: songUrl,
          imgPath: imageUrl,
        });
      })
      .then((res) => {
        // console.log("Song added successfully:", res);
        setReload(true);
        toast.success("Song added successfully");
        setReload(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        stopPost.current.disabled = false;
      })
      .catch((error) => {
        console.error("Error:", error.message);
        stopPost.current.disabled = false;
      });
  };

  // posting in database

  // fetching artist and  genere from database
  useEffect(() => {
    getArtist()
      .then((res) => {
        setArtist(res);
        // console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    getGenre()
      .then((res) => {
        // console.log(res);
        setGenre(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  // console.log(ids)

  return (
    <>
      {user.role == "ADMIN" ? (
        <div class="bg-gray-900 flex items-center justify-center min-h-screen">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div class="bg-gray-800  border py-5 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-bold text-white mb-6">Add Song</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </div>
              <div class="mb-4">
                <label
                  for="picture"
                  class="block text-sm font-medium text-gray-300"
                >
                  Picture
                </label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  class="mt-1 p-2 bg-gray-700 text-gray-400 rounded-lg w-full"
                  onChange={(event) => {
                    const fileExtentionAllowed = [
                      "jpg",
                      "png",
                      "jpeg",
                      "webp",
                      "gif",
                      "jfif",
                    ];
                    const fileExtention = event.target.files[0].name
                      .split(".")
                      .pop();
                    console.log(fileExtention);
                    if (fileExtentionAllowed.includes(fileExtention)) {
                      setSongImageUpload(event.target.files[0]);
                      toast.success("valid image extention");
                    } else {
                      toast.error("invalid image extention");
                      setSongImageUpload(null);
                    }
                  }}
                />
              </div>
              <div class="mb-4">
                <label
                  for="audio"
                  class="block text-sm font-medium text-gray-300"
                >
                  Audio
                </label>
                <input
                  type="file"
                  id="audio"
                  name="audio"
                  class="mt-1 p-2 bg-gray-700 text-gray-400 rounded-lg w-full"
                  onChange={(event) => {
                    const fileExtentionAllowed = [
                      "mp3",
                      "mp4",
                      "flac",
                      "mp4",
                      "wav",
                      "wma",
                      "aac",
                    ];

                    const fileExtention = event.target.files[0].name
                      .split(".")
                      .pop();
                    console.log(fileExtention);
                    console.log(fileExtentionAllowed.includes(fileExtention));
                    if (fileExtentionAllowed.includes(fileExtention)) {
                      setSongUpload(event.target.files[0]);
                      toast.success("valid audio extention");
                    } else {
                      toast.error("invalid image extention");
                      setSongImageUpload(null);
                    }
                  }}
                />
              </div>
              <div class="mb-4">
                <label
                  for="artist"
                  class="block text-sm font-medium text-gray-300"
                >
                  Select Artist
                </label>
                <select
                  id="artist"
                  name="artist"
                  class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
                  onChange={(e) =>
                    setIds((prev) => ({ ...prev, artist_id: e.target.value }))
                  }
                >
                  <option key={"default artist"} selected disabled value="">
                    Select The Artist
                  </option>
                  {artist?.map((artist, i) => (
                    <option key={i} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
              <div class="mb-4">
                <label
                  for="genre"
                  class="block text-sm font-medium text-gray-300"
                >
                  Select Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
                  onChange={(e) =>
                    setIds((prev) => ({ ...prev, generic_id: e.target.value }))
                  }
                >
                  <option key={"default genre"} selected disabled value="">
                    Select The Genre
                  </option>
                  {genre?.map((genre) => (
                    <option value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div class="mb-4">
                <label
                  for="lyrics"
                  class="block text-sm font-medium text-gray-300"
                >
                  Enter the Lyrics
                </label>
                <textarea
                  id="lyrics"
                  name="lyrics"
                  rows="4"
                  class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
                  placeholder="Enter the lyrics"
                  onChange={(e) =>
                    setValues({ ...values, lyrics: e.target.value })
                  }
                ></textarea>
              </div>
              <button
                ref={stopPost}
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Add Song
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>{(window.location.href = "/")}</div>
      )}
    </>
  );
};

export default AddSongs;
