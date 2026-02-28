import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart, user } = useCart();

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Discover our amazing collection of shoes and start shopping!</p>
          <Link to="/" className="cta-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={`${item._id}-${item.size}`} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <Link
            to={user ? '/checkout' : '/login'}
            style={{ textDecoration: 'none' }}
          >
            <button className="checkout-button">
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;