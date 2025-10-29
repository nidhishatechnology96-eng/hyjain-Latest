import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductsManagement from './ProductsManagement'; // Assuming you have these components
import OrdersManagement from './OrdersManagement';
import CategoriesManagement from './CategoriesManagement'; // Assuming you have these components
import UsersManagement from './UsersManagement'; // Assuming you have these components
import ReviewsManagement from './ReviewsManagement'; // Assuming you have these components
import HelpMessages from './HelpMessages';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<ProductsManagement />} />
      <Route path="orders" element={<OrdersManagement />} />
      <Route path="categories" element={<CategoriesManagement />} />
      <Route path="users" element={<UsersManagement />} />
      <Route path="reviews" element={<ReviewsManagement />} />
      <Route path="help-messages" element={<HelpMessages />} />
      <Route path="/" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;