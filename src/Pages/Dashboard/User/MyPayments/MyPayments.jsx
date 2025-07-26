import React, { useContext } from 'react';
import Payments from '../../../../Components/Common/Payments/Payments';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../Context/Auth/AuthContext';
import { useQuery } from '@tanstack/react-query';

import LoadingError from '../../../../Components/Common/States/LoadingError';
import DataLoading from '../../../../Components/Common/Loaders/DataLoading';

const MyPayments = () => {
  const { privateApi } = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: () => privateApi.get(`/payments?email=${user?.email}`),
  });

  if (isLoading) {
    return <DataLoading label="Payments" />;
  }

  if (error) {
    return <LoadingError label="payments" showAction={true} />;
  }
  return <Payments payments={data} />;
};

export default MyPayments;
