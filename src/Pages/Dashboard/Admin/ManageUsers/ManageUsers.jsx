import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Table from './Table';
import DataLoading from '../../../../Components/Loaders/DataLoading';

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

  if (isLoading) return <DataLoading label='Users' />

  if (error) return <div>Error: {error.message}</div>;
  return <div>
    <h1>Mange Users</h1>
    <Table users = {users} />
  </div>;
};

export default ManageUsers;
