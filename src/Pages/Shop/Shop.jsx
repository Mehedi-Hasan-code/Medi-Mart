import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import LoadingError from '../../Components/Common/States/LoadingError';
import DetailsModal from '../../Components/Common/Medicines/DetailsModal';

import { HeartPulse } from 'lucide-react';
import DataLoading from '../../Components/Common/Loaders/DataLoading';
import ShopTable from '../../Components/Tables/ShopTable';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const location = useLocation();
  const { publicApi } = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate paginated data
  const { data: medicinesCount } = useQuery({
    queryKey: ['totalItems'],
    queryFn: () => publicApi.get('/medicines/count'),
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
    queryKey: ['medicines', itemsPerPage, currentPage],
    queryFn: () =>
      publicApi.get(`/medicines?limit=${itemsPerPage}&page=${currentPage}`),
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

  if (isLoading) return <DataLoading label="Medicines" />;

  if (error) return <LoadingError label="Medicines" />;
  return (
    <>
      <Helmet key={location.pathname}>
        <title>Shop</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <section className="min-h-[80vh] py-12 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-xl my-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-lg">
                <HeartPulse className="text-white w-7 h-7" />
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-sm text-center">
                Shop Medicines
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl text-center">
              Discover, compare, and buy quality medicines from trusted sellers.
              Your health, our priority.
            </p>
          </div>
          {/* Table Section */}
          <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-4 md:p-8">
            <ShopTable
              paginatedMedicines={paginatedMedicines}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
              openModal={openModal}
            />
          </div>
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

export default Shop;
