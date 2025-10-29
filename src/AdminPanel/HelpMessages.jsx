import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import { FaEnvelope, FaUser, FaCalendarAlt, FaEye, FaEyeSlash, FaReply, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const HelpMessages = () => {
    const { helpMessages, isLoading, deleteHelpMessage, markHelpMessageAsRead } = useContext(AdminContext);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState('all'); // all, unread, read
    const [error, setError] = useState('');

    const filteredMessages = helpMessages.filter(message => {
        if (filter === 'unread') return !message.isRead;
        if (filter === 'read') return message.isRead;
        return true;
    });

    const unreadCount = helpMessages.filter(message => !message.isRead).length;

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        setError(''); // Clear any previous errors
        if (!message.isRead) {
            markHelpMessageAsRead(message.id);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteHelpMessage(messageId);
                if (selectedMessage && selectedMessage.id === messageId) {
                    setSelectedMessage(null);
                }
                setError(''); // Clear any previous errors
            } catch (error) {
                console.error('Error deleting message:', error);
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
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="help-messages-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    <FaEnvelope className="me-2" />
                    Help Messages & Support
                </h2>
                <div className="d-flex gap-2">
                    <span className="badge bg-danger">{unreadCount} Unread</span>
                    <select 
                        className="form-select" 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ width: 'auto' }}
                    >
                        <option value="all">All Messages</option>
                        <option value="unread">Unread Only</option>
                        <option value="read">Read Only</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <FaExclamationTriangle className="me-2" />
                    {error}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setError('')}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            {helpMessages.length === 0 && !isLoading && (
                <div className="alert alert-info">
                    <FaEnvelope className="me-2" />
                    No help messages found. This could be due to:
                    <ul className="mt-2 mb-0">
                        <li>No messages have been submitted yet</li>
                        <li>Firebase permissions need to be configured for the 'helpMessages' collection</li>
                        <li>Check Firebase console for security rules</li>
                    </ul>
                </div>
            )}

            <div className="row">
                {/* Messages List */}
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Messages ({filteredMessages.length})</h5>
                        </div>
                        <div className="card-body p-0" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {filteredMessages.length === 0 ? (
                                <div className="p-4 text-center text-muted">
                                    <FaEnvelope size={48} className="mb-3" />
                                    <p>No messages found</p>
                                </div>
                            ) : (
                                filteredMessages.map((message) => (
                                    <div 
                                        key={message.id} 
                                        className={`p-3 border-bottom cursor-pointer ${!message.isRead ? 'bg-light' : ''} ${selectedMessage?.id === message.id ? 'bg-primary text-white' : ''}`}
                                        onClick={() => handleViewMessage(message)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="flex-grow-1">
                                                <h6 className={`mb-1 ${selectedMessage?.id === message.id ? 'text-white' : ''}`}>
                                                    {message.name}
                                                </h6>
                                                <p className={`mb-1 small ${selectedMessage?.id === message.id ? 'text-white-50' : 'text-muted'}`}>
                                                    {message.email}
                                                </p>
                                                <p className={`mb-1 fw-bold ${selectedMessage?.id === message.id ? 'text-white' : ''}`}>
                                                    {message.subject}
                                                </p>
                                                <p className={`mb-0 small ${selectedMessage?.id === message.id ? 'text-white-50' : 'text-muted'}`}>
                                                    {message.message.substring(0, 80)}...
                                                </p>
                                            </div>
                                            <div className="text-end">
                                                {!message.isRead && (
                                                    <span className="badge bg-danger">New</span>
                                                )}
                                                <div className={`small mt-1 ${selectedMessage?.id === message.id ? 'text-white-50' : 'text-muted'}`}>
                                                    {formatDate(message.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Message Details */}
                <div className="col-lg-8">
                    {selectedMessage ? (
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Message Details</h5>
                                <div className="d-flex gap-2">
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                                    >
                                        <FaReply className="me-1" />
                                        Reply
                                    </button>
                                    <button 
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                                    >
                                        <FaTrash className="me-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>From:</strong> {selectedMessage.name}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Email:</strong> 
                                        <a href={`mailto:${selectedMessage.email}`} className="ms-1">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <strong>Subject:</strong> {selectedMessage.subject}
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Date:</strong> {formatDate(selectedMessage.createdAt)}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <strong>Status:</strong> 
                                    <span className={`badge ms-2 ${selectedMessage.isRead ? 'bg-success' : 'bg-warning'}`}>
                                        {selectedMessage.isRead ? 'Read' : 'Unread'}
                                    </span>
                                </div>
                                <hr />
                                <div>
                                    <strong>Message:</strong>
                                    <div className="mt-2 p-3 bg-light rounded">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-body text-center py-5">
                                <FaEnvelope size={64} className="text-muted mb-3" />
                                <h5 className="text-muted">Select a message to view details</h5>
                                <p className="text-muted">Choose a message from the list to read its content and respond.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HelpMessages;
