import React from 'react';
import { NavLink } from 'react-router-dom';

const Links = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/manage-categories">Mange Categories</NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/manage-users'>Manage Users</NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/manage-medicine'>Manage Medicines</NavLink>
      </li>
    </>
  );
};

export default Links;
