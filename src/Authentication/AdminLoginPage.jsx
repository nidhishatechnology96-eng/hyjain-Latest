import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext, getRole } from "../context/AuthContext";
import './AdminLogin.css';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Just log in. The onAuthStateChanged listener will handle the state update.
      await adminLogin(email, password);
      
      // ✅ NAVIGATE IMMEDIATELY. The ProtectedRoute will handle the rest.
      const from = location.state?.from || '/admin/dashboard';
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message || "Invalid credentials or insufficient permissions.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="card admin-login-card">
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="lock-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.523zM5 9a2 2 0 0 1 2-2v.5a.5.5 0 0 0 1 0V7a3 3 0 1 0-3 3H4a1 1 0 0 0 0 2h1a.5.5 0 0 0 .5-.5z"/>
              </svg>
            </div>
            <h3 className="fw-bold">Admin & Staff Portal</h3>
            <p className="text-muted small">Please enter your credentials to continue.</p>
          </div>
          
          {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary admin-login-btn w-100" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;