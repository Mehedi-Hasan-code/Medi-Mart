import React from 'react';
import logo from '../../../assets/logo.png';
const Logo = () => {
  return (
    <>
      <div className="hidden sm:flex items-center gap-2">
        <div className="w-6">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className="text-2xl font-bold text-primary">Medi Mart</h1>
      </div>
    </>
  );
};

export default Logo;
