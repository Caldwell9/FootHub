import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCart, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-size">Size: {item.size}</div>
        <div className="cart-item-price">${item.price.toFixed(2)}</div>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => updateCart(item._id, item.size, item.quantity - 1)}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => updateCart(item._id, item.size, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="remove-btn"
          onClick={() => removeFromCart(item._id, item.size)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;