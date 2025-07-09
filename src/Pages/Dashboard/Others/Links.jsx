import React from 'react';
import { NavLink } from 'react-router-dom';

const Links = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/manage-categories">Mange Categories</NavLink>
      </li>
      <li>
        <NavLink>Sidebar Item 2</NavLink>
      </li>
    </>
  );
};

export default Links;
