import React, { useContext } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../../Context/Cart/CartContext';
import { AuthContext } from '../../Context/Auth/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { groupItemsBySeller } from '../../utils/groupItemsBySeller';

const Cart = () => {
  const {
    items,
    totalQuantity,
    totalPrice,
    discountedTotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { privateApi } = useAxiosSecure();

  



  const handleCheckout = async () => {
    try {
      if (!user) {
        throw new Error('Please log in to proceed with checkout');
      }
      const sellersGroup = groupItemsBySeller(items);
      console.log(sellersGroup)


      const response = await privateApi.post('/checkout', sellersGroup);
      console.log('Checkout response:', response);

      if (response) {
        window.location.href = response;
      } else {
        throw new Error('Invalid response from checkout API');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.warn(error.message || 'An error occurred during checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600">
            Add some items to your cart to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-2 md:px-0">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl border border-blue-100">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
              🛒 Your Cart
            </h2>
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-white hover:bg-red-500 transition px-3 py-1.5 rounded-lg border border-red-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <FaTrash className="inline" /> Clear Cart
            </button>
          </div>

          <div className="space-y-6">
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-blue-50/70 rounded-lg border border-blue-100 shadow-sm"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-gradient-to-tr from-blue-200 to-blue-100 rounded-lg  flex items-center justify-center text-blue-400 text-4xl mr-2 shadow-inner">
                    <span role="img" aria-label="medicine">
                      💊
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Price:{' '}
                      <span className="font-semibold">
                        $
                        {!isNaN(Number(item.price))
                          ? Number(item.price).toFixed(2)
                          : '0.00'}
                      </span>
                    </p>
                    {item.discountedPrice &&
                      Number(item.discountedPrice) < Number(item.price) && (
                        <p className="text-green-600 text-xs font-semibold">
                          Discounted price: $
                          {Number(item.discountedPrice).toFixed(2)}
                        </p>
                      )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 disabled:opacity-40 text-blue-700 transition"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-3 py-1 bg-white border border-blue-200 rounded-lg text-blue-900 font-semibold shadow-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full border border-red-200 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 border-t border-blue-100 gap-6">
              <div className="w-full sm:w-auto">
                <p className="text-gray-700">
                  Total Items:{' '}
                  <span className="font-bold text-blue-900">
                    {items.length} items ({totalQuantity} units)
                  </span>
                </p>
                <p className="text-xl font-extrabold text-blue-800 mt-1">
                  Subtotal :{' '}
                  <del className="text-red-300 text-base">
                    ${Number(totalPrice).toFixed(2)}
                  </del>{' '}
                  ${Number(discountedTotal).toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
