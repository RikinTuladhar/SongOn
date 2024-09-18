import axios from "axios";
import React from "react";

const GenreApi = () => {
  const baseUrl = "https://songon.onrender.com";

  async function getGenre() {
    const URL = baseUrl + "/genre";
    // console.log(URL);
    const response = await axios.get(URL);
    const data = await response.data;
    // console.log(data)
    return data;
  }

  async function getGenreById(id) {
    const URL = baseUrl + `/genre/${id}`;
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function getGenreBySongId(songId) {
    const URL = `${baseUrl}/genre/By-songid/${songId}`;
    // console.log(URL);
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      // console.log(data);
      return data;
    } catch (e) {
      throw new Error("Server Error");
    }
  }

  async function getSongByGenreId(id) {
    const URL = baseUrl + `/song/by-genre/${id}`;
    // console.log(URL)
    const response = await axios.get(URL);
    const data = await response.data;
    // console.log(data);
    return data;
  }

  async function postGenre(value) {
    try {
      const URL = baseUrl + "/genre";
      // console.log(URL);
      const response = await axios.post(URL, value);
      const data = await response.data;
      // console.log(data)
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err.response.data.errorMessage);
    }
  }

  async function deleteGenre(endpoint) {
    const URL = baseUrl + endpoint;
    // console.log(URL)
    const response = await axios.delete(URL);
    const data = await response.data;
    return data;
  }

  async function putSongOnGenre(genreId, songId) {
    // https://songonbackend.onrender.com/genre/21/song/70
    const URL = baseUrl + `/genre/${genreId}/song/${songId}`;
    // console.log(URL)
    try {
      const response = await axios.put(URL, {});
      const data = await response.data;
      // console.log(data)

      return data;
    } catch (error) {
      console.log(
        "Error when editing / putting" + genreId + " " + songId + error
      );
    }
  }

  async function editGenre(genreId, value) {
    const URL = `${baseUrl}/genre/upateGenre?id=${genreId}`;
    try {
      const res = await axios.put(URL, value);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getGenre,
    getGenreById,
    getGenreBySongId,
    getSongByGenreId,
    postGenre,
    deleteGenre,
    putSongOnGenre,
    editGenre,
  };
};

export default GenreApi;
