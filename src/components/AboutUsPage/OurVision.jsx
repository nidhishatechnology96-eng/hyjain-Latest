import React from 'react';
import { Card } from 'react-bootstrap';
import { FaLeaf, FaGlobe, FaLightbulb } from 'react-icons/fa';

function OurVision() {
  const pillars = [
    { icon: <FaLeaf />, title: "Purity at the Core", text: "To set the global benchmark for purity and nutritional integrity. We envision a world where every family has access to food they can trust, free from artificial additives, with transparent farm-to-pantry sourcing." },
    { icon: <FaGlobe />, title: "A Sustainable Future", text: "To lead the industry in sustainable practices that nourish both people and the planet. We are committed to empowering our farming partners, minimizing our environmental footprint, and promoting a culture of conscious consumption." },
    { icon: <FaLightbulb />, title: "Innovation for Wellness", text: "To continuously push the boundaries of culinary convenience without sacrificing health. We see a future where our innovative techniques make nutritious, delicious meals a simple and joyful part of everyday life for everyone." },
  ];

  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h2 className="display-5 fw-bold mb-3">Our Vision</h2>
        <p className="lead text-muted mb-5">
          To be the most trusted name in natural food products, recognized for our unwavering commitment to quality, sustainability, and the well-being of our customers.
        </p>
        <div className="vision-pillars">
          {pillars.map(pillar => (
            <div className="d-flex align-items-start mb-5" key={pillar.title}>
              <div className="fs-1 text-success me-4 mt-1">{pillar.icon}</div>
              <div>
                <h4 className="fw-bold pillar">{pillar.title}</h4>
                <p className="text-muted mb-0">{pillar.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card.Body>
  );
}

export default OurVision;