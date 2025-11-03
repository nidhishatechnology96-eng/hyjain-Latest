// src/Shop/AllProductsPage.jsx (or rename to ShopPage.jsx)

import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { CartContext } from '../../context/CartContext';
import Carousel from './Carousel'; // We'll need the carousel component
import './ProductGrid.css'; // This file will contain all the necessary styles
``


// ===================================================================
//  ShopByCategorySection Component (Unchanged from your code)
// ===================================================================
function ShopByCategorySection({ categories = [], onCategorySelect, selectedCategory }) {
    // This component will now work correctly because we pass the right props.
    return (
        <section className="shop-by-category-section text-center">
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-muted mb-5 mt-3">Find what you're looking for with our curated categories.</p>
            
            <div className="category-circles-container">
                <div 
                    className={`category-circle-card ${selectedCategory === 'All Products' ? 'active' : ''}`}
                    onClick={() => onCategorySelect('All Products')}
                >
                    <div className="category-circle all-products-bg">
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </div>
                    <h6 className="category-title">All Products</h6>
                </div>
                {categories.map((cat) => (
                    <div 
                        key={cat.id} 
                        className={`category-circle-card ${selectedCategory === cat.name ? 'active' : ''}`}
                        onClick={() => onCategorySelect(cat.name)}
                    >
                        <div className="category-circle">
                            <img src={cat.imageUrl} alt={cat.name} />
                        </div>
                        <h6 className="category-title">{cat.name}</h6>
                    </div>
                ))}
            </div>
        </section>
    );
}


// ===================================================================
//  MAIN COMPONENT: AllProductsPage (Now with state and dynamic content)
// ===================================================================
function AllProductsPage() {
  const { products, categories, isLoading } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  
  // 1. ADD STATE to track the currently selected category
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  // 2. CREATE A HANDLER to update the state when a category is clicked
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    window.scrollTo(0, 0); // Optional: scroll to top on category change
  };

  // 3. FILTER PRODUCTS based on the selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All Products') {
      return products || [];
    }
    return (products || []).filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // 4. GET CAROUSEL IMAGES based on the selected category
  const imagesForCarousel = useMemo(() => {
    if (selectedCategory === 'All Products') {
        return categoryCarouselImages['All Products'];
    }
    const currentCategoryData = (categories || []).find(cat => cat.name === selectedCategory);
    // Use the dynamic images from Firebase, or an empty array if none exist
    return currentCategoryData?.carouselImages || [];
  }, [categories, selectedCategory]);


  if (isLoading) {
    return <div className="container my-5 text-center"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div className="product-grid-page">
      <div className="background-graphics">
        {/* ... your background graphics ... */}
      </div>
      <div className="container py-5">
        
        {/* --- DYNAMIC CAROUSEL RENDERED HERE --- */}
        <Carousel images={imagesForCarousel} />
        
        <div className="product-grid-header mb-5 text-center">
          {/* Title and count are now dynamic based on state */}
          <h1 className="page-title">{selectedCategory}</h1>
          <p className="product-count text-muted">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* --- PRODUCT GRID RENDERED HERE (uses filteredProducts) --- */}
        <div className="row g-4">
          {filteredProducts.map((product) => {
            const isInCart = cart.some(item => item.id === product.id);
            const placeholderImage = 'https://via.placeholder.com/400x400.png?text=No+Image';
            const imageUrl = (product.images && product.images[0]) || product.image || placeholderImage;
            return (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="product-card-grid h-100">
                  <Link to={`/product/${product.id}`} className="text-decoration-none d-flex flex-column h-100">
                    <div className="product-image-container">
                      <img src={imageUrl} alt={product.name} className="card-img-top" />
                    </div>
                    <div className="card-body d-flex flex-column p-3 text-start">
                      <h5 className="card-title fs-6 text-dark flex-grow-1">{product.name}</h5>
                      <h6 className="product-price fw-bold mb-3">₹{product.price}</h6>
                      <div className="mt-auto d-grid">
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
      </div>
      
      {/* --- RENDER THE CATEGORY SECTION & PASS PROPS --- */}
      <ShopByCategorySection 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* --- MANUFACTURING PROCESS SECTION --- */}
      <section className="manufacturing-process py-5">
         {/* --- MANUFACTURING PROCESS SECTION --- */}
      <section className="manufacturing-process py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="fw-bold">Our Hyjain & Quality <span className="text-success">Process</span></h2>
              <p className="text-muted mt-3">
                Our commitment is to deliver purity and flavor...
              </p>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 1</h5><p>Sourcing Premium Raw Materials</p></div></div>
            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 2</h5><p>Initial Grading & Sorting</p></div></div>
            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 3</h5><p>Multi-Stage Hyjain Cleaning</p></div></div>
            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 4</h5><p>Precision Cutting & Preparation</p></div></div>
            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 5</h5><p>Advanced Dehydration Process</p></div></div>
            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 6</h5><p>Gentle Low-Temp Drying (to preserve nutrients)</p></div></div>
            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 7</h5><p>Natural Cooling & Stabilization</p></div></div>
            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 8</h5><p>Strict Quality Control (Moisture & Purity Test)</p></div></div>
            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 9</h5><p>Sieving & Metal Detection</p></div></div>
            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 10</h5><p>Hyjain, Air-Tight Packaging</p></div></div>
            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 11</h5><p>Final Inspection & Dispatch</p></div></div>
          </div>
          <div className="row">
            <div className="col-12 text-center mt-4">
              <p className="fw-bold text-secondary">End Process</p>
            </div>
          </div>
        </div>
      </section>
      </section>
    </div>
  );
}

export default AllProductsPage;