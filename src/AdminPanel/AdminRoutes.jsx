// src/AdminPanel/AdminRoutes.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import ALL of your admin page components using their correct filenames from your screenshot
import Dashboard from './Dashboard';
import Reports from './Reports';
import ProductsManagement from './ProductManagement';
import OrdersManagement from './OrdersManagement';
import CategoriesManagement from './CategoryManagement';
import CategoryCarouselManagement from './CategoryCarouselManagement';
import CarouselManager from './CarouselManager'; // Our new component for the homepage carousel
import UsersManagement from './UserManagement';
import ReviewsManagement from './Review'; // The filename is Review.jsx
import HelpMessages from './HelpMessages';
import Enquiries from './GetInTouchMessages';
import SubscribersManagement from './SubscribersManagement';
import SlideshowManagement from './SlideshowManagement';
import Settings from './Settings';

function AdminRoutes() {
  return (
    <Routes>
      {/* This route redirects the base /admin path to the dashboard */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />

      {/* Define a route for EVERY link in your AdminLayout sidebar */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="reports" element={<Reports />} />
      <Route path="products" element={<ProductsManagement />} />
      <Route path="orders" element={<OrdersManagement />} />
      <Route path="categories" element={<CategoriesManagement />} />
      <Route path="category-carousels" element={<CategoryCarouselManagement />} />
      <Route path="homepage-carousel" element={<CarouselManager />} />
      <Route path="users" element={<UsersManagement />} />
      <Route path="reviews" element={<ReviewsManagement />} />
      <Route path="help-messages" element={<HelpMessages />} />
      <Route path="get-in-touch" element={<Enquiries />} />
      <Route path="subscribers" element={<SubscribersManagement />} />
      <Route path="slideshow" element={<SlideshowManagement />} />
      <Route path="settings" element={<Settings />} />

      {/* This acts as a fallback for any unmatched admin route, sending the user to the dashboard */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;