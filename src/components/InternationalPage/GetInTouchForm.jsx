import React, { useState, useContext } from 'react';
import { Form, Button, Tabs, Tab, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FaWpforms, FaViacoin } from 'react-icons/fa';
import { AdminContext } from '../../AdminPanel/AdminContext';
import axios from 'axios';

function GetInTouchForm() {
    // ✅ Use the new function from the context
    const { addGetInTouchMessage } = useContext(AdminContext);

    const initialEnquiryState = { name: '', companyName: '', address: '', country: 'India', city: '', phone: '', fax: '', email: '', details: '' };
    const initialFeedbackState = { name: '', email: '', message: '' };

    const [enquiryForm, setEnquiryForm] = useState(initialEnquiryState);
    const [feedbackForm, setFeedbackForm] = useState(initialFeedbackState);
    
    const [loading, setLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState({ show: false, message: '', type: 'success' });

    const handleEnquiryChange = (e) => {
        setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
    };

    const handleFeedbackChange = (e) => {
        setFeedbackForm({ ...feedbackForm, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (event, formType) => {
        event.preventDefault();
        setLoading(true);
        setSubmissionStatus({ show: false, message: '', type: '' });

        try {
            if (formType === 'enquiry') {
                const messageData = {
                    ...enquiryForm,
                    type: 'Enquiry',
                    subject: `Enquiry from ${enquiryForm.companyName}`,
                    message: enquiryForm.details
                };
                // ✅ Call the correct function
                await addGetInTouchMessage(messageData);
                
                await axios.post('http://localhost:5000/api/notify-enquiry', { 
                    email: enquiryForm.email, 
                    name: enquiryForm.name 
                });

                setSubmissionStatus({ show: true, message: 'Thank you for your enquiry! We will get back to you soon.', type: 'success' });
                setEnquiryForm(initialEnquiryState);
            } else { // Feedback form
                const messageData = {
                    ...feedbackForm,
                    type: 'Feedback',
                    subject: 'New Feedback Received',
                };
                // ✅ Call the correct function
                await addGetInTouchMessage(messageData);
                
                await axios.post('http://localhost:5000/api/notify-feedback', { 
                    email: feedbackForm.email, 
                    name: feedbackForm.name 
                });
                
                setSubmissionStatus({ show: true, message: 'Thank you for your valuable feedback!', type: 'success' });
                setFeedbackForm(initialFeedbackState);
            }
            event.target.reset();

        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionStatus({ show: true, message: 'Sorry, something went wrong. Please try again later.', type: 'danger' });
        } finally {
            setLoading(false);
            setTimeout(() => setSubmissionStatus({ show: false, message: '', type: '' }), 6000);
        }
    };

    return (
        <Card.Body className="p-4 p-md-5 get-in-touch-form">
          <div className="animate-children">
            <h1 className="fw-bold text-success mb-4">Get In Touch</h1>
            <Tabs defaultActiveKey="enquiry" id="get-in-touch-tabs" className="mb-4" justify>
                <Tab eventKey="enquiry" title={<><FaWpforms className="me-2" /> Enquiry Form</>}>
                    <Form onSubmit={(e) => handleFormSubmit(e, 'enquiry')} className="mt-4">
                        <Row>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Name <span className="text-danger">*</span></Form.Label><Form.Control type="text" name="name" value={enquiryForm.name} onChange={handleEnquiryChange} required /></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Company Name <span className="text-danger">*</span></Form.Label><Form.Control type="text" name="companyName" value={enquiryForm.companyName} onChange={handleEnquiryChange} required /></Form.Group></Col>
                            <Col xs={12}><Form.Group className="mb-3"><Form.Label>Address <span className="text-danger">*</span></Form.Label><Form.Control as="textarea" rows={2} name="address" value={enquiryForm.address} onChange={handleEnquiryChange} required /></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Country <span className="text-danger">*</span></Form.Label><Form.Select name="country" value={enquiryForm.country} onChange={handleEnquiryChange} required><option>India</option><option>USA</option><option>UK</option></Form.Select></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>City <span className="text-danger">*</span></Form.Label><Form.Control type="text" name="city" value={enquiryForm.city} onChange={handleEnquiryChange} required /></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Phone <span className="text-danger">*</span></Form.Label><Form.Control type="tel" name="phone" value={enquiryForm.phone} onChange={handleEnquiryChange} required /></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Fax</Form.Label><Form.Control type="text" name="fax" value={enquiryForm.fax} onChange={handleEnquiryChange} /></Form.Group></Col>
                            <Col xs={12}><Form.Group className="mb-3"><Form.Label>Email <span className="text-danger">*</span></Form.Label><Form.Control type="email" name="email" value={enquiryForm.email} onChange={handleEnquiryChange} required /></Form.Group></Col>
                            <Col xs={12}><Form.Group className="mb-3"><Form.Label>Details Regarding Inquiry <span className="text-danger">*</span></Form.Label><Form.Control as="textarea" rows={4} name="details" value={enquiryForm.details} onChange={handleEnquiryChange} required /></Form.Group></Col>
                        </Row>
                        <div className="d-flex justify-content-end align-items-center mt-4">
                            <Button variant="outline-secondary" type="reset" className="me-2" onClick={() => setEnquiryForm(initialEnquiryState)}>RESET</Button>
                            <Button variant="success" type="submit" disabled={loading}>
                                {loading ? <><Spinner as="span" animation="border" size="sm" /> Submitting...</> : 'SUBMIT'}
                            </Button>
                        </div>
                    </Form>
                </Tab>
                <Tab eventKey="feedback" title={<><FaViacoin className="me-2" /> Feedback Form</>}>
                     <Form onSubmit={(e) => handleFormSubmit(e, 'feedback')} className="mt-4">
                        <Form.Group className="mb-3"><Form.Label>Name <span className="text-danger">*</span></Form.Label><Form.Control type="text" name="name" value={feedbackForm.name} onChange={handleFeedbackChange} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Email <span className="text-danger">*</span></Form.Label><Form.Control type="email" name="email" value={feedbackForm.email} onChange={handleFeedbackChange} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Feedback / Message <span className="text-danger">*</span></Form.Label><Form.Control as="textarea" rows={5} name="message" value={feedbackForm.message} onChange={handleFeedbackChange} required /></Form.Group>
                        <div className="d-flex justify-content-end align-items-center mt-4">
                            <Button variant="outline-secondary" type="reset" className="me-2" onClick={() => setFeedbackForm(initialFeedbackState)}>RESET</Button>
                            <Button variant="success" type="submit" disabled={loading}>
                                {loading ? <><Spinner as="span" animation="border" size="sm" /> Submitting...</> : 'SUBMIT'}
                            </Button>
                        </div>
                    </Form>
                </Tab>
            </Tabs>
            {submissionStatus.show && <Alert variant={submissionStatus.type} className="mt-4">{submissionStatus.message}</Alert>}
          </div>
        </Card.Body>
    );
}

export default GetInTouchForm;