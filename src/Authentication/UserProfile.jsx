// UserProfile.jsx

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./UserProfile.css"; // Import the new CSS file

function UserProfile() {
  const { currentUser, logout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', mobile: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        mobile: currentUser.mobile || ''
      });
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setMessage({ text: "Failed to log out. Please try again.", type: 'danger' });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.mobile) {
      setMessage({ text: "Please fill in all fields.", type: 'warning' });
      return;
    }
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await updateUserProfile(currentUser.uid, formData);
      setMessage({ text: "Profile updated successfully!", type: 'success' });
      setEditMode(false);
    } catch (error) {
      setMessage({ text: "Failed to update profile.", type: 'danger' });
    }
    setIsSaving(false);
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="profile-page-background py-5">
      <div className="animated-shape shape1"></div>
      <div className="animated-shape shape2"></div>
      <div className="container">
        <div className="card shadow-lg border-0 profile-card-elegant">
          <div className="row g-0">
            {/* Left Column: Avatar and Info */}
            <div className="col-lg-4 profile-sidebar-elegant">
              <div className="d-flex flex-column align-items-center text-center p-4 py-5">
                <div className="profile-avatar-elegant mb-3">
                  <i className="bi bi-person"></i>
                </div>
                <h4 className="fw-bold text-white">{currentUser.fullName || "User"}</h4>
                <p className="text-white-50 small mb-4">{currentUser.email}</p>
                <button className="btn btn-logout mt-auto " onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </div>
            </div>

            {/* Right Column: Form and Actions */}
            <div className="col-lg-8 profile-main-elegant">
              <div className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0 fw-bold">Profile Settings</h3>
                  {!editMode && (
                    <button className="btn btn-edit-profile" onClick={() => { setEditMode(true); setMessage({ text: '', type: '' }); }}>
                      <i className="bi bi-pencil-fill me-2"></i>Edit Profile
                    </button>
                  )}
                </div>

                {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input id="fullName" type="text" className="form-control" value={formData.fullName} onChange={handleChange} disabled={!editMode} />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                    {/* ✅ FIX: ADDED readOnly and a blank onChange to silence the warning */}
                    <input id="email" type="email" className="form-control" value={currentUser.email} readOnly onChange={() => {}} disabled />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="mobile" className="form-label">Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-phone-fill"></i></span>
                    <input id="mobile" type="tel" className="form-control" value={formData.mobile} onChange={handleChange} disabled={!editMode} />
                  </div>
                </div>
                
                <div className="mt-4">
                  {editMode ? (
                    <div className="d-flex gap-2">
                      <button className="btn btn-save-changes w-100" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? <span className="spinner-border spinner-border-sm"></span> : <><i className="bi bi-check-circle me-2"></i>Save Changes</>}
                      </button>
                      <button className="btn btn-cancel-edit w-100" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  ) : (
                    <Link to="/my-orders" className="btn btn-view-orders w-100">
                      <i className="bi bi-receipt-cutoff me-2"></i>View My Orders
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;