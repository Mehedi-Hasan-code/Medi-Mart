import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer';
import Navbar from '../Components/Common/Navbar/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1440px] mx-auto">
        <div className="w-11/12 mx-auto flex flex-col min-h-screen">
          <div className="grow">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
