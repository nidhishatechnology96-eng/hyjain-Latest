import React, { useContext } from 'react';
import { AdminContext } from './AdminContext'; // Make sure this path is correct

// A small helper component to display stars visually
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? 'text-warning' : 'text-muted'}>
                &#9733;
            </span>
        );
    }
    return <div>{stars}</div>;
};

// This is your main Admin Panel component for managing reviews
const Review = () => {
    // 1. Get BOTH 'reviews' and 'products' from the context. This is the key.
    const { reviews, products, deleteReview, isLoading } = useContext(AdminContext);

    const handleDelete = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
            deleteReview(reviewId);
        }
    };

    if (isLoading) {
        return <div className="text-center p-5"><div className="spinner-border"></div></div>;
    }

    return (
        <div className="container-fluid p-4">
            {/* --- Header Section --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 mb-0">Customer Reviews Management</h2>
                <span className="badge bg-primary rounded-pill fs-6">
                    {reviews.length} Total Reviews
                </span>
            </div>

            {/* --- Reviews Table --- */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>User</th>
                                    <th>Product</th>
                                    <th>Rating</th>
                                    <th style={{ minWidth: '300px' }}>Comment</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.length > 0 ? (
                                    reviews.map(review => {
                                        // 2. For each review, find the matching product using the productId.
                                        const product = products.find(p => p.id === review.productId);

                                        return (
                                            <tr key={review.id}>
                                                <td>{review.userEmail || review.email || 'N/A'}</td>
                                                <td>
                                                    {/* 3. Display the product's name if found, otherwise show a fallback. */}
                                                    {product ? product.name : (review.productId === 'General' ? 'General Feedback' : 'Product not found')}
                                                </td>
                                                <td>
                                                    <StarRating rating={review.rating} />
                                                </td>
                                                <td>{review.comment}</td>
                                                <td>
                                                    {review.createdAt?.toDate ? new Date(review.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td>
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(review.id)}
                                                    >
                                                        <i className="bi bi-trash-fill me-1"></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">No reviews have been submitted yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;