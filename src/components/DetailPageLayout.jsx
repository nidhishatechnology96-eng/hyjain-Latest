// src/components/DetailPageLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './DetailPageLayout.css'; // We will create this CSS file next
import 'bootstrap-icons/font/bootstrap-icons.css';

function DetailPageLayout({ title, image, children }) {
  return (
    <div className="detail-page">
      <header className="detail-header" style={{ backgroundImage: `url(${image})` }}>
        <div className="detail-header-overlay">
          <h1>{title}</h1>
        </div>
      </header>
      <div className="container detail-content-container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {children}
            <div className="detail-back-link-container">
              <Link to="/people" className="detail-back-link">
                <i className="bi bi-arrow-left-circle me-2"></i>Back to Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPageLayout;