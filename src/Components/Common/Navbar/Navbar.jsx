import React, { useContext } from 'react';
import NavLinks from './NavLinks';
import { AuthContext } from '../../../Context/Auth/AuthContext';
import { NavLink } from 'react-router-dom';
import ProfileLinks from './ProfileLinks';
import Cart from './Cart';
import userLogo from '../../../assets/userLogo.png';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="backdrop-blur-md bg-white/70 shadow-lg w-full mb-6 sticky top-0 z-50 border border-gray-200">
      {/* Left: Logo & Mobile Menu */}
      <div className="max-w-[1440px] mx-auto">
        <nav className="px-2 lg:px-8 py-2 flex items-center justify-between w-11/12 mx-auto">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <div className="lg:hidden dropdown">
              <button tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white/90 rounded-xl shadow-lg mt-3 w-48 p-2 border border-gray-100"
              >
                <NavLinks />
              </ul>
            </div>
            {/* Logo */}
            <Logo />
          </div>
          {/* Center: Nav Links (desktop) */}
          <div className="hidden lg:flex">
            <ul className="flex gap-2 items-center">
              <NavLinks />
            </ul>
          </div>
          {/* Right: Cart & Profile */}
          <div className="flex items-center gap-3">
            <Cart />
            {/* profile image and actions */}
            {user ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border border-gray-200 hover:border-primary transition"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <img
                      alt="User avatar"
                      className="rounded-full object-cover w-full h-full"
                      src={user.photoURL || userLogo}
                    />
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white/90 rounded-xl shadow-lg mt-3 w-52 p-2 border border-gray-100"
                >
                  <ProfileLinks />
                </ul>
              </div>
            ) : (
              <NavLink
                className="btn btn-primary px-5 font-semibold rounded-full shadow"
                to={'/sign-up'}
              >
                Join Us
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
