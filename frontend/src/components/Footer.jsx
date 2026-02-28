import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About StepStyle</h4>
          <p>Premium footwear for every occasion. Walk your style with StepStyle.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Products</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/">FAQ</a></li>
            <li><a href="/">Shipping Info</a></li>
            <li><a href="/">Returns</a></li>
            <li><a href="/">Track Order</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: info@stepstyle.com</li>
            <li>Phone: 1-800-SHOES-99</li>
            <li>Address: 123 Fashion St, NY</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} StepStyle. All rights reserved. | Walk Your Style</p>
      </div>
    </footer>
  );
};

export default Footer;