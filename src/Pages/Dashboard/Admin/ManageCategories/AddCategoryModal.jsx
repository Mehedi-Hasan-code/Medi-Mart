import React from 'react';

const AddCategoryModal = () => {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl shadow-2xl border border-emerald-100">
        <h3 className="font-bold text-2xl text-emerald-700 mb-2 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add New Category
        </h3>
        <p className="py-2 text-gray-600">
          Fill in the details to add a new medicine category. Press ESC or click
          below to close.
        </p>
        <div className="modal-action mt-6">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold shadow hover:from-emerald-600 hover:to-blue-600 transition">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddCategoryModal;
