import React from 'react';
const Modal = ({ onSubmit, categories, loading, setShowModal, register, handleSubmit, reset }) => {

  const companies = ['Company A', 'Company B', 'Company C'];
  return (
    <dialog className="modal modal-open">
      <form
        method="dialog"
        className="modal-box"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-lg mb-4">Add Medicine</h3>
        <div className="form-control mb-2">
          <label className="label">Item Name</label>
          <br />
          <input
            {...register('itemName', { required: true })}
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">Item Generic Name</label>
          <br />
          <input
            {...register('genericName', { required: true })}
            type="text"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">Short Description</label>
          <br />
          <textarea
            {...register('shortDescription', { required: true })}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">Image Upload</label>
          <br />
          <input
            {...register('image', { required: true })}
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
            {...register('category', { required: true })}
            className="w-full select select-bordered"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mb-2">
          <label className="label">Company</label>
          <br />
          <select
            {...register('company', { required: true })}
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
            {...register('massUnit', { required: true })}
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
            {...register('price', { required: true, min: 0 })}
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
            {...register('discount', { min: 0, max: 100 })}
            defaultValue="0"
            type="number"
            className="input input-bordered w-full"
            min="0"
            max="100"
          />
        </div>
        <div className="modal-action">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowModal(false);
              reset();
            }}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
