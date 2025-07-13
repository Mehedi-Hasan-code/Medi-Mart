import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLocation } from 'react-router-dom'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import MedicinesTable from './MedicinesTable'

const CategoryDetails = () => {
  const { publicApi } = useAxiosSecure()
  const location = useLocation()


  const searchParams = new URLSearchParams(location.search)
  const category = searchParams.get('category')
  const { data } = useQuery({
    queryKey: ["medicines", category],
    queryFn: async () => publicApi.get(`/medicines/${category}`)
  })
  const medicines = data?.medicines

  return (
    <>
      <h1>{category}</h1>
      <MedicinesTable medicines = {medicines} />

    </>
  )
}

export default CategoryDetails