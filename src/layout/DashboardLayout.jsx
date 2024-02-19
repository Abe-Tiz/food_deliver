import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { FaEdit, FaPlusCircle, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import logo from '/logo.png';
import { AuthContext } from '../contexts/AuthProvider';
import { CiUser } from "react-icons/ci";

const DashboardLayout = () => {
      const { logout } = useContext(AuthContext);

     const handleLogout = () => {
       logout()
         .then(() => {
           alert("User logged out");
         })
         .catch((err) => {
           console.log(err);
         });
    };
    
    return (
      <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <div className="flex items-center justify-between w-screen px-10 py-5 ">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdDashboard size={30} />
              </label>
              <Link
                onClick={handleLogout}
                className="btn rounded-full text-white lg:hidden bg-green"
              >
                <CiUser />
                Logout
              </Link>
            </div>
            <div className='mt-5 md:mt-2 mx-4'>
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
                <Link to="/dashboard/users">
                  {" "}
                  <FaUserAlt /> All Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default DashboardLayout
