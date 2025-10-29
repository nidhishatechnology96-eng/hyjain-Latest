// src/components/AboutUs.jsx

import React from 'react';
import AboutSidebar from './AboutSidebar'; // Import the sidebar
import './AboutUs.css'; // Import the styles

function AboutUs() {
  return (
    <div className="container about-page-layout">
      <div className="row">
        {/* --- Left Column: Sidebar --- */}
        <div className="col-md-3">
          <AboutSidebar />
        </div>

        {/* --- Right Column: Main Content --- */}
        <div className="col-md-9">
          {/* Each section needs an ID that matches the href in the sidebar */}
          <section id="heritage" className="about-content-section">
            <h2>Our Heritage</h2>
            <p>
              Founded with a passion for purity and a commitment to quality, HYJAIN's journey began with a simple mission: to bring authentic, natural products to every family. Our roots are deeply embedded in sustainable farming practices and traditional methods that preserve the goodness of nature.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
            </p>
          </section>

          <section id="vision" className="about-content-section">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be the most trusted name in natural and dehydrated food products, recognized for our unwavering commitment to quality, sustainability, and customer well-being. We aim to innovate while honoring our heritage, making healthy living accessible to all.
            </p>
          </section>

          <section id="hyjain-today" className="about-content-section">
            <h2>HYJAIN Today</h2>
            <p>
              Today, HYJAIN stands as a testament to our founding principles. With a growing portfolio of products, a strong network of partner farms, and a loyal customer base, we continue to expand our reach while maintaining the highest standards of quality control and ethical sourcing.
            </p>
          </section>
          
          <section id="csr" className="about-content-section">
            <h2>Corporate Social Responsibility</h2>
            <p>
              We believe in giving back to the community and the planet. Our CSR initiatives focus on empowering local farming communities through fair trade practices, promoting water conservation, and reducing our carbon footprint with eco-friendly packaging.
            </p>
          </section>

          <section id="why-hyjain" className="about-content-section">
            <h2>Why HYJAIN</h2>
            <p>
              Choose HYJAIN for products that are 100% natural, free from artificial additives, and packed with nutrients. We offer transparency in our sourcing, rigorous quality checks, and a promise of authentic taste that brings the best of nature to your table.
            </p>
          </section>

          <section id="milestones" className="about-content-section">
            <h2>Milestones</h2>
            <p>
              From our humble beginnings to becoming a household name, our journey has been marked by significant milestones. These include expanding our product lines, receiving certifications for organic quality, and building lasting relationships with thousands of happy customers across the nation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;