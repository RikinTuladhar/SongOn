import React, { createContext, useContext, useEffect, useState } from "react";
import { ReloadContext } from "./ReloadProvider";
import UserApi from "../Apis/UserApi";
export const User = createContext();

const UserProvider = ({ children }) => {
  const { getUser } = UserApi();
  const { reload, setReload } = useContext(ReloadContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [reload, token]);
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastname: "",
    username: "",
    role: "",
  });
  useEffect(() => {
    //fetching user data from token from api
    (() => {
      if (token != null && token != undefined) {
        getUser()
          .then((res) => {
            setUserDetails(res);
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    })();
  }, [token, reload]);
  // console.log(token);
  // console.log(userDetails);
  return (
    <User.Provider value={{ userDetails, setUserDetails, token, setToken }}>
      {children}
    </User.Provider>
  );
};

export default UserProvider;
