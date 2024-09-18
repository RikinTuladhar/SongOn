import React from "react";
import axios from "axios";

const RecommendationApi = () => {
  const BASE = "http://localhost:8080";

  async function getRecommendation(username) {
    try {
      const endpoint = `${BASE}/recommend?username=${username}`;
      console.log(endpoint);
      const res = await axios.get(endpoint);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function PostForRecommendation(value) {
    try {
      const endpoint = `${BASE}+/user-song-interactions`;
      console.log(endpoint);
      const res = await axios.post(endpoint, value);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return { getRecommendation, PostForRecommendation };
};

export default RecommendationApi;
