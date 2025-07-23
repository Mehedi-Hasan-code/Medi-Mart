import React from 'react';

const Table = ({ setShowModal, medicinesArr }) => {


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
            <th>Category</th>
            <th>Description</th>
            <th>Mass unit</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {medicinesArr?.map((medicine, index) => (
            <tr key={medicine._id}>
              <th>
                <label>{index + 1}</label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={medicine.image} alt={medicine.itemName} />
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
              <td>{medicine.category}</td>
              <td>
                {medicine.description
                  ? medicine.description.length > 10
                    ? medicine.description.slice(0, 10) + '...'
                    : medicine.description
                  : 'N/A'}
              </td>
              <td>{medicine.massUnit}</td>
              <td>{medicine.price}</td>
              <td>{medicine.discount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add Medicine
      </button>
    </div>
  );
};

export default Table;
