// src/AdminPanel/Review.jsx

import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AdminContext } from "./AdminContext"; 
// ✅ FIX: Removed the import for the missing image file.

// Star display component
const StarDisplay = ({ rating }) => (
  <span className="text-warning">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
);

const Review = () => {
  // Get reviews and delete function from the context
  const { reviews, deleteReview, isLoading } = useContext(AdminContext);
  
  // Handle the delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this review?")) {
      deleteReview(id);
    }
  };
  
  // Display a loader while data is being fetched
  if (isLoading) return <div className="text-center p-5"><div className="spinner-border"></div></div>;

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h2 className="mb-0">Customer Reviews Management</h2>
        <span className="badge bg-primary rounded-pill fs-6">{reviews?.length || 0} Total Reviews</span>
      </div>

      {!reviews || reviews.length === 0 ? (
        <div className="text-center p-5 mt-5 bg-light border rounded-3">
          {/* ✅ FIX: Replaced the missing <img> with a Bootstrap Icon */}
          <i 
            className="bi bi-chat-quote text-muted mb-4" 
            style={{ fontSize: '72px', opacity: 0.7 }}
          ></i>
          <h4>No reviews found.</h4>
          <p className="text-muted mt-2">When customers submit reviews, they will appear here for management.</p>
        </div>
      ) : (
        <div className="table-responsive card shadow-sm">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Product</th>
                <th scope="col">Rating</th>
                <th scope="col">Comment</th>
                <th scope="col">Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.userEmail || 'N/A'}</td>
                  <td>
                    {review.product ? (
                      <Link to={`/product/${review.productId}`}>{review.productName}</Link>
                    ) : (
                      'Product not found'
                    )}
                  </td>
                  <td><StarDisplay rating={review.rating} /></td>
                  <td style={{ minWidth: '250px' }}>"{review.comment}"</td>
                  <td>{new Date(review.createdAt.seconds * 1000).toLocaleDateString()}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(review.id)}
                      title="Delete Review"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Review;