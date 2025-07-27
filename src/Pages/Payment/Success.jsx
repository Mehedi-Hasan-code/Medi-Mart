import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from '../../Context/Cart/CartContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Context/Auth/AuthContext';
import { groupItemsBySeller } from '../../utils/groupItemsBySeller';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const Success = () => {
  const location = useLocation()
  const { user, isUserLoading } = useContext(AuthContext);
  const { items, discountedTotal, clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const { privateApi } = useAxiosSecure();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  const sessionId = searchParams.get('session_id');

  // Show toast and redirect if sessionId is missing
  useEffect(() => {
    if (!sessionId) {
      toast.error('Wrong Session Id');
      navigate('/cart');
    }
  }, [sessionId, navigate]);

  useEffect(() => {
    if (sessionId && !isUserLoading && user && user.email) {
      const fetchOrder = async () => {
        try {
          const orderDetails = {
            orderId: `TRK_${Date.now()}_${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            buyer: user.email,
            sellersGroup: groupItemsBySeller(items),
            totalPrice: discountedTotal.toFixed(2),
            paymentStatus: 'pending',
            paymentMethod: 'stripe',
            paymentDate: new Date().toISOString(),
          };

          const response = await privateApi.post(
            `/checkout/verify-payment?session_id=${sessionId}`,
            orderDetails
          );
          console.log(response);

          if (response?.payment_success === true) {
            setOrderData(response);
            console.log(response);
            clearCart();
          } else {
            navigate('/cart');
            throw new Error('Payment not successful');
          }
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };
      fetchOrder();
    }
  }, [sessionId, isUserLoading, user]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Helmet key={location.pathname}>
        <title>Medi Mart</title>
      </Helmet>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your invoice...</p>
        </div>
      </div>
    );
  }

  // Helper to recursively force supported colors
  function forceSupportedColors(element, originalStyles = new Map()) {
    if (!element) return;
    // Save original styles
    originalStyles.set(element, {
      backgroundColor: element.style.backgroundColor,
      color: element.style.color,
    });
    element.style.backgroundColor = '#fff';
    element.style.color = '#000';
    Array.from(element.children).forEach((child) =>
      forceSupportedColors(child, originalStyles)
    );
  }

  // Helper to restore original styles
  function restoreOriginalColors(originalStyles) {
    for (const [element, styles] of originalStyles.entries()) {
      element.style.backgroundColor = styles.backgroundColor;
      element.style.color = styles.color;
    }
  }

  const handleDownloadPDF = async () => {
    const input = document.getElementById('invoice-content');
    if (!input) return;

    // Recursively force supported colors and save originals
    const originalStyles = new Map();
    forceSupportedColors(input, originalStyles);

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');

    // Restore original styles
    restoreOriginalColors(originalStyles);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet key={location.pathname}>
        <title>Payment Successful</title>
      </Helmet>
      <div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
        id="invoice-content"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6">
          <h1 className="text-3xl font-bold mb-4">Order Invoice</h1>
          <p className="text-sm">Order ID: {sessionId}</p>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">Order Invoice</h1>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div className="text-gray-600">
                    {orderData.customer_email}
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-gray-600">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="text-gray-600">Paid</div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-gray-600">
                    ${orderData.amount_total / 100}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold mb-6">Items Ordered</h2>
            <div className="space-y-4">
              {Array.isArray(orderData?.items?.data) &&
                orderData.items.data.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-6 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-24 h-24">
                      <img
                        src={item.price.product.images[0]}
                        alt={item.description}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="ml-6 flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        {item.description}
                      </h3>
                      <div className="mt-1 flex items-center text-sm text-gray-600 space-x-4">
                        <span>Quantity: {item.quantity}</span>
                        <span>Unit Price: ${item.price.unit_amount / 100}</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="ml-2">
                          Sold by {item.price.product.metadata.seller}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-lg font-semibold">
                      ${item.amount_total / 100}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ${orderData.amount_total / 100}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
            </div>
          </div>

          <div className="mt-12 px-6 py-8 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Total</h3>
              <span className="text-2xl font-bold">
                ${orderData.amount_total / 100}
              </span>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/orders')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <span>View Order History</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/shop')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
