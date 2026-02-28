import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProduct(id);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    setSuccessMessage('Product added to cart!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddReview = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await productAPI.addReview(id, newReview);
      setNewReview({ rating: 5, comment: '' });
      // Refetch product to get updated reviews
      const response = await productAPI.getProduct(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < fullStars ? '#f59e0b' : '#cccccc', marginRight: '5px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!product) {
    return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Product not found</div>;
  }

  return (
    <div className="product-page-container">
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="product-detail-grid">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image-large" />
        </div>

        <div className="product-details">
          <div className="product-category-badge">{product.category}</div>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-large">${product.price.toFixed(2)}</div>
          <div style={{ marginBottom: '20px' }}>
            {renderStars(product.rating)} <span style={{ color: '#666' }}>({product.rating})</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="size-selector">
            <label>Select Size:</label>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button className="add-to-cart-large" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div className="reviews-section">
            <h3>Customer Reviews</h3>

            {user && (
              <div className="review-form">
                <div style={{ marginBottom: '10px' }}>
                  <label>Rating: </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                    }
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Stars
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Write your review..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />
                <button
                  className="cta-button"
                  style={{ marginTop: '10px' }}
                  onClick={handleAddReview}
                >
                  Submit Review
                </button>
              </div>
            )}

            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-author">{review.user}</div>
                  <div className="review-rating">{renderStars(review.rating)}</div>
                  <div className="review-text">{review.comment}</div>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;