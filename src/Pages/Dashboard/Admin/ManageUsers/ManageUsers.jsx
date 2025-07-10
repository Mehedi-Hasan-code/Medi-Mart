import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../Components/Common/Loading';
import Table from './Table';

const ManageUsers = () => {
  const { privateApi } = useAxiosSecure();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => privateApi.get('/users'),
  });
  console.log(users);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return <div>
    <h1>Mange Users</h1>
    <Table users = {users} />
  </div>;
};

export default ManageUsers;
