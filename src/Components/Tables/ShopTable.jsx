import { Button } from '@headlessui/react';
import React, { useContext } from 'react';
import { CartContext } from '../../Context/Cart/CartContext';

const ShopTable = ({
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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>#</label>
            </th>
            <th>Name</th>
            <th>Company</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMedicines?.map((medicine, index) => (
            <tr key={medicine._id || index}>
              <th>
                <label>{index + 1}</label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={medicine.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{medicine.itemName}</div>
                    <div className="text-sm opacity-50">
                      {medicine.genericName}
                    </div>
                  </div>
                </div>
              </td>
              <td>{medicine.company}</td>
              <td>{medicine.price}</td>
              <td>{medicine.discount}</td>
              <td>
                {' '}
                <div className="join join-vertical">
                  <Button
                    onClick={() => openModal(medicine)}
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30 btn join-item flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-blue-500"
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
                    Details
                  </Button>
                  <button
                    className="btn join-item flex items-center gap-2"
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
                      className="w-4 h-4 text-green-500"
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
                    Add to cart
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-center my-4 gap-2 bg-red-200">
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

export default ShopTable;
