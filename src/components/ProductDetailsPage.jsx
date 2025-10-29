import React, { useContext, useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../AdminPanel/AdminContext";
import { CartContext } from "../context/CartContext";
import Footer from "./Footer/Footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, reviews } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  
  const product = products.find((p) => String(p.id) === String(id));
  
  // ✅ State for the main image viewer
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // ✅ Set initial main image when product loads
  useEffect(() => {
    if (product) {
      const initialImage = (product.images && product.images[0]) || product.image || "https://placehold.co/400x400";
      setMainImage(initialImage);
    }
  }, [product]);


  const cartItem = cart.find(item => item.id === product?.id);
  const inCart = cartItem ? cartItem.quantity : 0;
  
  const { averageRating, reviewCount } = useMemo(() => {
    if (!reviews || !product) {
        return { averageRating: 0, reviewCount: 0 };
    }
    const productReviews = reviews.filter(review => review.productId === product.id);
    const count = productReviews.length;

    if (count === 0) {
        return { averageRating: 0, reviewCount: 0 };
    }

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / count;

    return {
        averageRating: parseFloat(average.toFixed(1)),
        reviewCount: count
    };
  }, [reviews, product]);

  if (!product) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
            <h2 className="mt-3">Product Not Found</h2>
            <p className="text-muted">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/shop" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: quantity });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity: quantity });
    navigate('/cart');
  };

  // ✅ Get all available images, ensuring backward compatibility
  const productImages = product.images || (product.image ? [product.image] : []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-6">
            {/* ✅ Main Image Viewer */}
            <div className="card shadow-sm border-0 rounded-3 mb-3">
              <img
                src={mainImage}
                alt={product.name}
                className="img-fluid rounded-3"
                style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
              />
            </div>
            {/* ✅ Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="d-flex justify-content-center gap-2">
                {productImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="img-thumbnail"
                    style={{
                      width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer',
                      border: mainImage === img ? '2px solid #0d6efd' : '2px solid transparent'
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="col-md-6">
            {product.category && (
              <span className="badge bg-primary mb-2">{product.category}</span>
            )}
            <h1 className="display-5 fw-bold">{product.name}</h1>

            {reviewCount > 0 ? (
              <div className="d-flex align-items-center mb-3">
                <span className="fs-5 fw-bold text-warning me-2">{averageRating}</span>
                <i className="bi bi-star-fill text-warning"></i>
                <span className="text-muted ms-2">({reviewCount} Reviews)</span>
              </div>
            ) : (
              <div className="text-muted mb-3">No reviews yet.</div>
            )}

            <div className="d-flex align-items-center mb-3">
              <h2 className="text-success me-3 mb-0">₹{product.price}</h2>
              {inCart > 0 && (
                <span className="badge bg-warning text-dark">
                  {inCart} in cart
                </span>
              )}
            </div>

            <p className="text-muted mb-4 lead fs-6">
              {product.description || "No description available."}
            </p>

            <div className="mb-4">
              <h6>Product Details</h6>
              <ul className="list-unstyled">
                <li><i className="bi bi-check-circle text-success me-2"></i>100% natural ingredients</li>
                <li><i className="bi bi-check-circle text-success me-2"></i>No added preservatives</li>
                <li><i className="bi bi-check-circle text-success me-2"></i>Freshly packed for quality</li>
                <li><i className="bi bi-check-circle text-success me-2"></i>Hygienically processed</li>
              </ul>
            </div>

            <div className="row g-3 align-items-center mb-4">
              <div className="col-auto">
                <label htmlFor="quantity" className="col-form-label fw-bold">Quantity:</label>
              </div>
              <div className="col-auto">
                <div className="input-group" style={{ width: '120px' }}>
                  <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="number" className="form-control text-center" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
                  <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
              <div className="col-auto">
                <span className="text-muted">Subtotal: ₹{(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="d-grid gap-2 d-sm-flex">
              <button className="btn btn-primary btn-lg flex-fill" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus me-2"></i>Add to Cart
              </button>
              <button className="btn btn-success btn-lg flex-fill" onClick={handleBuyNow}>
                <i className="bi bi-lightning me-2"></i>Buy Now
              </button>
            </div>

            <div className="mt-4 p-3 bg-light rounded">
              <h6 className="mb-2"><i className="bi bi-truck me-2"></i>Delivery Info</h6>
              <p className="small mb-0">Free delivery on orders above ₹500. Usually delivered within 2-3 business days.</p>
            </div>
          </div>
        </div>
        
        {/* ... (Related Products Section - No change needed here but will update image source for safety) ... */}
        {products.filter(p => p.category === product.category && p.id !== product.id).length > 0 && (
          <div className="mt-5 pt-5">
            <h3 className="mb-4">Related Products</h3>
            <div className="row g-4">
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(relatedProduct => {
                  const isInCart = cart.some(item => item.id === relatedProduct.id);
                  return (
                    <div key={relatedProduct.id} className="col-md-3 col-6">
                      <div className="card h-100 shadow-sm">
                        <Link to={`/product/${relatedProduct.id}`}>
                          <img
                            src={(relatedProduct.images && relatedProduct.images[0]) || relatedProduct.image || "https://placehold.co/300x300"}
                            alt={relatedProduct.name}
                            className="card-img-top"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        </Link>
                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title">{relatedProduct.name}</h6>
                          <p className="card-text text-primary fw-bold mt-auto">₹{relatedProduct.price}</p>
                          
                          <div className="d-grid mt-2">
                            {isInCart ? (
                              <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(relatedProduct.id)}>
                                <i className="bi bi-trash me-1"></i> Remove
                              </button>
                            ) : (
                              <button className="btn btn-primary btn-sm" onClick={() => addToCart(relatedProduct)}>
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;