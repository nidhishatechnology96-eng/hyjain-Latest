import React, { useState, useContext } from 'react';
import { FaQuestionCircle, FaEnvelope, FaPhone, FaPaperPlane, FaClock, FaUser, FaCheckCircle } from 'react-icons/fa';
import { AdminContext } from '../../AdminPanel/AdminContext';

// No custom CSS import is needed. You can delete Help.css.

const Help = () => {
    const { addHelpMessage } = useContext(AdminContext);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const faqData = [
        { question: "How do I track my order?", answer: "Once your order ships, you'll get an email with a tracking number and a link. Use this link to see your order's progress." },
        { question: "What is your return policy?", answer: "We offer a 14-day return policy for unused and unopened items. Please visit our 'Returns & Refunds' page for detailed instructions." },
        { question: "How can I report an issue with a product?", answer: "We're sorry for the trouble! Please use the contact form to describe the problem. Our support team will get back to you within 24 hours." }
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        if (!formData.subject) newErrors.subject = "Please select a subject.";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await addHelpMessage(formData);
                setIsSubmitted(true);
                setTimeout(() => {
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    setIsSubmitted(false);
                }, 5000);
            } catch (error) {
                setSubmitError(error.message || "Failed to submit. Please try again or contact us directly.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="bg-light py-5">
            <div className="container help-container">
                {/* --- HERO SECTION --- */}
                <div
                    className="py-3 px-4 mb-5 text-white rounded-4 shadow-lg text-center"
                    style={{ background: "linear-gradient(135deg, #198754, #28a745)" }}
                >
                    <h1 className="fw-bold display-5">Help Center</h1>
                    <p className="fs-6 mb-0 opacity-75">How can we assist you today?</p>
                </div>

                <div className="row g-4">
                    {/* --- FAQS SECTION --- */}
                    <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-lg rounded-4">
                            <div className="card-body p-4">
                                <h5 className="mb-4 fw-bold text-success"><FaQuestionCircle className="me-2" />Frequently Asked Questions</h5>
                                <div className="accordion accordion-flush" id="faqAccordion">
                                    {faqData.map((faq, index) => (
                                        <div className="accordion-item border-bottom" key={index}>
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed bg-transparent shadow-none fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target={`#c${index}`}>
                                                    {faq.question}
                                                </button>
                                            </h2>
                                            <div id={`c${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body text-muted pt-0">{faq.answer}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CONTACT FORM SECTION --- */}
                    <div className="col-lg-6">
                        <div className="card h-100 border-0 shadow-lg rounded-4">
                            <div className="card-body p-4">
                                <h5 className="mb-4 fw-bold text-success"><FaPaperPlane className="me-2"/>Send Us a Message</h5>
                                {isSubmitted ? (
                                    <div className="alert alert-success d-flex align-items-center mt-3 border-0" role="alert">
                                        <FaCheckCircle className="me-2"/>
                                        <div><strong>Thank You!</strong> Your message has been sent.</div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate>
                                        {submitError && <div className="alert alert-danger small p-2">{submitError}</div>}
                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold text-muted"><FaUser className="me-2"/>Name</label>
                                            <input type="text" className={`form-control rounded-3 ${errors.name && 'is-invalid'}`} name="name" value={formData.name} onChange={handleChange} required />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold text-muted"><FaEnvelope className="me-2"/>Email</label>
                                            <input type="email" className={`form-control rounded-3 ${errors.email && 'is-invalid'}`} name="email" value={formData.email} onChange={handleChange} required />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold text-muted">Subject</label>
                                            <select className={`form-select rounded-3 ${errors.subject && 'is-invalid'}`} name="subject" value={formData.subject} onChange={handleChange} required>
                                                <option value="">-- Choose a topic --</option>
                                                <option value="Product Complaint">Product Complaint</option>
                                                <option value="Order Issue">Order Issue</option>
                                                <option value="Billing Question">Billing Question</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-semibold text-muted">Message</label>
                                            <textarea className={`form-control rounded-3 ${errors.message && 'is-invalid'}`} name="message" rows="3" value={formData.message} onChange={handleChange} required></textarea>
                                            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                        </div>
                                        <button type="submit" className="btn btn-success w-100 py-2 fw-semibold shadow-sm" disabled={isSubmitting}>
                                            {isSubmitting ? <><span className="spinner-border spinner-border-sm me-2"/>Submitting...</> : 'Submit Complaint'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- QUICK SUPPORT CARDS WITH ICONS --- */}
                <div className="row g-4 mt-2">
                    <div className="col-lg-4">
                        <div className="card h-100 border-0 shadow-lg rounded-4">
                            <div className="card-body text-center p-4">
                                <div className="fs-3 text-success bg-light p-3 rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                    <FaEnvelope />
                                </div>
                                <div className="mt-3">
                                    <h6 className="fw-bold mb-1">EMAIL SUPPORT</h6>
                                    <a href="mailto:Hyjainfoodproducts@gmail.com" className="text-muted text-decoration-none small">Hyjainfoodproducts@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card h-100 border-0 shadow-lg rounded-4">
                            <div className="card-body text-center p-4">
                                <div className="fs-3 text-success bg-light p-3 rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                    <FaPhone />
                                </div>
                                <div className="mt-3">
                                    <h6 className="fw-bold mb-1">CALL US</h6>
                                    <a href="tel:+919591500590" className="text-muted text-decoration-none small">+91 9591500590</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card h-100 border-0 shadow-lg rounded-4">
                            <div className="card-body text-center p-4">
                                <div className="fs-3 text-success bg-light p-3 rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                    <FaClock />
                                </div>
                                <div className="mt-3">
                                    <h6 className="fw-bold mb-1">RESPONSE TIME</h6>
                                    <p className="text-muted small mb-0">Within 24-48 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;