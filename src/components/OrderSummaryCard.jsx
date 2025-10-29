import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function OrderSummaryCard() {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return null; // Don't show anything if the cart is empty
  }

  // --- Calculations ---
  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
      <div className="card-body p-4">
        <h4 className="card-title mb-4">Order Summary</h4>
        {cart.map(item => (
          <div key={item.id} className="d-flex justify-content-between mb-2">
            <span>{item.name} x {item.quantity || 1}</span>
            <span>₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Subtotal:</span>
          <strong>₹{subtotal.toFixed(2)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Shipping:</span>
          <strong>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</strong>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Tax (5%):</span>
          <strong>₹{tax.toFixed(2)}</strong>
        </div>
        <hr />
        <div className="d-flex justify-content-between h5">
          <span>Total:</span>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
  
}

export default OrderSummaryCard;