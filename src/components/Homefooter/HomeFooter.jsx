// src/components/Homefooter/HomeFooter.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function HomeFooter() {
  const footerStyles = `
    .minimal-footer {
      background-color: #000000;
      color: #b0b0b0; /* A light grey for better readability */
      padding: 20px 15px;
      text-align: center;
      font-size: 12px; /* Smaller font to match the image */
      font-family: Arial, sans-serif;
    }
    .minimal-footer .footer-nav {
      margin-bottom: 10px;
    }
    .minimal-footer a,
    .minimal-footer span {
      color: #b0b0b0;
      text-decoration: none;
      margin: 0 8px;
    }
    .minimal-footer a:hover {
      text-decoration: None;
      color: #34d399;
    }
  `;

  return (
    <>
      <style>{footerStyles}</style>
      <footer className="minimal-footer">
        <div className="container">
          <div className="footer-nav">
            <Link to="/shop?category=Dehydrated+Vegetables">Dehydrated vegetables</Link>
            <span>|</span>
            <Link to="/shop?category=Dehydrated+Fruits">Dehydrated fruits</Link>
            <span>|</span>
            <Link to="/shop?category=Masala">Masala</Link>
            <span>|</span>
            <Link to="/shop?category=Water+Bottles">Water Bottels</Link>
            <span>|</span>
            <Link to="/shop?category=Indian+Snacks">Indian Snaks</Link>
          </div>
          <div className="footer-legal">
            <span>Copyright &copy; India Pvt Ltd. (Hyjain Division) 2025.</span>
            <span>|</span>
            <Link to="/sitemap">Sitemap</Link>
            <span>|</span>
            <Link to="/terms-and-conditions">Terms & Condition</Link>
            <span>|</span>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
        
      </footer>
    </>
  );
}

export default HomeFooter;