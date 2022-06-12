import React from 'react';
import './static/style.css';
import Header from './components/header';
import Footer from './components/footer';
import Hero from './components/hero';
import Products from './components/products';
import Policy from './components/policy';
import Testimonials from './components/testimonials';
import Blog from './components/blog';
import Banner from './components/banner';
import Contact from './components/contact';

export default function LandingPage() {
  return (
    <div className="full-w">
      <Header />
      <Hero />
      <Products />
      <Policy />
      <Testimonials />
      <Blog />
      <Contact />
      <Banner />
      <Footer />
    </div>
  );
}
