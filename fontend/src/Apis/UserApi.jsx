import axios from "axios";
import React from "react";

const UserApi = () => {
  const baseUrl = "https://songonbackend.onrender.com";


  async function SignIn(value) {
    const endpoint = `${baseUrl}/login`;
    console.log(endpoint)
    try {
      const response = await axios.post(endpoint, value);
      const data = await response.data.token;
    //   console.log(data);
      return data;
    } catch (error) {
      throw new Error("Error when login " + error);
    }
  }

  async function SignUp(value){
    const endpoint = `${baseUrl}/register`;
    try {
        const response = await axios.post(endpoint, value);
        const data = await response.data.token;
        console.log(data);
        return data;
        
    } catch (error) {
        throw new Error("Error when register " + error);
    }
  }

  return {SignIn,SignUp};
};

export default UserApi;
