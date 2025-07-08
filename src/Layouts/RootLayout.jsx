import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer';
import Navbar from '../Components/Common/Navbar/Navbar';

const RootLayout = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='grow'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
