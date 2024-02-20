import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaPlusCircle,
  FaRegUser,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import {
  MdContactSupport,
  MdDashboard,
  MdDashboardCustomize,
} from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import logo from "/logo.png";
import { AuthContext } from "../contexts/AuthProvider";
import { IoHome } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

const DashboardLayout = () => {
  const { logout } = useContext(AuthContext);

    const navigate = useNavigate()
  // handle logout of users
  const handleLogout = () => {
    logout()
      .then(() => {
          alert("User logged out");
          navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // shared  links
  const sharedLinks = (
    <>
      <li>
        <Link to="/" className="mt-3">
          <IoHome /> Home
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <FaShoppingCart /> Menu
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <IoIosSend /> Orders Tracking
        </Link>
      </li>
      <li>
        <Link to="/menu">
          <MdContactSupport /> Customer Support
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4 mt-3">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button onClick={handleLogout} className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
              <FaRegUser /> Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-20" />
                <span className="badge badge-primary">Admin</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                {" "}
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaShoppingBag /> Manage Booking
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaPlusCircle /> Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaEdit /> Manage Items
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="mb-3">
                {" "}
                <FaUserAlt /> All Users
              </Link>
            </li>
            <hr />

            {/* shared Links */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
