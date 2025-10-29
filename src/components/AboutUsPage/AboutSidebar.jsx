// src/components/AboutSidebar.jsx

import React from 'react';

function AboutSidebar() {
  const sidebarLinks = [
    { href: '#heritage', text: 'Our Heritage' },
    { href: '#vision', text: 'Our Vision' },
    { href: '#hyjain-today', text: 'HYJAIN Today' },
    { href: '#csr', text: 'Corporate Social Responsibility' },
    { href: '#why-hyjain', text: 'Why HYJAIN' },
    { href: '#milestones', text: 'Milestones' },
  ];

  return (
    <div className="about-sidebar">
      <h5 className="sidebar-title">About Us</h5>
      <ul className="sidebar-nav">
        {sidebarLinks.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.text}</a>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutSidebar;