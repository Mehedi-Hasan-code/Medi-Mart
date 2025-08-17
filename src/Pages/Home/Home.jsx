import React from 'react';
import Categories from './Categories';
import Hero from './Hero';
import Discount from './Discount';
import SalesPromotion from './SalesPromotion';
import Testimonial from './Testimonial';
import Newsletter from './Newsletter';
import HowItWorks from './HowItWorks';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import LatestProduct from './LatestProduct';

const Home = () => {
  const location = useLocation();
  return (
    <>
      <Helmet key={location.pathname}>
        <title>Medi Mart - Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Hero />
      <Categories />
      <Discount />
      <LatestProduct />
      <SalesPromotion />
      <HowItWorks />
      <Testimonial />
      <Newsletter />
    </>
  );
};

export default Home;
