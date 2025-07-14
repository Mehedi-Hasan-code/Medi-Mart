import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <>
      <li> 
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/shop'>Shop</NavLink>
      </li>
    </>
  );
};

export default NavLinks;
