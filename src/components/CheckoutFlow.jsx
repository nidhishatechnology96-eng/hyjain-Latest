import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressStep from './Address/AddressStep';
import PaymentStep from './PaymentStep';
import OrderSummaryCard from './OrderSummaryCard';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { AdminContext } from '../AdminPanel/AdminContext';
import { serverTimestamp } from 'firebase/firestore';

function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const { cart, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const { addOrder } = useContext(AdminContext);
  const navigate = useNavigate();

  if (cart.length === 0 && !isProcessing) {
    navigate('/shop');
    return null;
  }
  
  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0) * 1.05 + (cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0) > 500 ? 0 : 50);

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setStep(2);
  };

  const handlePaymentSubmit = async (paymentInfo) => {
    setIsProcessing(true);
    setError('');

    const orderData = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      cart,
      total: parseFloat(total.toFixed(2)),
      shippingAddress,
      paymentInfo,
      status: 'Pending',
      createdAt: serverTimestamp(),
      reviewedProducts: []
    };

    try {
      const orderId = await addOrder(orderData); 
      clearCart();
      navigate(`/order-confirmation/${orderId}`); 
    } catch (err) {
      setError("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <div className="row">
        <div className="col-lg-7">
          {step === 1 && <AddressStep onAddressSubmit={handleAddressSubmit} />}
          {/* ✅ UPDATED: Pass the 'total' to PaymentStep as the cartTotal prop */}
          {step === 2 && <PaymentStep cartTotal={total} onPaymentSubmit={handlePaymentSubmit} onBack={handleBack} isProcessing={isProcessing} error={error} />}
        </div>
        <div className="col-lg-5">
            <div className="mt-4 mt-lg-0">
                 <OrderSummaryCard />
            </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutFlow;