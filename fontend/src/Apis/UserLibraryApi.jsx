import axios from "axios";

import { SongContext } from "../contextprovider/SongProvider";
import BaseURL from "../BaseUrl";
const UserLibraryApi = () => {
  // const baseUrl = "https://songon.onrender.com/playlist";
  const baseUrl = BaseURL + "/playlist";

  async function addPlayList(value, id) {
    try {
      const URL = `${baseUrl}/user_id/${id}`;
      const response = await axios.post(URL, value);
      const data = await response.data;
      // console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function addSongToPlayList(playlist_id, song_id) {
    try {
      const URL = `${baseUrl}/playlist_id/${playlist_id}/song_id/${song_id}`;
      const response = await axios.post(URL);
      const data = await response.data;
      // console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function displayPlayListByPlaylistId(id) {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      const data = await response.data;
      // console.log(data)
      return data;
    } catch (e) {
      console.log("error when fetching playlist by playlist id" + e);
    }
  }

  async function displayPlayListByUserId(id) {
    try {
      const response = await axios.get(`${baseUrl}/by-user/${id}`);
      const data = await response.data;
      // console.log(data)
      return data;
    } catch (e) {
      console.log("error when fetching playlist by user id" + e);
    }
  }

  async function deletePlayList(id) {
    const URL = `${baseUrl}/${id}`;
    // console.log(URL)
    try {
      const response = await axios.delete(URL);
      const data = await response.data;
      // console.log(data)
      return data;
    } catch (e) {
      console.log(e + " Error when trying to delete playlist");
    }
  }

  async function deleteSongFromPlayList(id) {
    const URL = `${baseUrl}/by-user/song_id/${id}`;
    try {
      const response = await axios.delete(URL);
      const data = await response.data.message;
      console.log(data);
      return data;
    } catch (e) {
      console.log(e + " Error when trying to delete song from playlist");
    }
  }

  return {
    addPlayList,
    addSongToPlayList,
    displayPlayListByPlaylistId,
    displayPlayListByUserId,
    deletePlayList,
    deleteSongFromPlayList,
  };
};

export default UserLibraryApi;
