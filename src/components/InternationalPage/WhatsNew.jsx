import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const newProductsUrl = 'https://images.pexels.com/photos/7615572/pexels-photo-7615572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const packagingUrl = 'https://images.pexels.com/photos/7794043/pexels-photo-7794043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const awardUrl = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

function WhatsNew() {
  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h1 className="display-5 fw-bold mb-4">What's New @ Hyjain</h1>
        
        {/* --- New Item 1: Product Launch --- */}
        <Row className="g-4 align-items-center mb-5 border-bottom pb-5">
            <Col md={5}>
                <img src={newProductsUrl} alt="New sun-dried fruits" className="img-fluid rounded-3 shadow-sm" />
            </Col>
            <Col md={7}>
                <h4 className="fw-bold text-success">Introducing Our Premium Sun-Dried Range</h4>
                <p className="text-muted">
                    Taste the sunshine! We are thrilled to launch our new line of premium sun-dried fruits, including sweet Mango Slices and tangy Pineapple Rings. Naturally preserved with no added sugar, they are the perfect healthy snack.
                </p>
            </Col>
        </Row>

        {/* --- New Item 2: Sustainability Initiative --- */}
        <Row className="g-4 align-items-center mb-5 border-bottom pb-5">
            <Col md={7} className="order-md-1">
                <h4 className="fw-bold text-success">Our New 100% Compostable Packaging</h4>
                <p className="text-muted">
                    As part of our commitment to sustainability, we've transitioned our entire spice range to new, 100% compostable packaging. Enjoy the same great taste while helping us protect the planet.
                </p>
            </Col>
            <Col md={5} className="order-md-2">
                <img src={packagingUrl} alt="Eco-friendly packaging" className="img-fluid rounded-3 shadow-sm" />
            </Col>
        </Row>
        
        {/* --- New Item 3: Event or Award --- */}
        <Row className="g-4 align-items-center">
            <Col md={5}>
                <img src={awardUrl} alt="Local farmers market" className="img-fluid rounded-3 shadow-sm" />
            </Col>
            <Col md={7}>
                <h4 className="fw-bold text-success">Hyjain Honored at the National Organic Expo</h4>
                <p className="text-muted">
                    We were proud to be recognized for our "Excellence in Sustainable Farming Partnerships" at the recent National Organic Expo. This award celebrates our commitment to empowering local farmers and promoting ethical agriculture.
                </p>
            </Col>
        </Row>

      </div>
    </Card.Body>
  );
}

export default WhatsNew;