import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import LoadingError from '../../Components/Common/States/LoadingError';
import DetailsModal from '../../Components/Common/Medicines/DetailsModal';

import {
  HeartPulse,
  Grid3X3,
  List,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import DataLoading from '../../Components/Common/Loaders/DataLoading';
import ShopTable from '../../Components/Tables/ShopTable';
import ShopGrid from '../../Components/Grid/ShopGrid';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const location = useLocation();
  const { publicApi } = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('none'); // 'none', 'lowToHigh', 'highToLow'

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

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Sort medicines based on selected option
  const sortMedicines = (medicines) => {
    if (!medicines || sortBy === 'none') return medicines;

    const sortedMedicines = [...medicines];

    if (sortBy === 'lowToHigh') {
      sortedMedicines.sort((a, b) => {
        const priceA = Number(a.price) * (1 - Number(a.discount) / 100);
        const priceB = Number(b.price) * (1 - Number(b.discount) / 100);
        return priceA - priceB;
      });
    } else if (sortBy === 'highToLow') {
      sortedMedicines.sort((a, b) => {
        const priceA = Number(a.price) * (1 - Number(a.discount) / 100);
        const priceB = Number(b.price) * (1 - Number(b.discount) / 100);
        return priceB - priceA;
      });
    }

    return sortedMedicines;
  };

  // get medicines
  const { data, isLoading, error } = useQuery({
    queryKey: ['medicines', itemsPerPage, currentPage],
    queryFn: () =>
      publicApi.get(`/medicines?limit=${itemsPerPage}&page=${currentPage}`),
  });

  const paginatedMedicines = data?.result || [];
  const sortedMedicines = sortMedicines(paginatedMedicines);

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

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-sm font-medium text-gray-700"
              >
                Sort by Price:
              </label>
              <div className="relative">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  <option value="none" className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4" />
                    No Sort
                  </option>
                  <option value="lowToHigh" className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4" />
                    Low to High
                  </option>
                  <option value="highToLow" className="flex items-center gap-2">
                    <ArrowDown className="w-4 h-4" />
                    High to Low
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div>
            {viewMode === 'list' ? (
              <ShopTable
                paginatedMedicines={sortedMedicines}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
                openModal={openModal}
              />
            ) : (
              <ShopGrid
                paginatedMedicines={sortedMedicines}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
                openModal={openModal}
              />
            )}
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
