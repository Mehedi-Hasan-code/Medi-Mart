import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { AuthContext } from '../../../../Context/Auth/AuthContext'
import Table from './Table'

const PaymentHistory = () => {
  const { privateApi } = useAxiosSecure()
  const { user, isUserLoading } = useContext(AuthContext)
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-payments-history', user?.email],
    enabled: !isUserLoading && !!user?.email,
    queryFn: () => privateApi.get(`orders/sellers/payment-history?sellerEmail=${user.email}`)
  })
  console.log(data)
  return (
    <div>
      <Table data = { data } />
    </div>
  )
}

export default PaymentHistory