import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // ✅ 1. IMPORT AXIOS
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  // ✅ 2. ADD STATE TO MANAGE THE FORM DYNAMICALLY
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ 3. CREATE THE SUBMIT HANDLER FUNCTION
  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setLoading(true);
    setMessage('');

    try {
      // Post the email to your custom backend endpoint
      await axios.post('http://localhost:5000/api/subscribe', { email });
      setMessage('✅ Thank you for subscribing!');
      setEmail(''); // Clear the input field on success
    } catch (error) {
      setMessage('❌ An error occurred. Please try again.');
      console.error('Subscription form error:', error);
    }

    setLoading(false);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          
          {/* --- Columns with links (no changes here) --- */}
          <div className="footer-column">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Dehydrated Vegetables</Link></li>
              <li><Link to="/shop">Dehydrated Fruits</Link></li>
              <li><Link to="/shop">Masala & Spices</Link></li>
              <li><Link to="/shop">Bisleri Water</Link></li>
              <li><Link to="/shop">Other</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>HYJAIN</h3>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/terms-and-conditions">Terms of Service</Link></li>
              <li><Link to="/refund-policy">Refund policy</Link></li>
              <li><Link to="/ShippingFeesandDelivery">Shipping Fees and Delivery</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Policies</h3>
            <ul>
              <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/cancellations-and-returns">Cancellations and Returns</Link></li>
              <li><Link to="/ShippingFeesandDelivery">Shipping Fees and Delivery</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li><Link to="/payments">Payments</Link></li>
              <li><Link to="/ShippingFeesandDelivery">Shipping</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
            </ul>
          </div>
          
          {/* --- Subscribe Column (Form updated to be dynamic) --- */}
          <div className="footer-column subscribe-column">
            <h3>Subscribe to stay updated</h3>
            
            {/* ✅ 4. UPDATE THE FORM TO USE THE ONSUBMIT HANDLER */}
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <input 
                type="email" 
                name="email" 
                placeholder="john@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Joining...' : 'Join'}
              </button>
            </form>

            {/* Optional: Display a success or error message to the user */}
            {message && <p className="subscription-message mt-2">{message}</p>}

            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-contact">
            <div className="contact-item">
                <BsFillTelephoneFill className="contact-icon" />
                <a href="tel:9591500590">9591500590</a>
            </div>
            <div className="contact-item">
                <MdEmail className="contact-icon" />
                <a href="mailto:Hyjainfoodproducts@gmail.com">Hyjainfoodproducts@gmail.com</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
