import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

function Root() {
  return (
    <div className="w-full flex flex-col justify-between">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
