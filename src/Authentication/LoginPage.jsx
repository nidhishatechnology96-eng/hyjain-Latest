import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import api from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // ✅ 1. IMPORT `logout` TO SIGN OUT UNAUTHORIZED ADMINS
  const { login, logout } = useContext(AuthContext); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { userCredential, role } = await login(email, password);
      
      const authorizedRoles = ['admin', 'staff', 'delivery'];

      // ✅ 2. THIS IS THE CRITICAL FIX
      // If an admin/staff user tries to log in here, block them.
      if (authorizedRoles.includes(role)) {
        // First, immediately sign them out of the session `login()` just created.
        await logout(); 
        // Then, alert them and redirect them to the correct portal.
        alert("This is an admin/staff account. Redirecting you to the admin portal.");
        navigate('/admin-login', { replace: true });
        return; // Stop execution here
      }

      // This part now only runs for 'customer' roles
      try {
        await axios.post('http://localhost:5000/api/notify-login', {
          email: userCredential.user.email,
          name: userCredential.user.displayName
        });
      } catch (emailError) {
        console.error("Failed to send login notification email:", emailError);
      }

      // Navigate successful customers to their profile or intended page
      const from = location.state?.from || "/profile";
      navigate(from, { replace: true });

    } catch (err) {
      // This will catch standard Firebase errors like 'auth/wrong-password'
      console.error("Login Error:", err);
      setError("Failed to log in. Please check your email and password.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <FaUserCircle className="text-success mb-3" style={{ fontSize: "60px" }} />
            <h3 className="fw-bold">Welcome Back</h3>
            <p className="text-muted small">Login to continue to your account</p>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center small">
              <p>Don't have an account? <Link to="/signup" state={{ from: location.state?.from }}>Sign Up</Link></p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;