import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import { FaEnvelope, FaBuilding, FaPhone, FaMapMarkerAlt, FaReply, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

// Helper component to display Enquiry details
const EnquiryDetails = ({ message }) => (
    <>
        <div className="row mb-3">
            <div className="col-md-6"><strong>Company:</strong> {message.companyName}</div>
            <div className="col-md-6"><strong>Phone:</strong> {message.phone}</div>
        </div>
        <div className="row mb-3">
            <div className="col-md-6"><strong>City:</strong> {message.city}</div>
            <div className="col-md-6"><strong>Country:</strong> {message.country}</div>
        </div>
        <div className="row mb-3">
            <div className="col">
                <strong><FaMapMarkerAlt className="me-2 text-muted" />Address:</strong>
                <p className="mb-0 text-muted ps-4">{message.address}</p>
            </div>
        </div>
        {message.fax && (
             <div className="row mb-3">
                <div className="col"><strong>Fax:</strong> {message.fax}</div>
            </div>
        )}
        <hr />
        <div>
            <strong>Inquiry Details:</strong>
            <div className="mt-2 p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                {message.message}
            </div>
        </div>
    </>
);

// Helper component to display Feedback details
const FeedbackDetails = ({ message }) => (
    <div>
        <strong>Feedback Message:</strong>
        <div className="mt-2 p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
            {message.message}
        </div>
    </div>
);


const GetInTouchMessages = () => {
    const { 
        getInTouchMessages, 
        isLoading, 
        deleteGetInTouchMessage, 
        markGetInTouchMessageAsRead 
    } = useContext(AdminContext);

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');

    const filteredMessages = (getInTouchMessages || []).filter(message => {
        if (filter === 'unread') return !message.isRead;
        if (filter === 'read') return message.isRead;
        return true;
    });

    const unreadCount = (getInTouchMessages || []).filter(message => !message.isRead).length;

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        if (!message.isRead) {
            markGetInTouchMessageAsRead(message.id);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteGetInTouchMessage(messageId);
                if (selectedMessage && selectedMessage.id === messageId) {
                    setSelectedMessage(null);
                }
            } catch (err) {
                console.error('Error deleting message:', err);
                setError('Failed to delete message. Please try again.');
            }
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown date';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString();
    };

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0"><FaEnvelope className="me-2" />Enquiries & Feedback</h2>
                <div className="d-flex gap-2">
                    <span className="badge bg-danger">{unreadCount} Unread</span>
                    <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto' }}>
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </div>

            {error && <div className="alert alert-danger"><FaExclamationTriangle className="me-2" />{error}</div>}
            
            <div className="row">
                {/* Messages List */}
                <div className="col-lg-4">
                    <div className="card">
                        <div className="list-group list-group-flush" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                            {filteredMessages.length === 0 ? (
                                <div className="p-4 text-center text-muted">No messages found.</div>
                            ) : (
                                filteredMessages.map((message) => (
                                    <div 
                                        key={message.id} 
                                        className={`list-group-item list-group-item-action ${!message.isRead ? 'bg-light' : ''} ${selectedMessage?.id === message.id ? 'active' : ''}`}
                                        onClick={() => handleViewMessage(message)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-1">{message.name}</h6>
                                            <small>{formatDate(message.createdAt)}</small>
                                        </div>
                                        <p className="mb-1 fw-bold text-truncate">{message.subject}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className={`badge ${message.type === 'Enquiry' ? 'bg-info-subtle text-info-emphasis' : 'bg-secondary-subtle text-secondary-emphasis'}`}>{message.type}</small>
                                            {!message.isRead && <span className="badge bg-danger rounded-pill">New</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Message Details */}
                <div className="col-lg-8">
                    <div className="card">
                        {selectedMessage ? (
                            <>
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Message Details</h5>
                                    <div>
                                        <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="btn btn-outline-primary btn-sm me-2"><FaReply className="me-1" />Reply</a>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteMessage(selectedMessage.id)}><FaTrash className="me-1" />Delete</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-3 pb-3 border-bottom">
                                        <div className="col-md-6">
                                            <div><strong>From:</strong> {selectedMessage.name}</div>
                                            <div><strong>Email:</strong> <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><strong>Type:</strong> <span className={`badge ${selectedMessage.type === 'Enquiry' ? 'bg-info' : 'bg-secondary'}`}>{selectedMessage.type}</span></div>
                                            <div><strong>Status:</strong> <span className={`badge ${selectedMessage.isRead ? 'bg-success' : 'bg-warning'}`}>{selectedMessage.isRead ? 'Read' : 'Unread'}</span></div>
                                        </div>
                                    </div>
                                    {selectedMessage.type === 'Enquiry' 
                                        ? <EnquiryDetails message={selectedMessage} /> 
                                        : <FeedbackDetails message={selectedMessage} />
                                    }
                                </div>
                            </>
                        ) : (
                            <div className="card-body text-center py-5">
                                <FaEnvelope size={64} className="text-muted mb-3" />
                                <h5 className="text-muted">Select a message to view details</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouchMessages;