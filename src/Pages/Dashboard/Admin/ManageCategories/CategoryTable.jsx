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
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              #
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
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
              <td className="px-4 py-3 text-gray-800 font-semibold">
                {category.categoryName}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="text-center py-4">
              <button
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold shadow hover:from-emerald-600 hover:to-blue-600 transition"
                onClick={() =>
                  document.getElementById('my_modal_5').showModal()
                }
              >
                + Add Category
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <AddCategoryModal />
    </div>
  );
};

export default CategoryTable;
