import React, { useState, useEffect, useMemo, useContext } from 'react';
import { AdminContext } from './AdminContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import api from '../api'; // Your API instance for uploads

// --- This is the new, powerful form component ---
function AddEditProductForm({ editingProduct, onFormSubmit, onCancelEdit }) {
    const { categories } = useContext(AdminContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // This is the new data structure for a product with dynamic options
    const initialFormState = useMemo(() => ({
        name: '',
        category: '',
        options: [{
            label: '',
            price: '',
            description: '',
            images: [], // Each option has its own images (will store URLs)
            imageFiles: [] // Temporary state for file objects
        }],
    }), []);

    const [productData, setProductData] = useState(initialFormState);

    useEffect(() => {
        if (editingProduct) {
            const sanitizedOptions = (editingProduct.options || []).map(opt => ({
                ...opt,
                images: opt.images || [],
                imageFiles: [], // Always start with empty files on edit
            }));
            setProductData({
                name: editingProduct.name || '',
                category: editingProduct.category || '',
                options: sanitizedOptions.length > 0 ? sanitizedOptions : initialFormState.options
            });
        } else {
            setProductData(initialFormState);
        }
    }, [editingProduct, initialFormState]);

    // --- Handlers for dynamically changing the form fields ---
    const handleOptionChange = (optIndex, e) => {
        const { name, value } = e.target;
        const newOptions = [...productData.options];
        newOptions[optIndex] = { ...newOptions[optIndex], [name]: value };
        setProductData({ ...productData, options: newOptions });
    };

    const handleImageFileChange = (optIndex, e) => {
        const files = Array.from(e.target.files);
        const newOptions = [...productData.options];
        newOptions[optIndex].imageFiles = files; // Store the file objects
        // Create previews
        newOptions[optIndex].imagePreviews = files.map(file => URL.createObjectURL(file));
        setProductData({ ...productData, options: newOptions });
    };

    const addOption = () => {
        setProductData({ ...productData, options: [...productData.options, { label: '', price: '', description: '', images: [], imageFiles: [] }] });
    };

    const removeOption = (optIndex) => {
        if (productData.options.length > 1) {
            setProductData({ ...productData, options: productData.options.filter((_, i) => i !== optIndex) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Step 1: Upload all new images first
            const updatedOptions = await Promise.all(productData.options.map(async (option) => {
                let newImageUrls = [];
                if (option.imageFiles && option.imageFiles.length > 0) {
                    const uploadPromises = option.imageFiles.map(file => {
                        const formData = new FormData();
                        formData.append('image', file);
                        return api.post('/api/upload-image', formData);
                    });
                    const responses = await Promise.all(uploadPromises);
                    newImageUrls = responses.map(res => res.data.imageUrl);
                }
                // Return a clean option object with only URLs, not file objects
                return {
                    label: option.label,
                    price: option.price,
                    description: option.description,
                    images: newImageUrls.length > 0 ? newImageUrls : option.images, // Use new URLs if uploaded, otherwise keep old ones
                };
            }));

            // Step 2: Create the final product data object
            const finalProductData = {
                name: productData.name,
                category: productData.category,
                options: updatedOptions,
                // Set default fields for the main shop page grid view
                price: parseFloat(updatedOptions[0]?.price) || 0,
                images: updatedOptions[0]?.images || [],
                description: updatedOptions[0]?.description || '',
            };

            await onFormSubmit(finalProductData); // Call the parent submit handler
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('An error occurred. Please check the console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h3 className="card-title mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Product Name</label>
                            <input type="text" className="form-control" value={productData.name} onChange={(e) => setProductData({...productData, name: e.target.value})} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Category</label>
                            <select className="form-select" value={productData.category} onChange={(e) => setProductData({...productData, category: e.target.value})} required>
                                <option value="">-- Select Category --</option>
                                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <h4 className="mb-3 border-top pt-3">Product Options</h4>
                    {productData.options.map((option, optIndex) => (
                        <div key={optIndex} className="card bg-light mb-3 p-3 border">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="mb-0 text-primary">Option {optIndex + 1}</h5>
                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeOption(optIndex)} disabled={productData.options.length === 1}>Remove Option</button>
                            </div>
                            <hr />
                            <div className="row g-3">
                                <div className="col-md-6"><label className="form-label">Label (e.g., 1kg, 500ml)</label><input type="text" name="label" className="form-control" value={option.label} onChange={(e) => handleOptionChange(optIndex, e)} required /></div>
                                <div className="col-md-6"><label className="form-label">Price (₹)</label><input type="number" name="price" className="form-control" value={option.price} onChange={(e) => handleOptionChange(optIndex, e)} required step="0.01" /></div>
                                <div className="col-12"><label className="form-label">Option-Specific Description</label><textarea name="description" className="form-control" rows="3" value={option.description} onChange={(e) => handleOptionChange(optIndex, e)} placeholder="Enter a description for this specific option"></textarea></div>
                                <div className="col-12">
                                    <label className="form-label fw-medium">Option-Specific Images (Upload Files)</label>
                                    <input type="file" className="form-control" multiple onChange={(e) => handleImageFileChange(optIndex, e)} accept="image/*" />
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {(option.imagePreviews || option.images || []).map((imgSrc, imgIndex) => (
                                            <img key={imgIndex} src={imgSrc} alt="preview" style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary mt-2" onClick={addOption}>
                        <i className="bi bi-plus-circle me-2"></i>Add Another Option
                    </button>
                    
                    <hr className="my-4" />
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Save Product')}
                        </button>
                        {editingProduct && <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>Cancel Edit</button>}
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- Main Page Component that lists products ---
function ProductManagement() {
    const { products, addProduct, updateProduct, deleteProduct } = useContext(AdminContext);
    const [editingProduct, setEditingProduct] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const [query, setQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }, [products, query]);

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 4000);
    };

    const handleFormSubmit = async (productData) => {
        if (editingProduct) {
            await updateProduct(editingProduct.id, productData);
            showAlert('Product updated successfully!');
        } else {
            await addProduct(productData);
            showAlert('Product added successfully!');
        }
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(productId);
            showAlert('Product deleted successfully!', 'danger');
        }
    };
    
    return (
        <>
            {alert.show && <div className={`alert alert-${alert.type} position-fixed top-0 end-0 m-3 shadow`} style={{ zIndex: 1050 }}>{alert.message}</div>}
            
            <AddEditProductForm
                editingProduct={editingProduct}
                onFormSubmit={handleFormSubmit}
                onCancelEdit={() => setEditingProduct(null)}
            />

            <h3 className="mt-5 mb-3">All Products</h3>
            <div className="card shadow-sm">
                <div className="card-header bg-white py-3"><input type="text" className="form-control" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped align-middle mb-0 product-table">
                            <thead className="table-dark">
                                <tr><th>Image</th><th>Name</th><th>Default Price</th><th>Category</th><th>Options</th><th className="text-center">Actions</th></tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(p => (
                                    <tr key={p.id}>
                                        <td data-label="Image"><img src={(p.images && p.images[0]) || 'https://via.placeholder.com/60'} alt={p.name} className="img-fluid rounded" style={{ width: "60px", height: "60px", objectFit: "cover" }} /></td>
                                        <td data-label="Name" className="fw-bold">{p.name}</td>
                                        <td data-label="Price">₹{p.price}</td>
                                        <td data-label="Category">{p.category}</td>
                                        <td data-label="Options">{(p.options || []).map(opt => opt.label).join(', ')}</td>
                                        <td data-label="Actions" className="text-center">
                                            <button className="btn btn-sm btn-outline-primary me-2 mb-1" title="Edit" onClick={() => handleEdit(p)}><i className="bi bi-pencil-fill"></i></button>
                                            <button className="btn btn-sm btn-outline-danger mb-1" title="Delete" onClick={() => handleDelete(p.id)}><i className="bi bi-trash-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductManagement;