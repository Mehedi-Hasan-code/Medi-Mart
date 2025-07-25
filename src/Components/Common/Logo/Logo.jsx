import React from 'react';
import logo from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';
const Logo = () => {
  return (
    <>
      <NavLink to='/' className="hidden sm:flex items-center gap-2">
        <div className="w-6">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className="text-2xl font-bold text-primary">Medi Mart</h1>
      </NavLink>
    </>
  );
};

export default Logo;
