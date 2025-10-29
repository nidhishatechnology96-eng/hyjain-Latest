import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];

  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment successful! Thank you, ${form.name}`);
    navigate("/"); // Redirect to home after payment
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Checkout & Payment</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* Payment Form */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm p-4">
              <h5 className="mb-3">Payment Details</h5>
              <form onSubmit={handlePayment}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-control"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      className="form-control"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      className="form-control"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success w-100 mt-3">
                  Pay ₹{totalAmount}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <h5 className="mb-3">Order Summary</h5>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between fw-bold mt-3">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
