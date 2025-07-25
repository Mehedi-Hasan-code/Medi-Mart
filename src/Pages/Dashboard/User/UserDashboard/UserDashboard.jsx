import React, { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../Context/Auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import DataLoading from '../../../../Components/Loaders/DataLoading';
import LoadingError from '../../../../Components/Common/States/LoadingError';
import EmptyArray from '../../../../Components/Common/States/EmptyArray';

const UserDashboard = () => {
  const { user, isUserLoading } = useContext(AuthContext);
  const { privateApi } = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    queryKey: ['user-dashboard', user?.email],
    enabled: !isUserLoading && !!user?.email,
    queryFn: () => privateApi.get(`/orders/buyer/${user?.email}`),
  });

  if (isUserLoading || !user?.email) {
    return <DataLoading label="User Dashboard" />;
  }

  if (error) {
    return <LoadingError label="User Dashboard" showAction />;
  }

  if (isLoading) {
    return <DataLoading label="User Dashboard" />;
  }

  // data?.data is expected to be the array of orders
  if (!data || data.length === 0) {
    return <EmptyArray message="No orders found" />;
  }

  // Assuming the API returns an array with a single summary object
  const {
    paidAmount = 0,
    pendingAmount = 0,
    totalOrders = 0,
  } = data[0] || {};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">User Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-green-400">
          <span className="text-4xl font-bold text-green-500 mb-2">
            ${paidAmount.toFixed(2)}
          </span>
          <span className="text-lg font-medium text-gray-700">Paid Amount</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-yellow-400">
          <span className="text-4xl font-bold text-yellow-500 mb-2">
            ${pendingAmount.toFixed(2)}
          </span>
          <span className="text-lg font-medium text-gray-700">
            Pending Amount
          </span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-blue-400">
          <span className="text-4xl font-bold text-blue-500 mb-2">
            {totalOrders}
          </span>
          <span className="text-lg font-medium text-gray-700">
            Total Orders
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
