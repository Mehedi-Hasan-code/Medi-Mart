import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `relative px-4 py-2 font-semibold transition-colors duration-200
   ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}
   after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-200
   ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`;

const NavLinks = () => {
  const [language, setLanguage] = useState('en');
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
      <li>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 font-semibold bg-white transition-colors duration-200"
          style={{ minWidth: 100 }}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="bn">Bangla</option>
        </select>
      </li>
    </>
  );
};

export default NavLinks;
