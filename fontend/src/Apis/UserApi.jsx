import axios from "axios";
import React, { useContext } from "react";
import { User } from "../contextprovider/UserProvider";
import BaseURL from "../BaseUrl";
const UserApi = () => {
  // const { setToken } = useContext(User);
  // const baseUrl = "https://songon.onrender.com";
  const baseUrl = BaseURL;

  // async function SignIn(value) {
  //   const endpoint = `${baseUrl}/login`;
  //   // console.log(endpoint)
  //   try {
  //     const response = await axios.post(endpoint, value);
  //     const data = await response.data.token;
  //     // console.log(data)
  //     // setToken(data);
  //     localStorage.setItem("token", data);

  //     // https://songonbackend.onrender.com/getUser/ -> for user details
  //     const role = await axios.get(
  //       `https://songonbackend.onrender.com/getUser/${data}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${data}`,
  //         },
  //       }
  //     );
  //     // console.log(role.data);
  //     return role.data;
  //   } catch (error) {
  //     throw new Error("Error when login " + error);
  //   }
  // }

  async function SignUp(value) {
    const endpoint = `${baseUrl}/register`;
    try {
      const response = await axios.post(endpoint, value);
      const data = response.data;
      console.log(data);
      return data.message;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.errorMessage); // Throwing an error with the error message
      } else {
        throw new Error("An unexpected error occurred"); // Handling unexpected errors
      }
    }
  }

  // async function getUser() {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token == null) {
  //       return;
  //     }
  //     const res = await axios.get(
  //       `https://songonbackend.onrender.com/getUser/${token}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await res.data;
  //     // console.log(data);
  //     return data;
  //   } catch (error) {
  //     throw new Error(
  //       "error when fetching user data from token " + error.message
  //     );
  //   }
  // }

  return { SignUp };
};

export default UserApi;
