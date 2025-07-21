// To use this Hero section, install Swiper with: npm install swiper
import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import DataLoading from '../../Components/Loaders/DataLoading'
import LoadingError from '../../Components/Common/States/LoadingError'
import EmptyArray from '../../Components/Common/States/EmptyArray'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Hero = () => {
  const { publicApi } = useAxiosSecure();
  const { data: ads, isLoading, error } = useQuery({
    queryKey: ['active-ads'],
    queryFn: () => publicApi.get('/ads/active')
  });

  if (isLoading) {
    return <DataLoading />;
  }

  if (error) {
    return <LoadingError label="ads" showAction={true} />;
  }

  if (!ads || !Array.isArray(ads) || ads.length === 0) {
    return <EmptyArray message="No active ads found" />;
  }

  return (
    <section className="hero-section" style={{ position: 'relative', minHeight: '60vh', width: '100%' }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        style={{ height: '100%' }}
      >
        {ads.map((ad, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="hero-slide-bg"
              style={{
                backgroundImage: `url(${ad.imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: '100%'
              }}
            >
              <div
                className="hero-overlay"
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  padding: '2.5rem',
                  borderRadius: '1rem',
                  maxWidth: '600px',
                  margin: '0 auto',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
                }}
              >
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>{ad.title}</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.7rem' }}>{ad.description}</p>
                <button
                  style={{
                    padding: '0.75rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#fff',
                    background: 'linear-gradient(90deg, #4f8cff 0%, #38d39f 100%)',
                    border: 'none',
                    borderRadius: '2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                    marginTop: '1.2rem'
                  }}
                  onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}
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
}

export default Hero