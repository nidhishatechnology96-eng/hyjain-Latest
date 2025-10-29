import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, Offcanvas } from 'bootstrap';
import './admin.css'; 

function AdminLayout() {
  const { currentUser, userRole } = useContext(AuthContext); // Use role from context
  const location = useLocation();

  useEffect(() => {
    const dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return Dropdown.getOrCreateInstance(dropdownToggleEl);
    });
    const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
    offcanvasElementList.map(function (offcanvasEl) {
        return Offcanvas.getOrCreateInstance(offcanvasEl);
    });
  }, [location]);

  const allNavItems = [
    { path: '/admin/dashboard', icon: 'bi-speedometer2', name: 'Dashboard', roles: ['admin'] },
    { path: '/admin/reports', icon: 'bi-bar-chart-line', name: 'Reports', roles: ['admin'] },
    { path: '/admin/products', icon: 'bi-box-seam', name: 'Products', roles: ['admin', 'staff'] },
    { path: '/admin/orders', icon: 'bi-cart3', name: 'Orders', roles: ['admin', 'staff', 'delivery'] },
    { path: '/admin/categories', icon: 'bi-tags', name: 'Categories', roles: ['admin', 'staff'] },
    { path: '/admin/users', icon: 'bi-people', name: 'Users', roles: ['admin'] },
    { path: '/admin/reviews', icon: 'bi-star', name: 'Reviews', roles: ['admin'] },
    { path: '/admin/help-messages', icon: 'bi-envelope', name: 'Help Messages', roles: ['admin'] }, 
    { path: '/admin/get-in-touch', icon: 'bi-chat-left-dots-fill', name: 'Enquiries', roles: ['admin'] },
    { path: '/admin/subscribers', icon: 'bi-mailbox2', name: 'Subscribers', roles: ['admin'] },
    { path: '/admin/slideshow', icon: 'bi-images', name: 'Shop Slideshow', roles: ['admin'] },
    { path: '/admin/settings', icon: 'bi-gear-fill', name: 'Settings', roles: ['admin'] },
  ];

  const visibleNavItems = allNavItems
    .filter(item => item.roles.includes(userRole))
    .sort((a, b) => allNavItems.indexOf(a) - allNavItems.indexOf(b)); 

  return (
    <div className="admin-layout">
      <div className="offcanvas-lg offcanvas-start admin-sidebar" tabIndex="-1" id="adminSidebar">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">HYJAIN Admin</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#adminSidebar" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <nav className="nav flex-column">
            {visibleNavItems.map(item => (
              <NavLink key={item.name} to={item.path} className="nav-link">
                <i className={`bi ${item.icon} me-2`}></i>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="admin-main-content">
        <header className="admin-header">
          <div className="d-flex align-items-center">
            <button className="btn btn-light d-lg-none me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#adminSidebar">
              <i className="bi bi-list"></i>
            </button>
            <h4 className="mb-0 d-none d-md-block">Admin Panel</h4>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3">Welcome, {currentUser?.displayName || userRole.charAt(0).toUpperCase() + userRole.slice(1)}!</span>
            <img src={currentUser?.photoURL || "https://i.pravatar.cc/40"} alt="Admin" className="rounded-circle" />
          </div>
        </header>

        <main className="container-fluid p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;