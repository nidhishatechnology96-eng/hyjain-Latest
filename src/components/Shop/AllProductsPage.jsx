import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { CartContext } from '../../context/CartContext';
import './ProductGrid.css'; // This file will contain all the necessary styles

// ===================================================================
//  NEW COMPONENT: ShopByCategorySection (Styled like your image)
// ===================================================================

function ShopByCategorySection({ categories = [], onCategorySelect, selectedCategory }) {
    return (
        <section className="shop-by-category-section text-center">
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-muted mb-5 mt-3">Find what you're looking for with our curated categories.</p>
            
            <div className="category-circles-container">
                {/* Static "All Products" Card */}
                <div 
                    className={`category-circle-card ${selectedCategory === 'All Products' ? 'active' : ''}`}
                    onClick={() => onCategorySelect('All Products')}
                >
                    <div className="category-circle all-products-bg">
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </div>
                    <h6 className="category-title">All Products</h6>
                </div>

                {/* Dynamic Category Cards */}
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
//  MAIN COMPONENT: AllProductsPage
// ===================================================================

function AllProductsPage() {
  // We now get 'categories' from the context as well
  const { products, categories, isLoading } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  if (isLoading) {
    return <div className="container my-5 text-center"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div className="product-grid-page">
      <div className="background-graphics">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
      </div>
      <div className="container py-5">
        <div className="product-grid-header mb-5">
          <Link to="/shop" className="back-to-shop-link">
            <i className="bi bi-arrow-left-circle me-2"></i>Back to Shop
          </Link>
          <h1 className="page-title text-center">All Products</h1>
          <p className="product-count text-center text-muted">
            {products.length} products found
          </p>
        </div>

        <div className="row g-4">
          {products.map((product) => {
            const isInCart = cart.some(item => item.id === product.id);
            return (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="product-card-grid h-100">
                  <Link to={`/product/${product.id}`} className="text-decoration-none d-flex flex-column h-100">
                    <div className="product-image-container">
                      <img src={(product.images && product.images[0]) || product.image} alt={product.name} className="card-img-top" />
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
      
      {/* --- RENDER THE NEW CATEGORY SECTION HERE --- */}
      <ShopByCategorySection categories={categories} />

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
    </div>
  );
}

export default AllProductsPage;