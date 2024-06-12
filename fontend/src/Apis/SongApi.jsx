import axios from "axios";
import React from "react";

const SongApi = () => {
  const baseUrl = "https://songonbackend.onrender.com";
  const token= localStorage.getItem("token");
  const config  = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  async function getSong() {
    const URL = baseUrl + "/songs";
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
    const URL = baseUrl + `/songs/${id}`;
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

  async function addSong(gId,aId,song) {
    const URL = baseUrl + `/uploadSong/${gId}/${aId}`;
    console.log(URL);
    try {
      const response = await axios.post(URL, song,config);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }



  async function deleteSong(id) {
    const URL = baseUrl + `/song/delete/${id}`;
    console.log(URL);
    try {
      const response = await axios.delete(URL,config);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }

  return { getSong, deleteSong,getSongById,addSong };
};

export default SongApi;
