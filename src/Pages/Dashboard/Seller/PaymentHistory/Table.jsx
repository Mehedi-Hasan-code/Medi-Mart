import React from 'react';

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Buyer</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Amount</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data?.map((payment, index) => (
            <tr key={payment._id || index} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.buyer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${payment.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                  ${payment.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {payment.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
