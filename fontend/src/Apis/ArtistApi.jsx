import axios from "axios";
// import React from "react";

const ArtistApi = () => {
  // const baseUrl = "https://songon.onrender.com";
  const baseUrl = "http://localhost:8080";

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

    try {
      const response = await axios.get(URL);
      const data = await response.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getSongByArtistId(id) {
    const URL = baseUrl + "/song/by-artist/" + id;

    try {
      const res = await axios.get(URL);
      const data = await res.data;
      // console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getArtistBySongId(songid) {
    const URL = `${baseUrl}/artist/By-songid/${songid}`;
    try {
      const res = await axios.get(URL);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async function addArtist(artist) {
    const URL = baseUrl + "/artist";

    try {
      const response = await axios.post(URL, artist);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error when adding Artist" + error);
    }
  }

  async function editArtist(artistId, value) {
    const URL = `${baseUrl}/artist/updateArtist?id=${artistId}`;
    try {
      const res = await axios.put(URL, value);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function putSongOnArtist(artistId, songId) {
    const URL = baseUrl + `/artist/${artistId}/song/${songId}`;
    try {
      const response = await axios.put(URL, {});
      const data = await response.data;

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
      const response = await axios.delete(URL);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getArtist,
    getArtistBySongId,
    getSongByArtistId,
    getArtistById,
    addArtist,
    editArtist,
    putSongOnArtist,
    deleteArtist,
  };
};

export default ArtistApi;
