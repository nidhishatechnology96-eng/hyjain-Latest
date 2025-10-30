import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';

import api from '../api';

function SlideshowManagement() {
    const { slideshowImages, addSlideshowImage, deleteSlideshowImage, isLoading } = useContext(AdminContext);
    const [desktopFile, setDesktopFile] = useState(null);
    const [mobileFile, setMobileFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
    };

    const handleUpload = async () => {
        if (!desktopFile || !mobileFile) {
            showAlert('Please select both a desktop and a mobile image.', 'danger');
            return;
        }
        setIsUploading(true);
        try {
            const uploadPromises = [desktopFile, mobileFile].map(file => {
                const formData = new FormData();
                formData.append('image', file);
                return api.post('/api/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            });

            const [desktopRes, mobileRes] = await Promise.all(uploadPromises);

            const slideData = {
                desktopImageUrl: desktopRes.data.imageUrl,
                mobileImageUrl: mobileRes.data.imageUrl
            };

            await addSlideshowImage(slideData);
            showAlert('New slide added successfully!');
            
            // Reset form
            setDesktopFile(null);
            setMobileFile(null);
            document.getElementById('desktop-upload').value = null;
            document.getElementById('mobile-upload').value = null;

        } catch (error) {
            console.error("Error uploading images:", error);
            showAlert('Failed to upload slide. Please try again.', 'danger');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            await deleteSlideshowImage(id);
            showAlert('Slide deleted successfully!', 'danger');
        }
    };

    return (
        <>
            {alert.show && (
                <div className={`alert alert-${alert.type} position-fixed top-0 end-0 m-3 shadow`} style={{ zIndex: 1050 }}>
                    {alert.message}
                </div>
            )}
            <h1 className="h3 mb-4 text-gray-800">Shop Slideshow Management</h1>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="card-title">Upload New Slide</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="desktop-upload" className="form-label">Desktop Image (1920x1080)</label>
                            <input type="file" className="form-control" id="desktop-upload" onChange={(e) => setDesktopFile(e.target.files[0])} accept="image/*" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mobile-upload" className="form-label">Mobile Image (1080x1350)</label>
                            <input type="file" className="form-control" id="mobile-upload" onChange={(e) => setMobileFile(e.target.files[0])} accept="image/*" />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload New Slide'}
                    </button>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">Current Slideshow Images</h5>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <div className="text-center"><div className="spinner-border"></div></div>
                    ) : slideshowImages.length > 0 ? (
                        <div className="row g-4">
                            {slideshowImages.map(slide => (
                                <div key={slide.id} className="col-lg-6">
                                    <div className="card">
                                        <div className="row g-0">
                                            <div className="col-6">
                                                <div className="p-2">
                                                    <h6 className="text-center small text-muted">Desktop</h6>
                                                    <img src={slide.desktopImageUrl} className="img-fluid rounded" alt="Desktop slide" />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                 <div className="p-2">
                                                    <h6 className="text-center small text-muted">Mobile</h6>
                                                    <img src={slide.mobileImageUrl} className="img-fluid rounded" alt="Mobile slide" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer text-end">
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(slide.id)}>
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">No slideshow images have been uploaded yet.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SlideshowManagement;