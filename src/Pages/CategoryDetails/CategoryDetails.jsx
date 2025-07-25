import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DetailsModal from '../../Components/Common/Medicines/DetailsModal';

import DataLoading from '../../Components/Loaders/DataLoading';
import LoadingError from '../../Components/Common/States/LoadingError';
import EmptyArray from '../../Components/Common/States/EmptyArray';
import ShopTable from '../../Components/Common/States/Tables/ShopTable';

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
      <section className="min-h-[80vh] py-12 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-xl my-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-lg">
                {/* You can use a relevant icon here if desired */}
                <svg
                  className="text-white w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-sm text-center">
                {category}
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl text-center">
              Browse, compare, and purchase medicines in the{' '}
              <span className="font-semibold text-primary">{category}</span>{' '}
              category. Find trusted options tailored to your needs.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && <DataLoading label={`medicines in ${category}`} />}

          {/* Error state */}
          {error && (
            <LoadingError
              label={`medicines in ${category}`}
              showAction={true}
            />
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
        </div>
        <DetailsModal
          isOpen={isOpen}
          close={closeModal}
          medicine={selectedMedicine}
        />
      </section>
    </>
  );
};

export default CategoryDetails;
