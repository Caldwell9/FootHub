import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart, user, logout } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          StepStyle
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart
              {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li className="navbar-user">
            {user ? (
              <>
                <span>Hi, {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" style={{ color: '#ff0000' }}>
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;