import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <>
      <SideBar />
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div class="gap-4 mb-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
