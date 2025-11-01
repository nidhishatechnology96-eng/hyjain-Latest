import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AdminContext } from './AdminContext';
import axios from 'axios';

function CategoryCarouselManagement() {
    const { categories, updateCategory, isLoading } = useContext(AdminContext);

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [currentSlides, setCurrentSlides] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

    const selectedCategory = useMemo(() => {
        return categories.find(cat => cat.id === selectedCategoryId);
    }, [categories, selectedCategoryId]);

    useEffect(() => {
        if (selectedCategory) {
            setCurrentSlides(selectedCategory.carouselImages || []);
        } else {
            setCurrentSlides([]);
        }
    }, [selectedCategory]);

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
    };

    // --- THIS IS THE FUNCTION THAT WASN'T WORKING VISUALLY ---
    const handleAddSlide = () => {
        setCurrentSlides(prev => [...prev, { desktopImage: '', mobileImage: '' }]);
    };

    const handleRemoveSlide = (index) => {
        if (window.confirm('Are you sure you want to remove this slide?')) {
            setCurrentSlides(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSlideURLChange = (index, field, value) => {
        const updatedSlides = [...currentSlides];
        updatedSlides[index] = { ...updatedSlides[index], [field]: value };
        setCurrentSlides(updatedSlides);
    };
    
    const handleImageUpload = async (file, index, field) => {
        if (!file) return;
        setUploadingIndex({ index, field });
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('http://localhost:5000/api/upload-image', formData);
            handleSlideURLChange(index, field, res.data.imageUrl);
            showAlert('Image uploaded successfully!', 'success');
        } catch (error) {
            console.error("Image upload failed:", error);
            showAlert('Image upload failed.', 'danger');
        } finally {
            setUploadingIndex(null);
        }
    };

    const handleSaveChanges = async () => {
        if (!selectedCategoryId) return showAlert('Please select a category.', 'danger');
        setIsSaving(true);
        try {
            await updateCategory(selectedCategoryId, { carouselImages: currentSlides });
            showAlert('Carousel images saved successfully!');
        } catch (error) {
            console.error("Error saving carousel images:", error);
            showAlert('Failed to save changes.', 'danger');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <>
            {alert.show && <div className={`alert alert-${alert.type} position-fixed top-0 end-0 m-3 shadow`} style={{ zIndex: 1050 }}>{alert.message}</div>}

            <h1 className="h3 mb-4 text-gray-800">Category Carousel Management</h1>

            <div className="card shadow-sm">
                <div className="card-header"><h5 className="mb-0">Select a Category to Edit</h5></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <select className="form-select" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                                <option value="">-- Choose a Category --</option>
                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {selectedCategoryId && (
                    <div className="card-footer">
                        <h5 className="mb-3">Editing Slides for: <span className="text-primary">{selectedCategory?.name}</span></h5>
                        
                        {/* --- START OF THE FIX --- */}
                        {/* We add a check here. If there are no slides, show a message. */}
                        {currentSlides.length === 0 && (
                            <div className="text-center p-4 bg-light rounded border">
                                <p className="mb-0 text-muted">No carousel slides have been added for this category yet.</p>
                            </div>
                        )}
                        
                        {/* The map function will now correctly render slides as they are added */}
                        {currentSlides.map((slide, index) => (
                            <div key={index} className="card bg-light mb-3 p-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0">Slide {index + 1}</h6>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveSlide(index)}>
                                        <i className="bi bi-trash"></i> Remove
                                    </button>
                                </div>
                                <div className="row g-3">
                                    <div className="col-lg-6">
                                        <label className="form-label small">Desktop Image</label>
                                        <div className="input-group">
                                            <input type="file" className="form-control" onChange={(e) => handleImageUpload(e.target.files[0], index, 'desktopImage')} accept="image/*" />
                                        </div>
                                        <input type="text" className="form-control form-control-sm mt-2" placeholder="Or paste URL here..." value={slide.desktopImage} onChange={(e) => handleSlideURLChange(index, 'desktopImage', e.target.value)} />
                                        {uploadingIndex?.index === index && uploadingIndex?.field === 'desktopImage' && <div className="text-muted small mt-1">Uploading...</div>}
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label small">Mobile Image</label>
                                        <div className="input-group">
                                            <input type="file" className="form-control" onChange={(e) => handleImageUpload(e.target.files[0], index, 'mobileImage')} accept="image/*" />
                                        </div>
                                        <input type="text" className="form-control form-control-sm mt-2" placeholder="Or paste URL here..." value={slide.mobileImage} onChange={(e) => handleSlideURLChange(index, 'mobileImage', e.target.value)} />
                                        {uploadingIndex?.index === index && uploadingIndex?.field === 'mobileImage' && <div className="text-muted small mt-1">Uploading...</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* --- END OF THE FIX --- */}

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <button className="btn btn-outline-secondary" onClick={handleAddSlide}>
                                <i className="bi bi-plus-circle me-1"></i> Add New Slide
                            </button>
                            <button className="btn btn-admin-primary" onClick={handleSaveChanges} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CategoryCarouselManagement;