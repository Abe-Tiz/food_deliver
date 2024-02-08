import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <h2 className="text-green">Footer</h2>
    </div>
  );
};

export default Main;
