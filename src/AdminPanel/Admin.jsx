// src/AdminPanel/Admin.jsx

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import ProductManagement from "./ProductManagement";
import OrdersManagement from "./OrdersManagement";
import CategoryManagement from "./CategoryManagement";
import UserManagement from "./UserManagement";
import Review from "./Review";
import HelpMessages from "./HelpMessages"; 
import GetInTouchMessages from "./GetInTouchMessages";
import SubscribersManagement from "./SubscribersManagement";
import SlideshowManagement from "./SlideshowManagement";
import Settings from "./Settings";
import Reports from "./Reports";
import CategoryCarouselManagement from "./CategoryCarouselManagement";
import CarouselManager from "./CarouselManager"; // ✅ 1. IMPORT THE COMPONENT
import 'bootstrap/dist/css/bootstrap.min.css';

const RoleBasedRoute = ({ allowedRoles, children }) => {
    const { userRole } = useContext(AuthContext);

    if (!allowedRoles.includes(userRole)) {
        switch(userRole) {
            case 'delivery':
            case 'staff':
                return <Navigate to="/admin/orders" replace />;
            default:
                return <Navigate to="/" replace />;
        }
    }
    return children;
};

const RoleBasedIndexRedirect = () => {
    const { userRole } = useContext(AuthContext);
    
    switch(userRole) {
        case 'admin':
            return <Navigate to="/admin/dashboard" replace />;
        case 'staff':
        case 'delivery':
            return <Navigate to="/admin/orders" replace />;
        default:
            return <Navigate to="/" replace />;
    }
};

function Admin() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<RoleBasedIndexRedirect />} />
        
        <Route path="dashboard" element={ <RoleBasedRoute allowedRoles={['admin']}><Dashboard /></RoleBasedRoute> } />
        <Route path="products" element={ <RoleBasedRoute allowedRoles={['admin', 'staff']}><ProductManagement /></RoleBasedRoute> } />
        <Route path="orders" element={ <RoleBasedRoute allowedRoles={['admin', 'staff', 'delivery']}><OrdersManagement /></RoleBasedRoute> } />
        <Route path="categories" element={ <RoleBasedRoute allowedRoles={['admin', 'staff']}><CategoryManagement /></RoleBasedRoute> } />
        <Route path="users" element={ <RoleBasedRoute allowedRoles={['admin']}><UserManagement /></RoleBasedRoute> } />
        <Route path="reviews" element={ <RoleBasedRoute allowedRoles={['admin']}><Review /></RoleBasedRoute> } />
        <Route path="help-messages" element={ <RoleBasedRoute allowedRoles={['admin']}><HelpMessages /></RoleBasedRoute> } />
        <Route path="get-in-touch" element={ <RoleBasedRoute allowedRoles={['admin']}><GetInTouchMessages /></RoleBasedRoute> } />
        <Route path="subscribers" element={ <RoleBasedRoute allowedRoles={['admin']}><SubscribersManagement /></RoleBasedRoute> } />
        <Route path="reports" element={ <RoleBasedRoute allowedRoles={['admin']}><Reports /></RoleBasedRoute> } />
        <Route path="slideshow" element={ <RoleBasedRoute allowedRoles={['admin']}><SlideshowManagement /></RoleBasedRoute> } />
        <Route path="settings" element={ <RoleBasedRoute allowedRoles={['admin']}><Settings /></RoleBasedRoute> } />
        <Route path="category-carousels" element={ <RoleBasedRoute allowedRoles={['admin', 'staff']}><CategoryCarouselManagement /></RoleBasedRoute> } />
      
        {/* ✅ 2. ADD THE ROUTE FOR THE HOMEPAGE CAROUSEL */}
        <Route path="homepage-carousel" element={ <RoleBasedRoute allowedRoles={['admin']}><CarouselManager /></RoleBasedRoute> } />

      </Route>
    </Routes>
  );
}

export default Admin;