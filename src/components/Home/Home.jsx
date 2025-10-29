import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AdminContext } from "../../AdminPanel/AdminContext";
import { CartContext } from "../../context/CartContext";
import "./Home.css";
import vegCategoryImg from '../../assets/veg.jpg';
import fruitCategoryImg from '../../assets/Fruits.jpg';
import spicesCategoryImg from '../../assets/spices.jpg';
import waterCategoryImg from '../../assets/water.png';
import heroVideo from "../../assets/hero-video.mp4";
import hyjainPdf from '../Home/hyjain.pdf';

const useScrollAnimation = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { threshold: 0.1 });
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));
        return () => elements.forEach(el => observer.unobserve(el));
    }, []);
};

function Home() {
  const { products } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  useScrollAnimation();

  const categories = [
    { name: "Dehydrated Vegetables", img: vegCategoryImg, linkState: "Dehydrated Vegetables" },
    { name: "Dehydrated Fruits", img: fruitCategoryImg, linkState: "Dehydrated Fruits" },
    { name: "Authentic Spices", img: spicesCategoryImg, linkState: "Spices" },
    { name: "Mineral Water", img: waterCategoryImg, linkState: "Water Bottles" }
  ];

  const teamMembers = [
    { name: "Suresh Kumar", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/11.jpg", bio: "With a vision for a healthier India, Suresh founded HYJAIN to bring pure, natural food to every household." },
    { name: "Priya Sharma", role: "Head of Quality Control", img: "https://randomuser.me/api/portraits/women/12.jpg", bio: "Priya's meticulous standards ensure every product meets the highest levels of purity and quality." },
    { name: "Amit Patel", role: "Farming Operations Lead", img: "https://randomuser.me/api/portraits/men/14.jpg", bio: "Amit works with our partner farms, championing sustainable agriculture and ensuring the finest produce." },
    { name: "Sunita Reddy", role: "Customer Relations", img: "https://randomuser.me/api/portraits/women/15.jpg", bio: "Sunita is dedicated to ensuring a delightful experience and building lasting relationships with our community." }
  ];
  
  return (
    <div className="home-page">
      <div className="animated-background"></div>
      <div className="page-content">
        <header className="hero-section">
          <video className="hero-video" autoPlay loop muted playsInline key={heroVideo}>
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content text-center text-white">
            <h1 className="display-2 fw-bolder animate-on-scroll fade-in-down">Pure. Fresh. HYJAIN.</h1>
            <p className="lead mt-3 fs-4 animate-on-scroll fade-in-down" style={{animationDelay: '0.3s'}}>
              Bringing the essence of nature, from our farms to your family.
            </p>
            <Link to="/shop" className="btn btn-gradient-primary btn-lg mt-4 fw-bold animate-on-scroll fade-in-up" style={{animationDelay: '0.6s'}}>
              Explore Our Collection
            </Link>
          </div>
        </header>

        <main>
          <section className="story-section py-5 my-5">
            <div className="container">
              <div className="row align-items-center g-5">
                <div className="col-lg-6 animate-on-scroll slide-in-left">
                  <div className="story-image-wrapper">
                    <img src={fruitCategoryImg} className="img-fluid rounded-4 shadow-lg" alt="HYJAIN farms and produce" />
                  </div>
                </div>
                <div className="col-lg-6 animate-on-scroll slide-in-right">
                  <span className="badge-hyjain">Our Story</span>
                  <h2 className="display-4 fw-bold mt-3 mb-2">From Farms To <span style={{ color: '#973726ff' }}>Family.</span></h2>
                  <p className="text-muted lead mb-3">Purity, tradition and taste—kept intact with modern care.</p>
                  <div className="story-divider my-4"></div>
                  <p className="text-secondary mb-4">
                    Born from a simple idea—everyone deserves access to pure, natural food. We work directly with local farmers and use careful dehydration processes to lock in nutrients and flavour without additives.
                  </p>
                  <ul className="story-checklist mb-4">
                    <li><i className="bi bi-check-circle-fill"></i> Direct farm partnerships</li>
                    <li><i className="bi bi-check-circle-fill"></i> Clean processing, no harmful additives</li>
                    <li><i className="bi bi-check-circle-fill"></i> Consistent quality and authentic taste</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="container my-5 py-5">
            <div className="text-center mb-5 animate-on-scroll fade-in">
              <h2 className="display-5 fw-bold">Why Choose <span style={{ color: '#086600ff' }}>HYJAIN?</span></h2>
              <p className="text-muted mt-2 fs-5">Quality and trust, delivered.</p>
            </div>
            <div className="row text-center g-4">
              <div className="col-lg-4 col-md-6 animate-on-scroll fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="feature-card quality-card h-100 p-4">
                  <div className="feature-icon-wrapper quality-icon"><i className="bi bi-patch-check-fill"></i></div>
                  <h4 className="fw-bold">Quality Assured</h4>
                  <p className="text-muted">Rigorously tested products sourced from the finest farms to ensure premium quality.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-on-scroll fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="feature-card delivery-card h-100 p-4">
                  <div className="feature-icon-wrapper delivery-icon"><i className="bi bi-truck"></i></div>
                  <h4 className="fw-bold">Fast Delivery</h4>
                  <p className="text-muted">Your orders are delivered fresh and on time, every single time, maintaining product integrity.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-on-scroll fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="feature-card organic-card h-100 p-4">
                  <div className="feature-icon-wrapper organic-icon"><i className="bi bi-award-fill"></i></div>
                  <h4 className="fw-bold">Organic & Fresh</h4>
                  <p className="text-muted">We prioritize 100% organic and naturally grown produce for a healthier you.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 bg-light-gradient">
            <div className="container">
              <div className="text-center mb-5 animate-on-scroll fade-in">
                <h2 className="display-5 fw-bold">Explore Our <span style={{ color: '#e45300ff' }}>Categories</span></h2>
                <p className="text-muted mt-2 fs-5">A world of natural flavors awaits.</p>
              </div>
              <div className="row g-4">
                {categories.map((category, index) => (
                  <div key={index} className="col-md-6 col-lg-3 animate-on-scroll fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                    <Link to="/shop" state={{ category: category.linkState }} className="text-decoration-none">
                      <div className="category-wrapper">
                        <div className="category-card">
                          <img src={category.img} alt={category.name} className="category-img"/>
                          <div className="category-overlay">
                            <h4 className="category-title">{category.name}</h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="commitment-section py-5 my-5">
              <div className="container">
                <div className="text-center mb-5 animate-on-scroll fade-in">
                    <h2 className="display-5 fw-bold">Our <span style={{ color: '#943894ff' }}>Commitment</span></h2>
                    <p className="text-muted mt-2 fs-5">Beyond products, we believe in principles.</p>
                </div>
                <div className="row g-4">
                    <div className="Sustainability col-lg-4 animate-on-scroll fade-in-up" style={{animationDelay: '0.1s'}}>
                        <div className=" commitment-card p-4 h-100 text-center"><div className="commitment-icon text-success mb-3"><i className="bi bi-tree-fill"></i></div><h4 className="fw-bold">Sustainability</h4><p className="text-muted">From eco-friendly packaging to supporting sustainable farming, we are dedicated to protecting our planet.</p></div>
                    </div>
                    <div className="Community col-lg-4 animate-on-scroll fade-in-up" style={{animationDelay: '0.3s'}}>
                        <div className="commitment-card p-4 h-100 text-center"><div className="commitment-icon text-primary mb-3"><i className="bi bi-people-fill"></i></div><h4 className="fw-bold">Community</h4><p className="text-muted">We empower local farming communities by ensuring fair prices and fostering long-term partnerships.</p></div>
                    </div>
                    <div className="Health col-lg-4 animate-on-scroll fade-in-up" style={{animationDelay: '0.5s'}}>
                        <div className="commitment-card p-4 h-100 text-center"><div className="commitment-icon text-danger mb-3"><i className="bi bi-heart-fill"></i></div><h4 className="fw-bold">Health & Purity</h4><p className="text-muted">Your well-being is our priority. We guarantee products free from artificial additives and preservatives.</p></div>
                    </div>
                </div>
              </div>
          </section>

          <section className="container my-5 py-5 text-center">
            <div className="animate-on-scroll fade-in">
                <h2 className="fw-bold text-success mb-3">GST Revision Pricing Update - Hyjain</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: '800px' }}>
                    We welcome the recently announced NextGen GST reform and believe that it will truly benefit the entire nation. In line with our commitment, we will be passing on this benefit through revised, lower MRPs on the applicable product range, effective 22nd September 2025. Please click on the link to access the complete pricing list.
                </p>
                <a href={hyjainPdf} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg fw-bold px-5 mt-4">
                    Complete List of Reduced Pricing
                </a>
            </div>
          </section>

          <section className="py-5 bg-light-gradient">
            <div className="container">
              <div className="text-center mb-5 animate-on-scroll fade-in">
                <h2 className="display-5 fw-bold">Meet Our <span style={{ color: '#cfa048ff' }}>Team</span></h2>
                <p className="text-muted mt-2 fs-5">The passionate individuals behind our quality.</p>
              </div>
              <div className="row g-5 justify-content-center">
                {teamMembers.map((member, index) => (
                  <div key={member.name} className="col-lg-3 col-md-6 animate-on-scroll fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="team-member-card text-center">
                      
                      {/* CHANGE 1: Use the member's image from the array */}
                      <img 
                        src={member.img} 
                        alt={member.name} // CHANGE 2: Use the member's name for the alt text
                        className="team-img" 
                      />

                      <div className="team-card-body">
                        <h4 className="fw-bold mb-1">{member.name}</h4>
                        <p className="team-role mb-3">{member.role}</p>
                        <p className="card-text text-muted small">{member.bio}</p>
                        <div className="team-socials">
                          <i className="bi bi-linkedin"></i>
                          <i className="bi bi-envelope"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <section className="review-cta py-5 my-5">
            <div className="container text-center text-white">
              <h2 className="display-6 fw-bold mb-3 animate-on-scroll fade-in">Have thoughts about HYJAIN?</h2>
              <p className="lead mb-4 animate-on-scroll fade-in" style={{animationDelay: '0.2s'}}>Share your experience and help others choose better.</p>
              <Link to="/reviews" className="btn btn-light btn-lg fw-bold px-5 animate-on-scroll fade-in-up" style={{animationDelay: '0.4s'}}>Write a Review</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;