// src/AdminPanel/OurStoryManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OurStoryManagement.css';

const OurStoryManagement = () => {
    const [storyData, setStoryData] = useState({
        title: '',
        subtitle: '',
        paragraph: '',
        bulletPoints: ['']
    });
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const response = await axios.get('/api/our-story');
                if (response.data) {
                    setStoryData({
                        title: response.data.title || '',
                        subtitle: response.data.subtitle || '',
                        paragraph: response.data.paragraph || '',
                        // Ensure bulletPoints is an array and not empty
                        bulletPoints: response.data.bulletPoints && response.data.bulletPoints.length > 0 ? response.data.bulletPoints : [''],
                    });
                    setImageUrl(response.data.imageUrl || '');
                }
            } catch (error) {
                console.error("Error fetching Our Story data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStoryData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoryData({ ...storyData, [name]: value });
    };

    const handleBulletPointChange = (index, value) => {
        const newBulletPoints = [...storyData.bulletPoints];
        newBulletPoints[index] = value;
        setStoryData({ ...storyData, bulletPoints: newBulletPoints });
    };

    const addBulletPoint = () => {
        setStoryData({ ...storyData, bulletPoints: [...storyData.bulletPoints, ''] });
    };

    const removeBulletPoint = (index) => {
        if (storyData.bulletPoints.length > 1) {
            const newBulletPoints = storyData.bulletPoints.filter((_, i) => i !== index);
            setStoryData({ ...storyData, bulletPoints: newBulletPoints });
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const formData = new FormData();
        formData.append('title', storyData.title);
        formData.append('subtitle', storyData.subtitle);
        formData.append('paragraph', storyData.paragraph);
        // Filter out empty bullet points before sending
        const filteredBulletPoints = storyData.bulletPoints.filter(point => point.trim() !== '');
        formData.append('bulletPoints', JSON.stringify(filteredBulletPoints));
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await axios.put('/api/our-story', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('"Our Story" content updated successfully!');
        } catch (error) {
            console.error("Error updating data:", error);
            alert('Failed to update content. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="our-story-management">
            <h2>Manage "Our Story" Section</h2>
            <form onSubmit={handleSubmit} className="our-story-form">
                <div className="form-group">
                    <label htmlFor="title">Title (e.g., "Our Story")</label>
                    <input type="text" id="title" name="title" value={storyData.title} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle (e.g., "From Farms To Family.")</label>
                    <input type="text" id="subtitle" name="subtitle" value={storyData.subtitle} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="paragraph">Main Paragraph</label>
                    <textarea id="paragraph" name="paragraph" rows="5" value={storyData.paragraph} onChange={handleInputChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Bullet Points</label>
                    {storyData.bulletPoints.map((point, index) => (
                        <div key={index} className="bullet-point-item">
                            <input
                                type="text"
                                value={point}
                                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                placeholder="Enter a feature or value"
                            />
                            <button
                                type="button"
                                onClick={() => removeBulletPoint(index)}
                                disabled={storyData.bulletPoints.length <= 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addBulletPoint} className="add-bullet-btn">Add Bullet Point</button>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
                    {imageUrl && (
                        <div className="image-preview-container">
                            <p>Current Image Preview:</p>
                            <img src={imageUrl} alt="Our Story Preview" className="image-preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="save-btn" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default OurStoryManagement;