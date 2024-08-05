import React, { useContext, useEffect, useRef, useState } from "react";
import ArtistApi from "../../../Apis/ArtistApi";
import ArtistCard from "../components/ArtistCard";
import { ReloadContext } from "../../../contextprovider/ReloadProvider";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { storage } from "../../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const EditArtistPanel = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    gender: "",
    imgArtist: "",
  });

  const { reload, setReload } = useContext(ReloadContext);

  const { addArtist, editArtist, getArtistById } = ArtistApi();
  const [artistImage, setArtistImage] = useState(null);
  const stopPost = useRef();

  const getValues = (event) => {
    const { name, value } = event.target;
    setArtist({ ...artist, [name]: value });
  };
  // console.log(artist);

  useEffect(() => {
    getArtistById(id).then((res) => {
      // console.log(res);
      setArtist(res);
    });
  }, []);

  const handleSubmit = (event) => {
    toast.info("uploading...");
    event.preventDefault();
    stopPost.current.disabled = true;

    if (artistImage != null) {
      console.log("inside first")
      const artistRef = ref(storage, `artistImage/${artistImage.name + v4()}`);
      uploadBytes(artistRef, artistImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              return editArtist(id, { ...artist, imgArtist: url ? url : "" });
            })
            .then((res) => {
              toast.success("Uploaded image");
              setReload(true);
              toast.success("Artist edited successfully image");
              setReload(false);
              setArtist({
                name: "",
                bio: "",
                gender: "",
                imgArtist: "",
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              stopPost.current.disabled = false;
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      editArtist(id, artist).then((res) => {
        console.log("inside second")
        toast.success("Artist edited successfully without image");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gray-900  flex justify-center items-center">
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
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid bg-gray-800 border w-full max-w-sm items-center gap-1.5 p-6 rounded-lg  width center ">
            <h2 class="text-2xl font-bold text-white mb-6">Edit Artist</h2>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="form-2-name "
            >
              Name
            </label>
            <input
              class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
              id="form-2-name"
              placeholder="Enter artist name"
              name="name"
              onChange={getValues}
              type="text"
              value={artist?.name}
            />

            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="form-2-name "
            >
              Bio
            </label>
            <input
              class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
              id="form-2-name"
              placeholder="Enter bio "
              name="bio"
              type="text"
              onChange={getValues}
              value={artist?.bio}
            />

            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="form-2-name "
            >
              Gender
            </label>
            <div className="flex justify-around">
              <div>
                <span className="block text-sm font-medium text-gray-300">
                  Male:
                </span>
                <input
                  className="w-10 h-5"
                  id="form-2-name"
                  placeholder="Enter your name"
                  name="gender"
                  value="Male"
                  checked={artist?.gender == "Male" ? true : false}
                  onChange={getValues}
                  type="radio"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-300">
                  Femal:
                </span>
                <input
                  className="w-10 h-5"
                  id="form-2-name"
                  placeholder="Enter your name"
                  value="Female"
                  name="gender"
                  checked={artist?.gender == "Female" ? true : false}
                  onChange={getValues}
                  type="radio"
                />
              </div>
            </div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="form-2-picture"
            >
              Image
            </label>
            <div key={"audio upload"} className="relative w-full">
              <input
                type="file"
                name="autoPath"
                class="mt-1 p-2 bg-gray-700 text-gray-400 rounded-lg "
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
                    setArtistImage(event.target.files[0]);
                    toast.success("valid image extention");
                  } else {
                    toast.error("Invalid Image extention");
                    setArtistImage(null);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              ref={stopPost}
            >
              Edit Artist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArtistPanel;
