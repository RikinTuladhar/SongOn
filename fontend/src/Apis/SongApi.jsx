import axios from "axios";
import React from "react";
import BaseURL from "../BaseUrl";
const SongApi = () => {
  // const baseUrl = "https://songon.onrender.com/song";
  const baseUrl = BaseURL + "/song";
  // const token= localStorage.getItem("token");

  async function getSong() {
    const URL = baseUrl;
    // console.log(URL);
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      // console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }

  async function getSongById(id) {
    const URL = baseUrl + `/${id}`;
    console.log(URL);
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }

  async function getTotalSong() {
    const URL = `${baseUrl}/getTotal`;
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getTopSongs() {
    const URL = `${BaseURL}/user-song-interactions/top-songs`;
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  

  async function addSong(gId, aId, song) {
    const URL = baseUrl + `/uploadSong?generic_id=${gId}&artist_id=${aId}`;
    console.log(URL);
    try {
      const response = await axios.post(URL, song);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }

  async function editSong(genre_id, artist_id, song_id, value) {
    const URL =
      baseUrl +
      `/updateSong?generic_id=${genre_id}&artist_id=${artist_id}&song_id=${song_id}`;
    console.log(URL);
    try {
      const res = await axios.put(URL, value);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (e) {
      console.log(error);
    }
  }

  async function deleteSong(id) {
    const URL = baseUrl + `/delete/${id}`;
    console.log(URL);
    try {
      const response = await axios.delete(URL);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }

  return { getSong, deleteSong, getSongById, getTotalSong,getTopSongs, addSong, editSong };
};

export default SongApi;
