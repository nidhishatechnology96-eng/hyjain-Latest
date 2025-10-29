import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaUsers, FaRecycle, FaHandHoldingHeart } from 'react-icons/fa';

function CorporateSocialResponsibility() {
  const pillars = [
    { icon: <FaUsers />, title: "Farmer Empowerment", text: "We ensure fair pricing and provide training in sustainable agriculture, uplifting our network of farming communities and creating long-term, mutually beneficial partnerships." },
    { icon: <FaRecycle />, title: "Environmental Stewardship", text: "From water conservation at our facilities to promoting organic farming and investing in 100% compostable packaging, we are dedicated to minimizing our ecological footprint." },
    { icon: <FaHandHoldingHeart />, title: "Community Nutrition", text: "We partner with local NGOs to run nutrition awareness programs and provide wholesome meals to underprivileged children, sharing the goodness of Hyjain with those who need it most." },
  ];

  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h2 className="display-5 fw-bold mb-3">Corporate Social Responsibility</h2>
        <p className="lead text-muted mb-5">
          We believe in growing together. Our commitment extends beyond our products to the communities we serve and the planet we share.
        </p>
        <Row className="g-4">
          {pillars.map(pillar => (
            <Col md={4} key={pillar.title}>
              <div className="csr-item p-4 h-100 rounded-3 shadow-sm">
                <div className="point-icon-vertical d-inline-flex mb-3 fs-2">{pillar.icon}</div>
                <h4 className="fw-bold">{pillar.title}</h4>
                <p className="text-muted mb-0">{pillar.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Card.Body>
  );
}

export default CorporateSocialResponsibility;