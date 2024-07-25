import axios from "axios";

import { SongContext } from "../contextprovider/SongProvider";

const UserLibraryApi = () => {
  const baseUrl = "http://localhost:8080/playlist";

  async function addPlayList(value, id) {
    try {
      const URL = `${baseUrl}/user_id/${id}`;
      const response = await axios.post(URL, value);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function addSongToPlayList(playlist_id,song_id) {
    try {
      const URL = `${baseUrl}/playlist_id/${playlist_id}/song_id/${song_id}`;
      const response = await axios.post(URL);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function displayPlayListByPlaylistId(id){
    try{
      const response = await axios.get(`${baseUrl}/${id}`);
      const data = await response.data;
      console.log(data)
      return data;
    }catch(e){
      console.log("error when fetching playlist by playlist id"+ e)
    }
  }

  async function displayPlayListByUserId(id){
    try{
      const response = await axios.get(`${baseUrl}/by-user/${id}`);
      const data = await response.data;
      console.log(data)
      return data;
    }catch(e){
      console.log("error when fetching playlist by user id"+ e)
    }
  }

  

  return {
    addPlayList,
    addSongToPlayList,
    displayPlayListByPlaylistId,
    displayPlayListByUserId
  };
};

export default UserLibraryApi;
