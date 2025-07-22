import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import TanstackTable from './TanstackTable';

const SalesReport = () => {
  const { privateApi } = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ['sales-data'],
    queryFn: () => privateApi.get('/orders/sales-report'),
  });

  console.log(data);
  return (
    <>
      <TanstackTable data={data} />
    </>
  );
};

export default SalesReport;
