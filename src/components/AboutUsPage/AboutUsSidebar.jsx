import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaInfoCircle, FaSeedling, FaBullseye, FaBuilding, FaHeart, FaThumbsUp, FaTrophy, FaBoxOpen } from 'react-icons/fa';

function AboutUsSidebar({ activeSection, onSectionChange }) {
  const sidebarLinks = [
    { id: 'about', text: 'About Us', icon: <FaInfoCircle className="me-3" /> },
    { id: 'heritage', text: 'Our Heritage', icon: <FaSeedling className="me-3" /> },
    { id: 'vision', text: 'Our Vision', icon: <FaBullseye className="me-3" /> },
    { id: 'today', text: 'Hyjain Today', icon: <FaBuilding className="me-3" /> },
    { id: 'csr', text: 'CSR', icon: <FaHeart className="me-3" /> },
    { id: 'why', text: 'Why Hyjain', icon: <FaThumbsUp className="me-3" /> },
    { id: 'milestones', text: 'Milestones', icon: <FaTrophy className="me-3" /> },
  ];

  return (
    <div className="page-sidebar sticky-top" style={{ top: '100px' }}>
      <Nav variant="pills" className="flex-column">
        {sidebarLinks.map(link => (
          <Nav.Item key={link.id} className="mb-2">
            <Nav.Link 
              active={activeSection === link.id} 
              onClick={(e) => { e.preventDefault(); onSectionChange(link.id); }}
              href={`#${link.id}`}
            >
              {link.icon} {link.text}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default AboutUsSidebar;