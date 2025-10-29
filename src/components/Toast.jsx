// src/components/Toast.jsx

import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const iconMap = {
    success: 'bi-check-circle-fill',
    error: 'bi-exclamation-triangle-fill',
  };

  const alertClass = `alert-${type}`;
  const iconClass = iconMap[type] || 'bi-info-circle-fill';

  return (
    <div 
      className={`toast show position-fixed top-0 end-0 m-3 shadow-lg ${alertClass}`} 
      role="alert" 
      style={{ zIndex: 1100 }}
    >
      <div className="d-flex align-items-center p-2">
        <i className={`bi ${iconClass} fs-4 me-2`}></i>
        <div className="toast-body fw-bold">
          {message}
        </div>
        <button 
          type="button" 
          className="btn-close me-2 m-auto" 
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Toast;