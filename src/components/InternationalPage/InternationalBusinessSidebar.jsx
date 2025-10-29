import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaGlobe, FaBullhorn, FaEnvelope } from 'react-icons/fa';

function InternationalBusinessSidebar({ activeSection, onSectionChange }) {
  const navItems = [
    { key: 'business', icon: <FaGlobe className="me-2" />, text: 'International Business' },
    { key: 'get-in-touch', icon: <FaEnvelope className="me-2" />, text: 'Get In Touch' },
    { key: 'whats-new', icon: <FaBullhorn className="me-2" />, text: "What's New" },
  ];

  return (
    <div className="page-sidebar">
      <Nav variant="pills" className="flex-column">
        {navItems.map(item => (
          <Nav.Item key={item.key}>
            <Nav.Link 
              active={activeSection === item.key}
              onClick={(e) => { e.preventDefault(); onSectionChange(item.key); }}
              href={`#${item.key}`}
            >
              {item.icon} {item.text}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default InternationalBusinessSidebar;