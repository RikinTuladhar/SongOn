import React, { createContext, useContext, useEffect, useState } from "react";
import { ReloadContext } from "./ReloadProvider";
import UserApi from "../Apis/UserApi";
export const User = createContext();

const UserProvider = ({ children }) => {
  // const { getUser } = UserApi();
  const { reload, setReload } = useContext(ReloadContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [reload,token]);

  return <User.Provider value={{ token, setToken }}>{children}</User.Provider>;
};

export default UserProvider;
