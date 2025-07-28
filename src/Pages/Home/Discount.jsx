import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DataLoading from '../../Components/Common/Loaders/DataLoading';
import LoadingError from '../../Components/Common/States/LoadingError';
import EmptyArray from '../../Components/Common/States/EmptyArray';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DiscountCard from './DiscountCard';

const Discount = () => {
  const { publicApi } = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ['top-discount'],
    queryFn: () => publicApi.get('/medicines/top-discount'),
  });

  const medicines = data?.medicines;


  if (isLoading) {
    return <DataLoading label="discounted medicines" />;
  }

  if (error) {
    return <LoadingError label="discounted medicines" />;
  }

  if (!medicines || medicines.length === 0) {
    return <EmptyArray message="No discounted medicines found" />;
  }

  // Render the discounted medicines list here
  return (
    <section className="py-8 px-2 md:px-0 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Top Discounts
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={24}
        slidesPerView={1.2}
        mousewheel={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="discount-swiper pb-10"
      >
        {medicines.map((medicine) => (
          <SwiperSlide key={medicine._id}>
            <DiscountCard medicine={medicine} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Discount;
