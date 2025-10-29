import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext, getRole } from '../context/AuthContext';

const LoadingScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

function ProtectedRoute({ children }) {
    const { currentUser, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. If the context is still loading, show a spinner and wait.
    if (loading) {
        return <LoadingScreen />;
    }

    // 2. After loading, if there's no user, redirect to admin login.
    if (!currentUser) {
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    // 3. If there is a user, check their role.
    const userRole = getRole(currentUser);
    const authorizedRoles = ['admin', 'staff', 'delivery'];

    if (authorizedRoles.includes(userRole)) {
        // 4. If authorized, show the admin panel.
        return children;
    } else {
        // 5. If not authorized, kick them to the homepage.
        return <Navigate to="/" replace />;
    }
}

export default ProtectedRoute;