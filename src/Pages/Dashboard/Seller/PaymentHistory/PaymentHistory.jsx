import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { AuthContext } from '../../../../Context/Auth/AuthContext'

const PaymentHistory = () => {
  const { privateApi } = useAxiosSecure()
  const { user, isUserLoading } = useContext(AuthContext)
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-payments', user?.email],
    enabled: !isUserLoading && !!user?.email,
    queryFn: () => privateApi.get(`/orders?sellerEmail=${user.email}`)
  })
  return (
    <div>PaymentHistory</div>
  )
}

export default PaymentHistory