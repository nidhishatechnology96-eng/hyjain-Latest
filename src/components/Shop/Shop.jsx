import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { AdminContext } from "../../AdminPanel/AdminContext";
import { CartContext } from "../../context/CartContext";
import hyjainPdf from "../Shop/hyjain.pdf";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "./Shop.css";

const GstUpdateSection = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return null;
  }
  return (
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
  );
};

const MarqueeSection = () => (
  <section className="marquee-section">
    <div className="marquee-content">
    
      <span><i className="bi bi-leaf me-2"></i>100% Organic & Natural Products</span>
      <span><i className="bi bi-shield-check me-2"></i>Safe & Hygienic Packaging</span>
      <span><i className="bi bi-gem me-2"></i>Premium Quality Assured</span>
      
      {/* -- Content is duplicated to create a seamless loop -- */}
      <span><i className="bi bi-truck me-2"></i>Free Shipping On Orders Over ₹500</span>
      <span><i className="bi bi-leaf me-2"></i>100% Organic & Natural Products</span>
      <span><i className="bi bi-shield-check me-2"></i>Safe & Hygienic Packaging</span>
      <span><i className="bi bi-gem me-2"></i>Premium Quality Assured</span>
    </div>
  </section>
);


const WhyChooseUsSection = () => {
  const features = [
    { icon: "bi-gem", title: "Farm-to-Table Purity", description: "Directly sourced from trusted farms, ensuring natural and fresh products." },
    { icon: "bi-shield-check", title: "Hygienic & Safe", description: "Multi-layered packaging locks in freshness and guarantees safety." },
    { icon: "bi-rocket-takeoff", title: "Fast & Reliable Delivery", description: "Get your favorite products delivered swiftly to your doorstep." },
    { icon: "bi-headset", title: "Dedicated Support", description: "Our friendly support team is always ready to assist you with a smile." }
  ];

  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Why You Should Buy From Us</h2>
          <p className="text-muted mt-3 fs-5">Our commitment to quality and your well-being.</p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="feature-card h-100">
                <div className="feature-icon-wrapper"><i className={`bi ${feature.icon}`}></i></div>
                <h5 className="fw-bold mb-3">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Shop = () => {
  const { products = [], categories = [], slideshowImages = [], siteSettings, isLoading } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const topSellingProducts = products.slice(0, 8);

  if (isLoading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="background-graphics">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
      </div>

      {slideshowImages.length > 0 && (
        <div className="slideshow-full-width-container">
          <section className="shop-slideshow-section">
            <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={0} slidesPerView={1} navigation pagination={{ clickable: true }} loop={true} autoplay={{ delay: 3500, disableOnInteraction: false }}>
              {slideshowImages.map(slide => (
                <SwiperSlide key={slide.id}>
                  <picture>
                    <source media="(max-width: 767px)" srcSet={slide.mobileImageUrl} />
                    <source media="(min-width: 768px)" srcSet={slide.desktopImageUrl} />
                    <img src={slide.desktopImageUrl} alt="Promotional slide" className="slideshow-image" />
                  </picture>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>
      )}

      <div className="container py-4">
        <section className="shop-by-category-section text-center">
          <h2 className="section-title">Shop by Category</h2>
          <p className="text-muted mb-5 mt-3">Find what you're looking for with our curated categories.</p>
          <div className="row g-4 justify-content-center">
            <div className="col-6 col-md-4 col-lg-2">
              <Link to={`/category/${encodeURIComponent('All Products')}`} className="category-card-shop-link">
                  <div className="category-card-shop">
                    <div className="category-card-shop-icon"><i className="bi bi-grid-fill"></i></div>
                    <h6 className="category-card-shop-name">All Products</h6>
                  </div>
              </Link>
            </div>
            {categories.map(cat => (
              <div key={cat.id} className="col-6 col-md-4 col-lg-2">
                <Link to={`/category/${encodeURIComponent(cat.name)}`} className="category-card-shop-link">
                  <div className="category-card-shop">
                    <img src={cat.imageUrl} alt={cat.name} className="category-card-shop-img" />
                    <h6 className="category-card-shop-name">{cat.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="our-products-section">
          <div className="text-center mb-5">
            <h2 className="section-title">Top Selling Products</h2>
          </div>
          <div className="row g-4">
            {topSellingProducts.map((product) => {
              const isInCart = cart.some(item => item.id === product.id);
              return (
                <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="card h-100 product-card-shop border-0">
                    <Link to={`/product/${product.id}`} className="text-decoration-none d-flex flex-column h-100">
                      <div className="product-image-container"><img src={(product.images && product.images[0]) || product.image || 'https://via.placeholder.com/300'} alt={product.name} className="card-img-top" /></div>
                      <div className="card-body d-flex flex-column p-3 text-center">
                        <h5 className="card-title fs-6 text-dark flex-grow-1">{product.name}</h5>
                        <h6 className="product-price fw-bold mb-3">₹{product.price}</h6>
                        <div className="mt-auto d-grid gap-2">
                          {isInCart ? (
                            <button className="btn btn-outline-danger" onClick={(e) => { e.preventDefault(); removeFromCart(product.id); }}>Remove</button>
                          ) : (
                            <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); addToCart(product); }}>Add to Cart</button>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-primary btn-lg view-all-btn"><i className="bi bi-grid-3x3-gap-fill me-2"></i>View All Products</Link>
          </div>
        </section>

        <WhyChooseUsSection />
        <GstUpdateSection pdfUrl={siteSettings.pricingPdfUrl} />

      </div>
      
      {/* --- NEW MARQUEE SECTION --- */}
      <MarqueeSection />
    </div>
  );
};

export default Shop;