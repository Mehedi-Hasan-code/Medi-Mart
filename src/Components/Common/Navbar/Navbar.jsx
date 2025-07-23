import React, { useContext } from 'react';
import NavLinks from './NavLinks';
import { AuthContext } from '../../../Context/Auth/AuthContext';
import { NavLink } from 'react-router-dom';
import ProfileLinks from './ProfileLinks';
import Cart from './Cart';
import userLogo from '../../../assets/userLogo.png'
import Logo from '../Logo/Logo';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2">
          <Cart />
          {/* profile image and actions 👇 */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full p-1.5 bg-gray-500">
                  <img
                    alt="Tailwind CSS Navbar component"
                    className='rounded-full'
                    src={user.photoURL || userLogo}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <ProfileLinks />
              </ul>
            </div>
          ) : (
            <NavLink className="btn" to={'/sign-up'}>
              Join Us
            </NavLink>
          )}
          {/* profile image and actions 👆 */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
