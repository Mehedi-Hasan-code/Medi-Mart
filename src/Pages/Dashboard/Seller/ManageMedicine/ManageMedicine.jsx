import React, { useState } from 'react';

const ManageMedicine = () => {
  const [showModal, setShowModal] = useState(false);

  // Example static options for category and company
  const categories = ['Tablet', 'Syrup', 'Injection'];
  const companies = ['Company A', 'Company B', 'Company C'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to submit form
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add Medicine
      </button>

      {/* DaisyUI Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg mb-4">Add Medicine</h3>
            <div className="form-control mb-2">
              <label className="label">Item Name</label>
              <br />
              <input
                name="itemName"
                type="text"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">Item Generic Name</label>
              <br />
              <input
                name="genericName"
                type="text"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">Short Description</label>
              <br />
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">Image Upload</label>
              <br />
              <input
                name="image"
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                required
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">Category</label>
              <br />
              <select
                name="category"
                className="w-full select select-bordered"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mb-2">
              <label className="label">Company</label>
              <br />
              <select
                name="company"
                className="w-full select select-bordered"
                required
              >
                <option value="">Select Company</option>
                {companies.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mb-2">
              <label className="label">Item Mass Unit</label>
              <br />
              <select
                name="massUnit"
                className="w-full select select-bordered"
                required
              >
                <option value="Mg">Mg</option>
                <option value="ML">ML</option>
              </select>
            </div>
            <div className="form-control mb-2">
              <label className="label">Per Unit Price</label>
              <br />
              <input
                name="price"
                type="number"
                className="input input-bordered w-full"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">Discount Percentage</label>
              <input
              defaultValue='0'
                name="discount"
                type="number"
                className="input input-bordered w-full"
                min="0"
                max="100"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageMedicine;
