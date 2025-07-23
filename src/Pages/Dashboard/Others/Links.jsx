import React from 'react';
import { NavLink } from 'react-router-dom';
import useUserRole from '../../../hooks/useUserRole';

const Links = () => {
  const { role } = useUserRole();
  return (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      {role === 'admin' && (
        <>
          <li>
            <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-categories">
              Manage Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-payments">
              Payment Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/sales-report">Sales Report</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-ads">Mange Banner Advertise</NavLink>
          </li>
        </>
      )}

      {role === 'seller' && (
        <>
          <li>
            <NavLink to="/dashboard/manage-medicine">Manage Medicines</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment-history">Payment History</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/ask-for-advertisement">
              Ask For Advertisement
            </NavLink>
          </li>
        </>
      )}

      {role === 'user' && (
        <>
          <NavLink to="/dashboard/payments">Payments</NavLink>
        </>
      )}
    </>
  );
};

export default Links;
