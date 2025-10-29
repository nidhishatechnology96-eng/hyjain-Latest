// src/components/MyOrders.jsx

import React, { useState, useEffect, useContext } from 'react';
import './MyOrders.css';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Toast from '../Toast';

import OrderTracker from '../OrderTracker';

const StarRatingInput = ({ rating, onRatingChange }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="star-rating-input d-inline-block">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <i
                        key={starValue}
                        className={`bi bi-star-fill star ${starValue <= (hover || rating) ? 'active' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onRatingChange(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    />
                );
            })}
        </div>
    );
};

function MyOrders() {
  const { currentUser } = useContext(AuthContext);
  const { products, listenToUserOrders, addReview, markProductAsReviewed, isLoading: isProductsLoading } = useContext(AdminContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [orders, setOrders] = useState([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, product: null, orderId: null });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (currentUser === undefined) return;

    if (!currentUser) {
      setError("Please log in to see your orders.");
      setIsOrdersLoading(false);
      return;
    }

    const unsubscribe = listenToUserOrders(currentUser.uid, (userOrders) => {
        setOrders(userOrders);
        setIsOrdersLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, listenToUserOrders]);

  const openReviewModal = (product, orderId) => setModalState({ isOpen: true, product, orderId });
  const closeReviewModal = () => {
      setModalState({ isOpen: false, product: null, orderId: null });
      setRating(0);
      setComment('');
      setIsSubmitting(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      setToast({ show: true, message: 'Please provide a rating and a comment.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      await addReview({
        rating, comment,
        productId: modalState.product.id,
        productName: modalState.product.name,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: serverTimestamp()
      });
      await markProductAsReviewed(modalState.orderId, modalState.product.id);
      setToast({ show: true, message: 'Review submitted successfully!', type: 'success' });
      closeReviewModal();
    } catch (err) {
      setToast({ show: true, message: 'Failed to submit review.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOrdersLoading || isProductsLoading) {
     return <div className="text-center my-5"><div className="spinner-border text-primary"></div><p className="mt-2">Loading your orders...</p></div>;
  }
  
  if (error) return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <>
      {toast.show && ( <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} /> )}

      <div className="container my-5">
        <h2 className="mb-4 fw-bold">My Orders</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="card order-card mb-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between text-muted mb-3">
                  <span><strong>Order ID:</strong> #{order.id.slice(-6).toUpperCase()}</span>
                  <span><strong>Date:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                </div>

                <OrderTracker status={order.status} />

                <ul className="list-group list-group-flush mt-4">
                  {order.cart.map((item) => {
                    const isReviewed = order.reviewedProducts?.includes(item.id);
                    const productDetails = products.find(p => p.id === item.id);
                    
                    // ✅ --- THIS IS THE FIX ---
                    // This logic now correctly finds the primary image whether it's in an 'images' array 
                    // (for new products) or a single 'image' field (for old products).
                    const imageUrl = 
                      (productDetails?.images?.[0]) || 
                      productDetails?.image || 
                      (item.images?.[0]) || 
                      item.image;

                    const productForModal = { ...item, image: imageUrl };
                    
                    return (
                      <li key={item.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img src={imageUrl || 'https://placehold.co/60x60/e9ecef/e9ecef'} alt={item.name} className="img-fluid rounded me-3" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                          <div>
                            <h6 className="mb-0"><Link to={`/product/${item.id}`} className="text-decoration-none fw-bold">{item.name}</Link></h6>
                            <small className="text-muted">Quantity: {item.quantity}</small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="text-end me-4" style={{ width: '110px' }}>
                                <h6 className="mb-0 fw-bold">₹{(item.price * (item.quantity || 1)).toFixed(2)}</h6>
                                {(item.quantity || 1) > 1 && (
                                    <small className="text-muted d-block">@ ₹{item.price.toFixed(2)}</small>
                                )}
                            </div>
                            <div>
                                {order.status === 'Delivered' && ( isReviewed ? (
                                    <button className="btn btn-sm btn-outline-success" disabled><i className="bi bi-check-circle me-1"></i> Reviewed</button>
                                  ) : (
                                    <button className="btn btn-sm btn-primary" onClick={() => openReviewModal(productForModal, order.id)}><i className="bi bi-pencil-square me-1"></i> Leave a Review</button>
                                  )
                                )}
                            </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="card-footer bg-light text-end p-3">
                <h5 className="mb-0">Total: <strong className="text-primary">₹{order.total?.toFixed(2) || '0.00'}</strong></h5>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="text-center py-5">
              <i className="bi bi-receipt-cutoff display-1 text-muted"></i>
              <h2 className="mt-3">You have no orders yet</h2>
              <p className="text-muted">Place an order and it will appear here.</p>
              <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
            
            <div className="mt-5 pt-4 border-top">
                {/* ... Handpicked for you section ... */}
            </div>
          </>
        )}
      </div>

      {modalState.isOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Write a review for {modalState.product?.name}</h5>
                  <button type="button" className="btn-close" onClick={closeReviewModal}></button>
                </div>
                <form onSubmit={handleReviewSubmit}>
                  <div className="modal-body">
                    <div className="text-center">
                      <img src={modalState.product?.image || 'https://placehold.co/100x100/e9ecef/e9ecef'} alt={modalState.product?.name} className="rounded mb-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      <div className="mb-3"><label className="form-label">Your Rating</label><div><StarRatingInput rating={rating} onRatingChange={setRating} /></div></div>
                    </div>
                    <div className="mb-2"><label htmlFor="comment" className="form-label">Your Comment</label><textarea id="comment" className="form-control" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} required /></div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeReviewModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Review'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;