import React from 'react';
import './InfoPage.css';


function Payments() {
  return (
    <>
      <div className="policy-page-container">
        <h1>Payment Methods</h1>
        <p>We offer a variety of secure payment options to ensure a smooth checkout experience. All transactions are encrypted and processed through a secure payment gateway.</p>
        <h2>Accepted Payment Methods:</h2>
        <ul>
          <li>Credit Cards (Visa, MasterCard, American Express)</li>
          <li>Debit Cards</li>
          <li>Net Banking</li>
          <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
          <li>Popular Wallets</li>
        </ul>
        <p>We do not currently offer a Cash on Delivery (COD) option. All orders must be paid for at the time of checkout.</p>
      </div>
      
    </>
  );
}

export default Payments;