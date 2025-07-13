import { Button } from '@headlessui/react';
import React from 'react';

const MedicinesTable = ({ medicines, openModal }) => {
  return (
    <div className="overflow-x-auto max-w-7xl mx-auto">
      <table className="table">
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
          {medicines?.map((medicine, index) => (
            <tr key={index}>
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
              <td>${medicine.price}</td>
              <td>{medicine.discount}%</td>
              <td>
                  <div className="join join-vertical">
                    <Button
                      onClick={() => openModal(medicine)}
                      className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30 btn join-item flex items-center gap-2"
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
                  Details
                    </Button>
                    <button className="btn join-item flex items-center gap-2">
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
                      Add to cart
                </button>
                  </div>              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesTable;
