import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AddressStep({ onAddressSubmit }) {
    // Set initial state with more relevant defaults for your use case
    const [address, setAddress] = useState({
        street: '', 
        city: '', 
        state: '', 
        zip: '', 
        country: 'India' 
    });

    const [errors, setErrors] = useState({});
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [locationError, setLocationError] = useState('');

    // Handles changes to any form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
        // Clear the specific error when the user starts correcting it
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Validates the entire form before submission
    const validate = () => {
        const newErrors = {};
        if (!address.street.trim()) newErrors.street = 'Street address is required.';
        if (!address.city.trim()) newErrors.city = 'City is required.';
        if (!address.state.trim()) newErrors.state = 'State is required.';
        if (!address.country.trim()) newErrors.country = 'Country is required.';

        // This regular expression now correctly validates a 6-digit Indian PIN code.
        if (!/^\d{6}$/.test(address.zip)) {
            newErrors.zip = 'Please enter a valid 6-digit PIN code.';
        }
        
        return newErrors;
    };

    // Main submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            // If there are errors, update the state to show them
            setErrors(formErrors);
        } else {
            // If the form is valid, clear any previous errors and submit the data
            setErrors({});
            onAddressSubmit(address); // This tells CheckoutFlow to move to the next step
        }
    };

    // Geolocation handler to auto-fill the address
    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }

        setIsFetchingLocation(true);
        setLocationError('');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Using a free reverse geocoding API (OpenStreetMap)
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    if (!response.ok) throw new Error('Failed to fetch address details.');
                    
                    const data = await response.json();
                    if (data && data.address) {
                        setAddress({
                            street: `${data.address.road || ''}`.trim(),
                            city: data.address.city || data.address.town || data.address.village || '',
                            state: data.address.state || '',
                            zip: data.address.postcode || '',
                            country: data.address.country || 'India',
                        });
                        setErrors({}); // Clear errors after successful fetch
                    } else {
                       throw new Error('Could not find address for this location.');
                    }
                } catch (error) {
                    setLocationError(error.message || "Could not retrieve address. Please enter it manually.");
                } finally {
                    setIsFetchingLocation(false);
                }
            },
            (error) => {
                let message = "Could not fetch location. Please check browser permissions.";
                if (error.code === 1) message = "Location access was denied. Please enable it in your browser settings.";
                setLocationError(message);
                setIsFetchingLocation(false);
            }
        );
    };

    return (
        <div className="card shadow-sm p-4 p-md-5 border-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="mb-4 text-center fw-light">Shipping Information</h3>
            
            <form onSubmit={handleSubmit} noValidate>
                {locationError && 
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>{locationError}</div>
                    </div>
                }

                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street Address</label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-house-door-fill"></i></span>
                        <input type="text" className={`form-control ${errors.street ? 'is-invalid' : ''}`} id="street" name="street" value={address.street} onChange={handleChange} required />
                        {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                    </div>
                </div>

                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <div className="input-group">
                             <span className="input-group-text"><i className="bi bi-building"></i></span>
                            <input type="text" className={`form-control ${errors.city ? 'is-invalid' : ''}`} id="city" name="city" value={address.city} onChange={handleChange} required />
                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} id="state" name="state" value={address.state} onChange={handleChange} required />
                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="zip" className="form-label">PIN Code</label>
                        <input type="text" className={`form-control ${errors.zip ? 'is-invalid' : ''}`} id="zip" name="zip" value={address.zip} onChange={handleChange} required />
                        {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">Country</label>
                         <div className="input-group">
                             <span className="input-group-text"><i className="bi bi-globe-americas"></i></span>
                            <input type="text" className={`form-control ${errors.country ? 'is-invalid' : ''}`} id="country" name="country" value={address.country} onChange={handleChange} required />
                            {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                        </div>
                    </div>
                </div>
                
                <hr className="my-4" />

                <div className="d-grid gap-3 d-sm-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleUseCurrentLocation} disabled={isFetchingLocation}>
                        {isFetchingLocation ? 
                            <><span className="spinner-border spinner-border-sm me-2"></span>Fetching...</> : 
                            <><i className="bi bi-geo-fill me-2"></i>Use My Location</>
                        }
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Proceed to Payment <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddressStep;