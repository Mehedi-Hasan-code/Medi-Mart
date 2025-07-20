import React, { useContext } from 'react';
import { AuthContext } from '../Context/Auth/AuthContext';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useUserRole = () => {
  const { user, isUserLoading } = useContext(AuthContext);
  const { privateApi } = useAxiosSecure();

  const {
    data: role = 'user',
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !isUserLoading && !!user?.email,
    queryFn: async () => {
      const res = await privateApi.get(`users/role?email=${user?.email}`);
      return res?.role || 'user';
    },
  });
  return { role, isLoading, refetch };
};

export default useUserRole;
