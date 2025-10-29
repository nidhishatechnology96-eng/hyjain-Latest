// src/AdminPanel/SubscribersManagement.jsx

import React, { useContext, useState, useMemo } from 'react';
import { AdminContext } from './AdminContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SubscribersManagement() {
    const { subscribers, deleteSubscriber, isLoading } = useContext(AdminContext);
    const [query, setQuery] = useState('');

    const filteredSubscribers = useMemo(() => {
        if (!subscribers) return [];
        const q = query.trim().toLowerCase();
        if (!q) return subscribers;
        return subscribers.filter(s => s.email.toLowerCase().includes(q));
    }, [subscribers, query]);

    const handleDelete = (id, email) => {
        if (window.confirm(`Are you sure you want to remove "${email}" from the subscription list?`)) {
            deleteSubscriber(id);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.toDate) return 'N/A';
        return timestamp.toDate().toLocaleDateString();
    };

    if (isLoading) {
        return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <>
            <h1 className="h3 mb-4 text-gray-800">Newsletter Subscribers</h1>
            <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by email..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Email Address</th>
                                    <th>Subscribed On</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubscribers.length > 0 ? (
                                    filteredSubscribers.map(sub => (
                                        <tr key={sub.id}>
                                            <td className="fw-bold">{sub.email}</td>
                                            <td>{formatDate(sub.subscribedAt)}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Unsubscribe User"
                                                    onClick={() => handleDelete(sub.id, sub.email)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center p-4 text-muted">
                                            No subscribers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubscribersManagement;