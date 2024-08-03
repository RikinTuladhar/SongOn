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
const EditSongPanel = () => {
  const { id } = useParams();

  const { reload, setReload } = useContext(ReloadContext);

  // console.log(API)
  const stopPost = useRef();
  const [songUpload, setSongUpload] = useState(null);
  const [songImageUpload, setSongImageUpload] = useState(null);

  const { getArtist } = ArtistApi();
  const { getSongById, editSong } = SongApi();
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

  // console.log(ids);
  // console.log(values)

  const handleSubmit = (e) => {
    e.preventDefault();
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
          alert("Success with only song path!");
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
          alert("Success with only song image!");
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
          alert("Success!");
          setReload(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };

  useEffect(() => {
    getSongById(id)
      .then((res) => {
        console.log(res[0]);
        setValues(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  // fetching artist and  genere from database
  useEffect(() => {
    getArtist()
      .then((res) => {
        setArtist(res);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    getGenre()
      .then((res) => {
        console.log(res);
        setGenre(res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <body class="bg-gray-900 flex items-center justify-center min-h-screen">
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
                setSongImageUpload(event.target.files[0]);
                alert("img halyo");
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
                setSongUpload(event.target.files[0]);
                alert("halyo hai");
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
                Select The Artist
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
            Add Song
          </button>
        </form>
      </div>
    </body>
  );
};

export default EditSongPanel;
