import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function OurHeritage() {
  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h2 className="display-5 fw-bold mb-3">Our Heritage</h2>
        <p className="lead text-muted mb-5">
          From a family tradition of sun-drying harvests to a trusted global brand, our story is one of passion, purity, and perseverance.
        </p>
        <Row className="g-5 align-items-center">
          <Col md={5}>
            <img src="https://images.unsplash.com/photo-1727513936102-43f6af54a0d7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHZpbnRhZ2UlMjBmYXJtaW5nJTIwc2NlbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500" alt="Vintage farming scene" className="img-fluid rounded-3 heritage-image" />
          </Col>
          <Col md={7}>
            <h4 className="fw-bold text-success">A Legacy of Purity</h4>
            <p>
              The story of Hyjain began not in a boardroom, but in the sun-drenched fields of rural India. It's a family legacy rooted in the age-old wisdom of our grandparents, who believed that nature provides the best nourishment. They perfected the art of natural dehydration, using the sun's gentle warmth to preserve the harvest's goodness and lock in its authentic flavor.
            </p>
            <p>
              This deep-seated respect for nature and dedication to purity is the cornerstone of everything we do. We've scaled our operations with modern technology, but the soul of our process remains the same: to honor the ingredients and deliver food as it was meant to be.
            </p>
          </Col>
        </Row>
      </div>
    </Card.Body>
  );
}

export default OurHeritage;