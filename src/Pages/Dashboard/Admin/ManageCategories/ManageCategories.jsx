import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Common/Loading';
import CategoryTable from './CategoryTable';

const ManageCategories = () => {
  const { privateApi } = useAxiosSecure();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => privateApi.get('/categories'),
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Manage Categories</h2>
      <CategoryTable categories = { categories } />
    </div>
  );
};

export default ManageCategories;
