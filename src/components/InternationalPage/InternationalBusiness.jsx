import React from 'react';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaCertificate, FaShippingFast, FaBoxOpen, FaUsers } from 'react-icons/fa';

const bannerImageUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop';

// ✅ Receive the 'onEnquireNow' prop here
function InternationalBusiness({ onEnquireNow }) {
  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h1 className="display-5 fw-bold mb-3">International Business</h1>
        <img src={bannerImageUrl} alt="Global produce" className="content-banner mb-4 rounded-3 shadow-sm" />
        <h3 className="fw-semibold text-success">Sharing the Authentic Taste of India with the World.</h3>
        <p className="lead text-muted">
          Hyjain Products has established a significant global presence, bringing our wide range of pure, natural products to kitchens in the USA, Canada, UK, Germany, Australia, New Zealand, the Middle East, and Southeast Asia.
        </p>
        <hr className="my-4" />

        {/* --- Key Strengths Section --- */}
        <h4 className="fw-bold mb-4">Our Global Strengths</h4>
        <Row className="g-4 mb-4">
          <Col md={6} className="d-flex">
            <FaCertificate className="fs-2 text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Quality & Certification</h5>
              <p className="text-muted mb-0">Our facilities are ISO, HACCP, and FSSAI certified, meeting stringent international quality standards for food safety and excellence.</p>
            </div>
          </Col>
          <Col md={6} className="d-flex">
            <FaShippingFast className="fs-2 text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Robust Supply Chain</h5>
              <p className="text-muted mb-0">We manage a seamless farm-to-port logistics network, ensuring timely delivery and preserving the freshness of our products across continents.</p>
            </div>
          </Col>
          <Col md={6} className="d-flex">
            <FaBoxOpen className="fs-2 text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Export-Grade Packaging</h5>
              <p className="text-muted mb-0">Our products are packed in durable, multi-layered, food-safe materials to maintain freshness, aroma, and quality during long transit times.</p>
            </div>
          </Col>
          <Col md={6} className="d-flex">
            <FaUsers className="fs-2 text-success me-3 mt-1" />
            <div>
              <h5 className="fw-bold">Custom & Private Labeling</h5>
              <p className="text-muted mb-0">We offer flexible OEM and private labeling solutions, allowing our global partners to market our quality products under their own brand.</p>
            </div>
          </Col>
        </Row>

        {/* --- Export Range Section --- */}
        <h4 className="fw-bold mb-3">Our Export Range</h4>
        <ListGroup variant="flush">
          <ListGroup.Item><b>Dehydrated Vegetables:</b> Onion, Garlic, Ginger, Potato, and more.</ListGroup.Item>
          <ListGroup.Item><b>Dehydrated Fruits:</b> Mango, Banana, Papaya, and Pineapple slices/powders.</ListGroup.Item>
          <ListGroup.Item><b>Indian Spices:</b> Turmeric, Red Chilli, Cumin, Coriander, and custom blends.</ListGroup.Item>
          <ListGroup.Item><b>Specialty Flours:</b> Millet Flours, Chickpea Flour, and other gluten-free alternatives.</ListGroup.Item>
        </ListGroup>

        {/* --- Call to Action --- */}
        <div className="bg-light p-4 mt-5 rounded-3 text-center ">
            <h2 className="fw-bold">Become a Global Partner</h2>
            <p className="text-muted mx-auto" style={{maxWidth: '500px'}}>Join us in our mission to bring pure and healthy food to the world. We are looking for distributors and partners.</p>
            {/* ✅ Add the onClick handler here to trigger the section change */}
            <Button variant="success" size="lg" onClick={() => onEnquireNow('get-in-touch')}>
              Enquire Now
            </Button>
        </div>

      </div>
    </Card.Body>
  );
}

export default InternationalBusiness;