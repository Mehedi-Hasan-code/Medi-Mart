import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Context/Auth/AuthContext';

const navLinkClass = ({ isActive }) =>
  `relative px-4 py-2 font-semibold transition-colors duration-200
   ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}
   after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-200
   ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`;

const NavLinks = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <li>
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/shop" className={navLinkClass}>
          Shop
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact-us" className={navLinkClass}>
          Contact Us
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
