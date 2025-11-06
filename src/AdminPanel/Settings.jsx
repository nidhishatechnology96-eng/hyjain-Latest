import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import api from '../api';

function Settings() {
    const { siteSettings, updateSiteSetting, isLoading } = useContext(AdminContext);
    
    // States for PDF management
    const [pdfFile, setPdfFile] = useState(null);
    const [isPdfUploading, setIsPdfUploading] = useState(false);

    // States for Logo management
    const [logoFile, setLogoFile] = useState(null);
    const [isLogoUploading, setIsLogoUploading] = useState(false);

    // State for the alert system
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

    // Helper function to show alerts temporarily
    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
    };

    // --- LOGO HANDLERS ---
    const handleLogoFileChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    const handleLogoUpload = async () => {
        if (!logoFile) {
            showAlert('Please select an image file for the logo.', 'danger');
            return;
        }
        setIsLogoUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', logoFile);
            
            const res = await api.post('/api/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            await updateSiteSetting('logoUrl', res.data.imageUrl);
            showAlert('Site logo updated successfully!');
            
            setLogoFile(null);
            document.getElementById('logo-upload').value = null;

        } catch (error) {
            console.error("Error uploading logo:", error);
            const errorMessage = error.response?.data?.error || 'Failed to upload logo. Please check the server logs.';
            showAlert(errorMessage, 'danger');
        } finally {
            setIsLogoUploading(false);
        }
    };

    // --- PDF HANDLERS (CORRECTED) ---
    const handlePdfFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handlePdfUpload = async () => {
        if (!pdfFile) {
            showAlert('Please select a PDF file to upload.', 'danger');
            return;
        }
        setIsPdfUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', pdfFile);
            
            const res = await api.post('/api/upload-file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // ✅ FIX: Use 'fileUrl' from the backend response and update 'pricingPdfUrl'.
            await updateSiteSetting('pricingPdfUrl', res.data.fileUrl);
            
            showAlert('Pricing PDF updated successfully!');
            setPdfFile(null);
            document.getElementById('pdf-upload').value = null;
        } catch (error) {
            console.error("Error uploading PDF:", error);
            // Improved error handling shows the specific server error
            const errorMessage = error.response?.data?.error || 'Failed to upload PDF. Please check the server logs.';
            showAlert(errorMessage, 'danger');
        } finally {
            setIsPdfUploading(false);
        }
    };

    return (
        <>
            {alert.show && (
                <div className={`alert alert-${alert.type} position-fixed top-0 end-0 m-3 shadow`} style={{ zIndex: 1050 }}>
                    {alert.message}
                </div>
            )}
            <h1 className="h3 mb-4 text-gray-800">Site Settings</h1>

            {/* Site Logo Management Card */}
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Site Logo</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Upload a new logo for the navigation bar. Recommended size: 150x50 pixels.</p>
                     <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="input-group">
                                <input type="file" className="form-control" id="logo-upload" onChange={handleLogoFileChange} accept="image/png, image/jpeg, image/svg+xml, image/webp" />
                                <button className="btn btn-primary" onClick={handleLogoUpload} disabled={isLogoUploading}>
                                    {isLogoUploading ? 'Uploading...' : 'Upload & Save'}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0 text-center">
                            <p className="mb-1 small text-muted">Current Logo:</p>
                            {isLoading ? (
                                <div className="spinner-border spinner-border-sm"></div>
                            ) : (
                                <img 
                                    src={siteSettings.logoUrl || 'https://via.placeholder.com/150x50?text=No+Logo'} 
                                    alt="Current Site Logo" 
                                    className="img-fluid rounded bg-light p-2 border" 
                                    style={{ maxHeight: '50px' }} 
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* GST Pricing PDF Card (CORRECTED) */}
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">GST Pricing PDF</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Upload the official pricing PDF that customers can download from the Shop page.</p>
                    <div className="input-group">
                        <input type="file" className="form-control" id="pdf-upload" onChange={handlePdfFileChange} accept=".pdf" />
                        <button className="btn btn-primary" onClick={handlePdfUpload} disabled={isPdfUploading}>
                            {isPdfUploading ? 'Uploading...' : 'Upload & Save'}
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="mt-3"><div className="spinner-border spinner-border-sm"></div></div>
                    ) : (
                        // ✅ FIX: Check for 'pricingPdfUrl' and use it as the href.
                        siteSettings.pricingPdfUrl && (
                            <div className="mt-3">
                                <p className="mb-1"><strong>Current PDF Link:</strong></p>
                                <a href={siteSettings.pricingPdfUrl} target="_blank" rel="noopener noreferrer">
                                    View Current PDF
                                </a>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default Settings;