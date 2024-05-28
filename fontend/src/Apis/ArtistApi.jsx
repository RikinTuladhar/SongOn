import axios from "axios";
import React from "react";

const ArtistApi = () => {
  const baseUrl = "https://songonbackend.onrender.com";
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function getArtist() {
    const URL = baseUrl + "/artist";
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      // console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getArtistById(id) {
    const URL = baseUrl + `/artist/${id}`;
    console.log(URL);
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getSongByArtistId(id) {
    const URL = baseUrl + "/by-artist/" + id;
    console.log(URL);
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      // console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function addArtist(artist) {
    const URL = baseUrl + "/artist";
    console.log(URL);
    try {
      const response = await axios.post(URL, artist, config);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error when adding Artist" + error);
    }
  }

  async function putSongOnArtist(artistId, songId) {
    const URL = baseUrl + `/artist/${artistId}/song/${songId}`;
    try {
      const response = await axios.put(URL,{},config);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(
        `Error when puting song ${songId} on artist ${artistId} ` + error
      );
    }
  }

  async function deleteArtist(endpoint) {
    const URL = baseUrl + endpoint;
    try {
      const response = await axios.delete(URL, config);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getArtist,
    deleteArtist,
    getArtistById,
    getSongByArtistId,
    addArtist,
    putSongOnArtist,
  };
};

export default ArtistApi;
