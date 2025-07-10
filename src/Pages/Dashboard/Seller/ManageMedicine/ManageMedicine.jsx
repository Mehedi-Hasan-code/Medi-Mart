import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { uploadImage } from '../../../../utils/uploadImage';
import { toast } from 'react-toastify';

const ManageMedicine = () => {
  const { privateApi } = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);



  // Example static options for category and company
  const categories = ['Tablet', 'Syrup', 'Injection'];
  const companies = ['Company A', 'Company B', 'Company C'];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage(data.image[0]);
      console.log(imageUrl);
      if (!imageUrl) {
        toast.error('Image upload failed. Please try again.');
        setLoading(false);
        return;
      }
      const medicineInfo = { ...data, image: imageUrl };

      await privateApi.post('/medicines', medicineInfo);
      toast.success('Medicine added successfully!');
      setShowModal(false);
      reset();
    } catch {
      toast.error('Failed to add medicine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add Medicine
      </button>
      {/* DaisyUI Modal */}
      {showModal && (
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
                {...register('description', { required: true })}
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
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
      )}
    </div>
  );
};

export default ManageMedicine;
