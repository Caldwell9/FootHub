import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Walk Your Style</h1>
        <p>Discover premium footwear that matches your personality</p>
        <Link to="/" className="cta-button">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;