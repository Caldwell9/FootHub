import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < fullStars ? '#f59e0b' : '#cccccc' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-rating">{renderStars(product.rating)} ({product.rating})</div>
          <button className="product-button">View Details →</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;