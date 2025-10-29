// HyjainToday.jsx (Corrected)

import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer'; // <-- ADD THIS LINE

// A simple hook to animate numbers
const useCountUp = (end, duration) => {
  const [count, setCount] = useState(0);
  // This 'useInView' call will now work correctly
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    if (inView) {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * progress);
        setCount(currentCount > end ? end : currentCount); // Ensure it doesn't exceed the end value

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameRate);

      // Cleanup function to clear interval if component unmounts
      return () => clearInterval(counter);
    }
  }, [inView, end, duration, totalFrames, frameRate]);

  return { count, ref };
};

function HyjainToday() {
  const products = useCountUp(50, 1500);
  const farms = useCountUp(500, 1500);
  const homes = useCountUp(10000, 2000); // Increased duration for a larger number

  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children content-section">
        <h2 className="display-5 fw-bold mb-3">Hyjain Today</h2>
        <p className="lead text-muted mb-5">
          A global brand built on a foundation of tradition and trust, now serving kitchens across the world.
        </p>
        <Row className="g-5 align-items-center">
            <Col lg={7}>
                <p>
                    While our history is rooted in tradition, Hyjain stands tall today as a modern, global brand synonymous with quality and purity. Our state-of-the-art facilities, certified with FSSAI, ISO, and HACCP standards, ensure that every product meets rigorous international safety and quality checks.
                </p>
                <p>
                    From a local enterprise, we have grown into a trusted name in over 15 countries. Our innovation labs constantly explore new ways to make healthy living more convenient, pioneering new dehydration techniques while staying true to our promise: pure, natural, and full of goodness.
                </p>
            </Col>
            <Col lg={5}>
                <img src="https://images.pexels.com/photos/3762283/pexels-photo-3762283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Modern food processing facility" className="img-fluid rounded-3 heritage-image" />
            </Col>
        </Row>
        <hr className="my-5" />
        <h3 className="text-center fw-bold mb-4">Facts & Figures</h3>
        <Row className="text-center g-4">
            <Col md={4}>
                <div ref={products.ref}><h2 className="display-4 fw-bold" style={{color: 'var(--primary-green)'}}>{products.count}+</h2><p className="text-muted">Quality Products</p></div>
            </Col>
            <Col md={4}>
                <div ref={farms.ref}><h2 className="display-4 fw-bold" style={{color: 'var(--primary-green)'}}>{farms.count}+</h2><p className="text-muted">Partner Farms</p></div>
            </Col>
            <Col md={4}>
                 <div ref={homes.ref}><h2 className="display-4 fw-bold" style={{color: 'var(--primary-green)'}}>{homes.count.toLocaleString()}+</h2><p className="text-muted">Happy Homes Served</p></div>
            </Col>
        </Row>
      </div>
    </Card.Body>
  );
}

export default HyjainToday;