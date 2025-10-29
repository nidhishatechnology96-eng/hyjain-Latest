import React from 'react';
import './InfoPage.css';

function PrivacyPolicy() {
  return (
    <>
      {/* 👇 ADD the "animate-content" class here */}
      <div className="policy-page-container animate-content">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. It is Hyjain's policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you, and we collect it by fair and lawful means, with your knowledge and consent.</p>
        
        <h2>Information We Collect</h2>
        <p>We may collect personal information such as your name, email address, shipping address, and phone number when you place an order or subscribe to our newsletter. This information is used solely for order fulfillment and communication purposes.</p>
        
        <h2>How We Use Your Information</h2>
        <p>We use your information to process transactions, deliver products, and send periodic emails regarding your order or other products and services. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
      </div>
    </>
  );
}

export default PrivacyPolicy;