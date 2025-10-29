import React, { useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { CartContext } from '../../context/CartContext';
import './ProductGrid.css';

function SubCategoryPage() {
  const { subcategoryName } = useParams();
  const { products, isLoading } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const decodedSubcategoryName = useMemo(() => decodeURIComponent(subcategoryName), [subcategoryName]);

  const filteredProducts = useMemo(() => {
    const productList = products || [];
    if (!decodedSubcategoryName) return [];
    return productList.filter(p => p.subcategory === decodedSubcategoryName);
  }, [products, decodedSubcategoryName]);

  if (isLoading) {
    return <div className="container my-5 text-center"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div className="product-grid-page">
      <section className="page-header-section">
        <div className="container">
          <div className="product-grid-header">
            <Link to="/shop" className="back-to-shop-link">
              <i className="bi bi-arrow-left me-2"></i>Back
            </Link>
            <h1 className="page-title">{decodedSubcategoryName}</h1>
            <p className="product-count">
              {filteredProducts.length} products found
            </p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
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
                })
            ) : (
                <div className="col-12 text-center py-5">
                    <i className="bi bi-basket3 fs-1 text-muted"></i>
                    <h4 className="text-muted mt-3">No products found in this subcategory yet.</h4>
                    <p className="text-muted">Check back soon for new arrivals!</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SubCategoryPage;