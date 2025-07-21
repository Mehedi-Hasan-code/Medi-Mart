import React from 'react';

const DiscountCard = ({ medicine }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 border border-primary/10">
      <div className="w-28 h-28 mb-3 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={medicine.image}
          alt={medicine.itemName}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full text-center">
        <h3 className="font-semibold text-lg text-primary mb-1 truncate">
          {medicine.itemName}
        </h3>
        <div className="text-xs text-gray-400 mb-1">{medicine.genericName}</div>
        <div className="text-sm text-gray-500 mb-2">{medicine.company}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="bg-primary/10 text-primary font-bold px-2 py-1 rounded text-xs">
            -{medicine.discount}%
          </span>
          <span className="line-through text-gray-400 text-xs">
            ৳{medicine.price}
          </span>
          <span className="text-success font-bold text-base">
            ৳{(medicine.price * (1 - medicine.discount / 100)).toFixed(0)}
          </span>
        </div>
        <div className="text-xs text-gray-400">{medicine.category}</div>
      </div>
    </div>
  );
};

export default DiscountCard;
