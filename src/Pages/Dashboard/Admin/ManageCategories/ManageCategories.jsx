import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CategoryTable from './CategoryTable';
import DataLoading from '../../../../Components/Loaders/DataLoading';
import LoadingError from '../../../../Components/Loaders/LoadingError';

const ManageCategories = () => {
  const { publicApi } = useAxiosSecure();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => publicApi.get('/categories'),
  });

  if (isLoading) return <DataLoading label= 'Categories' />

  if (error) return <LoadingError label='categories' showAction={true}/>;

  return (
    <div>
      <h2>Manage Categories</h2>
      <CategoryTable categories = { categories } />
    </div>
  );
};

export default ManageCategories;
