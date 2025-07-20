import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payments = ({ payments, refetch }) => {
  const { privateApi } = useAxiosSecure();
  const { role } = useUserRole();
  if (!Array.isArray(payments) || payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No payments found.</div>
    );
  }

  const handleAccept =  (transactionId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accept Payment',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await privateApi.patch(`/payments/${transactionId}`);
        if (res.orders.modifiedCount > 0 && res.payment.modifiedCount > 0) {
          console.log(res);
          if (typeof refetch === 'function') {
            refetch();
          }
          Swal.fire({
            title: 'Accepted!',
            text: 'Payment has been accepted.',
            icon: 'success',
          });
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Buyer (Email)</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Transaction ID</th>
            <th>Status</th>
            {role === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, idx) => (
            <tr key={payment._id || idx}>
              <th>{idx + 1}</th>
              <td>{payment.buyer || 'N/A'}</td>
              <td>{payment.total_amount || 'N/A'}</td>
              <td>{payment.payment_method || 'N/A'}</td>
              <td>{payment.transactionId || 'N/A'}</td>
              <td>{payment.status || 'N/A'}</td>
              {role === 'admin' && (
                <td className="text-center">
                  {payment.status === 'paid' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                      <svg
                        className="w-3 h-3 mr-1 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Accepted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAccept(payment.transactionId)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors"
                    >
                      Accept
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
