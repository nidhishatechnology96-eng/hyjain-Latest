import React from 'react';
import './InfoPage.css';


function RefundPolicy() {
  return (
    <>
      <div className="policy-page-container">
        <h1>Refund Policy</h1>
        <p>Our goal at Hyjain is your complete satisfaction. While we do not accept returns on food products, we offer refunds under specific conditions.</p>
        <h2>Eligibility for a Refund:</h2>
        <ul>
          <li>The product was damaged during transit.</li>
          <li>You received an incorrect product.</li>
          <li>The product is past its expiration date upon arrival.</li>
        </ul>
        <h2>How to Request a Refund:</h2>
        <p>To request a refund, please contact our support team at hyjainfoodproducts@gmail.com within 48 hours of receiving your order. Please include your order number and clear photos of the product in question. Our team will review your request and process a full refund to your original payment method if the claim is validated.</p>
      </div>
  
    </>
  );
}

export default RefundPolicy;