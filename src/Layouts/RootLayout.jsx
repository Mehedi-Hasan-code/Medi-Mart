import React from 'react'
import Navbar from '../Components/Common/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default RootLayout