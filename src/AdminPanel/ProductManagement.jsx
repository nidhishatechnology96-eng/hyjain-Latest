// ProductManagement.jsx

import React, { useContext, useState, useMemo } from 'react';
import { AdminContext } from './AdminContext';

import 'bootstrap-icons/font/bootstrap-icons.css';
import api from '../api'; 

function ProductManagement() {
    const { products, addProduct, updateProduct, deleteProduct, categories } = useContext(AdminContext);

    const initialFormState = useMemo(() => ({
        name: "", price: "", quantity: "0", description: "", category: "", subcategory: "", images: []
    }), []);

    const [form, setForm] = useState(initialFormState);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const [query, setQuery] = useState('');

    const availableSubcategories = useMemo(() => {
        if (!form.category) return [];
        const selectedCat = categories.find(c => c.name === form.category);
        return selectedCat?.subcategories || [];
    }, [form.category, categories]);

    const filteredProducts = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.category && p.category.toLowerCase().includes(q))
        );
    }, [products, query]);

    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    const resetForm = () => {
        setForm(initialFormState);
        setImageFiles([]);
        setImagePreviews([]);
        setEditingId(null);
        const fileInput = document.getElementById('productImage');
        if (fileInput) fileInput.value = null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [name]: value };
            if (name === 'category') {
                updatedForm.subcategory = '';
            }
            return updatedForm;
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        if (files.length > 0) {
            setImageFiles(files);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(newPreviews);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        let uploadedImageUrls = editingId ? form.images || [] : [];

        try {
            if (imageFiles.length > 0) {
                const uploadPromises = imageFiles.map(file => {
                    const formData = new FormData();
                    formData.append('image', file);
                    return api.post('/api/upload-image', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                });
                const responses = await Promise.all(uploadPromises);
                uploadedImageUrls = responses.map(res => res.data.imageUrl);
            }
            
            if (uploadedImageUrls.length === 0 && !editingId) {
                showAlert('Please select at least one image.', 'danger');
                setIsUploading(false);
                return;
            }

            const productData = { ...form, price: Number(form.price), quantity: Number(form.quantity), images: uploadedImageUrls };

            if (editingId) {
                await updateProduct(editingId, productData);
                showAlert('Product updated successfully!');
            } else {
                await addProduct(productData);
                showAlert('Product added successfully!');
            }
            resetForm();
        } catch (error) {
            console.error("Error saving product:", error);
            showAlert('Failed to save product.', 'danger');
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (product) => {
        window.scrollTo(0, 0);
        setEditingId(product.id);
        setForm({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            category: product.category || "",
            subcategory: product.subcategory || "",
            images: product.images || (product.image ? [product.image] : [])
        });
        setImagePreviews(product.images || (product.image ? [product.image] : []));
        setImageFiles([]);
    };

    const handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(productId);
            showAlert('Product deleted successfully!', 'danger');
        }
    };

    return (
        <>
            {alert.show && (
                <div className={`alert alert-${alert.type} position-fixed top-0 end-0 m-3 shadow`} style={{ zIndex: 1050 }}>
                    {alert.message}
                </div>
            )}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h3 className="card-title mb-4">{editingId ? 'Edit Product' : 'Add a New Product'}</h3>
                    <form onSubmit={handleSubmit}>
                        {/* --- Row 1: Product Name & Price --- */}
                        <div className="row g-3 mb-3">
                            <div className="col-md-6"><label className="form-label">Product Name</label><input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required /></div>
                            <div className="col-md-6"><label className="form-label">Price</label><input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required min="0" step="0.01" /></div>
                        </div>
                        
                        {/* --- Row 2: Description --- */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            {/* ✅ FIX: ADDED onChange={handleChange} HERE */}
                            <textarea className="form-control" name="description" rows="3" value={form.description} onChange={handleChange} required></textarea>
                        </div>
                        
                        {/* --- Row 3: Category & Subcategory --- */}
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select className="form-select" name="category" value={form.category} onChange={handleChange} required>
                                    <option value="">-- Select Category --</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Subcategory (Optional)</label>
                                <select 
                                    className="form-select" 
                                    name="subcategory" 
                                    value={form.subcategory} 
                                    onChange={handleChange} 
                                    disabled={!form.category || availableSubcategories.length === 0}
                                >
                                    <option value="">-- None --</option>
                                    {availableSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* --- Row 4: Quantity & Image --- */}
                         <div className="row g-3 mb-3">
                            <div className="col-md-6"><label className="form-label">Stock Quantity</label><input type="number" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} required min="0" /></div>
                            <div className="col-md-6">
                                <label className="form-label">Product Images (Max 5)</label>
                                <input className="form-control" type="file" id="productImage" name="image" onChange={handleImageChange} accept="image/*" multiple />
                            </div>
                        </div>

                        {imagePreviews.length > 0 && (
                            <div className="mb-3">
                                <p className="mb-1 small">Image Previews:</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {imagePreviews.map((preview, index) => (
                                        <img key={index} src={preview} alt="Preview" className="img-thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="d-flex flex-wrap gap-2 mt-4">
                            <button type="submit" className="btn btn-admin-primary" disabled={isUploading}>
                                {isUploading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
                            </button>
                            {editingId && (<button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel Edit</button>)}
                        </div>
                    </form>
                </div>
            </div>
            
            <h3 className="mt-5 mb-3">All Products</h3>
            <div className="card shadow-sm">
                <div className="card-header bg-white py-3"><input type="text" className="form-control" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} /></div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped align-middle mb-0 product-table">
                            <thead className="table-dark">
                                <tr><th>Image</th><th>Name</th><th>Price</th><th>Category / Subcategory</th><th>Quantity</th><th className="text-center">Actions</th></tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(p => (
                                    <tr key={p.id}>
                                        <td data-label="Image"><img src={(p.images && p.images[0]) || p.image || 'https://via.placeholder.com/60'} alt={p.name} className="img-fluid rounded" style={{ width: "60px", height: "60px", objectFit: "cover" }} /></td>
                                        <td data-label="Name" className="fw-bold">{p.name}</td>
                                        <td data-label="Price">₹{p.price}</td>
                                        <td data-label="Category / Subcategory">{p.category}{p.subcategory ? ` / ${p.subcategory}` : ''}</td>
                                        <td data-label="Quantity">{p.quantity > 0 ? p.quantity : <span className="badge bg-danger">Out of Stock</span>}</td>
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