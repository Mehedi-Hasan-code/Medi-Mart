import React from 'react';
import Payments from '../../../../Components/Common/Payments/Payments';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DataLoading from '../../../../Components/Loaders/DataLoading';
import LoadingError from '../../../../Components/Common/States/LoadingError';

const ManagePayments = () => {
  const { privateApi } = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: () => privateApi.get('/payments'),
  });

  if (isLoading) {
    return <DataLoading label="Payments" />;
  }

  if (error) {
    return <LoadingError label="payments" showAction={true} />;
  }

  return (
    <div>
      <Payments payments={data || []} refetch={refetch} />
    </div>
  );
};

export default ManagePayments;
