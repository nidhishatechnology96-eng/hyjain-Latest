import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, getRole } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Dropdown, Offcanvas } from 'bootstrap';
import './admin.css'; 

function AdminLayout() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = getRole(currentUser);

  useEffect(() => {
    // Bootstrap JS component initialization
    const dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    dropdownElementList.map(dropdownToggleEl => Dropdown.getOrCreateInstance(dropdownToggleEl));
    
    const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
    offcanvasElementList.map(offcanvasEl => Offcanvas.getOrCreateInstance(offcanvasEl));
  }, [location]);

  // 1. LOGOUT HANDLER (This function is correct)
  // It calls the logout function from your context and redirects the user.
  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent the default link behavior
    try {
        await logout();
        // Redirect to the login page after a successful logout
        navigate('/login');
    } catch (error) {
        console.error("Failed to log out", error);
        alert("Failed to log out. Please try again.");
    }
  };

  const allNavItems = [
    { path: '/admin/dashboard', icon: 'bi-speedometer2', name: 'Dashboard', roles: ['admin'] },
    { path: '/admin/reports', icon: 'bi-bar-chart-line', name: 'Reports', roles: ['admin'] },
    { path: '/admin/products', icon: 'bi-box-seam', name: 'Products', roles: ['admin', 'staff'] },
    { path: '/admin/orders', icon: 'bi-cart3', name: 'Orders', roles: ['admin', 'staff', 'delivery'] },
    { path: '/admin/categories', icon: 'bi-tags', name: 'Categories', roles: ['admin', 'staff'] },
    { path: '/admin/category-carousels', icon: 'bi-collection-play-fill', name: 'Category Carousels', roles: ['admin', 'staff'] },
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
        
        {/* The offcanvas-body needs to be a flex container to push the logout button to the bottom */}
        <div className="offcanvas-body d-flex flex-column">
          <nav className="nav flex-column">
            {visibleNavItems.map(item => (
              <NavLink key={item.name} to={item.path} className="nav-link">
                <i className={`bi ${item.icon} me-2`}></i>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* 2. ADD THE LOGOUT BUTTON HERE */}
          {/* We use an <a> tag and an onClick handler. It's placed after the main nav. */}
          <div className="mt-auto"> {/* This div with margin-top: auto pushes the button to the bottom */}
            <a href="#" onClick={handleLogout} className="nav-link logout-link">
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </a>
          </div>
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
            <span className="me-3 d-none d-sm-inline">Welcome, {currentUser?.displayName || userRole}!</span>
            <div className="dropdown">
              <button className="btn btn-light rounded-circle p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={currentUser?.photoURL || "https://i.pravatar.cc/40"} alt="Admin" className="rounded-circle" style={{width: '40px', height: '40px'}} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                      {/* This dropdown logout button also works correctly now */}
                      <button className="dropdown-item" onClick={handleLogout}>
                          <i className="bi bi-box-arrow-right me-2 "></i>Logout
                      </button>
                  </li>
              </ul>
            </div>
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