import React, { useContext, useEffect, useRef, useState } from "react";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { ReloadContext } from "../../../contextprovider/ReloadProvider";
import { SongContext } from "../../../contextprovider/SongProvider";
import ArtistApi from "../../../Apis/ArtistApi";
import GenreApi from "../../../Apis/GenreApi";
import SongApi from "../../../Apis/SongApi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditSongPanel = () => {
  const { id } = useParams();

  const { reload, setReload } = useContext(ReloadContext);

  // console.log(API)
  const stopPost = useRef();
  const [songUpload, setSongUpload] = useState(null);
  const [songImageUpload, setSongImageUpload] = useState(null);

  const { getArtist, getArtistBySongId } = ArtistApi();
  const { getSongById, editSong } = SongApi();
  const { getGenre, getGenreBySongId } = GenreApi();

  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState([]);

  // const [artistIdFromSongId,setArtistIdFromSongId] = useState({
  //   id:""
  // });

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

  // console.log(ids);
  // console.log(values)

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Uploading");
    stopPost.current.disabled = true;

    const songRef = ref(storage, `songs/${songUpload?.name + v4()}`);
    const songImgRef = ref(
      storage,
      `songimage/${songImageUpload?.name + v4()}`
    );

    //if both not present
    if (songUpload == null && songImageUpload == null) {
      editSong(ids.generic_id, ids.artist_id, id, values)
        .then((res) => {
          console.log(res);
          toast.success("Uploaded with out no image and audio!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
        })
        .catch((err) => console.log(err));
    }

    //song path upload present
    if (songUpload != null && songImageUpload == null) {
      Promise.all([uploadBytes(songRef, songUpload)])
        .then(([songSnapshot]) => {
          return Promise.all([getDownloadURL(songSnapshot.ref)]);
        })
        .then(([songUrl]) => {
          setValues((prevValues) => ({
            ...prevValues,
            autoPath: songUrl,
          }));
          return editSong(ids.generic_id, ids.artist_id, id, {
            ...values,
            autoPath: songUrl,
          });
        })
        .then((res) => {
          setReload(true);
          toast.success("Uploaded with only song path!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          setReload(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      return;
    }

    //song image upload present
    if (songUpload == null && songImageUpload != null) {
      Promise.all([uploadBytes(songImgRef, songImageUpload)])
        .then(([imageSnapshot]) => {
          return Promise.all([getDownloadURL(imageSnapshot.ref)]);
        })
        .then(([imageUrl]) => {
          setValues((prevValues) => ({
            ...prevValues,
            imgPath: imageUrl,
          }));
          return editSong(ids.generic_id, ids.artist_id, id, {
            ...values,
            imgPath: imageUrl,
          });
        })
        .then((res) => {
          setReload(true);
          toast.success("Uploaded with only song image!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          setReload(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
      return;
    }

    //if both present
    if (songUpload != null && songImageUpload != null) {
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
          return editSong(ids.generic_id, ids.artist_id, id, {
            ...values,
            autoPath: songUrl,
            imgPath: imageUrl,
          });
        })
        .then((res) => {
          setReload(true);
          toast.success("Uploaded Success!");
          setReload(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };

  // fetching song from db
  useEffect(() => {
    getSongById(id)
      .then((res) => {
        console.log(res[0]);
        setValues(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  // fetching artist and  genere from database whole
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

  //fetching artist by song id from db
  useEffect(() => {
    getArtistBySongId(id)
      .then((res) => {
        // console.log(res[0]);
        // setArtistIdFromSongId(res[0])
        setIds({ ...ids, generic_id: res[0]?.id });
      })
      .catch((err) => console.log(err));

    getGenreBySongId(id)
      .then((res) => {
        // console.log(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Promise.all([getArtistBySongId(id), getGenreBySongId(id)]).then(
      ([artistRes, genreRes]) => {
        console.log(artistRes, genreRes);
        setIds({
          artist_id: artistRes[0]?.id,
          generic_id: genreRes[0]?.id,
        });
      }
    );
  }, []);

  // console.log(ids);

  return (
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
      <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-white mb-6">Edit Song</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              value={values.name}
              type="text"
              id="name"
              name="name"
              class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
              placeholder="Enter your name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
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
                  toast.success("valid image extention");
                  setSongImageUpload(event.target.files[0]);
                } else {
                  toast.error("invalid image extention");
                  setSongImageUpload(null);
                }
              }}
            />
          </div>
          <div class="mb-4">
            <label for="audio" class="block text-sm font-medium text-gray-300">
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
                if (fileExtentionAllowed.includes(fileExtention)) {
                  setSongUpload(event.target.files[0]);
                  toast.success("valid audio extention");
                } else {
                  toast.error("invalid audio extention");
                  setSongImageUpload(null);
                }
              }}
            />
          </div>
          <div class="mb-4">
            <label for="artist" class="block text-sm font-medium text-gray-300">
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
              <option selected disabled value="">
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
            <label for="genre" class="block text-sm font-medium text-gray-300">
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
              <option selected disabled value="">
                Select The Genre
              </option>
              {genre?.map((genre) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label for="lyrics" class="block text-sm font-medium text-gray-300">
              Enter the Lyrics
            </label>
            <textarea
              value={values.lyrics}
              id="lyrics"
              name="lyrics"
              rows="4"
              class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
              placeholder="Enter the lyrics"
              onChange={(e) => setValues({ ...values, lyrics: e.target.value })}
            ></textarea>
          </div>
          <button
            ref={stopPost}
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Edit Song
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSongPanel;
