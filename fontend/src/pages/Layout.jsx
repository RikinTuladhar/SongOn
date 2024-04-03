import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ReloadProvider from "../contextprovider/ReloadProvider";

const Layout = () => {
  return (
    <div className="w-full ">
      <ReloadProvider>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </ReloadProvider>
    </div>
  );
};

export default Layout;
