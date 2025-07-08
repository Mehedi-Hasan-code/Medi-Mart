import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>Shop</NavLink>
      </li>
    </>
  );
};

export default NavLinks;
