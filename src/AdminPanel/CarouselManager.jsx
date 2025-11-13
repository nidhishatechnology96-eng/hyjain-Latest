// src/AdminPanel/CarouselManager.jsx

import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import api from '../api';

const CarouselManager = () => {
    // Make sure `updateCarouselItem` is provided by your AdminContext
    const { carouselItems, addCarouselItem, deleteCarouselItem, updateCarouselItem, isLoading } = useContext(AdminContext);

    const initialFormState = { type: 'image', title: '', subtitle: '', buttonText: '' };
    const [newItem, setNewItem] = useState(initialFormState);
    
    const [desktopFile, setDesktopFile] = useState(null);
    const [mobileFile, setMobileFile] = useState(null);
    const [desktopUrl, setDesktopUrl] = useState('');
    const [mobileUrl, setMobileUrl] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // State to track the item being edited

    const handleInputChange = (e) => {
        setNewItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resetForm = () => {
        setNewItem(initialFormState);
        setDesktopFile(null);
        setMobileFile(null);
        setDesktopUrl('');
        setMobileUrl('');
        setEditingItem(null); // Exit editing mode
        // Clear file input fields visually
        if (document.getElementById('desktop-file-upload')) {
            document.getElementById('desktop-file-upload').value = null;
        }
        if (document.getElementById('mobile-file-upload')) {
            document.getElementById('mobile-file-upload').value = null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If editing, the current URL is fine. If adding, a new file or URL is needed.
        if ((!editingItem && !desktopFile && !desktopUrl) || !newItem.title || !newItem.buttonText) {
            alert('Please provide a desktop image (file or URL), a title, and button text.');
            return;
        }

        setIsSubmitting(true);
        try {
            let finalDesktopUrl = desktopUrl;
            let finalMobileUrl = mobileUrl;

            // Upload files only if new ones are selected
            if (desktopFile) {
                const formData = new FormData();
                formData.append('image', desktopFile);
                const res = await api.post('/api/upload-image', formData);
                finalDesktopUrl = res.data.imageUrl;
            }
            if (mobileFile) {
                const formData = new FormData();
                formData.append('image', mobileFile);
                const res = await api.post('/api/upload-image', formData);
                finalMobileUrl = res.data.imageUrl;
            }

            const slideData = {
                type: 'image',
                desktopImageUrl: finalDesktopUrl,
                mobileImageUrl: finalMobileUrl || finalDesktopUrl,
                title: newItem.title,
                subtitle: newItem.subtitle,
                buttonText: newItem.buttonText,
            };

            if (editingItem) {
                // Defensive check to prevent crash and guide developer
                if (typeof updateCarouselItem !== 'function') {
                    console.error("FATAL: `updateCarouselItem` is not a function. Please implement it in your AdminContext provider.");
                    alert("Update functionality is not configured. Please check the console.");
                    setIsSubmitting(false);
                    return;
                }
                await updateCarouselItem(editingItem.id, slideData);
            } else {
                await addCarouselItem(slideData);
            }
            
            resetForm();
            
        } catch (error) {
            console.error(`Failed to ${editingItem ? 'update' : 'add'} carousel item:`, error);
            alert("An error occurred. Please check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleEditItem = (item) => {
        setEditingItem(item);
        setNewItem({ title: item.title, subtitle: item.subtitle, buttonText: item.buttonText });
        setDesktopUrl(item.desktopImageUrl);
        setMobileUrl(item.mobileImageUrl || '');
        setDesktopFile(null);
        setMobileFile(null);
        if (document.getElementById('desktop-file-upload')) document.getElementById('desktop-file-upload').value = null;
        if (document.getElementById('mobile-file-upload')) document.getElementById('mobile-file-upload').value = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemoveItem = async (id) => {
        if (window.confirm('Are you sure you want to remove this slide?')) {
            await deleteCarouselItem(id);
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Manage Homepage Carousel</h1>
            <div className="row">
                {/* ✅ RESPONSIVENESS FIX: Changed col-lg-* to col-md-* to stack on smaller screens */}
                <div className="col-md-7 mb-4 mb-md-0">
                    <div className="card shadow-sm">
                        <div className="card-header"><h5 className="mb-0">{editingItem ? 'Edit Slide' : 'Add New Slide'}</h5></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Desktop Image (Recommended: 1920x1080)</label>
                                    <input type="file" id="desktop-file-upload" className="form-control" onChange={(e) => { setDesktopFile(e.target.files[0]); setDesktopUrl(''); }} accept="image/*" />
                                    <small className="text-muted d-block text-center my-1">OR</small>
                                    <input type="text" className="form-control" value={desktopUrl} onChange={(e) => { setDesktopUrl(e.target.value); setDesktopFile(null); if(document.getElementById('desktop-file-upload')) document.getElementById('desktop-file-upload').value=null; }} placeholder="Paste Desktop Image URL" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Mobile Image (Optional, Recommended: 1080x1350)</label>
                                    <input type="file" id="mobile-file-upload" className="form-control" onChange={(e) => { setMobileFile(e.target.files[0]); setMobileUrl(''); }} accept="image/*" />
                                    <small className="text-muted d-block text-center my-1">OR</small>
                                    <input type="text" className="form-control" value={mobileUrl} onChange={(e) => { setMobileUrl(e.target.value); setMobileFile(null); if(document.getElementById('mobile-file-upload')) document.getElementById('mobile-file-upload').value=null; }} placeholder="Paste Mobile Image URL" />
                                </div>
                                <hr/>
                                <div className="mb-3"><label className="form-label">Title</label><input type="text" name="title" className="form-control" value={newItem.title} onChange={handleInputChange} required /></div>
                                <div className="mb-3"><label className="form-label">Subtitle</label><input type="text" name="subtitle" className="form-control" value={newItem.subtitle} onChange={handleInputChange} /></div>
                                <div className="mb-3"><label className="form-label">Button Text</label><input type="text" name="buttonText" className="form-control" value={newItem.buttonText} onChange={handleInputChange} required /></div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : (editingItem ? 'Update Slide' : 'Add Slide')}</button>
                                {editingItem && (
                                    <button type="button" className="btn btn-secondary ms-2" onClick={resetForm} disabled={isSubmitting}>Cancel</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-header"><h5 className="mb-0">Current Slides</h5></div>
                        <div className="card-body" style={{maxHeight: '600px', overflowY: 'auto'}}>
                            {isLoading ? <p>Loading slides...</p> : (
                                carouselItems.length > 0 ? carouselItems.map(item => (
                                    <div key={item.id} className="d-flex align-items-center gap-3 p-2 border-bottom">
                                        <img src={item.desktopImageUrl} alt="preview" width="120" height="67" className="rounded" style={{objectFit: 'cover'}} />
                                        <div className="flex-grow-1"><strong className="d-block text-truncate">{item.title}</strong></div>
                                        <div className="d-flex gap-2">
                                            <button onClick={() => handleEditItem(item)} className="btn btn-sm btn-outline-secondary"><i className="bi bi-pencil-square"></i></button>
                                            <button onClick={() => handleRemoveItem(item.id)} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></button>
                                        </div>
                                    </div>
                                )) : <p className="text-muted text-center p-3">No slides added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselManager;