import React from 'react'
import logo from '/logo.png'

const Navbar = () => {

    const navItems = (
      <>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <details>
            <summary>Menu</summary>
            <ul className="p-2">
              <li>
                <a>All</a>
              </li>
              <li>
                <a>Salad</a>
              </li>
              <li>
                <a>Pizza</a>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary>Services</summary>
            <ul className="p-2">
              <li>
                <a>All</a>
              </li>
              <li>
                <a>Salad</a>
              </li>
              <li>
                <a>Pizza</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a href="/">Others</a>
        </li>
        <li></li>
      </>
    );
    return (
      <header className="max-w-screen-2xl container mx-auto">
        <div className="navbar xl:px-24">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Button</a>
          </div>
        </div>
      </header>
    );
}

export default Navbar
