import React from 'react';
import { Card } from 'react-bootstrap';
import { FaRegFlag, FaIndustry, FaCertificate, FaGlobeAmericas, FaLeaf, FaAward, FaUsers } from 'react-icons/fa';

function Milestones() {
  const timeline = [
    { year: "1985", event: "The Journey Begins. The founding family begins perfecting traditional sun-drying techniques, laying the groundwork for the Hyjain promise of purity.", icon: <FaRegFlag /> },
    { year: "1998", event: "First Commercial Unit Established. Hyjain Foods is officially incorporated, moving from a family tradition to a formal enterprise.", icon: <FaIndustry /> },
    { year: "2005", event: "Achieved ISO 9001 Certification. A major step in our commitment to quality, ensuring our processes meet stringent international standards.", icon: <FaCertificate /> },
    { year: "2012", event: "First International Export. Hyjain products reach global shelves for the first time with our inaugural shipment to the Middle East.", icon: <FaGlobeAmericas /> },
    { year: "2018", event: "Launch of Organic Range. Responding to global wellness trends, we introduced our first dedicated line of certified organic products.", icon: <FaLeaf /> },
    { year: "2022", event: "National Sustainability Award. Recognized for our 'Excellence in Sustainable Farming Partnerships,' celebrating our commitment to farmers.", icon: <FaAward /> },
    { year: "Today", event: "A Trusted Global Presence. Serving over 10,000+ happy homes across 15 countries with a portfolio of 50+ quality products.", icon: <FaUsers /> }
  ];

  return (
    <Card.Body className="p-4 p-md-5">
      <div className="animate-children">
        <h2 className="display-5 fw-bold mb-3">Our Milestones</h2>
        <p className="lead text-muted mb-5">
          A journey of growth, innovation, and unwavering commitment to quality.
        </p>

        <div className="milestones-timeline ps-5">
          {timeline.map((item, index) => (
            <div className="milestone-item ps-4" key={index}>
              <div className="milestone-icon">{item.icon}</div>
              <h4 className="fw-bold text-success pt-2">{item.year}</h4>
              <p className="text-muted">{item.event}</p>
            </div>
          ))}
        </div>
      </div>
    </Card.Body>
  );
}

export default Milestones;