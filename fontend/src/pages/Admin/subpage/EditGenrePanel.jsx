import React, { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../../../contextprovider/SongProvider";
import GenreApi from "../../../Apis/GenreApi";
import { v4 } from "uuid";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const EditGenrePanel = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState({
    name: "",
    bio: "",
    imgGenre: "",
  });

  const [genreId, setGenreId] = useState("");
  const [genreImage, setGenreImage] = useState(null);
  // console.log(genreImage);
  const stopPost = useRef();

  const { getGenreById, editGenre } = GenreApi();

  const getValues = (event) => {
    const { name, value } = event.target;
    setGenre({ ...genre, [name]: value });
  };
  // console.log(genre)
  useEffect(() => {
    getGenreById(id)
      .then((res) => {
        console.log(res);
        setGenreId(res.id);
        setGenre(res);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(genreId);

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.info("Uploading...");
    stopPost.current.disabled = true;
    // console.log(name , bio)
    if (genreImage != null) {
      const genreRef = ref(storage, `genreImage/${genreImage?.name + v4()}`);
      uploadBytes(genreRef, genreImage).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            // console.log(url);
            return editGenre(genreId, { ...genre, imgGenre: url ? url : "" });
          })
          .then((res) => {
            if (res) {
              toast.success("Genre edited Successfully with new poster ");
              setGenre({
                name: "",
                bio: "",
                imgGenre: "",
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              stopPost.current.disabled = false;
            }
          })
          .catch((err) => {
            console.log(err);
            stopPost.current.disabled = false;
            toast.error(err.message);
          });
      });
    } else {
      editGenre(genreId,genre)
        .then((res) => {
          setGenre({
            name: "",
            bio: "",
            imgGenre: "",
          });
          stopPost.current.disabled = false;
          toast.success("Genre edited successfully without poster");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
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
      <div className="w-full h-[100vh] bg-gray-900  flex justify-center items-center">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5 p-6 rounded-lg border width center bg-gray-800 ">
              <h2 class="text-2xl font-bold text-white mb-6">Edit Genre</h2>
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="form-2-name "
              >
                Name
              </label>
              <input
                class="mt-1 p-2 bg-gray-700 text-white rounded-lg w-full"
                id="form-2-name"
                placeholder="Enter your name"
                name="name"
                onChange={getValues}
                type="text"
                value={genre?.name}
              />

              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="form-2-name "
              >
                Bio
              </label>
              <input
                class="mt-1 p-2 bg-gray-700 text-white rounded-lg "
                placeholder="Enter Bio"
                name="bio"
                type="text"
                onChange={getValues}
                value={genre?.bio}
              />
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-300"
              >
                Poster for genre
              </label>
              <input
                type="file"
                name="GenreImage"
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
                  if (fileExtentionAllowed.includes(fileExtention)) {
                    setGenreImage(event.target.files[0]);
                    toast.success("valid image extension");
                  } else {
                    setGenreImage(null);
                    stopPost.current.disabled = false;
                    toast.error("valid image extension");
                  }
                }}
              />
              <button
                type="submit"
                class="bg-blue-600  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                ref={stopPost}
              >
                <span>Edit Genre</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGenrePanel;
