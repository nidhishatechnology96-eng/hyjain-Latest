import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { AdminContext } from "../AdminPanel/AdminContext";

function CartCheckout() {
  const { cart, incrementQty, decrementQty, updateQty, removeFromCart, clearCart, addToCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const { products } = useContext(AdminContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleProceedToCheckout = () => {
    if (currentUser) {
      navigate('/checkoutflow');
    } else {
      navigate('/login', { state: { from: '/checkoutflow' } });
    }
  };

  const FeaturedProducts = () => {
    const featuredProducts = products?.slice(0, 8) || [];
    if (featuredProducts.length === 0) return null;

    return (
      <div className="container my-5 pt-5">
        <h4 className="mb-2">Handpicked for you</h4>
        <p className="text-muted mb-4">from our finest collection.</p>
        <div
          className="d-flex"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            paddingBottom: "15px",
          }}
        >
          {featuredProducts.map((p) => {
            const isInCart = cart.some((item) => item.id === p.id);
            return (
              <div
                key={p.id}
                className="card h-100 border-0 shadow-sm me-3"
                style={{ minWidth: "250px" }}
              >
                <Link
                  to={`/product/${p.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={(p.images && p.images[0]) || p.image || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={p.name}
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                  />
                  <div className="card-body text-center d-flex flex-column p-3">
                    <h6 className="card-title text-truncate">{p.name}</h6>
                    <div className="d-flex justify-content-between align-items-center my-2">
                      <span className="fw-bold text-primary">₹{p.price}</span>
                      <span className="text-warning small"><i className="bi bi-star-fill"></i> 4.8</span>
                    </div>
                    <div className="mt-auto">
                      {isInCart ? (
                        <button
                          className="btn btn-outline-danger w-100"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromCart(p.id);
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-100"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(p);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (cart.length === 0) {
    return (
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container my-5 py-5 text-center">
          <i className="bi bi-cart-x display-1 text-muted"></i>
          <h2 className="mt-3">Your cart is empty</h2>
          <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
        <FeaturedProducts />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container my-5">
                <h2 className="mb-4">Your Shopping Cart</h2>
                <div className="row g-4">
                    {/* --- LEFT COLUMN: CART ITEMS --- */}
                    <div className="col-lg-8">
                        {cart.length === 0 ? (
                            <div className="card shadow-sm border-0">
                                <div className="card-body text-center p-4">
                                    <h5 className="card-title">Your Cart is Empty</h5>
                                    <p className="card-text text-muted">Looks like you haven't added anything yet.</p>
                                    <Link to="/shop" className="btn btn-primary mt-3">
                                        <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="card shadow-sm border-0 mb-3">
                                    <div className="card-body p-3 p-md-4">
                                        <div className="row g-3 align-items-center">
                                            {/* Column 1: Image & Product Info */}
                                            <div className="col-12 col-md-5 d-flex align-items-center">
                                                <img 
                                                    src={(item.images && item.images[0]) || item.image} 
                                                    alt={item.name} 
                                                    className="img-fluid rounded" 
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                                                />
                                                <div className="ms-3">
                                                    <h6 className="mb-1">{item.name}</h6>
                                                    <small className="text-muted">Price: ₹{item.price.toFixed(2)}</small>
                                                </div>
                                            </div>
                                            {/* Column 2: Quantity Controls */}
                                            <div className="col-6 col-md-3">
                                                <div className="d-flex align-items-center justify-content-start justify-content-md-center">
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => decrementQty(item.id)}>-</button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity || 1}
                                                        onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                                                        className="form-control form-control-sm text-center"
                                                        style={{ width: '60px', margin: '0 8px' }}
                                                        aria-label="Item quantity"
                                                    />
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => incrementQty(item.id)}>+</button>
                                                </div>
                                            </div>
                                            {/* Column 3: Subtotal & Remove Button */}
                                            <div className="col-6 col-md-4 d-flex align-items-center justify-content-end">
                                                <h6 className="mb-0 me-3" style={{width: '90px', textAlign: 'right'}}>
                                                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                                                </h6>
                                                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {cart.length > 0 && (
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                               <Link to="/shop" className="btn btn-outline-secondary">
                                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                                </Link>
                                <button className="btn btn-outline-danger" onClick={clearCart}>
                                    <i className="bi bi-x-lg me-2"></i>Clear Cart
                                </button>
                            </div>
                        )}
                    </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2"><span className="text-muted">Subtotal:</span><strong>₹{subtotal.toFixed(2)}</strong></div>
                <div className="d-flex justify-content-between mb-2"><span className="text-muted">Shipping:</span><strong>₹{shipping.toFixed(2)}</strong></div>
                <div className="d-flex justify-content-between mb-3"><span className="text-muted">Tax (5%):</span><strong>₹{tax.toFixed(2)}</strong></div>
                <hr />
                <div className="d-flex justify-content-between h5 mb-4"><span>Total:</span><strong>₹{total.toFixed(2)}</strong></div>
                <div className="d-grid"><button className="btn btn-primary" onClick={handleProceedToCheckout}>Proceed to Payment</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </div>
  );
}

export default CartCheckout;