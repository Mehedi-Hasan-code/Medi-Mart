import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DataLoading from '../../Components/Common/Loaders/DataLoading';
import LoadingError from '../../Components/Common/States/LoadingError';

const Categories = () => {
  const navigate = useNavigate();
  const { publicApi } = useAxiosSecure();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await publicApi.get('/categories');
    },
  });

  if (isLoading) {
    return <DataLoading label="Categories" />;
  }

  if (error) {
    return <LoadingError label="categories" />;
  }

  const categoriesData = categories || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">🏥</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              Medicine Categories
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of medical categories. Find the
            right medicines and healthcare products for your needs.
          </p>
        </div>

        {/* Categories Grid */}
        {categoriesData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesData?.map((category) => (
              <div
                key={category._id || category.id}
                className="group cursor-pointer transform transition-all duration-300 scale-95 hover:scale-100"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
                  {/* Category Image */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
                    {category.categoryImage && (
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm">
                        <img
                          src={category.categoryImage}
                          alt={category.categoryName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-white">
                      {category.categoryName}
                    </h3>
                  </div>

                  {/* Category Details */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description ||
                        `Browse our collection of ${category?.categoryName.toLowerCase()} medicines and healthcare products.`}
                    </p>

                    {/* Category Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Available
                      </span>
                      {category.medicinesCount && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {category.medicinesCount} products
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() =>
                        navigate(`/details?category=${category.categoryName}`)
                      }
                      className="w-full btn bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 btn-sm"
                    >
                      View Details
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Categories Available
            </h3>
            <p className="text-gray-600">
              Categories will appear here once they are added to the system.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help Finding the Right Medicine?
            </h3>
            <p className="text-gray-600 mb-6">
              Our healthcare experts are here to help you find the perfect
              medicine for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-blue-500 text-white hover:bg-blue-600">
                <span className="mr-2">📞</span>
                Contact Support
              </button>
              <button className="btn btn-outline btn-primary">
                <span className="mr-2">🔍</span>
                Search Medicines
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
