import React from 'react';

const MedicinesTable = ({ medicines }) => {
  console.log(medicines);
  return (
    <div className="overflow-x-auto max-w-7xl mx-auto">
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {medicines &&
            medicines.map((medicine, index) => (
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
                <td>
                  <div className="join join-vertical">
                    <button className="btn join-item">Button</button>
                    <button className="btn join-item">Button</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesTable;
