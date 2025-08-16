import { Button } from '@headlessui/react';
import React, { useContext } from 'react';
import { CartContext } from '../../Context/Cart/CartContext';

const ShopGrid = ({
  paginatedMedicines,
  handleItemsPerPageChange,
  itemsPerPage,
  currentPage,
  goToPage,
  totalPages,
  openModal,
}) => {
  const { addItem } = useContext(CartContext);

  return (
    <div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedMedicines?.map((medicine, index) => (
          <div
            key={medicine._id || index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
          >
            {/* Medicine Image */}
            <div className="relative overflow-hidden">
              <img
                src={medicine.image}
                alt={medicine.itemName}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {medicine.discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  -{medicine.discount}%
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Medicine Name & Generic */}
              <div className="mb-3">
                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                  {medicine.itemName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {medicine.genericName}
                </p>
              </div>

              {/* Company */}
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-600">
                  {medicine.company}
                </p>
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  {medicine.discount > 0 ? (
                    <>
                      <span className="text-lg font-bold text-green-600">
                        $
                        {(
                          Number(medicine.price) *
                          (1 - Number(medicine.discount) / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${medicine.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-800">
                      ${medicine.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => openModal(medicine)}
                  className="w-full rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Details
                </Button>
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() =>
                    addItem({
                      id: medicine._id,
                      name: medicine.itemName,
                      price: medicine.price,
                      discountedPrice: (
                        Number(medicine.price) *
                        (1 - Number(medicine.discount) / 100)
                      ).toFixed(2),
                      image: medicine.image,
                      company: medicine.company,
                      genericName: medicine.genericName,
                      discount: medicine.discount,
                      seller: medicine.seller,
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4 gap-2 bg-white p-4 rounded-lg shadow-sm">
        <button
          className="btn btn-sm"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {/* Pagination Buttons with Ellipsis */}
        {totalPages <= 5 ? (
          [...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn btn-sm ${
                currentPage === idx + 1 ? 'btn-active' : ''
              }`}
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))
        ) : (
          <>
            {/* First page */}
            <button
              className={`btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
              onClick={() => goToPage(1)}
            >
              1
            </button>
            {/* Left Ellipsis */}
            {currentPage > 3 && <span className="px-2">...</span>}
            {/* Pages around current */}
            {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
              .filter(
                (pageNum) =>
                  pageNum > 1 &&
                  pageNum < totalPages &&
                  pageNum >= currentPage - 2 &&
                  pageNum <= currentPage + 2
              )
              .map((pageNum) => (
                <button
                  key={pageNum}
                  className={`btn btn-sm ${
                    currentPage === pageNum ? 'btn-active' : ''
                  }`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
            {/* Right Ellipsis */}
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}
            {/* Last page */}
            <button
              className={`btn btn-sm ${
                currentPage === totalPages ? 'btn-active' : ''
              }`}
              onClick={() => goToPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button className="btn btn-sm">
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </button>
        <button
          className="btn btn-sm"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopGrid;
