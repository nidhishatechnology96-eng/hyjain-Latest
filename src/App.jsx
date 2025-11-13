// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

// Import Providers
import AuthProvider from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext";
import AdminProvider from "./AdminPanel/AdminContext";


// Import Layout Components
import Navbar from "./components/Navbar/Navbar";
import HomeFooter from './components/Homefooter/HomeFooter';
import Footer from "./components/Footer/Footer";
import AdminLoginPage from "./Authentication/AdminLoginPage";

// Import All Your Pages
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import ContactUs from "./components/ContactUs/ContactUs";
import CartCheckout from "./components/CartCheckout";
import ProductDetails from "./components/ProductDetailsPage";
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import ForgotPassword from "./Authentication/ForgotPassword";
import UserProfile from "./Authentication/UserProfile";
import Admin from "./AdminPanel/Admin";
import SearchResultsPage from "./components/Searchresult/SearchResultsPage";
import CheckoutFlow from "./components/CheckoutFlow";
import ProtectedRoute from "./AdminPanel/ProtectedRoute"; 
import MyOrders from "./components/Order/MyOrders";
import Help from './components/Help/Help';
import CustomerReview from './components/CustomerReview';
import OrderConfirmation from "./components/OrderConfirmation";
import InternationalPage from './components/InternationalPage/InternationalPage';
import SignatureOutlets from './components/Signatureoutlet/SignatureOutlets'; 
import NewsAndMedia from './components/NewsandMedia/NewsAndMedia'; 
import People from './components/People/People'; 
import ArticleDetailPage from './components/ArticleDetailPage'; 
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
// --- 1. REMOVED: No longer need to import AllProductsPage ---
// import AllProductsPage from "./components/Shop/AllProductsPage"; 
import SubCategoryPage from "./components/Shop/SubCategoryPage";
import CategoryPage from "./components/Shop/CategoryPage";
import CancellationsandReturns from './components/InfoPage/CancellationsandReturns';
import Payments from './components/InfoPage/Payments';
import PrivacyPolicy from './components/InfoPage/PrivacyPolicy';
import RefundPolicy from './components/InfoPage/RefundPolicy';
import ShippingFeesandDelivery from './components/InfoPage/ShippingFeesandDelivery';
import TermsAndConditions from './components/InfoPage/TermsAndConditions';
import TrackOrder from './components/InfoPage/TrackOrder';






function AppLayout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // --- Footer logic (this part is correct and remains the same) ---
  const homeAndDropdownPaths = [
    '/', '/about-us', '/international-business', '/signature-outlets', '/news-media', '/people',
  ];
  const showHomeFooter = homeAndDropdownPaths.includes(location.pathname);
  const renderFooter = () => {
    if (isAdminPage) return null;
    if (showHomeFooter) return <HomeFooter />;
    return <Footer />;
  };

  return (
    <>
      {!isAdminPage && <Navbar />}
      
      <main className="main-content">
        <Routes>
          {/* ... (All other routes remain the same) ... */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/checkoutflow" element={<CheckoutFlow />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/help" element={<Help />} />
          <Route path="/reviews" element={<CustomerReview />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/international-business" element={<InternationalPage />} />
          <Route path="/signature-outlets" element={<SignatureOutlets />} />
          <Route path="/news-media" element={<NewsAndMedia />} />
          <Route path="/people" element={<People />} />
          <Route path="/news/:articleId" element={<ArticleDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellations-and-returns" element={<CancellationsandReturns />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/ShippingFeesandDelivery" element={<ShippingFeesandDelivery />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/track-order" element={<TrackOrder />} />
          
          
          {/* --- 2. THE ROUTING FIX IS HERE --- */}
          {/* This one line replaces the old "/products" route */}
          <Route path="/products" element={<CategoryPage />} />
          
          {/* These two lines remain the same, but now work with the consolidated logic */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/subcategory/:subCategoryName" element={<SubCategoryPage />} /> {/* Corrected path parameter */}
          
           
        </Routes>
      </main>

      {renderFooter()}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <Router>
            <AppLayout />
          </Router>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;