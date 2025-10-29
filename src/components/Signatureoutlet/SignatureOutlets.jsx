import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './SignatureOutlets.css'; // <-- Correctly imports its OWN CSS


// Placeholder images for the outlets
const outletImage1 = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop';
const outletImage2 = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1974&auto=format&fit=crop';
const outletImage3 = 'https://images.unsplash.com/photo-1662920390934-3687e7e5f4b0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function SignatureOutlets() {
  return (
    <div className="signature-outlets-page">
      <Container>
        <h2>Our Signature Outlets</h2>
        <p className="intro-text">
          Experience the authentic taste of HYJAIN at our signature outlets. Each location is designed to offer a warm, welcoming atmosphere where you can enjoy our products at their freshest.
        </p>

        <Row xs={1} md={2} lg={3} className="g-4">
          <Col>
            <Card className="outlet-card h-100">
              <Card.Img variant="top" src={outletImage1} />
              <Card.Body>
                <Card.Title>HYJAIN Flagship Store - Mumbai</Card.Title>
                <Card.Text>
                  Our premier location in the heart of the city. Explore our full range of products and enjoy exclusive in-store tasting events.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">123 Market Street, Colaba</small>
              </Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card className="outlet-card h-100">
              <Card.Img variant="top" src={outletImage2} />
              <Card.Body>
                <Card.Title>HYJAIN Café - Bangalore</Card.Title>
                <Card.Text>
                  A cozy café where our dehydrated ingredients are transformed into delicious, healthy meals. The perfect spot for a nutritious lunch.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">456 Tech Park Avenue, Koramangala</small>
              </Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card className="outlet-card h-100">
              <Card.Img variant="top" src={outletImage3} />
              <Card.Body>
                <Card.Title>HYJAIN Express - Delhi</Card.Title>
                <Card.Text>
                  Our grab-and-go outlet for the busy city dweller. Pick up your favorite HYJAIN products and healthy snacks on the move.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">789 Connaught Place, Central Delhi</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
     
    </div>
    
    
  );
}

export default SignatureOutlets;