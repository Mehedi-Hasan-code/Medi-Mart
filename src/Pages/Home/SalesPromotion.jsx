import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DataLoading from '../../Components/Common/Loaders/DataLoading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const SalesPromotion = () => {
  const { publicApi } = useAxiosSecure();
  const navigate = useNavigate()

  // Fetch active ads for promotional banners
  const { data: ads, isLoading: adsLoading } = useQuery({
    queryKey: ['promotional-ads'],
    queryFn: () => publicApi.get('/ads/active'),
  });

  // Mock promotional data for demonstration
  const mockPromotions = [
    {
      id: 1,
      title: 'Summer Health Sale',
      description: 'Get up to 50% off on summer essentials',
      discount: '50%',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      category: 'Summer Essentials',
      validUntil: '2024-08-31',
      code: 'SUMMER50',
    },
    {
      id: 2,
      title: 'New Customer Special',
      description: 'First-time buyers get 25% off',
      discount: '25%',
      image:
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      category: 'All Products',
      validUntil: '2024-12-31',
      code: 'NEW25',
    },
    {
      id: 3,
      title: 'Bulk Purchase Bonus',
      description: 'Buy 3+ items and save 30%',
      discount: '30%',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      category: 'Bulk Orders',
      validUntil: '2024-10-31',
      code: 'BULK30',
    },
  ];

  const mockFeaturedDeals = [
    {
      id: 1,
      name: 'Vitamin C 1000mg',
      originalPrice: 29.99,
      discountedPrice: 19.99,
      discount: 33,
      image:
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
      category: 'Vitamins',
      stock: 45,
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil',
      originalPrice: 24.99,
      discountedPrice: 16.99,
      discount: 32,
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
      category: 'Supplements',
      stock: 28,
    },
    {
      id: 3,
      name: 'Probiotic Complex',
      originalPrice: 34.99,
      discountedPrice: 22.99,
      discount: 34,
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop',
      category: 'Digestive Health',
      stock: 15,
    },
  ];

  if (adsLoading) {
    return <DataLoading label="promotional content" />;
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🎉 Sales & Promotions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing deals, exclusive offers, and limited-time
            promotions on premium health products
          </p>
        </div>

        {/* Promotional Banners */}
        {ads && ads.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Special Offers
            </h3>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="promotional-banner-swiper"
            >
              {ads.map((ad, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={ad.imgUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                      <div className="flex flex-col justify-center h-full p-8 md:p-12">
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                          {ad.title}
                        </h3>
                        <p className="text-white/90 text-lg md:text-xl mb-6 max-w-md">
                          {ad.description}
                        </p>
                        <button 
                        onClick={() => navigate('/shop')} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalesPromotion;
