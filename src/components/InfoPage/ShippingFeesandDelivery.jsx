import React from 'react';
import './InfoPage.css';


function ShippingFeesandDelivery(){
  return (
    <>
      <div className="policy-page-container">
        <h1>Shipping & Delivery</h1>
        <h2>Shipping Fees</h2>
        <p>Shipping fees are calculated based on the total weight of your order and your delivery location. The final shipping cost will be displayed at checkout before you complete your payment.</p>
        
        <h2>Delivery Times</h2>
        <p>We are committed to delivering your Hyjain products as quickly as possible. Orders are typically processed within 1-2 business days.</p>
        <ul>
          <li><strong>Metro Cities:</strong> 3-5 business days</li>
          <li><strong>Other Cities:</strong> 5-7 business days</li>
        </ul>
        <p>You will receive a shipping confirmation email with a tracking number once your order has been dispatched.</p>
      </div>
      
    </>
  );
}

export default ShippingFeesandDelivery;