import axios from "axios";
import React, { useContext } from "react";
import { User } from "../contextprovider/UserProvider";
const UserApi = () => {
  // const { setToken } = useContext(User);
  const baseUrl = "https://songonbackend.onrender.com";

  async function SignIn(value) {
    const endpoint = `${baseUrl}/login`;
    // console.log(endpoint)
    try {
      const response = await axios.post(endpoint, value);
      const data = await response.data.token;
      // console.log(data)
      // setToken(data);
      localStorage.setItem("token", data);

      // https://songonbackend.onrender.com/getUser/ -> for user details
      const role = await axios.get(
        `https://songonbackend.onrender.com/getUser/${data}`,
        {
          headers: {
            Authorization: `Bearer ${data}`,
          },
        }
      );
      // console.log(role.data);
      return role.data;
    } catch (error) {
      throw new Error("Error when login " + error);
    }
  }

  async function SignUp(value) {
    const endpoint = `${baseUrl}/register`;
    try {
      const response = await axios.post(endpoint, value);
      const data = await response.data.token;
      console.log(data);
      return "Success";
    } catch (error) {
      throw new Error("Error when register " + error);
    }
  }

  async function getUser() {
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        return;
      }
      const res = await axios.get(
        `https://songonbackend.onrender.com/getUser/${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data;
      // console.log(data);
      return data;
    } catch (error) {
      throw new Error(
        "error when fetching user data from token " + error.message
      );
    }
  }

  return { SignIn, SignUp, getUser };
};

export default UserApi;
