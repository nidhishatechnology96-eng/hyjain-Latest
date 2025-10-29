import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminContext } from '../AdminPanel/AdminContext';

function OrderConfirmation() {
    const { orderId } = useParams();
    const { getOrderById } = useContext(AdminContext);
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (orderId) {
            const fetchOrder = async () => {
                setLoading(true);
                try {
                    const orderDetails = await getOrderById(orderId);
                    if (orderDetails) {
                        setOrder(orderDetails);
                    } else {
                        setError('Order not found. It might have been removed or the ID is incorrect.');
                    }
                } catch (err) {
                    setError('Failed to load order details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchOrder();
        } else {
            setLoading(false);
            setError("No Order ID was provided in the URL.");
        }
    }, [orderId, getOrderById]);

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Confirmation...</span>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
             <div className="container text-center py-5 vh-100 d-flex flex-column justify-content-center align-items-center">
                <i className="bi bi-exclamation-triangle-fill text-danger" style={{fontSize: '60px'}}></i>
                <h3 className="mt-3">Error</h3>
                <p className="text-muted">{error || 'Could not find the requested order.'}</p>
                <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
            </div>
        )
    }

    return (
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="card shadow-sm p-4 p-md-5 border-0 text-center" style={{ maxWidth: '600px', width: '100%' }}>
                <div 
                    className="mx-auto mb-3 bg-success d-flex justify-content-center align-items-center"
                    style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                >
                    <i className="bi bi-check-lg text-white" style={{ fontSize: '48px' }}></i>
                </div>
                
                <h2 className="mb-2">Thank You!</h2>
                <p className="lead text-muted mb-4">Your order has been placed successfully.</p>
                <p><strong>Order ID:</strong> #{order.id.slice(-8).toUpperCase()}</p>

                <div className="card bg-light border-0 my-4">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Your Order Summary</h5>
                        {order.cart.map((item) => (
                            <div key={item.id} className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center text-start">
                                    <img src={item.image} alt={item.name} className="img-fluid rounded me-3" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                    <div>
                                        <h6 className="mb-0">{item.name}</h6>
                                        <small className="text-muted">Quantity: {item.quantity}</small>
                                    </div>
                                </div> {/* ✅ FIX: Corrected a closing div tag that was previously corrupted */}
                                <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between h5">
                            <span>Total Paid:</span>
                            <span className="text-primary fw-bold">₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-3 d-sm-flex justify-content-center">
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
                       <i className="bi bi-arrow-left me-2"></i> Continue Shopping
                    </button>
                     <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/my-orders')}>
                       <i className="bi bi-receipt me-2"></i> View My Orders
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;