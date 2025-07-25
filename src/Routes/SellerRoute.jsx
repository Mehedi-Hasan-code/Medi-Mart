import React, { useContext } from 'react'
import { AuthContext } from '../Context/Auth/AuthContext';
import useUserRole from '../hooks/useUserRole';
import Loading from '../Components/Loaders/Loading';
import { Navigate } from 'react-router-dom';

const RiderRoute = ({children}) => {
  const { user, isUserLoading } = useContext(AuthContext)
  const { role, roleLoading } = useUserRole();

  if (isUserLoading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== 'seller') {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default RiderRoute