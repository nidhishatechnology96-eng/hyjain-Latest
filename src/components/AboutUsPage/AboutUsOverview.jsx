import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

function AboutUsOverview({ onSectionChange }) {
  const cards = [
    { id: 'heritage', title: 'Our Heritage', text: 'Discover the roots of our passion for purity, passed down through generations.', img: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/4b/a5/91/i-am-not-taking-photos.jpg' },
    { id: 'vision', title: 'Our Vision', text: 'Learn about our mission to make healthy, natural living accessible and convenient for all.', img: 'https://5.imimg.com/data5/SELLER/Default/2022/8/CG/KB/PU/86964038/dsc08206-copy.jpg' },
    { id: 'today', title: 'Hyjain Today', text: 'See how our tradition has grown into a modern, global brand synonymous with quality.', img: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg' },
    { id: 'why', title: 'Why Hyjain', text: 'Understand our unwavering commitment to quality, transparency, and your well-being.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZakIZbHvt6e9nxUAi3qPijcjxm1LLa5KoOg&s' },
  ];

  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h2 className="display-5 fw-bold mb-3">About Hyjain</h2>
        <p className="lead text-muted mb-5">
          A business that brings quality and authenticity to your kitchen. An enterprise that blends modern innovation with time-honored traditions. This is the rich legacy of HYJAIN.
        </p>
        <Row xs={1} md={2} className="g-4">
          {cards.map(card => (
            <Col key={card.id}>
              <Card className="h-100 border-0 shadow-sm overview-card">
                <Card.Img variant="top" src={card.img} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="h4" className="fw-bold">{card.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">{card.text}</Card.Text>
                  <Button variant="link" className="p-0 read-more-btn align-self-start mt-auto" onClick={() => onSectionChange(card.id)}>
                    Read More →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Card.Body>
  );
}

export default AboutUsOverview;