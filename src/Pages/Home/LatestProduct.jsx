import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestProduct = () => {
  const { publicApi } = useAxiosSecure();
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['latestProducts'],
    queryFn: async () => {
      const response = await publicApi.get('/medicines/latest');
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  console.log(data);
  const latestProducts = data?.medicines;
  console.log(latestProducts);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading latest products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Error loading latest products: {error.message}
        </p>
      </div>
    );
  }

  if (!latestProducts || latestProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No latest products available</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our newest arrivals and stay updated with the latest
            products in our collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {latestProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 text-xs">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-primary">
                    ${product.price}
                  </span>
                  <button 
                  onClick={() => navigate('/shop')} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
          onClick={() => navigate('/shop')
          } className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;
