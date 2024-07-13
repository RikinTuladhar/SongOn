import axios from "axios";
import React from "react";

const SongApi = () => {
  const baseUrl = "http://localhost:8080";
  const token= localStorage.getItem("token");
  const config  = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }

  async function getSong() {
    const URL = baseUrl + "/song";
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
    const URL = baseUrl + `/song/${id}`;
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
    const URL = baseUrl + `/song/uploadSong/${gId}/${aId}`;
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
