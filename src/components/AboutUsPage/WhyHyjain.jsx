import React from 'react';
import { Card } from 'react-bootstrap';
import { FaSeedling, FaLightbulb, FaShieldAlt, FaHandshake } from 'react-icons/fa';

function WhyHyjain() {
  const points = [
    { icon: <FaSeedling />, title: "Purity in Every Particle", text: "Our direct partnerships with local farms ensure we source only the purest, non-GMO raw materials. Our minimal processing techniques are designed to lock in natural nutrients and authentic flavors." },
    { icon: <FaLightbulb />, title: "Innovation-Led Convenience", text: "We expertly blend tradition with modern technology to make healthy eating effortless. Our advanced dehydration processes provide convenience without compromising on quality." },
    { icon: <FaShieldAlt />, title: "Uncompromising Quality & Safety", text: "Your family's well-being is our highest priority. Our facilities are certified with global food safety standards (FSSAI, ISO, HACCP), maintaining rigorous quality control at every step." },
    { icon: <FaHandshake />, title: "A Foundation of Trust", text: "We are committed to complete transparency in everything we do. When you choose Hyjain, you're choosing a partner dedicated to ethical practices and your personal health journey." }
  ];

  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h2 className="display-5 fw-bold mb-3">Why Hyjain</h2>
        <p className="lead text-muted mb-5">
          Choosing Hyjain means choosing a promise—a promise of purity, quality, and unwavering trust that sets us apart.
        </p>
        <div>
          {points.map(point => (
            <div className="d-flex align-items-start mb-5" key={point.title}>
              <div className="point-icon flex-shrink-0 me-4 mt-1">
                {point.icon}
              </div>
              <div>
                <h4 className="fw-bold">{point.title}</h4>
                <p className="text-muted mb-0">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card.Body>
  );
}

export default WhyHyjain;