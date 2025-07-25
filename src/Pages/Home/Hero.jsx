// To use this Hero section, install Swiper with: npm install swiper
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DataLoading from '../../Components/Loaders/DataLoading';
import LoadingError from '../../Components/Common/States/LoadingError';
import EmptyArray from '../../Components/Common/States/EmptyArray';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
  const { publicApi } = useAxiosSecure();
  const {
    data: ads,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['active-ads'],
    queryFn: () => publicApi.get('/ads/active'),
  });

  if (isLoading) {
    return <DataLoading />;
  }

  if (error) {
    return <LoadingError label="ads" />;
  }

  if (!ads || !Array.isArray(ads) || ads.length === 0) {
    return <EmptyArray message="No active ads found" />;
  }

  return (
    <section className="relative min-h-[60vh] w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {ads.map((ad, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="min-h-[60vh] w-full flex items-center justify-center relative bg-cover bg-center"
              style={{ backgroundImage: `url(${ad.imgUrl})` }}
            >
              <div className="bg-black/45 text-white p-10 rounded-2xl max-w-xl mx-auto text-center shadow-lg">
                <h1 className="text-4xl font-bold mb-4">{ad.title}</h1>
                <p className="text-lg mb-3">{ad.description}</p>
                <button
                  className="py-3 px-10 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-green-400 border-none rounded-full shadow-md cursor-pointer transition-all duration-300 mt-5 hover:from-blue-600 hover:to-green-500 focus:outline-none"
                  onClick={() =>
                    window.scrollTo({ top: 600, behavior: 'smooth' })
                  }
                >
                  Get Offer
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
