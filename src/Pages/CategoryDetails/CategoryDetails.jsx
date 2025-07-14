import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import MedicinesTable from './MedicinesTable';
import DetailsModal from '../../Components/Common/Medicines/DetailsModal';

const CategoryDetails = () => {
  const { publicApi } = useAxiosSecure();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  // get medicines
  const { data } = useQuery({
    queryKey: ['medicines', category],
    queryFn: async () => publicApi.get(`/medicines/${category}`),
  });
  const medicines = data?.medicines;

  // modal logic 👇
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  const openModal = (medicine) => {
    setSelectedMedicine(medicine)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedMedicine(null)
  }
  // modal logic 👆

  return (
    <>
      <h1>{category}</h1>
      <MedicinesTable openModal={openModal} medicines={medicines} />
      <DetailsModal isOpen={isOpen} close={closeModal} medicine={selectedMedicine} />
    </>
  );
};

export default CategoryDetails;
