import { Dialog, DialogPanel } from '@headlessui/react';
import React from 'react';
import { X, Building2, DollarSign, Tag } from 'lucide-react';

const DetailsModal = ({ isOpen, close, medicine }) => {
  if (!isOpen) return null;

  // Calculate discounted price
  const discountedPrice = medicine?.price * (1 - medicine?.discount / 100);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={close}
    >
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          className="relative w-full max-w-lg mx-auto"
        >
          {/* Modal Content */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            {/* Header with close button */}
            <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-slate-700/50">
              <button
                onClick={close}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-all duration-200 text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-white mb-1 text-center">Medicine Details</h2>
              <p className="text-slate-400 text-sm text-center">Complete product information</p>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
              {/* Product Header */}
              {medicine && (
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={medicine.image}
                      alt={medicine.itemName}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-slate-700/50 shadow-lg"
                    />
                    <div className="absolute top-0 -translate-y-[50%] left-[50%] -translate-x-[50%] bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {medicine.category}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{medicine.itemName}</h3>
                    <p className="text-slate-400 text-sm mb-2">{medicine.genericName}</p>
                    <p className="text-slate-400 text-sm mb-2">{medicine.description}</p>
                  </div>
                </div>
              )}

              {/* Price Section */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-green-400" size={20} />
                    <span className="text-slate-300 text-sm">Price</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {medicine?.discount > 0 && (
                      <span className="text-slate-500 line-through text-sm">${medicine?.price}</span>
                    )}
                    <span className="text-2xl font-bold text-white">${discountedPrice?.toFixed(2)}</span>
                    {medicine?.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        -{medicine.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-4">
                {medicine && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Building2 className="text-blue-400" size={18} />
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wide">Company</p>
                        <p className="text-white font-medium">{medicine.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                      <Tag className="text-purple-400" size={18} />
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wide">Category</p>
                        <p className="text-white font-medium">{medicine.category}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={close}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-slate-600/50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DetailsModal;
