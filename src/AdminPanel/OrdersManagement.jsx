import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AdminContext } from './AdminContext';
import { AuthContext, getRole } from '../context/AuthContext'; // ✅ IMPORT getRole
import 'bootstrap-icons/font/bootstrap-icons.css';

// Helper function for status styling
const getStatusStyle = (status) => {
  switch (status) {
    case 'Delivered':
      return {
        badge: 'bg-success-subtle text-success-emphasis border border-success-subtle rounded-pill px-2 py-1',
        icon: 'text-success',
      };
    case 'Pending':
      return {
        badge: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2 py-1',
        icon: 'text-warning',
      };
    case 'Shipped':
      return {
        badge: 'bg-info-subtle text-info-emphasis border border-info-subtle rounded-pill px-2 py-1',
        icon: 'text-info',
      };
    default:
      return {
        badge: 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle rounded-pill px-2 py-1',
        icon: 'text-secondary',
      };
  }
};

// ❌ REMOVED the old, local getRole function from here

// Modal component for order details
function OrderDetailsModal({ order, user, onClose }) {
  if (!order) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (typeof timestamp === 'string') {
      return new Date(timestamp).toLocaleDateString();
    }
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString();
    }
    return 'N/A';
  };

  // Close modal on escape key or clicking backdrop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light border-bottom-0">
            <h5 className="modal-title d-flex align-items-center gap-2">
              <i className="bi bi-receipt-cutoff"></i>
              Order Details
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="row g-4">
              {/* Customer & Order Info */}
              <div className="col-12 col-lg-6">
                <div className="mb-3">
                  <small className="text-muted">Order ID</small>
                  <p className="fw-bold mb-0">#{order.id}</p>
                </div>
                <div className="mb-3">
                  <small className="text-success">Customer</small>
                  <p className="fw-medium mb-0">{user?.fullName || 'N/A'}</p>
                  <small className="text-success">Customer Mob. No.</small>
                  <p className="text-black mb-0">{user?.mobile}</p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Order Date</small>
                  <p className="fw-medium mb-0">{formatDate(order.createdAt)}</p>
                </div>
                 <div>
                  <small className="text-muted">Status</small>
                  <p className="mb-0"><span className={getStatusStyle(order.status).badge}>{order.status}</span></p>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="col-12 col-lg-6">
                <small className="text-muted">Shipping Address</small>
                {order.shippingAddress ? (
                  <address className="mb-0 fw-medium">
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}<br />
                    {order.shippingAddress.country || 'India'}
                  </address>
                ) : <p className="text-muted mb-0">No address provided.</p>}
              </div>
            </div>

            {/* Order Items Table */}
            <div className="mt-4">
              <h6 className="mb-3">Items Ordered</h6>
              <div className="table-responsive border rounded-3">
                <table className="table table-striped table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">₹{item.price?.toFixed(2)}</td>
                        <td className="text-end fw-bold">₹{(item.quantity * item.price)?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-end h5 mt-3 pe-2">
                Total Paid: <span className="fw-bold text-primary">₹{order.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersManagement() {
  const { orders, isLoading, updateOrderStatus, users } = useContext(AdminContext);
  const { currentUser } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [updatingOrderIds, setUpdatingOrderIds] = useState([]); // Track which orders are currently updating
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userRole = getRole(currentUser);

  const statusOptions = useMemo(() => {
    switch (userRole) {
      case 'admin':
      case 'staff': return ['Pending', 'Shipped', 'Delivered'];
      case 'delivery': return ['Shipped', 'Delivered'];
      default: return [];
    }
  }, [userRole]);

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (userRole === 'delivery') {
      filtered = orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered');
    }
    const q = query.trim().toLowerCase();
    if (!q) return filtered;
    return filtered.filter(o =>
      (o.userEmail?.toLowerCase().includes(q)) ||
      (o.status?.toLowerCase().includes(q)) ||
      (o.id?.toLowerCase().includes(q))
    );
  }, [orders, query, userRole]);
  
  const handleStatusChange = async (order, newStatus, currentTarget) => {
    if (newStatus === order.status) return;

    if (!window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
      currentTarget.value = order.status; // Revert dropdown if user cancels
      return;
    }
    
    setUpdatingOrderIds(prev => [...prev, order.id]);
    try {
      await updateOrderStatus(order.id, newStatus);
      // Success is handled automatically by the real-time listener
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please check your permissions.');
      currentTarget.value = order.status; // Revert on failure
    } finally {
      setUpdatingOrderIds(prev => prev.filter(id => id !== order.id));
    }
  };


  if (isLoading) {
    return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4">
        <h1 className="h3 mb-2 mb-sm-0 text-gray-800">Orders Management</h1>
      </div>
      
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by email, status, or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th className="text-end">Total Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-bold">#{order.id.slice(-6).toUpperCase()}</td>
                      <td>{order.userEmail}</td>
                      <td className="text-end">₹{order.total?.toFixed(2) || '0.00'}</td>
                      <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <span className={getStatusStyle(order.status).badge}>{order.status}</span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <i className="bi bi-eye"></i>
                            <span className="d-none d-md-inline ms-1">View</span>
                          </button>
                          {statusOptions.length > 0 && (
                            <div style={{ width: '150px' }}>
                              <select
                                className="form-select form-select-sm"
                                value={order.status}
                                disabled={updatingOrderIds.includes(order.id)}
                                onChange={(e) => handleStatusChange(order, e.target.value, e.currentTarget)}
                              >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-muted">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          user={users.find(u => u.id === selectedOrder.userId)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}

export default OrdersManagement;