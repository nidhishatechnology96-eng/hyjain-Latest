import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Collapse } from 'bootstrap';
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "../../AdminPanel/AdminContext";
import LOGOH from "../../assets/l.png";
import './Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext) || { cart: [] };
  const { currentUser, logout } = useContext(AuthContext);
  const { siteSettings, categories } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // FIX: Calculate total quantity of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const isShopActive = ['/shop', '/products', '/category', '/subcategory'].some(path => location.pathname.startsWith(path));

  const handleMobileAction = (path) => {
    const collapseElement = document.getElementById('mainNavbarContent');
    if (collapseElement?.classList.contains('show')) {
      const bsCollapse = Collapse.getInstance(collapseElement) || new Collapse(collapseElement);
      bsCollapse.hide();
    }
    setOpenAccordion(null);
    if (path) navigate(path);
  };
  
  const handleAccordionToggle = (menuName) => {
    setOpenAccordion(openAccordion === menuName ? null : menuName);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleMobileAction(`/search?q=${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    handleMobileAction('/login');
  };

  const DesktopUserActions = () => (
    <div className="nav-item dropdown">
      <a className="nav-link dropdown-toggle user-display-pill" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-person-circle"></i>
        <span>Hi, {currentUser.fullName?.split(' ')[0] || 'User'}</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person-badge me-2"></i>Profile</Link></li>
        <li><Link className="dropdown-item" to="/my-orders"><i className="bi bi-receipt me-2"></i>My Orders</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
      </ul>
    </div>
  );

  return (
    <header className="sticky-top bg-white final-navbar shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid flex-nowrap">
          {/* --- Logo --- */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={siteSettings?.logoUrl || LOGOH} alt="HYJAIN" style={{ height: "35px" }} />
            <span className="fw-bold fs-5 ms-2 d-none d-md-inline" style={{ color: '#006A4E' }}>HYJAIN</span>
          </Link>
          
          {/* --- Mobile Search Bar --- */}
          <form className="d-lg-none flex-grow-1 mx-2" onSubmit={handleSearch}>
            <div className="input-group">
              <input type="search" className="form-control" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
            </div>
          </form>

          {/* --- Desktop Search Bar --- */}
          <div className="d-none d-lg-flex flex-grow-1 justify-content-center px-4">
            <form className="central-search-form" onSubmit={handleSearch}>
              <div className="input-group">
                <input type="search" className="form-control" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
              </div>
            </form>
          </div>

          {/* --- Right Side Icons & Links --- */}
          <div className="d-flex align-items-center">
            <div className="main-nav-links d-none d-lg-flex align-items-center">
              <div className="nav-item dropdown"><NavLink className="nav-link" to="/" id="homeDropdown"><i className="bi bi-house"></i><span>Home</span></NavLink><ul className="dropdown-menu" aria-labelledby="homeDropdown"><li><Link className="dropdown-item" to="/about-us">About Us</Link></li><li><Link className="dropdown-item" to="/international-business">International Business</Link></li><li><Link className="dropdown-item" to="/signature-outlets">Signature Outlets</Link></li><li><Link className="dropdown-item" to="/news-media">News & Media</Link></li><li><Link className="dropdown-item" to="/people">People</Link></li></ul></div>
              <div className="nav-item dropdown"><a className={`nav-link ${isShopActive ? 'active' : ''}`} href="#" id="shopDropdown" data-bs-toggle="dropdown"><i className="bi bi-shop"></i><span>Shop</span></a><ul className="dropdown-menu" aria-labelledby="shopDropdown"><li><Link className="dropdown-item fw-bold" to="/shop">Shop Home</Link></li><li><Link className="dropdown-item" to="/products">All Products</Link></li><li><hr className="dropdown-divider"/></li>{categories.map(cat => (<li key={cat.id}><Link className="dropdown-item" to={`/category/${encodeURIComponent(cat.name)}`}>{cat.name}</Link></li>))}</ul></div>
              <NavLink className="nav-link" to="/contact"><i className="bi bi-envelope"></i><span>Contact</span></NavLink>
              <NavLink className="nav-link" to="/help"><i className="bi bi-question-circle"></i><span>Help</span></NavLink>
              <div className="vr mx-3"></div>
              {currentUser ? <DesktopUserActions /> : <NavLink className="nav-link user-display-pill" to="/login">Hi, User</NavLink>}
            </div>
            
            {/* --- CORRECTED CART BUTTON AND BADGE --- */}
            <Link to="/cart" className="btn cart-button ms-2 ms-lg-3 position-relative">
              <i className="bi bi-cart"></i>
              <span className="d-none d-lg-inline ms-1">Cart</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            
            <button className="navbar-toggler d-lg-none border-0 ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbarContent">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE COLLAPSIBLE MENU --- */}
      <div className="collapse navbar-collapse d-lg-none" id="mainNavbarContent">
        <div className="mobile-menu-body">
            <div className="navbar-nav flex-column p-3">
              <div className={`mobile-nav-item ${openAccordion === 'home' ? 'open' : ''}`}>
                <div className="nav-link accordion-toggle" onClick={() => handleAccordionToggle('home')}><i className="bi bi-house"></i>Home</div>
                <div className="accordion-content">
                  <NavLink className="sub-link" to="/about-us" onClick={() => handleMobileAction()}>About Us</NavLink>
                  <NavLink className="sub-link" to="/international-business" onClick={() => handleMobileAction()}>International Business</NavLink>
                  <NavLink className="sub-link" to="/signature-outlets" onClick={() => handleMobileAction()}>Signature Outlets</NavLink>
                  <NavLink className="sub-link" to="/news-media" onClick={() => handleMobileAction()}>News & Media</NavLink>
                  <NavLink className="sub-link" to="/people" onClick={() => handleMobileAction()}>People</NavLink>
                </div>
              </div>
              <div className={`mobile-nav-item ${openAccordion === 'shop' ? 'open' : ''}`}>
                <div className={`nav-link accordion-toggle ${isShopActive ? 'active' : ''}`} onClick={() => handleAccordionToggle('shop')}><i className="bi bi-shop"></i>Shop</div>
                <div className="accordion-content">
                  <NavLink className="sub-link" to="/shop" onClick={() => handleMobileAction()}>Shop Home</NavLink>
                  <NavLink className="sub-link" to="/products" onClick={() => handleMobileAction()}>All Products</NavLink>
                  {categories.map(cat => (<NavLink key={cat.id} className="sub-link" to={`/category/${encodeURIComponent(cat.name)}`} onClick={() => handleMobileAction()}>{cat.name}</NavLink>))}
                </div>
              </div>
              <div className="mobile-nav-item">
                <NavLink className="nav-link" to="/contact" onClick={() => handleMobileAction()}><i className="bi bi-envelope"></i>Contact</NavLink>
              </div>
              <div className="mobile-nav-item">
                <NavLink className="nav-link" to="/help" onClick={() => handleMobileAction()}><i className="bi bi-question-circle"></i>Help</NavLink>
              </div>
            </div>
            <div className="mobile-user-actions-section">
              {currentUser ? (<>
                  <Link to="/profile" className="btn mobile-user-btn profile" onClick={() => handleMobileAction()}><i className="bi bi-person-circle"></i><span>{currentUser.fullName?.split(' ')[0] || 'User'}</span></Link>
                  <Link to="/my-orders" className="btn mobile-user-btn orders" onClick={() => handleMobileAction()}><i className="bi bi-receipt"></i>My Orders</Link>
                  <button className="btn mobile-user-btn logout" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i>Logout</button>
                </>) : (<Link to="/login" className="btn mobile-user-btn login w-100" onClick={() => handleMobileAction()}><i className="bi bi-person"></i>Login / Signup</Link>)}
            </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;