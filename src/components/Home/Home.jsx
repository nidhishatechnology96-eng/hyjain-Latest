// src/pages/Home/Home.jsx

import React, { useContext, useEffect, useState } from "react";
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
import axios from 'axios';

// ✅ IMMEDIATE FIX: ADDED FALLBACK DATA
// This temporary data will be displayed if your API doesn't provide any.
// This GUARANTEES the section will appear for debugging.
const fallbackStoryContent = {
  title: "Our Story",
  subtitle: "From Our Farms To Your Family",
  paragraph: "This is temporary placeholder content. Your real content is not loading from the database. Please go to the Admin Panel at '/admin/our-story', fill out the form, and click 'Save Changes'. Once you do, this section will update automatically with your real text and image.",
  imageUrl: "https://via.placeholder.com/800x600.png?text=Upload+Image+in+Admin",
  bulletPoints: [
    "Your real content will appear here.",
    "Go to the Admin Panel to add your data.",
    "This is fallback content for display purposes.",
  ],
};


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
  const { products, siteSettings, carouselItems, isLoading } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  useScrollAnimation();

  const [storyContent, setStoryContent] = useState(fallbackStoryContent);
  const [isStoryLoading, setIsStoryLoading] = useState(true);

  useEffect(() => {
    const fetchStoryContent = async () => {
      console.log("🔄 Fetching Our Story content...");
      try {
        const response = await axios.get('/api/our-story', { timeout: 5000 });
        console.log("✅ API Response received:", response.data);
        // Check if response has data and it's not an error object
        if (response.data && !response.data.error && Object.keys(response.data).length > 0) {
          // Merge API data with fallback to ensure all fields are present
          const mergedData = {
            title: response.data.title || fallbackStoryContent.title,
            subtitle: response.data.subtitle || fallbackStoryContent.subtitle,
            paragraph: response.data.paragraph || fallbackStoryContent.paragraph,
            imageUrl: response.data.imageUrl || fallbackStoryContent.imageUrl,
            bulletPoints: (response.data.bulletPoints && Array.isArray(response.data.bulletPoints) && response.data.bulletPoints.length > 0) 
              ? response.data.bulletPoints 
              : fallbackStoryContent.bulletPoints
          };
          console.log("✅ Using API data for Our Story (merged with fallback):", mergedData);
          setStoryContent(mergedData);
        } else {
          // If API returns nothing or error object, use the fallback data.
          console.warn("⚠️ API returned no 'Our Story' data. Displaying fallback content.");
          setStoryContent(fallbackStoryContent);
        }
      } catch (error) {
        // If API call fails, use the fallback data.
        console.error("❌ Failed to fetch 'Our Story' content:", error.message);
        console.warn("⚠️ API call failed. Displaying fallback content.");
        setStoryContent(fallbackStoryContent);
      } finally {
        setIsStoryLoading(false);
        console.log("✅ Our Story section should now be visible");
      }
    };

    fetchStoryContent();
  }, []);

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

  const renderHeroSection = () => {
    // This function is correct, no changes needed
    if (isLoading) {
      return (
        <header className="hero-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner-border text-white" style={{ width: '3rem', height: '3rem' }}></div>
        </header>
      );
    }
    const validCarouselItems = carouselItems ? carouselItems.filter(slide => slide.desktopImageUrl || slide.mobileImageUrl) : [];
    if (validCarouselItems.length > 0) {
      return (
        <header id="homepageHeroCarousel" className="carousel slide hero-section" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {validCarouselItems.map((_, index) => (
              <button key={index} type="button" data-bs-target="#homepageHeroCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : 'false'} aria-label={`Slide ${index + 1}`}></button>
            ))}
          </div>
          <div className="carousel-inner">
            {validCarouselItems.map((slide, index) => (
              <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <picture>
                  {slide.desktopImageUrl && <source media="(min-width: 768px)" srcSet={slide.desktopImageUrl} />}
                  <img src={slide.mobileImageUrl || slide.desktopImageUrl || "/fallback.jpg"} className="d-block w-100 hero-image" alt={slide.title} />
                </picture>
                
                <div className="carousel-caption">
                  <h1 className="display-2 fw-bolder animate-on-scroll fade-in-down">{slide.title}</h1>
                  {slide.subtitle && <p className="lead mt-3 fs-4 animate-on-scroll fade-in-down" style={{ animationDelay: '0.3s' }}>{slide.subtitle}</p>}
                  <Link to="/shop" className="btn btn-gradient-primary btn-lg mt-4 fw-bold animate-on-scroll fade-in-up" style={{ animationDelay: '0.6s' }}>
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#homepageHeroCarousel" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="visually-hidden">Previous</span></button>
          <button className="carousel-control-next" type="button" data-bs-target="#homepageHeroCarousel" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="visually-hidden">Next</span></button>
        </header>
      );
    }
    return null;
  };

  const renderStorySection = () => {
    // Always show the section - use fallback if content is not available
    const content = storyContent || fallbackStoryContent;
    
    // Ensure bulletPoints is an array
    const bulletPoints = Array.isArray(content.bulletPoints) ? content.bulletPoints : [];

    return (
      <section className="story-section py-5 my-5" style={{ minHeight: '400px' }}>
        <div className="container">
          {isStoryLoading && (
            <div className="text-center mb-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="row align-items-center g-5">
            <div className="col-lg-6 animate-on-scroll slide-in-left">
              <div className="story-image-wrapper">
                <img 
                  src={content.imageUrl || fallbackStoryContent.imageUrl} 
                  className="img-fluid rounded-4 shadow-lg" 
                  alt="Our Story"
                  style={{ width: '100%', height: 'auto', minHeight: '300px', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.target.src = fallbackStoryContent.imageUrl;
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 animate-on-scroll slide-in-right">
              {(() => {
                const titleText = (content.title && content.title.trim()) || (fallbackStoryContent.title && fallbackStoryContent.title.trim()) || "Our Story";
                return (
                  <span className="badge-hyjain" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>
                    {titleText}
                  </span>
                );
              })()}
              <h2 className="display-4 fw-bold mt-3 mb-2" dangerouslySetInnerHTML={{ __html: content.subtitle || fallbackStoryContent.subtitle }}></h2>
              <p className="text-muted lead mb-3">{content.paragraph || fallbackStoryContent.paragraph}</p>
              <div className="story-divider my-4"></div>
              {bulletPoints.length > 0 && (
                <ul className="story-checklist mb-4">
                  {bulletPoints.map((point, index) => (
                    point && <li key={index}><i className="bi bi-check-circle-fill"></i> {point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="home-page">
      <div className="animated-background"></div>
      <div className="page-content">
        {renderHeroSection()}
        <main>
          {renderStorySection()}
          <section className="container my-5 py-5">
            <div className="text-center mb-5 animate-on-scroll fade-in">
              <h2 className="display-5 fw-bold">Why Choose <span style={{ color: '#086600ff' }}>HYJAIN?</span></h2>
              <p className="text-muted mt-2 fs-5">Quality and trust, delivered.</p>
            </div>
            <div className="row text-center g-4">
              <div className="col-lg-4 col-md-6 animate-on-scroll fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="feature-card quality-card h-100 p-4">
                  <div className="feature-icon-wrapper quality-icon"><i className="bi bi-patch-check-fill"></i></div>
                  <h4 className="fw-bold">Quality Assured</h4>
                  <p className="text-muted">Rigorously tested products sourced from the finest farms to ensure premium quality.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-on-scroll fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="feature-card delivery-card h-100 p-4">
                  <div className="feature-icon-wrapper delivery-icon"><i className="bi bi-truck"></i></div>
                  <h4 className="fw-bold">Fast Delivery</h4>
                  <p className="text-muted">Your orders are delivered fresh and on time, every single time, maintaining product integrity.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 animate-on-scroll fade-in-up" style={{ animationDelay: '0.5s' }}>
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
                          <img src={category.img} alt={category.name} className="category-img" />
                          <div className="category-overlay"><h4 className="category-title">{category.name}</h4></div>
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
                <div className="Sustainability col-lg-4 animate-on-scroll fade-in-up" style={{ animationDelay: '0.1s' }}><div className=" commitment-card p-4 h-100 text-center"><div className="commitment-icon text-success mb-3"><i className="bi bi-tree-fill"></i></div><h4 className="fw-bold">Sustainability</h4><p className="text-muted">From eco-friendly packaging to supporting sustainable farming, we are dedicated to protecting our planet.</p></div></div>
                <div className="Community col-lg-4 animate-on-scroll fade-in-up" style={{ animationDelay: '0.3s' }}><div className="commitment-card p-4 h-100 text-center"><div className="commitment-icon text-primary mb-3"><i className="bi bi-people-fill"></i></div><h4 className="fw-bold">Community</h4><p className="text-muted">We empower local farming communities by ensuring fair prices and fostering long-term partnerships.</p></div></div>
                <div className="Health col-lg-4 animate-on-scroll fade-in-up" style={{ animationDelay: '0.5s' }}><div className="commitment-card p-4 h-100 text-center"><div className="commitment-icon text-danger mb-3"><i className="bi bi-heart-fill"></i></div><h4 className="fw-bold">Health & Purity</h4><p className="text-muted">Your well-being is our priority. We guarantee products free from artificial additives and preservatives.</p></div></div>
              </div>
            </div>
          </section>
          {siteSettings && siteSettings.pricingPdfUrl && (
            <section className="container my-5 py-5 text-center">
              <div className="animate-on-scroll fade-in">
                <h2 className="fw-bold text-success mb-3">GST Revision Pricing Update - Hyjain</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: '800px' }}>
                  We welcome the recently announced NextGen GST reform and believe that it will truly benefit the entire nation. In line with our commitment, we will be passing on this benefit through revised, lower MRPs on the applicable product range, effective 22nd September 2025. Please click on the link to access the complete pricing list.
                </p>
                <a href={siteSettings.pricingPdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg fw-bold px-5 mt-4">
                  Complete List of Reduced Pricing
                </a>
              </div>
            </section>
          )}
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
                      <img src={member.img} alt={member.name} className="team-img" />
                      <div className="team-card-body">
                        <h4 className="fw-bold mb-1">{member.name}</h4>
                        <p className="team-role mb-3">{member.role}</p>
                        <p className="card-text text-muted small">{member.bio}</p>
                        <div className="team-socials"><i className="bi bi-linkedin"></i><i className="bi bi-envelope"></i></div>
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
              <p className="lead mb-4 animate-on-scroll fade-in" style={{ animationDelay: '0.2s' }}>Share your experience and help others choose better.</p>
              <Link to="/reviews" className="btn btn-light btn-lg fw-bold px-5 animate-on-scroll fade-in-up" style={{ animationDelay: '0.4s' }}>Write a Review</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;