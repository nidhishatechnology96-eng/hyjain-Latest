import React, { useState } from "react";
import { FaLockOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Password reset link sent to ${email}`);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <FaLockOpen className="text-warning mb-3" style={{ fontSize: "60px" }} />
            <h3 className="fw-bold">Forgot Password?</h3>
            <p className="text-muted small">
              Enter your registered email, and we’ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 mb-3">
              Send Reset Link
            </button>

            <div className="text-center small">
              <Link to="/login" className="fw-semibold">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
