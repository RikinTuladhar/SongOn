import axios from "axios";
import React from "react";

const GenreApi = () => {
  const baseUrl = "http://localhost:8080";

  async function getGenre() {
    const URL = baseUrl + "/genre";
    // console.log(URL);
    const response = await axios.get(URL);
    const data = await response.data; 
    // console.log(data)
    return data;
  }

  async function postGenre(value) {
    const URL = baseUrl + "/genre";
    console.log(URL);
    const response = await axios.post(URL, value);
    const data = await response.data;
    // console.log(data)
    return data;
  }

  async function deleteGenre(endpoint) {
    const URL = baseUrl + endpoint;
    // console.log(URL)
    const response = await axios.delete(URL);
    const data = await response.data;
    return data;
  }

  async function getGenreById(id) {
    const URL = baseUrl + `/song/by-genre/${id}`;
    // console.log(URL)
    const response = await axios.get(URL);
    const data = await response.data;
    console.log(data)
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

  return { getGenre, deleteGenre, getGenreById, postGenre, putSongOnGenre };
};

export default GenreApi;
