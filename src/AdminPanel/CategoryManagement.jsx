import React, { useContext, useState, useMemo } from 'react';
import { AdminContext } from './AdminContext';
import axios from 'axios';
import api from '../api';

function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory } = useContext(AdminContext);
  
  // Add subcategories array to the initial state
  const initialFormState = useMemo(() => ({ name: "", imageUrl: "", subcategories: [] }), []);

  const [form, setForm] = useState(initialFormState);
  const [newSubcategory, setNewSubcategory] = useState(""); // State for the subcategory input
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  }, [categories, query]);
  
  const showAlert = (msg, type = 'success') => {
      setAlert({ show: true, message: msg, type });
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setNewSubcategory("");
    setImageFile(null);
    setEditingId(null);
    const fileInput = document.getElementById('category-image-upload');
    if (fileInput) fileInput.value = null;
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // --- Subcategory Handlers ---
  const handleAddSubcategory = () => {
    const trimmedSub = newSubcategory.trim();
    if (trimmedSub && !form.subcategories.includes(trimmedSub)) {
      setForm(prev => ({...prev, subcategories: [...prev.subcategories, trimmedSub]}));
      setNewSubcategory(""); // Clear input
    }
  };

  const handleDeleteSubcategory = (subToDelete) => {
    setForm(prev => ({
        ...prev,
        subcategories: prev.subcategories.filter(sub => sub !== subToDelete)
    }));
  };
  // --- End Subcategory Handlers ---


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
        showAlert('Category name is required.', 'danger');
        return;
    }
    setIsUploading(true);
    let uploadedImageUrl = form.imageUrl || '';

    try {
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            const res = await axios.post('/api/upload-image', formData);
            uploadedImageUrl = res.data.imageUrl;
        }

        if (!uploadedImageUrl && !editingId) {
            showAlert('An image is required for a new category.', 'danger');
            setIsUploading(false);
            return;
        }

        // The form object now includes the subcategories array
        const categoryData = { name: form.name, imageUrl: uploadedImageUrl, subcategories: form.subcategories || [] };

        if (editingId) {
          await updateCategory(editingId, categoryData);
          showAlert('Category updated successfully!');
        } else {
          await addCategory(categoryData);
          showAlert('Category added successfully!');
        }
        resetForm();
    } catch (error) {
        console.error("Error saving category:", error);
        showAlert('Failed to save category.', 'danger');
    } finally {
        setIsUploading(false);
    }
  };

  const handleEdit = (category) => {
    window.scrollTo(0, 0);
    setEditingId(category.id);
    // Ensure subcategories is an array, even if it's missing from old data
    setForm({ name: category.name, imageUrl: category.imageUrl, subcategories: category.subcategories || [] });
    setImageFile(null);
  };

  const handleDelete = async (id, name) => {
      if (window.confirm(`Are you sure you want to delete "${name}"? This will also remove its subcategories.`)) {
          await deleteCategory(id);
          showAlert('Category deleted!', 'danger');
      }
  };

  return (
    <>
      {alert.show && <div className={`alert alert-${alert.type} position-fixed top-0 end-0 m-3 shadow`} style={{ zIndex: 1050 }}>{alert.message}</div>}

      <h1 className="h3 mb-4 text-gray-800">Category Management</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">{editingId ? 'Edit Category' : 'Add New Category'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Category Name</label>
                    <input type="text" className="form-control" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Category Image</label>
                    <input type="file" className="form-control" id="category-image-upload" onChange={handleFileChange} accept="image/*" />
                    {form.imageUrl && !imageFile && <small className="text-muted">Current image is set. Choose a new file to replace it.</small>}
                </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary" disabled={isUploading}>
                {isUploading ? 'Saving...' : (editingId ? 'Update Category' : 'Add Category')}
              </button>
              {editingId && (<button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel Edit</button>)}
            </div>
          </form>

          {/* Subcategory Management Section - only shows when editing */}
          {editingId && (
            <div className="mt-4 pt-4 border-top">
                <h5 className="mb-3">Manage Subcategories for "{form.name}"</h5>
                <div className="row">
                    <div className="col-md-6">
                        <h6>Add New Subcategory</h6>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="e.g., Leafy Greens"
                                value={newSubcategory}
                                onChange={(e) => setNewSubcategory(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={handleAddSubcategory}>Add</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6>Existing Subcategories</h6>
                        {form.subcategories && form.subcategories.length > 0 ? (
                            <ul className="list-group">
                                {form.subcategories.map(sub => (
                                    <li key={sub} className="list-group-item d-flex justify-content-between align-items-center">
                                        {sub}
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteSubcategory(sub)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">No subcategories yet.</p>
                        )}
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-header py-3">
             <input type="text" className="form-control" placeholder="Search categories..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead><tr><th>Image</th><th>Name</th><th>Subcategories</th><th className="text-end">Actions</th></tr></thead>
                    <tbody>
                        {filteredCategories.map(cat => (
                            <tr key={cat.id}>
                                <td><img src={cat.imageUrl} alt={cat.name} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}}/></td>
                                <td>{cat.name}</td>
                                <td>{cat.subcategories?.join(', ') || 'None'}</td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(cat)}><i className="bi bi-pencil"></i></button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat.id, cat.name)}><i className="bi bi-trash"></i></button>
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

export default CategoryManagement;