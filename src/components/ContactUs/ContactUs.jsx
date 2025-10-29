import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <div className="container my-5">
        
        {/* --- COMPACT HERO SECTION --- */}
        <div
          className="py-3 px-4 mb-5 text-white rounded-4 shadow-lg text-center"
          style={{ background: "linear-gradient(135deg, #198754, #28a745)" }}
        >
          <h1 className="fw-bold display-5">Get in Touch</h1>
          <p className="fs-6 mb-0 opacity-75">
            We're here to help and answer any question you might have.
            <br />
            We look forward to hearing from you!
          </p>
        </div>

        <div className="row g-4">
          {/* --- COMPACT CONTACT FORM --- */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-lg rounded-4">
              <div className="card-body p-4">
                <h5 className="mb-4 fw-bold text-success">Send a Message</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted"><FaUser className="me-2"/>Name</label>
                    <input type="text" className="form-control rounded-3" placeholder="Your Name" required/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted"><FaEnvelope className="me-2"/>Email</label>
                    <input type="email" className="form-control rounded-3" placeholder="Your Email" required/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Message</label>
                    <textarea className="form-control rounded-3" rows="4" placeholder="How can we help?" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-success w-100 py-2 fw-semibold shadow-sm">
                    <FaPaperPlane className="me-2"/> Submit
                  </button>

                  {sent && (
                    <div className="alert alert-success d-flex align-items-center mt-3 border-0" role="alert">
                      <FaCheckCircle className="me-2"/>
                      <div><strong>Success!</strong> Your message has been sent.</div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* --- ELEGANT CONTACT INFO --- */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-lg rounded-4">
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="mb-4 fw-bold text-success">Contact Details</h5>
                
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-5 text-success bg-light p-2 rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FaEnvelope />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 small">EMAIL</h6>
                      <a href="mailto:Hyjainfoodproducts@gmail.com" className="text-muted text-decoration-none">
                        Hyjainfoodproducts@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-5 text-success bg-light p-2 rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 small">PHONE</h6>
                      <a href="tel:+919591500590" className="text-muted text-decoration-none">
                        +91 9591500590
                      </a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-5 text-success bg-light p-2 rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 small">ADDRESS</h6>
                      <p className="text-muted mb-0 small">
                        478, Outer Ring Rd, Banashankri, Bangalore
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ratio ratio-16x9 rounded-3 shadow-sm overflow-hidden mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.768124754454!2d77.55508087588674!3d12.922619315948626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e2b0dd561eb%3A0x4bc1b9665e4f1620!2s478%2C%20Outer%20Ring%20Rd%2C%20Banashankari%203rd%20Stage%2C%20Banashankari%2C%20Bengaluru%2C%20Karnataka%20560085!5e0!3m2!1sen!2sin!4v1759570194163!5m2!1sen!2sin"
                    title="HYJAIN Location"
                    style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                {/* --- MODIFIED SOCIAL LINKS --- */}
                <div className="mt-auto pt-4 text-center">
                    <div className="d-flex justify-content-center gap-4 fs-4">
                        <a href="https://facebook.com/your-profile-name" target="_blank" rel="noopener noreferrer" className="link-secondary" title="Facebook"><FaFacebookF /></a>
                        <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer" className="link-secondary" title="Instagram"><FaInstagram /></a>
                        <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="link-secondary" title="Twitter"><FaTwitter /></a>
                        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="link-secondary" title="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;