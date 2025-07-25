import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import MedicinesTable from './MedicinesTable';
import DetailsModal from '../../Components/Common/Medicines/DetailsModal';
import ShopTable from '../Shop/ShopTable';
import Slider from 'react-slick';
import DataLoading from '../../Components/Loaders/DataLoading';
import LoadingError from '../../Components/Common/States/LoadingError';
import EmptyArray from '../../Components/Common/States/EmptyArray';

const CategoryDetails = () => {
  const { publicApi } = useAxiosSecure();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate paginated data
  const { data: medicinesCount } = useQuery({
    queryKey: ['countOfCategoryMedicine'],
    queryFn: () => publicApi.get(`/medicines/${category}/count`),
  });
  const totalItems = medicinesCount?.count || 0;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // get medicines
  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryMedicines', itemsPerPage, currentPage],
    queryFn: () =>
      publicApi.get(
        `/medicines/${category}?limit=${itemsPerPage}&page=${currentPage}`
      ),
  });

  const paginatedMedicines = data?.result || [];

  // modal logic 👇
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedMedicine(null);
  };
  // modal logic 👆

  return (
    <>
      <h1>{category}</h1>

      {/* Loading state */}
      {isLoading && <DataLoading label={`medicines in ${category}`} />}

      {/* Error state */}
      {error && (
        <LoadingError label={`medicines in ${category}`} showAction={true} />
      )}

      {/* Empty state */}
      {!isLoading && !error && paginatedMedicines.length === 0 && (
        <EmptyArray message={`No medicines found in ${category}`} />
      )}

      {/* Main content */}
      {!isLoading && !error && paginatedMedicines.length > 0 && (
        <ShopTable
          paginatedMedicines={paginatedMedicines}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          openModal={openModal}
        />
      )}

      <DetailsModal
        isOpen={isOpen}
        close={closeModal}
        medicine={selectedMedicine}
      />
    </>
  );
};

export default CategoryDetails;
