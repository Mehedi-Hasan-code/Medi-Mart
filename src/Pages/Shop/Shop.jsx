import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ShopTable from './ShopTable';
import LoadingError from '../../Components/Loaders/LoadingError';
import DataLoading from '../../Components/Loaders/DataLoading';
import DetailsModal from '../../Components/Common/Medicines/DetailsModal';
const Shop = () => {
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
    <div>
      <h1>Shop Medicine</h1>
      <ShopTable
        paginatedMedicines={paginatedMedicines}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        openModal={openModal}
      />
      <DetailsModal isOpen={isOpen} close={closeModal} medicine={selectedMedicine} />
    </div>
  );
};

export default Shop;
