import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { CartContext } from '../../context/CartContext';
import './ProductGrid.css'; // Using the separate CSS file

function AllProductsPage() {
  const { products, isLoading } = useContext(AdminContext);
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
    </div>
  );
}

export default AllProductsPage;