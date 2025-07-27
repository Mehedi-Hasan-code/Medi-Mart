import React from 'react';
import Categories from './Categories';
import Hero from './Hero';
import Discount from './Discount';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
      <HowItWorks />
      <Testimonial />
    </>
  );
};

export default Home;
