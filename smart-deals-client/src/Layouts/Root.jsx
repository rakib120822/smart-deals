import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

function Root() {
  return (
    <div className="w-full flex flex-col justify-between h-screen">
      <Navbar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
