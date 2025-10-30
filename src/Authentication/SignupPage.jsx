import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserPlus } from "react-icons/fa";
import api from '../api';

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create user with Firebase Auth and add details to Firestore
      const userCredential = await signup(formData.email, formData.password, formData.fullName, formData.mobile);
      
      // ✅ 2. SEND NOTIFICATION EMAIL AFTER SUCCESSFUL SIGNUP
      try {
        await api.post('/api/notify-signup', {
          email: userCredential.user.email,
          name: formData.fullName
        });
        console.log("Signup notification request sent.");
      } catch (emailError) {
        console.error("Failed to send signup welcome email:", emailError);
        // Do not block user flow if email fails. The account is already created.
      }
      
      alert("✅ Signup successful! Welcome!");
      const from = location.state?.from || "/";
      navigate(from, { replace: true });

    } catch (err) {
      setError("Failed to create an account. The email may already be in use.");
      console.error("Signup Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <FaUserPlus className="text-success mb-3" style={{ fontSize: "60px" }} />
            <h3 className="fw-bold">Create Account</h3>
            <p className="text-muted small">Sign up to get started with HYJAIN</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Mobile No</label>
              <input type="tel" className="form-control" placeholder="123-456-7890" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" placeholder="you@example.com" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control" placeholder="Create a strong password (min. 6 characters)" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
            <div className="text-center small">Already have an account?{" "}<Link to="/login" state={{ from: location.state?.from }} className="fw-semibold">Login</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;