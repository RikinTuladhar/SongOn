import axios from "axios";
import React from "react";

const SongApi = () => {
  const baseUrl = "https://songonbackend.onrender.com";

  async function getSong() {
    const URL = baseUrl + "/songs";
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

  async function deleteSong(id) {
    const URL = baseUrl + `/song/delete/${id}`;
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
  return { getSong, deleteSong };
};

export default SongApi;
