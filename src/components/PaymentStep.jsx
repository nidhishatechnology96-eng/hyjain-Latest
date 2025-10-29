import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function PaymentStep({ onPaymentSubmit, onBack, isProcessing, error }) {
    const [selectedMethod, setSelectedMethod] = useState('cod');
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });
    const [upiId, setUpiId] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Handler for card input changes
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };
    
    // --- VALIDATION LOGIC ---
    const validate = () => {
        const newErrors = {};
        if (selectedMethod === 'card') {
            if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) newErrors.number = 'Enter a valid 16-digit card number.';
            if (!cardDetails.name.trim()) newErrors.name = 'Name on card is required.';
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) newErrors.expiry = 'Enter expiry date as MM/YY.';
            if (!/^\d{3,4}$/.test(cardDetails.cvc)) newErrors.cvc = 'Enter a valid CVC.';
        }
        if (selectedMethod === 'upi') {
            if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId)) newErrors.upiId = 'Enter a valid UPI ID (e.g., yourname@bank).';
        }
        return newErrors;
    };

    // --- SUBMISSION LOGIC ---
    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return; // Stop submission if there are errors
        }

        let paymentInfo = { method: 'Cash on Delivery', details: "To be paid upon delivery." };
        if (selectedMethod === 'card') {
            // IMPORTANT: In a real app, you would use a payment gateway (Stripe, Razorpay)
            // and would NOT handle or store full card details yourself for security reasons.
            // We are only storing the last 4 digits as an example.
            paymentInfo = { 
                method: 'Credit or Debit Card', 
                details: { cardLast4: cardDetails.number.slice(-4) } 
            };
        } else if (selectedMethod === 'upi') {
            paymentInfo = { 
                method: 'UPI / Net Banking', 
                details: { upiId } 
            };
        }
        onPaymentSubmit(paymentInfo); // Send validated info to CheckoutFlow
    };

    return (
        <div className="card shadow-sm p-4 p-md-5 border-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="mb-4 text-center fw-light">Select Payment Method</h3>
            
            <div className="list-group list-group-flush mb-4">
                {['card', 'upi', 'cod'].map(method => (
                    <label key={method} className="list-group-item list-group-item-action d-flex align-items-center p-3">
                        <input 
                            className="form-check-input me-3" 
                            type="radio" 
                            name="paymentMethod" 
                            value={method}
                            checked={selectedMethod === method}
                            onChange={() => { setSelectedMethod(method); setFormErrors({}); }}
                        />
                        <i className={`bi ${method === 'card' ? 'bi-credit-card-fill' : method === 'upi' ? 'bi-qr-code' : 'bi-truck'} me-2 text-primary fs-5`}></i>
                        <span>
                            {method === 'card' ? 'Credit or Debit Card' : method === 'upi' ? 'UPI / Net Banking' : 'Cash on Delivery'}
                        </span>
                    </label>
                ))}
            </div>

            {/* --- DYNAMIC CREDIT CARD FORM --- */}
            {selectedMethod === 'card' && (
                <div className="p-3 bg-light rounded border mb-3">
                    <div className="mb-3">
                        <label className="form-label small">Card Number</label>
                        <input type="text" name="number" value={cardDetails.number} onChange={handleCardChange} className={`form-control ${formErrors.number ? 'is-invalid' : ''}`} placeholder="•••• •••• •••• ••••" />
                        {formErrors.number && <div className="invalid-feedback">{formErrors.number}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label small">Name on Card</label>
                        <input type="text" name="name" value={cardDetails.name} onChange={handleCardChange} className={`form-control ${formErrors.name ? 'is-invalid' : ''}`} placeholder="John Doe" />
                        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label small">Expiry (MM/YY)</label>
                            <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} className={`form-control ${formErrors.expiry ? 'is-invalid' : ''}`} placeholder="MM/YY" />
                            {formErrors.expiry && <div className="invalid-feedback">{formErrors.expiry}</div>}
                        </div>
                        <div className="col-6">
                            <label className="form-label small">CVC</label>
                            <input type="text" name="cvc" value={cardDetails.cvc} onChange={handleCardChange} className={`form-control ${formErrors.cvc ? 'is-invalid' : ''}`} placeholder="123" />
                            {formErrors.cvc && <div className="invalid-feedback">{formErrors.cvc}</div>}
                        </div>
                    </div>
                </div>
            )}

            {/* --- DYNAMIC UPI FORM --- */}
            {selectedMethod === 'upi' && (
                <div className="p-3 bg-light rounded border mb-3">
                    <div className="mb-3">
                        <label className="form-label small">Enter UPI ID</label>
                         <input type="text" value={upiId} onChange={(e) => {setUpiId(e.target.value); if(formErrors.upiId) setFormErrors({});}} className={`form-control ${formErrors.upiId ? 'is-invalid' : ''}`} placeholder="yourname@bank" />
                         {formErrors.upiId && <div className="invalid-feedback">{formErrors.upiId}</div>}
                    </div>
                    <div className="text-center">
                        <p className="text-muted small my-2">OR</p>
                        <h6>Scan to Pay</h6>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=your-upi-id@okhdfcbank" alt="UPI QR Code" />
                    </div>
                </div>
            )}
            
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="d-flex flex-column-reverse flex-sm-row justify-content-between gap-3 mt-4">
                <button type="button" className="btn btn-outline-secondary w-100" onClick={onBack} disabled={isProcessing}>
                    <i className="bi bi-arrow-left me-1"></i>Back to Address
                </button>
                <button className="btn btn-primary btn-lg w-100" onClick={handleSubmit} disabled={isProcessing}>
                    {isProcessing ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Placing Order...</>
                    ) : (
                       'Place Order'
                    )}
                </button>
            </div>
        </div>
    );
}

export default PaymentStep;