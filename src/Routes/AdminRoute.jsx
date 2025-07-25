import React, { useContext } from 'react';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';
import Loading from '../Components/Loaders/Loading';
import { AuthContext } from '../Context/Auth/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isUserLoading } = useContext(AuthContext)
  const { role, isLoading } = useUserRole();

  if (isUserLoading || isLoading) {
    return <Loading />;
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdminRoute;