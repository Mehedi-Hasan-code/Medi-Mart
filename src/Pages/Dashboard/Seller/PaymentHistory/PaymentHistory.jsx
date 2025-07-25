import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { AuthContext } from '../../../../Context/Auth/AuthContext'
import Table from './Table'
import DataLoading from '../../../../Components/Loaders/DataLoading'
import LoadingError from '../../../../Components/Common/States/LoadingError'
import EmptyArray from '../../../../Components/Common/States/EmptyArray'

const PaymentHistory = () => {
  const { privateApi } = useAxiosSecure()
  const { user, isUserLoading } = useContext(AuthContext)
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-payments-history', user?.email],
    enabled: !isUserLoading && !!user?.email,
    queryFn: () => privateApi.get(`orders/sellers/payment-history?sellerEmail=${user.email}`)
  })
  console.log(data)

  if (isLoading || isUserLoading) return <DataLoading label="payment history" />;
  if (error) return <LoadingError label="payment history" showAction={true} />;
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <EmptyArray message="No payment history found" />;
  }

  return (
    <div>
      <Table data={data} />
    </div>
  )
}

export default PaymentHistory