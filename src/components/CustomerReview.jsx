import React, { useContext, useState } from 'react';
import { AdminContext } from '../AdminPanel/AdminContext';

function CustomerReview() {
  const { addReview, products = [] } = useContext(AdminContext);
  const [form, setForm] = useState({ name: '', email: '', rating: 5, comment: '', productId: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      setSubmitting(true);
      const product = products.find(p => p.id === form.productId);
      await addReview({
        userEmail: form.email || form.name || 'Anonymous',
        rating: Number(form.rating),
        comment: form.comment,
        productId: form.productId || null,
        productName: product ? product.name : 'General',
        createdAt: new Date()
      });
      setSuccess('Thank you! Your review has been submitted.');
      setForm({ name: '', email: '', rating: 5, comment: '', productId: '' });
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-3 text-center">Write a Review</h2>
          <p className="text-muted text-center mb-4">Your feedback helps us improve HYJAIN for everyone.</p>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Your Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email (optional)</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Product (optional)</label>
                <select name="productId" value={form.productId} onChange={handleChange} className="form-select">
                  <option value="">General</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Rating</label>
                <select name="rating" value={form.rating} onChange={handleChange} className="form-select">
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Your Review</label>
                <textarea name="comment" value={form.comment} onChange={handleChange} className="form-control" rows="4" required></textarea>
              </div>
              <div className="col-12 d-grid">
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerReview;


