import React from 'react';
import AddCategoryModal from './AddCategoryModal';

const CategoryTable = ({ categories }) => {
  console.log(categories);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {categories.map((category, index) => (
            <tr key={category._id}>
              <th>{index + 1}</th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={category.categoryImage} />
                  </div>
                </div>
              </td>
              <td>
                <p>{category.categoryName}</p>
              </td>
              <th>
                <div className="join join-vertical">
                  <button className="btn join-item">Button</button>
                  <button className="btn join-item">Button</button>
                </div>
              </th>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="text-center">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById('my_modal_5').showModal()
                }
              >
                Add Category
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* modal */}
                <AddCategoryModal />
    </div>
  );
};

export default CategoryTable;
